import { AudioItem } from "./AudioItem";

export function AudioList({ audios, deleteAudio, userId }) {
  // If no audios are uploaded return a message
  if (audios.length > 0) {
    return (
      // Returns audio item for each audio in the database
      <div className="audio-list">
        {audios.map(audio => {
          return <AudioItem {...audio} key={audio._id} deleteAudio={deleteAudio} userId={userId} />
        })}
      </div>
    )
  } else {
    return <p>No mpthree's have been uploaded yet :(</p>
  }
}