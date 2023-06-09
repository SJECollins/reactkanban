import React from 'react'
import styles from '../../styles/Layout.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useCurrentUser } from '../../contexts/CurrentUserContext'

const Home = () => {
    const currentUser = useCurrentUser()

  return (
    <>
        {currentUser ? (
            <div className={styles.Container}>
                <h1>React Project Manager</h1>
                <ul>
                    <li className={styles.ListLink}>
                        <Link
                            to={`/profile/${currentUser.pk}`}
                            >View Your Profile</Link>
                    </li>
                    <li className={styles.ListLink}>
                        <Link
                            to="/projects"
                            >View All Projects</Link>
                    </li>
                    <li className={styles.ListLink}>
                        <Link
                            to="/teams"
                            >View Teams</Link>
                    </li>
                </ul>
            </div>
        ) :(
            <h1>You must log in to view projects.</h1>
        )}
    </>
  )
}

export default Home