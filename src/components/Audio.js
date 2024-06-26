import { React, useEffect, useState } from 'react'
import { Helmet } from  'react-helmet-async'
import { Link, useParams } from 'react-router-dom'

export default function Audio() {
    const { _id } = useParams();
    const [audio, setAudio] = useState({});

    // Fetch audio data when id value changes
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-one/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                setAudio(data)
                console.log(data);
            });
    }, [_id])

    return (
        <div className='main'>
            <Helmet>
                <title>{`${audio.songName} - mpthree`}</title>
            </Helmet>
            <div>
                <h1>audio details</h1>
                <Link className="btn" to="/">Return Home</Link>
            </div>
            <div className='audio-detail'>
                <img className="audio-img" src={audio.imagePath} alt={audio.songName + " Cover Image"} />
                <audio src={audio.path} controls controlsList="nodownload"></audio>
                <p>Path: {audio.path}</p>
                <p>File Name: {audio.fileName}</p>
                <p>Song Name: {audio.songName}</p>
                <p>Artist Name: {audio.artistName}</p>
                <p>Upload Date: {audio.uploadDate}</p>
                <p>Image Path: {audio.imagePath}</p>
                <p>Image Name: {audio.imageName}</p>
            </div>
        </div>
    ) 
}
