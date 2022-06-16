const router = require('express').Router();
const {editcourse,addcourse,getcoursebydepartmentid,getcoursebyid,getallcourse,deletecourse/* deletecategory,getcategorybyid,getallcategory,editCategory */} = require("../Controllers/subcategoryController");
const upload=require("../utils/multer")
const { verifyToken,verifyTokenwithAuthorization, verifyTokenwithAdmin} = require("../Middlewares/verifyToken");

router.post('/addcourse',verifyTokenwithAdmin,upload.single("courseiconimage"), addcourse);
router.get('/getcoursebydepartmentid/:categoryid',verifyTokenwithAuthorization, getcoursebydepartmentid);
router.get('/getcoursebyid/:id',verifyTokenwithAuthorization, getcoursebyid);
router.get('/getallcourse',verifyTokenwithAuthorization, getallcourse);
router.delete('/deletecourse/:id',verifyTokenwithAdmin, deletecourse);
router.put('/editcourse/:id',verifyTokenwithAdmin,upload.single("courseiconimage"), editcourse);
/* 

router.get('/editcourse/:id',verifyTokenwithAuthorization, editsubCategory);
 */






module.exports = router;
