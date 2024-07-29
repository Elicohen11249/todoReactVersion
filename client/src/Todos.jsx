import { useContext, useEffect, useState } from "react"
import Task from "./Task"
import NewTask from "./NewTask"
import Title from "./Title"
import AuthContext from "./auth"

export default function Todos() {
    const [tasks, setTasks] = useState([])
    const [deleted, setDeleted] = useState(0)
    //const user = useContext(AuthContext)
    //const { userName, password } = user;


    function updateTask(taskId) {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, done: true } : task
        ));
    }

    function deleteTask() {
        setDeleted(() => deleted + 1)
    }

    function updateTasks(task) {
        setTasks(tasks => [...tasks, task])
    }

    async function loadTasks() {
        try {
            const response = await fetch('http://localhost:7000/tasks', {
                mode: 'cors',
                credentials: 'include'
            });
            const res = await response.json();
            setTasks(res);
        } catch (error) {
            console.log('Error fetching tasks:', error);
        }
    }

    useEffect(() => { loadTasks() }, [deleted])


    return (<>
        <div className="todo-container" >
            <Title />
            <NewTask updateTasks={updateTasks} />
            <section className="task-list" id="todo-list">
                <h2 className="task-header"> to do - <span></span></h2>
                {tasks.filter(task => !task.done).map((task) => <Task deleteTask={deleteTask} updateTask={updateTask} task={task} key={task.id} />)}
            </section>
            <section className="completed" id="done-list">
                <h2 className="task-header"> Done - <span></span></h2>
                {tasks.filter(task => task.done).map((task) => <Task deleteTask={deleteTask} task={task} key={task.id} />)}
            </section>

        </div>
    </>)
}