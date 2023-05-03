import React, { useEffect, useState } from 'react'
import styles from '../../styles/Form.module.css'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'
 
const ProjectEdit = () => {
    const [ errors, setErrors ] = useState({})
    const [ teams, setTeams ] = useState({ results: []})
    const [ projectData, setProjectData ] = useState({
        name: "",
        team: "",
        description: "",
        deadline: "",
    }) 
    const { name, team, description, deadline } = projectData
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: project }, { data: teams }] = await Promise.all([
                    axiosReq.get(`/project/${id}`),
                    axiosReq.get(`/teams/`)
                ])
                const { is_owner, team, deadline, name, description } = project

                is_owner ? setProjectData({ name, team, description, deadline }) : history("/")
                setTeams(teams)
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [history, id])

    const handleChange = (event) => {
        setProjectData({
            ...projectData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        
        formData.append("name", name)
        formData.append("team", team)
        formData.append("description", description)
        formData.append("deadline", deadline)

        try {
            await axiosReq.post(`/project/${id}`, formData)
            history.push(`/project/${id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
            console.log("These are the errors: ", errors)
        }
    }

  return (
    <div>
        <h2>Create New Project: </h2>
        <form onSubmit={handleSubmit} className={styles.FormStyle}>
            <fieldset>
                <legend>Project Name: </legend>
                <input
                    className={styles.FormInput}
                    placeholder="Project name"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset>
                <legend>Project Team: </legend>
                <select name="team" id="team" onChange={handleChange}>
                    <option>Select Team</option>
                    {teams.results.length ? (
                        teams.results.map((team) => (
                            <option
                                key={team.id}
                                value={team.id}>
                                    {team.name}
                            </option>
                        ))                    
                    ) : (
                        <option>No Teams Available</option>
                    )}
                </select>
            </fieldset>
            <fieldset>
                <legend>Project Description: </legend>
                <input 
                    className={styles.FormInput}
                    placeholder="Description"
                    type="textarea"
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleChange}
                    rows={4}
                />
            </fieldset>
            <fieldset>
                <legend>Project Deadline: </legend>
                <input 
                    type="datetime-local"
                    name="deadline"
                    id="deadline"
                    value={deadline}
                    min="2023-01-01"
                    onChange={handleChange}
                />
            </fieldset>
            <button type="submit">Create New Project</button>
        </form>
    </div>
  )
}

export default ProjectEdit