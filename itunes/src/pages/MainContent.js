import React, { useState } from 'react';
import axios from 'axios';
import SideBar from "./SideBar.js";

import "../styles/MainContent.css";
import { BiSearch } from 'react-icons/bi';

export default function MainContent() {
  const [songs, setSongs] = useState([]);
  const [songToPlay, setSongToPlay] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // make get request to Apple Music API
  function fetchSong() {
    // entity list: musicArtist, album, song
    let url = "https://itunes.apple.com/search?term=" + searchTerm + "&limit=10&entity=song";
    axios.get(url)
      .then(result => {
        setSongs(result.data.results);
      })
      .catch(error => {
        console.error(error);
      })
  }

  // pass song prop when song clicked
  function handleClick(song) {
    setSongToPlay(song)
  }

  // fetch search term to when button clicked
  function handleSubmit(event) {
    // prevent default action of form (ex. refresh the page)
    event.preventDefault();
    fetchSong();
  }

  function cropParagraph(p) {
    let crop = "";
    if (p.length > 30) {
      crop = p.substring(0, 31) + "..."
    } else {
      crop = p;
    } return crop;
  }

  // display songs
  function displaySong(songs) {
    let result = [];
    if (songs === []) {
      result.push(
        <div>
          <p>no result</p>
        </div>
      )
    } else {
      for (let i = 0; i < songs.length; i++) {
        let song = songs[i];
        result.push(
          <div key={i} className="song" onClick={() => handleClick(song)}>
            <img src={song.artworkUrl100} alt={song.artworkUrl100} />
            <div className="song-info">
              <h1>{cropParagraph(song.trackCensoredName)}</h1>
              <p>{song.artistName}</p>
            </div>
          </div >
        )
      }
    }
    return result;
  }


  return (
    <div className="body">
      <div className="main-content">
        <div className="header">
          <h1>Explore Songs</h1>
          <form className="input"
            onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Find song"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="find" type="submit"><BiSearch className="search-icon" /></button>
          </form>
        </div>
        <div className="results">
          {displaySong(songs)}
        </div>
      </div>
      <SideBar song={songToPlay} />
    </div>
  )
} 