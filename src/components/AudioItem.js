import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import AudioManage from "./AudioManage"
import AudioControls from "./AudioControls"
import ProgressBar from "./ProgressBar"

export function AudioItem({ songName, artistName, fileName, _id, deleteAudio, userId, uploaderId, imageName }) {
    const [show, setShow] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef()
    const progressRef = useRef()

    function onLoadedMetadata() {
        const seconds = audioRef.current.duration
        setDuration(seconds)
        progressRef.current.max = seconds
    }
    
    return (
        <div className="audio-wrap">
            <div className="audio">
                <img className="audio-img" src={"//localhost:3001/" + imageName} alt={songName + " Cover Image"} />
                <div className="audio-main">
                    <div className="audio-top">
                        <Link to={"/audio/" + _id}>
                            <h3>{songName}</h3>
                            <h4>{artistName}</h4>
                        </Link>
                        <AudioControls audioRef={audioRef} progressRef={progressRef} duration={duration} setTimeElapsed={setTimeElapsed} userId={userId} uploaderId={uploaderId} />
                    </div>
                    <ProgressBar progressRef={progressRef} audioRef={audioRef} timeElapsed={timeElapsed} duration={duration} />
                </div>
                <audio src={"//localhost:3001/" + fileName} ref={audioRef} onLoadedMetadata={onLoadedMetadata}></audio>
            </div>
            {show ? <AudioManage songName={songName} artistName={artistName} deleteAudio={deleteAudio} _id={_id} /> : null}
        </div>
    )
}