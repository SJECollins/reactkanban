import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'
import Project from './Project'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../../styles/Layout.module.css'

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

    const loggedIn = <div className={styles.Container}>
        <Link
            className={styles.LinkBtn}
            to="/projects/create">
            Create New Project
        </Link>
        {projects.results.length ? (
            <div>
                <h1>Current Projects</h1>
                {projects.results.map((project) => (
                    <div key={project.id}>
                    <Project
                        {...project}
                        setProjects={setProjects} />
                        <Link
                            className={styles.LinkBtn}
                            to={`/project/${project.id}`}>
                            View Project
                        </Link>
                    </div>
                ))}
            </div>
        ) : (
            <div>
                There are no projects!
            </div>
        )}</div>

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