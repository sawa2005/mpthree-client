export function NewAudioForm({ userId }) {
    return (
        <form action="/api/post" method="post" encType="multipart/form-data">
            <label htmlFor="file">mp3 file: </label>
            <input id="file" name="mp3" type="file" accept=".mp3" required/><br />
            <label htmlFor="songName">song name: </label>
            <input id="songName" name="songName" type="text" required/><br />
            <label htmlFor="artistName">artist name: </label>
            <input id="artistName" name="artistName" type="text" required/><br />
            <input id="uploaderId" name="uploaderId" type="hidden" value={userId} required />
            <input type="submit" value="Upload" />
        </form>
    ) 
}