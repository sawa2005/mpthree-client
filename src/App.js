import React from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [audios, setAudios] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/get-all")
      .then((res) => res.json())
      .then((data) => {
        setAudios(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>mpthree</h1>
        {audios.map(audio => {
          return <div>
            <h3>{audio.songName} - {audio.artistName}</h3>
            <audio controls>
              <source src={audio.path} type="audio/mpeg"></source>
            </audio>
          </div>
        })}
      </header>
    </div>
  );
}

export default App;
