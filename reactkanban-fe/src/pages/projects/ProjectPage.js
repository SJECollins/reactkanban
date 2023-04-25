import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'
import Project from './Project'
import Task from '../tasks/Task'

const ProjectPage = () => {
    const [ project, setProject ] = useState({ results: [] })
    const [ tasks, setTasks ] = useState({ results: [] })
    const { id } = useParams()

    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: project}, { data: tasks}] = await Promise.all([
                    axiosReq.get(`/project/${id}`),
                    axiosReq.get(`/tasks/?project=${id}`)
                ])
                setProject({ results: [project] })
                setTasks(tasks)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [id])

    return (
    <div>
        <Project {...project.results[0]} setProject={setProject}></Project>
        <hr/>
        {tasks.results.length ? (
            tasks.results.map((task) => (
                <Task key={task.id} 
                    {...task}
                    setProject={setProject}
                    setTasks={setTasks} />
            ))
        ) : (
            <span>No tasks yet.</span>
        )}
        
    </div>
  )
}

export default ProjectPage