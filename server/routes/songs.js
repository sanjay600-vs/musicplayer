const express = require('express');
const Song = require('../models/Song');
const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new song
router.post('/', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const song = new Song({ title, artist });
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Update song
router.put('/:id', async (req, res) => {
  try {
    const { title, artist } = req.body;
    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { title, artist },
      { new: true, runValidators: true }
    );
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Delete song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

module.exports = router; 