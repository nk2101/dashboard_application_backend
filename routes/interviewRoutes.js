const express = require("express");
const router = express.Router();
const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../controllers/interviewController");

// POST   /api/applications        → Submit new application (from React form)
// GET    /api/applications        → Get all (supports ?status=&department=&jobLevel=&workMode=&page=&limit=)
router.route("/").post(createApplication).get(getAllApplications);

// GET    /api/applications/:id    → Get single application
// PUT    /api/applications/:id    → Update application (e.g. HR changes status)
// DELETE /api/applications/:id    → Delete application
router
  .route("/:id")
  .get(getApplicationById)
  .put(updateApplication)
  .delete(deleteApplication);

module.exports = router;
