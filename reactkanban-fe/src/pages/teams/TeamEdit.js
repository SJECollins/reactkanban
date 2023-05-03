import React, { useEffect, useState } from 'react'
import styles from '../../styles/Form.module.css'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'

const TeamEdit = () => {
    const [ errors, setErrors ] = useState({})
    const [ team, setTeam ] = useState({
        name: "",
        description: ""
    })
    const { name, description } = team
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/team/${id}`)
                const { is_lead, name, description } = data
                
                is_lead ? setTeam({ name, description }) : history("/")
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [history, id])

    const handleChange = (event) => {
        setTeam({
            ...team,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append("name", name)
        formData.append("description", description)

        try {
            await axiosReq.post("/teams/", formData)
            history.push("/teams/")
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
        <h2>Edit Team: </h2>
        <form onSubmit={handleSubmit} className={styles.FormStyle}>
            <fieldset>
                <legend>Team Name: </legend>
                <input
                    className={styles.FormInput}
                    placeholder="Team name"
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange} />
            </fieldset>
            <fieldset>
                <legend>Team Description: </legend>
                <input
                    className={styles.FormInput}
                    placeholder="Team description"
                    type="textarea"
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleChange} />
            </fieldset>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default TeamEdit