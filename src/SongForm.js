import React, { useState, useEffect } from 'react';

function SongForm({ onSubmit, onClose, initialData }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setArtist(initialData.artist);
    } else {
      setTitle('');
      setArtist('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !artist.trim()) return;
    const song = initialData ? { ...initialData, title, artist } : { title, artist };
    onSubmit(song);
  };

  return (
    <div className="modal">
      <form className="song-form" onSubmit={handleSubmit}>
        <h2>{initialData ? 'Edit Song' : 'Add Song'}</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Artist:
          <input
            type="text"
            value={artist}
            onChange={e => setArtist(e.target.value)}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="save-btn">{initialData ? 'Update' : 'Add'}</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default SongForm; 