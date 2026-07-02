const Application = require("../models/Interview");

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Submit a new job application
// @route   POST /api/applications
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const createApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({
      success: true,
      message: "Application submitted successfully! 🎉",
      data: application,
    });
  } catch (error) {
    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An application with this email already exists.",
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get all applications (with optional filters)
// @route   GET /api/applications
// @access  Private (Admin)
// ─────────────────────────────────────────────────────────────────────────────
const getAllApplications = async (req, res) => {
  try {
    const {
      status,
      department,
      jobLevel,
      workMode,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    if (status) filter.applicationStatus = status;
    if (department) filter["workExperience.applyingForDepartment"] = department;
    if (jobLevel) filter["workExperience.jobLevel"] = jobLevel;
    if (workMode) filter["preferences.preferredWorkMode"] = workMode;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Application.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Get a single application by ID
// @route   GET /api/applications/:id
// @access  Private (Admin)
// ─────────────────────────────────────────────────────────────────────────────
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Update an application (e.g. update status by HR)
// @route   PUT /api/applications/:id
// @access  Private (Admin)
// ─────────────────────────────────────────────────────────────────────────────
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @desc    Delete an application
// @route   DELETE /api/applications/:id
// @access  Private (Admin)
// ─────────────────────────────────────────────────────────────────────────────
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
