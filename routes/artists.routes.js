const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();


const LASTFM_API_KEY = process.env.VITE_LASTFM_API_KEY;

// Ruta para buscar artistas
router.get('/search', async (req, res) => {
  const { artist } = req.query;

  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${LASTFM_API_KEY}&format=json`;


  try {
    const response = await axios.get(url);
    const artists = response.data.results.artistmatches.artist;
    res.json(artists);
  } catch (error) {
    console.error("Error fetching artists from Last.fm:", error);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});

// Ruta para obtener artistas populares
router.get('/popular', async (req, res) => {
  const url = `https://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=${LASTFM_API_KEY}&format=json`;

  try {
    const response = await axios.get(url);
    const artists = response.data.artists.artist;
    res.json(artists);
  } catch (error) {
    console.error("Error fetching top artists from Last.fm:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch top artists" });
  }
});





module.exports = router;
