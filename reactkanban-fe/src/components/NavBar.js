import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext'
import styles from '../styles/Nav.module.css'
import axios from 'axios'
import { removeTokenTimestamp } from '../utils/utils'

const NavBar = () => {
    const currentUser = useCurrentUser()
    const setCurrentUser = useSetCurrentUser()

    const handleSignOut = async () => {
        try {
            await axios.post("/dj-rest-auth/logout/")
            setCurrentUser(null)
            removeTokenTimestamp()
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <nav className={styles.NavBar}>
        {currentUser ? (<>
            <div>
            <ul>
                <NavLink to="/" className={styles.NavLeft}>Home</NavLink>
                <NavLink to="/teams" className={styles.NavLeft}>Teams</NavLink>
                <NavLink to="/projects" className={styles.NavLeft}>Projects</NavLink>
            </ul>
        </div>
        <div>
            <ul>
                <NavLink to="/" className={styles.NavRight}>Profile</NavLink>
                <NavLink
                    onClick={handleSignOut}
                    to="/"
                    className={styles.NavRight}>Logout</NavLink>
            </ul>
        </div>
            </>
        ) : (<>
        <div>
                <ul>
                    <NavLink to="/">Home</NavLink>
                </ul>
            </div>
            <div>
                <NavLink
                    className={styles.NavRight}
                    to="/signin"
                    >Sign In</NavLink>
                <NavLink
                    className={styles.NavRight}
                    to="/signup"
                    >Sign Up</NavLink>
            </div>
        </>)}
    </nav>
  )
}

export default NavBar