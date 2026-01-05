var express = require("express");
var exe = require("./../mysql_connection");
var router = express.Router();

router.get("/", function(req, res) {
     res.render("common/home.ejs");
});

router.get("/company_login",function(req,res){
     res.render("common/company_login.ejs");
});

router.get("/company_register",function(req,res){
     res.render("common/company_register.ejs");
});

router.get("/save_company",function(req,res){
     res.send(req.body)
});

router.post("/save_company",async function(req,res){
     try{
     var d = req.body;
     var sql =`INSERT INTO company (company_name , company_location, hr_name, hr_designation, hr_mobile ,
          hr_email, hr_password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
         var result = await exe(sql,[d.company_name , d.company_location, d.hr_name, d.hr_designation, d.hr_mobile ,
          d.hr_email, d.hr_password]); 
     res.send(result);
         }catch(err){
           res.send("Email Id Already Exists");
         }
});

router.post("/company_login_process", async function(req,res){
     var d = req.body;
     var sql = `SELECT * FROM company WHERE hr_email = ? AND hr_password = ?`;
     var result = await exe(sql,[d.hr_email, d.hr_password]);
     if(result.length > 0){
         req.session.company_id = result[0].company_id;
           res.redirect("company/");
          
     }else{
          res.send("Logib Failed");
     }
});

router.get("/register", function(req,res){
     res.render("common/register.ejs");
});

router.post("/save_employee",async function (req,res) {
     try{
     var d = req.body;
     var sql = `INSERT INTO employee (employee_name, employee_email, employee_mobile, employee_password) VALUES (?, ?, ?, ?)`;
     var result = await exe(sql, [d.employee_name, d.employee_email, d.employee_mobile, d.employee_password]);
     // res.redirect("/employee");
     // res.send(result);
     res.redirect("/login");
     }catch(err){
          res.send("Account Already Exists");
     }
});

router.get("/login", function(req,res){
     res.render("common/login.ejs");
});

router.post("/login_process",async function (req,res) {
     var d = req.body;
     var sql = `SELECT * FROM employee WHERE employee_email = ? AND employee_password = ?`;
     var result = await exe(sql, [d.employee_email, d.employee_password]);
     if(result.length > 0){
          req.session.employee_id = result[0].employee_id;
          res.redirect("/employee");
     }else{
         res.send("Login Failed")
     }
     
});

module.exports = router;