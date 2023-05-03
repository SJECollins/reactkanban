import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosRes } from '../../api/axiosDefaults'

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

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/project/${id}/`)
            history.push("/")
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
                <Link to={`/project/${id}/edit`}>Edit Project</Link>
                <button onClick={handleDelete}>Delete Project</button>
            </div>}
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