import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongList from './SongList';
import SongForm from './SongForm';
import './App.css';

const API_URL = 'https://musicplayer-272j.onrender.com/api/songs';

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSong, setEditingSong] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(API_URL);
        setSongs(res.data);
      } catch (err) {
        setError('Failed to load songs.');
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const addSong = async (song) => {
    try {
      const res = await axios.post(API_URL, song);
      setSongs([...songs, res.data]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add song.');
    }
  };

  const updateSong = async (updatedSong) => {
    try {
      const res = await axios.put(`${API_URL}/${updatedSong._id || updatedSong.id}`, updatedSong);
      setSongs(songs.map(song => (song._id === res.data._id ? res.data : song)));
      setEditingSong(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update song.');
    }
  };

  const deleteSong = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSongs(songs.filter(song => song._id !== id));
    } catch (err) {
      setError('Failed to delete song.');
    }
  };

  const startEdit = (song) => {
    setEditingSong(song);
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingSong(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSong(null);
  };

  return (
    <div className="app-container">
      <h1>🎵 Music Player</h1>
      <button className="add-btn" onClick={startAdd}>Add Song</button>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading songs...</div>
      ) : (
        <SongList songs={songs} onEdit={startEdit} onDelete={deleteSong} />
      )}
      {showForm && (
        <SongForm
          onSubmit={editingSong ? updateSong : addSong}
          onClose={closeForm}
          initialData={editingSong}
        />
      )}
    </div>
  );
}

export default App;
