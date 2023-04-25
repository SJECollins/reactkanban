import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import styles from '../../styles/Form.module.css'
import { useRedirect } from '../../hooks/useRedirect'

const SignUp = () => {
    const [ signUpData, setSignUpData ] = useState({
        username: "",
        password1: "",
        password2: "",
    })
    useRedirect("loggedIn")

    const { username, password1, password2 } = signUpData
    const [ errors, setErrors ] = useState({})
    const history = useHistory()

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData)
            history.push("/signin")
        } catch (err) { 
            setErrors(err.response?.data)
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className={styles.FormStyle}>
            <fieldset>
                <legend>Sign Up</legend>
                <label>Username: </label>
                <input
                    className={styles.FormInput}
                    placeholder="Enter username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange} />
                {errors.username?.map((message, index) => (
                    <p key={index}>
                        {message}
                    </p>
                ))}
                <label>Enter Password: </label>
                <input
                    className={styles.FormInput}
                    placeholder="Enter password"
                    type="password"
                    name="password1"
                    value={password1}
                    onChange={handleChange} />
                {errors.password1?.map((message, index) => (
                    <p key={index}>
                        {message}
                    </p>
                ))}
                <label>Re-enter Password: </label>
                <input
                    className={styles.FormInput}
                    placeholder="Re-enter password"
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={handleChange} />
                {errors.password2?.map((message, index) => (
                    <p key={index}>
                        {message}
                    </p>
                ))}
            </fieldset>
            <button
                className={styles.FormButton}
                type="submit">
                    Sign Up
                </button>
            {errors.non_field_errors?.maps((message, index) => (
                <p key={index}>
                    {message}
                </p>
            ))}
        </form>
    </div>
  )
}

export default SignUp