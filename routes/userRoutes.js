const express = require("express");
const path = require("path");
const multer = require("multer");

const {
  registerUser,
  getUser,
  authUser,
} = require("../controllers/userController"); // Corrected typo
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/", getUser);
router.post("/", upload.single("pic"), registerUser);
router.post("/login", authUser);

module.exports = router;
