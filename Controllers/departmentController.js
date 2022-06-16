const { StatusCodes } = require("http-status-codes");
const { Department } = require("../Models/department");
const cloudinary=require("../utils/cloudinary")






// ADD DEPARTMENT
module.exports.adddepartment = async (req, res) => {
    const {Departmentname}=req.body
    if(Departmentname==''){
        res.status(StatusCodes.BAD_REQUEST).json({
            status:"Failed",
            message:"Empty Field Not Accepted"
        })
    }else{
        const Departmentfind=await Department.findOne({Departmentname})
         if(Departmentfind){
             res.status(500).json({
                 status:"Failed",
                 message:"Department Exist"
             })
         }else{
             try{
                 const result=await cloudinary.uploader.upload(req.file.path)
                 const data= await new Department({
                    Departmenticonimage:result.secure_url,
                    Departmentname: req.body.Departmentname,  
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


//Edit DEPARTMENT code

module.exports.editDepartment = async (req, res) => {
   
    try {
        let updateid = await Department.findById(req.params.id);
       
        if(updateid){
            await cloudinary.uploader.destroy(updateid.cloudinary_id);
            const result=await cloudinary.uploader.upload(req.file.path);
       console.log(updateid)
        const data={

            Departmenticonimage:result.secure_url || updateid.Departmenticonimage,
            Departmentname: req.body.Departmentname || updateid.Departmentname,
            cloudinary_id:result.public_id || updateid.cloudinary_id
        };
        departmentdetails=await Department.findByIdAndUpdate(req.params.id, data, {new:true})
        res.status(StatusCodes.OK).json({
            message:"Department profile updated successfuly",
            code:StatusCodes.OK,
            data:departmentdetails
        })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({
                code:StatusCodes.BAD_REQUEST,
                status:"failed",
                message:"Invalid Department ID",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


//DELETE
module.exports.deletedepartment = async (req, res) => {
    try {
        const departmentid=await Department.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Department Deleted Successfully" })
    } catch (err) {
        res.status(500).json({ error: "Something Went Wrong" })
    }
};

//GET SINGLE Department BY USERS AND ADMIN
module.exports.getdepartbyid =  async (req, res) => {
    try {
        const singleDepartment = await Department.findById(req.params.id)
        if(singleDepartment){
            res.status(StatusCodes.OK).json({
                message: "success",
                data: singleDepartment
            })
        }else{
            res.status(StatusCodes.BAD_REQUEST).json({
                status: "Failed",
                message: "Invalid Department ID"
            })
        }
        

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

//GET ALL DEPARTMENT
module.exports.getalldepartment =  async (req, res) => {
    try {
        const data = await Department.find();
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