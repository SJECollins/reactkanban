import React, { useEffect, useState } from 'react'
import { axiosReq } from '../../api/axiosDefaults'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const TeamsPage = () => {
    const [ teams, setTeams ] = useState({ results: [] })

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
    <div>
        <h2>Teams: </h2>
        {teams.results.length ? (
            teams.results.map((team) => (
                <Link
                    key={team.id}
                    to={`/team/${team.id}`}>
                        {team.name}
                    </Link>
            ))
        ) : (
            <p>No teams found.</p>
        )}
    </div>
  )
}

export default TeamsPage