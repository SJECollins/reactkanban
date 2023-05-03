import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosRes } from '../../api/axiosDefaults'

const Task = (props) => {
    const {
        id,
        owner,
        profile_id,
        added,
        updated,
        due,
        priority,
        status,
        setProject,
        setTasks,
        name,
        description,
    } = props
    const history = useHistory()
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/task/${id}`)
            history.pushState("/")
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div>
        <div>
            <h3>{name}</h3>
            {is_owner && 
            <div>
                <Link to={`/task/${id}/edit`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>               
            </div>
}
            <p><small>Added: {added}</small></p>
            <p>
                <strong>Belongs to: </strong>
                <Link to="/">
                    {owner}
                </Link>
            </p>
            <p><strong>Priority: </strong>{priority}</p>
            <hr/>
            <p>{description}</p>
            <hr/>
            <p>Last updated on {updated}</p>
            <p>Current status: {status}</p>
            <hr/>
            <p><strong>Due: </strong>{due}</p>
        </div>
    <p>Then we need links to edit and delete comments.</p>
    </div>
  )
}

export default Task