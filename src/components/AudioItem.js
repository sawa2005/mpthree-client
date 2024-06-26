import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import AudioManage from "./AudioManage"
import AudioControls from "./AudioControls"
import ProgressBar from "./ProgressBar"

export function AudioItem({ songName, artistName, path, _id, deleteAudio, userId, uploaderId, imagePath }) {
    const [showManage, setShowManage] = useState(false)
    const [timeElapsed, setTimeElapsed] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef()
    const progressRef = useRef()

    // Sets audio duration once it loads
    function onLoadedMetadata() {
        const seconds = audioRef.current.duration
        setDuration(seconds)
        progressRef.current.max = seconds
    }
    
    return (
        <div className="audio-wrap">
            <div className="audio">
                <img className="audio-img" src={imagePath} alt={songName + " Cover Image"} />
                <div className="audio-main">
                    <div className="audio-top">
                        <Link to={"/audio/" + _id}>
                            <h3>{songName}</h3>
                            <h4>{artistName}</h4>
                        </Link>
                        <AudioControls audioRef={audioRef} progressRef={progressRef} duration={duration} setTimeElapsed={setTimeElapsed} userId={userId} uploaderId={uploaderId} showManage={showManage} setShowManage={setShowManage} />
                    </div>
                    <ProgressBar progressRef={progressRef} audioRef={audioRef} timeElapsed={timeElapsed} duration={duration} />
                </div>
                <audio src={path} ref={audioRef} onLoadedMetadata={onLoadedMetadata}></audio>
            </div>
            { /* Shows audio manage based on state variable */ }
            {showManage ? <AudioManage songName={songName} artistName={artistName} deleteAudio={deleteAudio} _id={_id} /> : null}
        </div>
    )
}