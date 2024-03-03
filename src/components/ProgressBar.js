import React from 'react'

export default function ProgressBar({ progressRef, audioRef, timeElapsed, duration }) {
    // Updates audio time when progress bar value changes
    function handleChange() {
        audioRef.current.currentTime = progressRef.current.value
    }

    // Formats audio time into mm:ss
    function formatTime(time) {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60)
            const seconds = Math.floor(time % 60)

            const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
            const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

            return `${formatMinutes}:${formatSeconds}`
        }

        return '0:00'
    }

    return (
        <div className='progress-wrap'>
            <div className='progress-time'><span className='time current'>{formatTime(timeElapsed)}</span> / <span className='time'>{formatTime(duration)}</span></div>
            <input className='progress-bar' type='range' ref={progressRef} defaultValue='0' min={0} max={100} onChange={handleChange} />
        </div>
    )
}
