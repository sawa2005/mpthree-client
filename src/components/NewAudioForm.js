import { useState } from "react"

export function NewAudioForm({ userId }) {
    const [mp3, setMp3] = useState('No current file')
    const [image, setImage] = useState('No current image')

    // Sets currently selected mp3 name
    function handleMp3Change(e) {
        if (e.target.files[0] !== undefined) {
            setMp3(e.target.files[0].name)
        }
    }

    // Sets currently selected image name
    function handleImageChange(e) {
        if (e.target.files[0] !== undefined) {
            setImage(e.target.files[0].name)
        }
    }

    return (
        <div>
            <h2>upload</h2>
            <form className="form" action={`${process.env.REACT_APP_BACKEND_URL}/api/post/`} method="post" encType="multipart/form-data">
                <div className="input-wrap">
                    <label id="mp3-label" htmlFor="mp3" className="btn">Choose mp3 file</label>
                    <p>{mp3}</p>
                    <input className="file-input" id="mp3" name="mp3" type="file" accept=".mp3" onChange={handleMp3Change} required />
                </div>
                <div className="input-wrap">
                    <label id="image-label" htmlFor="image" className="btn">Choose cover image</label>
                    <p>{image}</p>
                    <input className="file-input" id="image" name="image" type="file" onChange={handleImageChange} accept="image/jpeg"/>
                </div>
                <input id="songName" name="songName" type="text" placeholder="Song Name" required/>
                <input id="artistName" name="artistName" type="text" placeholder="Artist Name" required/>
                <input id="uploaderId" name="uploaderId" type="hidden" value={userId} required />
                <input className="btn" type="submit" value="Upload File" />
            </form>
        </div>
    ) 
}