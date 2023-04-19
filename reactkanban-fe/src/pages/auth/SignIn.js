import React, { useState } from 'react'
import { useSetCurrentUser } from '../../contexts/CurrentUserContext'
import styles from '../../styles/Form.module.css'
import axios from 'axios'
import { setTokenTimestamp } from '../../utils/utils'
import { useHistory } from 'react-router-dom'

const SignIn = () => {
    const setCurrentUser = useSetCurrentUser();
    // useRedirect("loggedIn");
  
    const [signInData, setSignInData] = useState({
      username: "",
      password: "",
    });
    const { username, password } = signInData;
  
    const [errors, setErrors] = useState({});
  
    const history = useHistory();
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await axios.post("/dj-rest-auth/login/", signInData);
        setCurrentUser(data.user);
        setTokenTimestamp(data);
        history.goBack();
      } catch (err) {
        setErrors(err.response?.data);
      }
    };
  
    const handleChange = (event) => {
      setSignInData({
        ...signInData,
        [event.target.name]: event.target.value,
      });
    };

  return (
    <div>
        <form onSubmit={handleSubmit} className={styles.FormStyle}>
            <fieldset>
                <legend>Sign In</legend>
                <label>Username:</label>
                    <input
                        className={styles.FormInput}
                        placeholder="Enter username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        />

                {errors.username?.map((message, index) => (
                    <p key={index}>
                        {message}
                    </p>
                ))}
                <label>Password:</label> 
                    <input
                        className={styles.FormInput}
                        placeholder="Enter password"
                        type="text"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        />
                {errors.password?.map((message, index) => (
                    <p key={index}>
                        {message}
                    </p>
                ))}
            </fieldset>
            <button
                className={styles.FormButton}
                type="submit"
            >Sign In</button>
            {errors.non_fields_errors?.maps((message, index) => (
                <p key={index}>
                    {message}
                </p>
            ))}
        </form>
    </div>
  )
}

export default SignIn