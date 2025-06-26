import React from 'react';

function SongList({ songs, onEdit, onDelete }) {
  return (
    <div className="song-list">
      {songs.length === 0 ? (
        <p className="empty">No songs added yet.</p>
      ) : (
        <ul>
          {songs.map(song => (
            <li key={song.id} className="song-item">
              <span className="song-title">{song.title}</span> - <span className="song-artist">{song.artist}</span>
              <button className="edit-btn" onClick={() => onEdit(song)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(song.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongList; 