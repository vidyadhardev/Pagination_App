// const mongoose = require('mongoose');
// const UserSchema =new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: Number,
//     age: Number,
//     active:String

// });
//  const UserModel=mongoose.model("users",UserSchema)
//  module.exports=UserModel

// ============================================================

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression to check email validity
                const emailVailedationCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailVailedationCheck.test(value);
            },
            message: 'Please provide a valid email address.',
        },
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required.'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
        min: [17, 'Age must be at least 17.'],
        max: [140, 'Age cannot exceed 140.'],
    },
    active: 
    {
        type: Boolean,
        enum: [ true, false],
        
    },
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;

