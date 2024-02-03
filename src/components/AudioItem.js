export function AudioItem({ songName, artistName, fileName, _id, deleteAudio}) {
    return (
        <div className="audio">
            <h3>{songName} - {artistName}</h3>
            <audio src={"//localhost:3001/" + fileName} controls controlsList="nodownload"></audio>
            <button onClick={() => {
            deleteAudio(_id);

            fetch("//localhost:3001/api/delete/" + _id, { method: 'DELETE' })
                .then(response => response.text())
                .catch(error => {
                console.error(error);
                });
            }}>Delete</button>
        </div>
    )
}