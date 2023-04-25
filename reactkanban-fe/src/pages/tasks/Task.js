import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

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

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner

  return (
    <div>
        <div>
            <h3>{name}</h3>
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