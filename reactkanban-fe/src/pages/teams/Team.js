import React from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const Team = (props) => {
    const {
        id,
        lead,
        profile_id,
        name,
        description,
    } = props

    const currentUser = useCurrentUser()
    const is_lead = currentUser?.profile.get_full_name === lead

  return (
    <div>

    </div>
  )
}

export default Team