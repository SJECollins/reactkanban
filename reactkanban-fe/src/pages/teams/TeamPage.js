import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'
import Team from './Team'

const TeamPage = () => {
    const [ teamData, setTeamData ] = useState({ results: [] })
    const [ projects, setProjects ] = useState({ results: [] })
    const [ teamMembers, setTeamMembers ] = useState({ results: [] })
    const { id } = useParams()
    const currentUser = useCurrentUser()
    const is_lead = currentUser?.username === teamData?.owner

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: team }, { data: projects }, { data: members }] = await Promise.all([
                    axiosReq.get(`/team/${id}`),
                    axiosReq.get(`/projects/?team=${id}`),
                    axiosReq.get(`/profiles/?team=${id}`)
                ])
                setTeamData(team)
                setProjects(projects)
                setTeamMembers(members)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [id])

  return (
    <div>
        <Team {...teamData} />
        <div>
            <h2>Team Members: </h2>
            {teamMembers.results.length ? (
                teamMembers.results.map((member) => (
                    <Link
                        key={member.id}
                        to={`/profile/${member.id}`}>
                            {member.full_name}
                    </Link>
                ))
            ) : (
                <p>No team members found.</p>
            )}
        </div>
        <div>
            {projects.results.length ? (
                projects.results.map((project) => (
                    <Link
                        key={project.id}
                        to={`/project/${project.id}`}>
                            {project.name}
                        </Link>
                ))
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    </div>
  )
}

export default TeamPage