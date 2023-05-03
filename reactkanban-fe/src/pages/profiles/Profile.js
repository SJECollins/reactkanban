import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const Profile = (props) => {
    const { 
        id, 
        owner, 
        joined, 
        first_name, 
        last_name,
        dob,
        team,
        team_name,
        role,
        bio    
    } = props

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner

  return (
    <div>
        <h1>{owner}</h1>
        <h2>{first_name} {last_name}</h2>
        <p>Joined: {joined}</p>
        <p>Team: {team_name}</p>
        <p>Role: {role}</p>
        <p>{bio}</p>
        {is_owner && <p>Edit the profile</p>}
    </div>
  )
}

export default Profile