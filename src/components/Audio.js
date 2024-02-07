import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AudioItem } from "./AudioItem"

export default function Audio() {
    const { _id } = useParams();
    const [audio, setAudio] = useState({});

    useEffect(() => {
        fetch("/api/get-one/" + _id)
            .then((res) => res.json())
            .then((data) => {
                setAudio(data)
                console.log(data);
            });
    }, [_id])

    return (
        <header className="App-header">
            <AudioItem {...audio} key={audio._id} />
            <div>
                <h3>Audio Details</h3>
                <p>Path: {audio.path}</p>
                <p>File Name: {audio.fileName}</p>
                <p>Song Name: {audio.songName}</p>
                <p>Artist Name: {audio.artistName}</p>
                <p>Upload Date: {audio.uploadDate}</p>
            </div>
        </header>
    ) 
}
