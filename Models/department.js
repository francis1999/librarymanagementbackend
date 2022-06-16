const { Schema, model } = require("mongoose");
module.exports.Department = model('Department', Schema({
    Departmentname: { type: String, required: true, unique: true },
    Departmenticonimage: { type: String },
    cloudinary_id: { type: String }
}, { timestamps: true }));