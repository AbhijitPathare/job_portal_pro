var express = require("express");
var exe = require("./../mysql_connection");
var router = express.Router();

router.get("/", function(req, res) {
     res.render("company/home.ejs");
});

router.get("/post_job", function(req, res) {
     res.render("company/post_job.ejs");
});

function verify_login(req,res,next){
     if(req.session.company_id){
          next();
     }else{
          res.redirect("/company_login")
     }
}

router.post("/save_job", verify_login, async function(req,res){
     var d = req.body; 
    var sql = `INSERT INTO jobs (company_id, job_title , job_description, job_type, experience_min,
    experience_max, skills, vacancies, reference_link) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?)`;
    var result = await exe(sql, [req.session.company_id, d.job_title, d.job_description, d.job_type,
      d.experience_min,  d.experience_max, d.skills, d.vacancies, d.reference_link ]);
      res.redirect("/company/jobs")
   
});

router.get("/jobs",verify_login,async function(req,res){
     var sql = `SELECT * FROM jobs WHERE company_id = ?`;
     var result = await exe(sql, [req.session.company_id]);
     res.render("company/jobs.ejs",{jobs:result});                                                       
})
router.get("/profile",verify_login,async function (req,res){
    var sql = `SELECT * FROM company WHERE company_id = ?`;
    var result = await exe(sql, [req.session.company_id]);
    res.render("company/profile.ejs",{company:result[0]});
})

router.get("/logout", function(req,res){
     req.session.destroy();
     res.redirect("/");
})


router.get("/edit_job/:id", verify_login, async function (req, res) {
    var job_id = req.params.id;
    var sql = `SELECT * FROM jobs WHERE job_id = ?`;
    var result = await exe(sql, [job_id]);
    res.render("company/post_job.ejs", { job: result[0] });
});

router.get("/delete_job/:id", verify_login, async function (req, res) {
    var job_id = req.params.id;
    var sql = `DELETE FROM jobs WHERE job_id = ?`;
    await exe(sql, [job_id]);
    res.redirect("/company/post_job.ejs");
});

router.get("/add_job",verify_login,async function (req,res){
    var sql = `SELECT * FROM company WHERE company_id = ?`;
    var result = await exe(sql, [req.session.company_id]);
    res.render("company/post_job.ejs",{company:result[0]});
})

module.exports = router;