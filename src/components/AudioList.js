import { AudioItem } from "./AudioItem";

export function AudioList({ audios, deleteAudio, userId }) {
  if (audios.length === 0) {
    return <p>No mpthree's have been uploaded yet :(</p>
  } else {
    return (
      <div className="audio-list">
        {audios.map(audio => {
          return <AudioItem {...audio} key={audio._id} deleteAudio={deleteAudio} userId={userId} />
        })}
      </div>
    )
  }
}