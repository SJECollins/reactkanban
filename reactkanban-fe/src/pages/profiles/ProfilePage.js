import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { axiosReq } from '../../api/axiosDefaults'
import Profile from './Profile'
import Project from '../projects/Project'
import Task from '../tasks/Task'

const ProfilePage = () => {
    const [ profileData, setProfileData ] = useState({ results: []})
    const [ projects, setProjects ] = useState({ results: []})
    const [ tasks, setTasks ] = useState({ results: [] })
    const { id } = useParams()
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === profileData?.owner

    useEffect(() => {
        const getData = async () => {
            try {
                const [{ data: profile }, { data: projects}, { data: tasks }] = await Promise.all([
                    axiosReq.get(`/profile/${id}`),
                    axiosReq.get(`/projects/?team__profile__owner=${id}`),
                    axiosReq.get(`/tasks/?owner=${id}`)
                ])
                setProfileData(profile)
                setProjects(projects)
                setTasks(tasks)
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    }, [id])

    const openTasks = (
        tasks.results.filter((task) => (
            !task.approved
        )))

    const closedTasks = (
        tasks.results.filter((task) => (
            task.approved
        )))

  return (
    <div>
        <div>
            <Profile {...profileData} />
        </div>
        <div>
            <h2>Current Projects: </h2>
            {projects.results.length ? (
                projects.results.map((project) => (
                    <div key={project.id}>
                        <Project
                            {...project} />
                        <Link to={`/project/${project.id}`}>
                            View Project
                        </Link>
                    </div>
                ))
            ) : (
                <p>No current projects.</p>
            )}
        </div>
        <div>
            {tasks.results.length ? (
                <>
                    <h2>Current Tasks</h2>
                    {openTasks.length ? (
                        tasks.results.filter((task) => (
                            !task.approved
                        )).map((task) => (
                            <Task
                                key={task.id}
                                {...task} />
                        ))
                    ) : (<p>No open tasks.</p>)}
                    <h2>Finished Tasks</h2>
                    {closedTasks.length ? ( 
                        tasks.results.filter((task) => (
                            task.approved
                        )).map((task) => (
                            <Task
                                key={task.id}
                                {...task} />
                        ))
                     ) : (<p>No finished tasks.</p>)}
                </>
            ) : (
                <p>No tasks.</p>
            )}
   
        </div>
    </div>
  )
}

export default ProfilePage