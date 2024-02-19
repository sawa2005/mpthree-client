import { Link } from "react-router-dom"
import { useState } from "react"
import AudioManage from "./AudioManage"

export function AudioItem({ songName, artistName, fileName, _id, deleteAudio, userId, uploaderId, imageName }) {
    const [show, setShow] = useState(false)

    if (userId === uploaderId) {
        return (
            <div className="audio-wrap">
                <div className="audio">
                    <img className="audio-img" src={"//localhost:3001/" + imageName} alt={songName + " Cover Image"} />
                    <div className="audio-main">
                        <div className="audio-title">
                            <Link to={"/audio/" + _id}>
                                <h3>{songName}</h3>
                                <h4>{artistName}</h4>
                            </Link>
                            <button className="btn-invis" type="button" onClick={() => {setShow(!show)}}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.2064 4.60931L16.3907 7.79359M2.41488 14.7438L15.4036 1.75407C15.9167 1.26302 16.6017 0.992401 17.3119 1.00016C18.0221 1.00792 18.7011 1.29345 19.2033 1.7956C19.7056 2.29775 19.9914 2.97661 19.9993 3.68681C20.0073 4.39701 19.7368 5.0821 19.2459 5.59538L6.25512 18.5851C5.95877 18.8815 5.58132 19.0835 5.17035 19.1657L1 20L1.83428 15.8286C1.91649 15.4176 2.11851 15.0402 2.41488 14.7438Z" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <audio src={"//localhost:3001/" + fileName} controls controlsList="nodownload"></audio>
                    </div>
                </div>
                {show ? <AudioManage songName={songName} artistName={artistName} deleteAudio={deleteAudio} _id={_id} /> : null}
            </div>
        )
    } else {
        return (
            <div className="audio-wrap">
                <div className="audio">
                    <img className="audio-img" src={"//localhost:3001/" + imageName} alt={songName + " Cover Image"} />
                    <div className="audio-main">
                        <Link to={"/audio/" + _id}>
                            <h3>{songName}</h3>
                            <h4>{artistName}</h4>
                        </Link>
                        <audio src={"//localhost:3001/" + fileName} controls controlsList="nodownload"></audio>
                    </div>
                </div>
            </div>
        )
    }
}