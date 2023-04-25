import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Project = (props) => {
    const {
        id,
        owner,
        profile_id,
        team,
        team_name,
        created,
        deadline,
        name,
        description,
        setProject
    } = props

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner
    const history = useHistory()

  return (
    <div>
        <div>
            <h2>{name}</h2>
            <p><small>{created}</small></p>
            <p>
                <strong>Lead: </strong>
                <Link to="/">
                    {owner}
                </Link>    
            </p>
            <p>
                <strong>Team: </strong>
                <Link to="/">
                    {team_name}
                </Link>
            </p>
            <p>{description}</p>
            <hr></hr>
            <p><strong>Deadline: </strong>{deadline}</p>
        </div>
        <p>Then we'll have edit and delete links for the owner.</p>
    </div>
  )
}

export default Project