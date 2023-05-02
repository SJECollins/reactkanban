import React, { useEffect, useState } from 'react'
import { axiosRes } from '../../api/axiosDefaults'
import Task from './Task'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const TaskPage = () => {
    const [ task, setTask ] = useState({ results: []})
    const { id } = useParams()

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosRes.get(`/task/${id}`)
                setTask({ results: [data] })
            } catch (err) {
                console.log(err)
            }
        }
        handleMount()
    }, [id])

  return (
    <div>
        <Task {...task.results[0]} setTask={setTask} />
    </div>
  )
}

export default TaskPage