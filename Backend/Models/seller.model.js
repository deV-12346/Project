const {Schema,model} = require("mongoose");
const bcrypt = require("bcryptjs");

const SellerSchema = new Schema({
    sellername: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileno:{
        type: Number,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    });
    
    SellerSchema.pre("save", async function (next) {
        if (!this.isModified("password")) return next(); // Only hash if password is new/modified
    
        try {
            const salt = await bcrypt.genSalt(2); // Generate salt
            this.password = await bcrypt.hash(this.password, salt); // Hash password
            next();
        } catch (err) {
            next(err);
        }
    });
    SellerSchema.methods.comparePassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    };
    
    module.exports=model("Seller",SellerSchema,"Seller_data")