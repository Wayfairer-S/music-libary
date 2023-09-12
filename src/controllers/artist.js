const createArtist = async (req, res) => {
  const { name, genre } = req.body;
  res.sendStatus(201);
};

module.exports = { createArtist };
