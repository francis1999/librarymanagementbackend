const { StatusCodes } = require("http-status-codes");
const Course  = require("../Models/courseModel");
const cloudinary=require("../utils/cloudinary")


module.exports.addcourse = async (req, res) => {
    const {coursename,departmentid}=req.body
    if(coursename=='' || departmentid==''){
        res.status(StatusCodes.BAD_REQUEST).json({
            status:"Failed",
            message:"Empty Field Not Accepted"
        })
    }else{
        const coursefind=await Course.findOne({coursename})
         if(coursefind){
             res.status(500).json({
                 status:"Failed",
                 message:"Course Exist"
             })
         }else{
             try{
                 const result=await cloudinary.uploader.upload(req.file.path)
                 const data= await new Course({
                    courseiconimage:result.secure_url,
                    coursename: req.body.coursename,  
                    departmentid: req.body.departmentid,  
                    cloudinary_id:result.public_id
                 })
                     await data.save()
                     res.status(StatusCodes.CREATED).json({
                         status:"Success",
                         data,
                         
                     })  
                }
                catch(error){
                 console.log(error)
                 res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                     status:"Failed",
                     message:"Oops!!! Error Occurs"
                 })
                } 
             }
    }
}


//Edit COURSE code

module.exports.editcourse = async (req, res) => {
   
    try {
        let updateid = await Course.findById(req.params.id);
       
        if(updateid){
            await cloudinary.uploader.destroy(updateid.cloudinary_id);
            const result=await cloudinary.uploader.upload(req.file.path);
       console.log(updateid)
        const data={
            courseiconimage:result.secure_url || updateid.courseiconimage,
            departmentid:req.body.departmentid || updateid.departmentid,
            coursename: req.body.coursename || updateid.coursename,
            cloudinary_id:result.public_id || updateid.cloudinary_id
        };
        coursedetails=await Course.findByIdAndUpdate(req.params.id, data, {new:true})
        res.status(StatusCodes.OK).json({
            message:"Course updated successfuly",
            code:StatusCodes.OK,
            data:coursedetails
        })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({
                code:StatusCodes.BAD_REQUEST,
                status:"failed",
                message:"Invalid Sub Course ID",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


//DELETE
module.exports.deletecourse = async (req, res) => {
    try {
        const courseid=await Course.findByIdAndDelete(req.params.id)
        if(courseid){
            res.status(StatusCodes.OK).json({ message: "Course Deleted Successfully"})
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Sub Course ID"})
        }
        
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Something Went Wrong" })
    }
};

//GET SINGLE COUSRSE BY USERS AND ADMIN
module.exports.getcoursebyid =  async (req, res) => {
    try {
        const singlecourse = await Course.findById(req.params.id)
        .populate("departmentid")
        if(singlecourse){
            res.status(StatusCodes.OK).json({
                message: "success",
                data: singlecourse
            })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({
                status: "Failed",
                message: "Invalid Course ID"
            })
        }
        

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}
module.exports.getcoursebydepartmentid =  async (req, res) => {
    const ids=req.params.departmentid
    //const params=req.params.id
    try {
        const singlecourse = await Course.find({departmentid:ids})
        .populate("departmentid")
        if(singlecourse){
            res.status(StatusCodes.OK).json({
                message: "success",
                data: singlecourse
            })
        }else{
            console.log(ids)
            console.log(singlecourse)
            res.status(StatusCodes.BAD_REQUEST).json({
                status: "Failed",
                message: "Invalid Category ID"
            })
        }
        

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//GET ALL COURSES
module.exports.getallcourse =  async (req, res) => {
    try {
        const data = await Course.find()
        .populate({path:"departmentid"})
        res.status(200).json({
            message: "success",
            count:data.length,
            data: data
        });

    } catch (error) {
        res.status(500).json(error)
    }
}

/* module.exports = router */