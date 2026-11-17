/**
 * migrateuploads.js
 * ─────────────────────────────────────────────────────────────────
 * 1. Uploads every file in Middleware/uploads/ to Cloudinary (folder: remarket)
 * 2. Updates every Product and OldProduct document in MongoDB
 *    whose image URL starts with "uploads/" to the new Cloudinary URL
 *
 * Run from: Backend/
 *   node migrateUploads.js
 */

require("dotenv").config();
const cloudinary = require("./Config/Cloudinary");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Product    = require("./Models/Products");
const OldProduct = require("./Models/UsedProduct");

const UPLOADS_DIR = path.join(__dirname, "Middleware", "uploads");

// ── 1. Upload all files in uploads/ to Cloudinary ────────────────────────────
async function uploadAll() {
  const files = fs.readdirSync(UPLOADS_DIR);
  if (files.length === 0) {
    console.log("uploads/ folder is empty.");
    return {};
  }

  console.log(`\nFound ${files.length} files in uploads/. Uploading to Cloudinary...\n`);

  const urlMap = {}; // filename → { url, public_id }

  for (const file of files) {
    const filePath = path.join(UPLOADS_DIR, file);
    const publicId = path.basename(file, path.extname(file)); // strip extension

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "remarket",
        public_id: publicId,
        overwrite: true,
        resource_type: "auto",
      });
      console.log(`✓ ${file}  →  ${result.secure_url}`);
      urlMap[file] = { url: result.secure_url, public_id: result.public_id };
    } catch (err) {
      console.error(`✗ ${file}  —  ${err.message}`);
    }
  }

  return urlMap;
}

// ── 2. Update MongoDB documents ───────────────────────────────────────────────
async function updateDB(urlMap) {
  let productUpdated = 0;
  let oldProductUpdated = 0;

  // ── Products ─────────────────────────────────────────────────────────────
  const products = await Product.find({});
  for (const product of products) {
    let changed = false;
    for (const img of product.images) {
      if (img.url && img.url.startsWith("uploads/")) {
        const filename = img.url.replace("uploads/", "");
        if (urlMap[filename]) {
          img.url       = urlMap[filename].url;
          img.public_id = urlMap[filename].public_id;
          changed = true;
        }
      }
    }
    if (changed) {
      await product.save();
      console.log(`  ✓ Product updated: ${product.productName} (${product._id})`);
      productUpdated++;
    }
  }

  // ── OldProducts ───────────────────────────────────────────────────────────
  const oldProducts = await OldProduct.find({});
  for (const op of oldProducts) {
    let changed = false;
    for (const img of op.images) {
      if (img.url && img.url.startsWith("uploads/")) {
        const filename = img.url.replace("uploads/", "");
        if (urlMap[filename]) {
          img.url       = urlMap[filename].url;
          img.public_id = urlMap[filename].public_id;
          changed = true;
        }
      }
    }
    if (changed) {
      await op.save();
      console.log(`  ✓ OldProduct updated: ${op.productName} (${op._id})`);
      oldProductUpdated++;
    }
  }

  return { productUpdated, oldProductUpdated };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // Step 1: Upload files
  const urlMap = await uploadAll();

  if (Object.keys(urlMap).length === 0) {
    console.log("Nothing to upload. Exiting.");
    return;
  }

  // Save the URL map locally for reference
  fs.writeFileSync(
    path.join(__dirname, "uploads-cloudinary-map.json"),
    JSON.stringify(urlMap, null, 2)
  );
  console.log("\n✅ Cloudinary upload complete. URL map saved to uploads-cloudinary-map.json");

  // Step 2: Connect to MongoDB and update documents
  console.log("\nConnecting to MongoDB to update image URLs...");
  await mongoose.connect(process.env.Connection_String);
  console.log("✓ MongoDB connected\n");

  const { productUpdated, oldProductUpdated } = await updateDB(urlMap);

  console.log(`\n✅ Database update complete!`);
  console.log(`   Products updated    : ${productUpdated}`);
  console.log(`   OldProducts updated : ${oldProductUpdated}`);

  await mongoose.disconnect();
  console.log("✓ MongoDB disconnected. Done!\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
