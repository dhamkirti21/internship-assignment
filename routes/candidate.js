const { addCandidate } = require("../controllers/candidate");
const upload = require("../multer.js");
const express = require("express");

const router = express.Router();

router.post('/', upload.single('excelFile'), addCandidate);
  
module.exports = router