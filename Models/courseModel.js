const mongoose=require("mongoose");


const CourseSchema=mongoose.Schema({
    coursename:{type:String,required:true},
    courseiconimage:{type:String,required:true},
    cloudinary_id:{type:String},
    departmentid:{type: mongoose.Schema.Types.ObjectId, ref: 'Department', index: true,required:true}
})
module.exports=mongoose.model("Course",CourseSchema);