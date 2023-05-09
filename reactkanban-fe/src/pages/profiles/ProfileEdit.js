import React, { useEffect, useState } from 'react'
import styles from '../../styles/Form.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq, axiosRes } from '../../api/axiosDefaults'

const ProfileEdit = () => {
    const [ errors, setErrors ] = useState({})
    const [ teams, setTeams ] = useState({ results: []})
    const [ profileData, setProfileData ] = useState({
        first_name: "",
        last_name: "",
        dob: "",
        team: "",
        role: "",
        bio: "",
    })
    const { first_name, last_name, dob, team, role, bio } = profileData
    const currentUser = useCurrentUser()
    const { id } = useParams()
    const history = useHistory()

    useEffect(()=> {
        const handleMount = async () => {
            if (currentUser?.pk.toString() === id) {
                try {
                    const [{ data: profile }, { data: teams }] = await Promise.all([
                        axiosReq.get(`/profile/${id}/`),
                        axiosReq.get(`/teams`)
                    ]) 
                    const { first_name, last_name, dob, team, role, bio} = profile
                    setProfileData({ first_name, last_name, dob, team, role, bio})
                    setTeams(teams)
                } catch (err) {
                    console.log(err)
                    history.push("/")
                }
            } else {
                console.log("Not the user")
                history.push("/")
            }
        }
        handleMount()
    }, [currentUser, history, id])

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append("first_name", first_name)
        formData.append("last_name", last_name)
        formData.append("dob", dob)
        formData.append("bio", bio)
        formData.append("team", team)
        formData.append("role", role)

        try {
            await axiosReq.post(`/profile/${id}`, formData)
            history.push(`/profile/${id}`)
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
        <h2>Edit Your Profile: </h2>
        <form onSubmit={handleSubmit} className={styles.FormStyle}>
            <fieldset>
                <legend>Name: </legend>
                <input
                    className={styles.FormInput}
                    placeholder="First name"
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={first_name}
                    onChange={handleChange}
                />
                <input
                    className={styles.FormInput}
                    placeholder="Last name"
                    type="text"
                    name="last_name"
                    id="last_name"
                    value={last_name}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset>
                <legend>Bio: </legend>
                <label htmlFor="dob">Date of Birth: </label>
                <input 
                    type="date"
                    name="dob"
                    id="dob"
                    value={dob}
                    max="2005-01-01"
                    onChange={handleChange}
                />
                <textarea 
                    name="bio"
                    id="bio"
                    value={bio}
                    rows={4}
                    onChange={handleChange}
                />
            </fieldset>
            <fieldset>
                <legend>Team: </legend>
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
                <select name="role" id="role" onChange={handleChange}>
                    <option>Select Role</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Team Member">Team Member</option>
                </select>
            </fieldset>
            <button type="submit">Edit Profile</button>
        </form>    
    </div>
  )
}

export default ProfileEdit