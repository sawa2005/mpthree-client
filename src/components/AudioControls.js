import { useRef, useState, useEffect, useCallback } from 'react'

// Icon imports
import { FiPlay, FiPause, FiEdit } from "react-icons/fi"
import VolumeIcon from './VolumeIcon'
import { IconContext } from 'react-icons'

export default function AudioControls({ progressRef, audioRef, setTimeElapsed, duration, userId, uploaderId, showManage, setShowManage }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(70)
    const [show, setShow] = useState(false)

    const playAnimationRef = useRef()

    // Animates audio slider and timer
    const repeat = useCallback(async () => {
        await new Promise((resolve) => {
            if (audioRef.current) {
                resolve()
            }
        })

        const currentTime = audioRef.current.currentTime
        setTimeElapsed(currentTime)

        progressRef.current.value = currentTime
        progressRef.current.style.setProperty(
            '--range-progress',
            `${(progressRef.current.value / duration) * 100}%`
        )

        playAnimationRef.current = requestAnimationFrame(repeat)
    }, [audioRef, duration, progressRef, setTimeElapsed])

    // Toggles audio playing status
    function togglePlayPause() {
        setIsPlaying((prev) => !prev)
    }

    // Play/pause based on status
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play()
            playAnimationRef.current = requestAnimationFrame(repeat)
        } else {
            audioRef.current.pause()
            playAnimationRef.current = requestAnimationFrame(repeat)
        }
    }, [isPlaying, audioRef, repeat])

    // Sets volume to volume slider value
    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100
        }
    }, [volume, audioRef])
    
    return (
        <div className='controls'>
            <IconContext.Provider value={{ size: 24, className: "react-icons" }}>
                { /* If user uploaded the audio, show edit button */ }
                { userId === uploaderId ?
                    <div className='edit'>
                        <button type="button" onClick={() => {setShowManage(!showManage)}}>
                            <FiEdit />
                        </button>
                    </div> : null
                }
                <div className='volume'>
                    { /* Shows volume slider on button click */ }
                    <button onClick={() => {setShow(!show)}}><VolumeIcon volume={volume} /></button>
                    { show ? <div className='volume-slider'><input type='range' min={0} max={100} value={volume} onChange={(e) => { setVolume(e.target.value)}} /></div> : null }
                </div>
                { /* Toggles play/pause button icon based on status */ }
                <button onClick={togglePlayPause} className='play'>
                    {isPlaying ? <FiPause /> : <FiPlay />}
                </button>
            </IconContext.Provider>
        </div>
    )
}
