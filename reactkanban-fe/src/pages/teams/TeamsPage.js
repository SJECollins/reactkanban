import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const TeamsPage = () => {
    const [ teams, setTeams ] = useState({ results: [] })
    const currentUser = useCurrentUser()
    const is_lead = currentUser?.profile.get_full_name === lead

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/teams/`)
                setTeams(data)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [])

  return (
    teams.results.length ? (
    <div>
        
    </div>
    ) : (
        <h3>There are no teams.</h3>
    )
  )
}

export default TeamsPage