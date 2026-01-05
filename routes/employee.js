var express = require("express");
var exe = require("./../mysql_connection");
var router = express.Router();

function verify_login(req,res,next){
    if(req.session.employee_id){
        next();
    }else{
        res.redirect("/login");
    }
}
router.use(verify_login);

router.get("/", async function(req, res){
   
    var sql = `SELECT * FROM employee WHERE employee_id = ?`;
    var employee = await exe(sql, [req.session.employee_id]);
    var packet ={employee}
    res.render("employee/home.ejs", packet);
});

// http://localhost:1000/employee/profile
router.get("/profile", function(req, res) {
    res.send("Employee Profile Page Open");
});

module.exports = router;