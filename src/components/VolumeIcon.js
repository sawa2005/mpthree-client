import {
    FiVolume,
    FiVolume1,
    FiVolume2,
    FiVolumeX
} from "react-icons/fi"

export default function VolumeIcon({ volume }) {
    // Returns volume icon based on volume
    let Icon

    if (volume >= 70) {
        Icon = FiVolume2
    } else if (volume >= 30) {
        Icon = FiVolume1
    } else if (volume > 0) {
        Icon = FiVolume
    } else {
        Icon = FiVolumeX
    }

    return (
        <Icon />
    )
}
