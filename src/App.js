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
        <form action="/api/post" method="post" enctype="multipart/form-data">
          <label for="file">file: </label>
          <input id="file" name="mp3" type="file" /><br />
          <label for="songName">song name: </label>
          <input id="songName" name="songName" type="text" /><br />
          <label for="artistName">artist name: </label>
          <input id="artistName" name="artistName" type="text" /><br />
          <label for="duration">duration (delete this later): </label>
          <input id="duration" name="duration" type="text" /><br />
          <input type="submit" value="Upload" />
        </form>
        <h2>Uploaded mpthrees</h2>
        {audios.map(audio => {
          return <div>
            <h3>{audio.songName} - {audio.artistName}</h3>
            <audio src={"//localhost:3001/" + audio.fileName} controls controlsList="nodownload"></audio>
            <button onClick={() => {
              fetch("//localhost:3001/api/delete/" + audio._id, { method: 'DELETE' })
                .then(response => response.text())
                .catch(error => {
                  console.error(error);
                });
              }}>Delete</button>
          </div>
        })}
      </header>
    </div>
  );
}

export default App;
