import React from "react";
import { useEffect, useState } from "react"
import logo from './logo.svg';
import './App.css';
import { NewAudioForm } from "./NewAudioForm";
import { AudioList } from "./AudioList";

function App() {
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    fetch("/api/get-all")
      .then((res) => res.json())
      .then((data) => {
        setAudios(data);
      });
  }, []);

  function deleteAudio(id) {
    setAudios(currentAudios => {
      return currentAudios.filter(audio => audio._id !== id)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>mpthree</h1>
        <NewAudioForm />
        <h2>Uploaded mpthrees</h2>
        <AudioList audios={audios} deleteAudio={deleteAudio} />
      </header>
    </div>
  );
}

export default App;
