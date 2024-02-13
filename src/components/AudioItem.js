import { Link } from "react-router-dom"
import { useState } from "react"
import AudioManage from "./AudioManage"

export function AudioItem({ songName, artistName, fileName, _id, deleteAudio, userId, uploaderId }) {
    const [show, setShow] = useState(false)

    if (userId == uploaderId) {
        return (
            <div className="audio">
                <Link to={"/audio/" + _id}><h3>{songName} - {artistName}</h3></Link>
                <audio src={"//localhost:3001/" + fileName} controls controlsList="nodownload"></audio>
                <button onClick={() => {setShow(!show)}}>Manage</button>
                {show ? <AudioManage songName={songName} artistName={artistName} deleteAudio={deleteAudio} _id={_id} /> : null}
            </div>
        )
    } else {
        return (
            <div className="audio">
                <Link to={"/audio/" + _id}>
                    <h3>{songName}</h3>
                    <h4>{artistName}</h4>
                </Link>
                <audio src={"//localhost:3001/" + fileName} controls controlsList="nodownload"></audio>
            </div>
        )
    }
}