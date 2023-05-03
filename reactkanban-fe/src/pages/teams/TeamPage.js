import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq, axiosRes } from '../../api/axiosDefaults'
import Team from './Team'

const TeamPage = () => {
    const [ teamData, setTeamData ] = useState({ results: [] })
    const [ projects, setProjects ] = useState({ results: [] })
    const [ teamMembers, setTeamMembers ] = useState({ results: [] })
    const { id } = useParams()
    const history = useHistory()
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

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/team/${id}`)
            history.push("/")
        } catch (err) {
            console.log (err)
        }
    }

  return (
    <div>
        <Team {...teamData} />
        {is_lead &&
            <div>
                <Link to={`/team/${id}/edit`}>Edit Team</Link>
                <button onClick={handleDelete}>Delete Team</button>      
            </div>}
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