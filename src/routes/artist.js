const { createArtist } = require("../controllers/artist");
const express = require("express");
const app = require("../app");

const artistRouter = express.Router();

artistRouter.post("/", createArtist);

module.exports = { artistRouter };
