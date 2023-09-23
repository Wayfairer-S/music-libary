const db = require("../db/index.js");

const createArtist = async (req, res) => {
  const { name, genre } = req.body;
  try {
    const {
      rows: [artist],
    } = await db.query(
      `INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *`,
      [name, genre]
    );
    res.status(201).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAllArtists = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM Artists");
    res.status(201).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [artist],
    } = await db.query("SELECT * FROM Artists WHERE id = $1", [id]);

    if (!artist) {
      return res.status(404).json({ message: `artist ${id} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateArtist = async (req, res) => {
  const { artistId } = req.params;
  const { name, genre } = req.body;

  let query, params;

  if (name && genre) {
    query = `UPDATE Artists SET name = $1, genre = $2 WHERE id = $3 RETURNING *`;
    params = [name, genre, artistId];
  } else if (name) {
    query = `UPDATE Artists SET name = $1 WHERE id = $2 RETURNING *`;
    params = [name, artistId];
  } else if (genre) {
    query = `UPDATE Artists SET genre = $1 WHERE id = $2 RETURNING *`;
    params = [genre, artistId];
  }

  try {
    const {
      rows: [artist],
    } = await db.query(query, params);

    if (!artist) {
      return res
        .status(404)
        .json({ message: `artist ${artistId} does not exist` });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const deleteArtist = async (req, res) => {
  const db = await db.query();
  const { artistId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      "DELETE FROM Artist WHERE id = ?",
      [artistId]
    );

    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.status(200).json(affectedRows);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  createArtist,
  getAllArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
};
