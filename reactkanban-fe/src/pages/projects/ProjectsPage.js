import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'
import Project from './Project'

const ProjectsPage = () => {
    const [ projects, setProjects ] = useState({ results: [] })

    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/projects/`)
                setProjects(data)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [])

    const loggedIn = (
        projects.results.length ? (
            <div>
                <h1>Current Projects</h1>
                {projects.results.map((project) => (
                    <Project
                        key={project.id}
                        {...project}
                        setProjects={setProjects} />
                ))}
            </div>
        ) : (
            <div>
                There are no projects!
            </div>
        ))

    const loggedOut = (
        <h1>You must log in to access projects.</h1>
    )

  return (
    <div>
        { currentUser ? loggedIn : loggedOut }
    </div>
  )
}

export default ProjectsPage