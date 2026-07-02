const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    // ── Section 1: Personal Information ──────────────────────────────────────
    firstName: {
      type: String,
      // required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      // required: [true, "Date of birth is required"],
    },
    nationality: {
      type: String,
      // required: [true, "Nationality is required"],
      trim: true,
    },
    gender: {
      type: String,
      // required: [true, "Gender is required"],
      enum: ["Male", "Female", "Non-binary", "Prefer not to say"],
    },
    city: {
      type: String,
      // required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      // required: [true, "Country is required"],
      trim: true,
    },
    linkedInUrl: {
      type: String,
      trim: true,
    },
    portfolioOrGithubUrl: {
      type: String,
      trim: true,
    },

    // ── Section 2: Educational Background ────────────────────────────────────
    degreeType: {
      type: String,
      // required: [true, "Degree type is required"],
      // enum: ["High School", "Diploma", "Bachelor's", "Master's", "MBA", "PhD", "Other"],
    },
    fieldOfStudy: {
      type: String,
      // required: [true, "Field of study is required"],
      // trim: true,
    },
    university: {
      type: String,
      // required: [true, "University / Institution is required"],
      // trim: true,
    },
    graduationYear: {
      type: Number,
      // required: [true, "Graduation year is required"],
    },
    cgpaOrPercentage: {
      type: String,
      // required: [true, "CGPA / Percentage is required"],
      trim: true,
    },
    certifications: {
      type: String,
      trim: true,
    },

    // ── Section 3: Work Experience ────────────────────────────────────────────
    totalYearsOfExperience: {
      type: Number,
      // required: [true, "Total years of experience is required"],
      min: 0,
      max: 30,
      default: 0,
    },
    currentCompany: {
      type: String,
      // required: [true, "Current / Last company is required"],
      trim: true,
    },
    currentRole: {
      type: String,
      //  required: [true, "Current / Last role is required"],
      trim: true,
    },
    currentCTC: {
      type: String,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Other"],
    },
    applyingForDepartment: {
      type: String,
      // required: [true, "Applying for department is required"],
      // enum: [
      //   "Software Engineering", "Data Science", "Product Management",
      //   "Design", "Marketing", "Sales", "HR", "Finance", "Operations", "Other",
      // ],
    },
    jobLevel: {
      type: String,
      // required: [true, "Job level is required"],
      // enum: ["Fresher", "Junior", "Mid Level", "Senior", "Lead", "Manager", "Director", "VP", "C-Suite"],
    },
    workSummaryBio: {
      type: String,
      trim: true,
    },

    // ── Section 4: Skills & Expertise ─────────────────────────────────────────
    technicalSkills: {
      type: [String],
      // required: [true, "At least one technical skill is required"],
    },
    softSkills: {
      type: [String],
      default: [],
    },
    toolsAndPlatforms: {
      type: [String],
      default: [],
    },

    // ── Section 5: Preferences ─────────────────────────────────────────────────
    preferredWorkMode: {
      type: String,
      // required: [true, "Preferred work mode is required"],
      enum: ["On-site", "Remote", "Hybrid"],
    },
    shiftPreference: {
      type: String,
      // enum: ["Day Shift", "Evening Shift", "Night Shift", "Flexible"],
    },
    noticePeriod: {
      type: String,
      // required: [true, "Notice period is required"],
      enum: ["Immediate", "15 Days", "1 Month", "2 Months", "3 Months", "More than 3 Months"],
    },
    expectedCTC: {
      type: String,
      // required: [true, "Expected CTC / Salary is required"],
      trim: true,
    },
    willingToRelocate: {
      type: String,
      required: [true, "Willing to relocate is required"],
      // enum: [
      //   "Yes, immediately",
      //   "Yes, with 1-3 months notice",
      //   "No, not willing to relocate",
      // ],
    },
    howDidYouHearAboutUs: {
      type: String,
      // enum: ["LinkedIn", "Job Portal", "Company Website", "Referral", "Social Media", "Campus Placement", "Other"],
    },
    whyDoYouWantToJoinUs: {
      type: String,
      trim: true,
    },

    // ── Meta ──────────────────────────────────────────────────────────────────
    resumeUrl: {
      type: String,
      trim: true,
    },
    applicationStatus: {
      type: String,
      // enum: ["Submitted", "Under Review", "Shortlisted", "Rejected", "Hired"],
      // default: "Submitted",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt auto-added
    }
);

module.exports = mongoose.model("Application", ApplicationSchema);
