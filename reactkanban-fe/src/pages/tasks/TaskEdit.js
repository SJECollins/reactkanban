import React, { useEffect, useState } from 'react'
import styles from '../../styles/Form.module.css'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'

const TaskCreate = () => {
    const [ errors, setErrors ] = useState({})
    const [ dueDate, setDueDate ] = useState("")
    const [ taskData, setTaskData ] = useState({
        project: "",
        name: "",
        description: "",
        due: "",
        priority: "",
        status: "",
        approved: false,
    })
    const { project, name, description, due, priority, status, approved } = taskData
    const history = useHistory()
    const { id } = useParams()

    // const formatDate = () => {
    //     console.log(due)
    //     let newDueDate = new Date(taskData.due)
    //     console.log(newDueDate)
    //     return newDueDate.toISOString()
    // }
 
    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/task/${id}`)
                const { is_owner, project, name, description, due, priority, status, approved } = data

                is_owner ? setTaskData({ project, name, description, priority, status, approved}) : history("/")
            } catch (err) {
                console.log(err)
            }            
        }
        handleMount()
    }, [history, id])

    const handleChange = (event) => {
        setTaskData({
            ...taskData,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append("project", project)
        formData.append("name", name)
        formData.append("description", description)
        formData.append("due", due)
        formData.append("priority", priority)
        formData.append("status", status)
        formData.append("approved", approved)

        console.log(name)
        console.log(description)
        console.log(due)
        console.log(priority)
        console.log(status)
        console.log(approved)

        try {
            await axiosReq.post("/tasks/", formData)
            history.push(`/task/${project.id}`)
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
        <h3>Edit Task: </h3>
        <form onSubmit={handleSubmit} className={styles.FormStyle}>
            <fieldset>
                <legend>Task Name: </legend>
                <input
                    className={styles.FormInput}
                    placeholder="Task name"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
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
                    id="description"
                    value={description}
                    onChange={handleChange}
                    rows={4}
                />
            </fieldset>
            <fieldset>
                <legend>Due: </legend>
                <input
                    type="datetime-local"
                    name="due"
                    id="due"
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
                    value="Low"
                    checked={priority === "Low"}
                    id="low"
                    onChange={handleChange}
                />
                <label htmlFor="low">Low</label>
                <input
                    type="radio"
                    name="priority"
                    value="Normal"
                    id="normal"
                    checked={priority === "Normal"}
                    onChange={handleChange}
                />      
                <label htmlFor="normal">Normal</label>
                <input
                    type="radio"
                    name="priority"
                    value="High"
                    id="high"
                    checked={priority === "High"}
                    onChange={handleChange}
                />
                <label htmlFor="high">High</label>
            </fieldset>
            <fieldset>
                <legend>Status: </legend>
                <select name="status" id="status" onChange={handleChange}>
                    <option>Select status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                </select>
            </fieldset>
            <fieldset>
                <legend>Approved: </legend>
                <input 
                    type="checkbox"
                    name="approved"
                    id="approved"
                    checked={approved === true}
                    onChange={handleChange}
                />
            </fieldset>
            <button type="submit">Edit Task</button>
        </form>
    </div> 
  )
}

export default TaskCreate