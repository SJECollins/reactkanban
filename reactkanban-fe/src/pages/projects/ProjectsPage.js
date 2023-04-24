import React, { useEffect, useState } from 'react'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'

const ProjectsPage = () => {
    const [ projects, setProjects ] = useState({ results: [] })

    const currentUser = useCurrentUser

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
    }, [projects])

  return (
    <div>
        { projects.results.length ? (
            <div>
                Projects exist!
            </div>
        ) : (
            <div>
                There are no projects!
            </div>
        )}
        
    </div>
  )
}

export default ProjectsPage