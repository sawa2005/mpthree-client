import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AudioManage({ songName, artistName, _id, deleteAudio }) {
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        var formEl = document.getElementById('manage-form')
        var formData = new FormData(formEl)

        console.log(JSON.stringify(Object.fromEntries(formData)))

        await fetch("//localhost:3001/api/update/" + _id, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(navigate(0))
            .catch(error => {
                console.error(error);
            });
    }

    return (
    <div>
        <form id="manage-form" onSubmit={handleSubmit}>
            <label htmlFor="songName">song name: </label>
            <input id="songName" name="songName" type="text" defaultValue={songName} required/><br />
            <label htmlFor="artistName">artist name: </label>
            <input id="artistName" name="artistName" type="text" defaultValue={artistName} required/><br />
            <input type="submit" value="Edit" />
        </form>
        <button onClick={() => {
            deleteAudio(_id);

            fetch("//localhost:3001/api/delete/" + _id, { method: 'DELETE' })
                .then(response => response.text())
                .catch(error => {
                    console.error(error);
                });
            }}>Delete
        </button>
    </div>
    )
}
