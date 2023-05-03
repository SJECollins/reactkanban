import React, { useEffect, useState } from 'react'
import styles from '../../styles/Form.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { axiosReq } from '../../api/axiosDefaults'

const ProfileEdit = () => {
    cosnt [ errors, setErrors ] = useState({})
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
            if (currentUser?.pk === id) {
                try {
                    const [{ data: profile }, { data: teams }] = await Promise.all([
                        axiosReq.get(`/profiles/${id}/`),
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
                history.push("/")
            }
        }
        handleMount()
    }, [currentUser, history, id])


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
                    value={deadline}
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
        </form>
        
    </div>
  )
}

export default ProfileEdit