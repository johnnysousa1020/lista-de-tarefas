function Todoltem({ task, toggleTask, deleteTask }){
    return(
        <li className={task.done ? 'done' : ''}>
            <span onClick={() => toggleTask(task.id)}>{task.text}
            </span>

        <div className="task-buttons">
            {!task.done && (
                <button onClick={() => toggleTask(task.id)} 
                className="done-btn"
                >✅</button>
            )}  
            
            <button onClick={() => deleteTask(task.id)} className="delete-btn">🗑️</button>
             </div>
        </li>
       
    )
}

export default Todoltem