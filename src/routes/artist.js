const { createArtist } = require("../controllers/artist");
const express = require("express");
const artistController = require("../controllers/artist");
// eslint-disable-next-line no-unused-vars
const app = require("../app");

const artistRouter = express.Router();
const readRouter = express.Router();

artistRouter.post("/", createArtist);

artistRouter.get("/", artistController.getAllArtists);

artistRouter.get("/:id", artistController.getArtistById);

artistRouter.patch("/:artistId", artistController.updateArtist);

artistRouter.delete("/:artistId", artistController.deleteArtist);

module.exports = { artistRouter, readRouter };
