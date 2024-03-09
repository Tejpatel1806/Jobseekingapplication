const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  postJob,
  getMyJobs,
  updateJob,
  deleteJob,
  getSingleJob,
} = require("../controllers/jobController");
const { isAuthenticated } = require("../middlewares/auth");
router.get("/getall", getAllJobs);
router.get("/:id", isAuthenticated, getSingleJob);
router.post("/postjob", isAuthenticated, postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.put("/updatejobs/:id", isAuthenticated, updateJob);
router.delete("/deletejob/:id", isAuthenticated, deleteJob);
module.exports = router;
