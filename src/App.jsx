import { useState, useEffect } from 'react'
import Todoltem from './Todoltem'
//import './App.css'
import './index.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : [];
  })

  const [newTask, setNewTask] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [filter, setFilter] = useState('all')
  

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, {id: Date.now(), text: newTask,
      done:false}])
      setNewTask('')
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'done') return task.done;
    if (filter === 'pending') return !task.done;
    return true;
  });

  const pendingCount = tasks.filter(task => !
    task.done).length;


  return (
    <div className={`container ${darkMode ? 'dark' : ''}`}>
      <h1>Minha Lista de Tarefas</h1>
      <button onClick={toggleDarkMode} className='toggle-mode'>{darkMode ? '☀️ modo Claro' : '🌙 modo Escuro'}
      </button>
      <div className='input-group'>
        <input 
        type="text" 
        placeholder='Nova tarefa...'
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <div className='filterr-buttons'>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('done')}>Concluidas</button>
        <button onClick={() => setFilter('pending')}>Pendentes</button>
      </div>

      <p>Você tem <strong> {pendingCount} </strong>tarefa(s) pendente(s)</p>

      <ul>
        {filteredTasks.map(task => (
          <Todoltem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
   )
}

export default App
