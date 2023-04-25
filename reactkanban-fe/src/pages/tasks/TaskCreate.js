import React, { useState } from 'react'
import styles from '../../styles/Form.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'

const TaskCreate = ({ project }) => {
    const [ errors, setErrors ] = useState({})
    const [ taskData, setTaskData ] = useState({
        name: "",
        description: "",
        due: null,
        priority: null,
        status: null,
    })
    const { name, description, due, priority, status } = taskData
    const history = useHistory()

    const handleChange = (event) => {
        setTaskData({
            ...taskData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)
        formData.append("due", due)
        formData.append("priority", priority)
        formData.append("status", status)

        try {
            const { data } = await axiosReq.post("/tasks/", {
                formData,
                project
            })
            history.push(`/project/${project.id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401) {
                setErrors(err.response?.data)
            }
        }
    }

  return (
    <div>
        <h3>Add New Task: </h3>
        <form onSubmit={handleSubmit} className={styles.FormStyle}>
            <fieldset>
                <legend>Task Name: </legend>
                <input
                    className={styles.FormInput}
                    placeholder="Task name"
                    type="text"
                    name="taskname"
                    value={taskname}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset>
                <legend>Description: </legend>
                <input
                    className={styles.FormInput}
                    placeholder="Description"
                    type="textarea"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    rows={4}
                />
            </fieldset>
            <fieldset>
                <legend>Due: </legend>
                <input type="date" id="start" name="trip-start"
       value="2018-07-22"
       min="2018-01-01" max="2018-12-31"></input>
                <input
                    type="date"
                    name="due"
                    value={due}
                    min="2023-01-01"
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset>
                <legend>Priority: </legend>
                <input
                    type="radio"
                    name="priority"
                    value={0}
                    id="low"
                    onChange={handleChange}
                />
                <label htmlFor="low">low</label>
                <input
                    type="radio"
                    name="priority"
                    value={1}
                    id="normal"
                    checked={priority === 0}
                    onChange={handleChange}
                />      
                <label htmlFor="normal">Normal</label>
                <input
                    type="radio"
                    name="priority"
                    value={2}
                    id="high"
                    checked={priority === 1}
                    onChange={handleChange}
                />
                <label htmlFor="high">High</label>
            </fieldset>
            <fieldset>
                <legend>Status: </legend>
                <select value={status} onChange={handleChange}>
                    <option value={0}>To Do</option>
                    <option value={1}>In Progress</option>
                    <option value={2}>Submitted</option>
                </select>
            </fieldset>

        </form>
    </div> 
  )
}

export default TaskCreate