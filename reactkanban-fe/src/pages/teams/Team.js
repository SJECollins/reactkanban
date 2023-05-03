import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Team = (props) => {
    const {
        id,
        lead,
        lead_name,
        name,
        description,
        owner,
    } = props

    const currentUser = useCurrentUser()
    const is_lead = currentUser?.username === owner

  return (
    <div>
      <h2>{name}</h2>
      {is_lead && <Link to={`/team/${id}/edit`}>Edit</Link>}
      <p>Team Lead: <Link to={`/profile/${lead}`}>{lead_name}</Link></p>
      <p>{description}</p>
    </div>
  )
}

export default Team