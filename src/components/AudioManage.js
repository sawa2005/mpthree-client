import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AudioManage({ songName, artistName, _id, deleteAudio }) {
    const navigate = useNavigate()

    // Updates audio entry and refreshes page on form submit
    async function handleSubmit(e) {
        e.preventDefault()

        let formEl = document.getElementById('manage-form')
        let formData = new FormData(formEl)

        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/update/${_id}`, { 
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
    <div className='audio-manage'>
        <form id="manage-form" className='audio-form' onSubmit={handleSubmit}>
            <input id="songName" name="songName" type="text" defaultValue={songName} required/>
            <input id="artistName" name="artistName" type="text" defaultValue={artistName} required/>
            <div className='manage-controls'>
                <input className= "btn" type="submit" value="Update" />
                <button className="btn delete" type="button" onClick={() => {
                    // Delete audio entry on button click
                    deleteAudio(_id);

                    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/delete/${_id}`, { method: 'DELETE' })
                        .then(response => response.text())
                        .catch(error => {
                            console.error(error);
                        });
                    }}>Delete
                </button>
            </div>
        </form>
    </div>
    )
}
