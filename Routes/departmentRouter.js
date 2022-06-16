const router = require('express').Router();
const { adddepartment,deletedepartment,getdepartbyid,getalldepartment,editDepartment} = require("../Controllers/departmentController");
const upload=require("../utils/multer")
const { verifyToken,verifyTokenwithAuthorization, verifyTokenwithAdmin} = require("../Middlewares/verifyToken");

router.post('/adddepartment',verifyTokenwithAdmin,upload.single("Departmenticonimage"), adddepartment);
router.put('/editDepartment/:id',verifyTokenwithAdmin,upload.single("Departmenticonimage"), editDepartment);
router.delete('/deletedepartment/:id',verifyTokenwithAdmin, deletedepartment);
router.get('/getdepartbyid/:id',verifyTokenwithAuthorization, getdepartbyid);
router.get('/getalldepartment',verifyTokenwithAuthorization, getalldepartment);






module.exports = router;
