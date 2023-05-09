import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosRes } from '../../api/axiosDefaults'
import styles from '../../styles/Layout.module.css'

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
                <Link className={styles.LinkBtn} to={`/project/${id}/edit`}>Edit Project</Link>
                <button onClick={handleDelete}>Delete Project</button>
            </div>}
            <p><small>Added on: {created}</small></p>
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
            <hr/>
        </div>
    </div>
  )
}

export default Project