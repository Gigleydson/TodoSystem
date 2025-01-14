import { useState } from "react"

// CSS
import styles from "./TodoSystem.module.css"

const TodoSystem = () => {

  const [todos, setTodos] = useState([])
  const [inputTodo, setInputTodo] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if(inputTodo.trim() !== ""){
      const newTodo = {
        id: Date.now(),
        text: inputTodo
      }

      setTodos((prevTodos) => [...prevTodos, newTodo])

      setInputTodo("")
    }
    
  }

  const removeTodo = (id) => {

    const deleteTodo = (
      todos.filter((todo) => todo.id !== id ? todo : null)
    )

    setTodos(deleteTodo)
  }

  const completeTodo = (id) => {

    const doneTodo = [...todos]
    doneTodo.map((todo) => todo.id === id ? (todo.isCompleted = !todo.isCompleted) : todo)
    
    setTodos(doneTodo)
  }

  return (
    <div className={styles.todo}>
        <h1 className={styles.title}>Lista de Tarefas</h1>
        <form onSubmit={handleSubmit} className={styles.form_todo}>
          <input 
            value={inputTodo}  
            placeholder="Adicone uma tarefa" 
            type="text" 
            onChange={(e) => setInputTodo(e.target.value)}
          />
          <button className={`${styles.btn} ${styles.btn_add}`}>Adicionar</button>
        </form>

        {todos.length === 0 && <p className={styles.empty}>Não há tarefas.</p> }

        <ul className={styles.list_todos}>
          {todos.map((todo) => (
            <li key={todo.id}><span className={todo.isCompleted ? styles.completeItem : styles.item}>{todo.text}</span> 
              <button className={`${styles.btn} ${styles.btn_delete}`} onClick={() => removeTodo(todo.id)}>Excluir</button>
              <button className={`${styles.btn} ${styles.btn_done}`} onClick={() => completeTodo(todo.id)}>Concluído</button>
            </li>
          ))}
        </ul>
        
        {/*
        <ul className={styles.list_done_todos}>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text} <button className={`${styles.btn} ${styles.btn_delete}`} onClick={() => removeTodo(todo.id)}>Excluir</button></li>
          ))}
        </ul>
          */}
    </div>
  )
}

export default TodoSystem