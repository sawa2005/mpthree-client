export function NewAudioForm({ userId }) {
    return (
        <div>
            <h2>upload</h2>
            <form className="form" action="/api/post" method="post" encType="multipart/form-data">
                <input id="mp3" name="mp3" type="file" accept=".mp3" required/>
                <input id="image" name="image" type="file" accept="image/png, image/jpeg"/>
                <input id="songName" name="songName" type="text" placeholder="Song Name" required/>
                <input id="artistName" name="artistName" type="text" placeholder="Artist Name" required/>
                <input id="uploaderId" name="uploaderId" type="hidden" value={userId} required />
                <input className="btn" type="submit" value="Upload File" />
            </form>
        </div>
    ) 
}