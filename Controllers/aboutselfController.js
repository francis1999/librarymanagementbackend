const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const asyncRapper=require("../Middlewares/asyncRapper")
const Aboutself=require("../Models/aboutSelfModel")
const {StatusCodes}=require("http-status-codes");
const _ = require("lodash");



module.exports.AddAboutme = async (req, res) => {
    const {firstname,lastname,emmergencyphonenumber,weight,age,bloodgroup} = req.body
    const usersid=req.user.id
    try{
            if (firstname == '' || lastname == '' || emmergencyphonenumber == '' || weight == '' || bloodgroup=='' || age=='') {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    status: "Failed",
                    message: "Empty Input Fields!"
                })
            }else{
            const checkuserID= await Aboutself.findOne({userId:req.user.id})
             if(checkuserID){
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    {
                        code:500,
                        message: "User About Already Exist"
                    }
                );
             }else{          
                    const data = new Aboutself({
                        firstname,
                        lastname,
                        emmergencyphonenumber,
                        age,
                        weight,
                        bloodgroup,
                        userId:req.user.id
                     
                    });
                sendData=data.save()
                if(sendData){
                    res.status(StatusCodes.CREATED).json({
                        code:StatusCodes.CREATED,
                        Status: "success",
                        message: "About Me Added",
                        data   
                    })
                }
             
             }
            }

        }
            catch(error){
                console.log(error)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error  
                })
            }
        }
           