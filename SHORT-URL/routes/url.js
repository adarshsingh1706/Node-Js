const express = require("express");
const router = express.Router();
const {handleGenerateNewShortURl} = require("../controllers/url")


router.post("/",handleGenerateNewShortURl );

module.exports = router;
