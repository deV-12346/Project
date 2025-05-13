const {Schema,model} = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileno:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
    },
    
    role: { 
        type: String,
        enum: ["admin", "user"], default: "user"
     },
    });
     userSchema.pre("save", async function (next) {
            if (!this.isModified("password")) return next(); // Only hash if password is new/modified
        
            try {
                const salt = await bcrypt.genSalt(2); // Generate salt
                this.password = await bcrypt.hash(this.password, salt); // Hash password
                next();
            } catch (err) {
                next(err);
            }
        });
        userSchema.methods.comparePassword = async function (enteredPassword) {
            return await bcrypt.compare(enteredPassword, this.password);
        };
    
module.exports=model("User",userSchema,"users_data")