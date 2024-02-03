import { AudioItem } from "./AudioItem";

export function AudioList({ audios, deleteAudio }) {
    return (
        <div className="audio-list">
          {audios.map(audio => {
            return <AudioItem {...audio} key={audio._id} deleteAudio={deleteAudio} />
          })}
        </div>
    )
}