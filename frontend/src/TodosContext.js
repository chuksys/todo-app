import React, {createContext} from "react"
import useTodos from "./hooks/useTodos"
import useStyles from "./hooks/useStyles"
import ACTIONS from "./actions.js"

const TodosContext = createContext(null)
const { Provider } = TodosContext

function TodosContextProvider(props) {
  const classes = useStyles()

  const { todos, isLoading, filteredTodos, isFiltered, resetTodosDateFilter, 
  addTodo, toggleTodoCompleted, deleteTodoFn, setTodoDueDate, filterTodosByDate,
  loadMoreTodos, changeTodoPriority } = useTodos()

  const { addTodoContainer, addTodoButton, todosContainer, todoTextCompleted, deleteTodo } = classes

  const state = {
    todos, isLoading, filteredTodos, isFiltered, 
    addTodoContainer, addTodoButton, todosContainer, todoTextCompleted, deleteTodo
  }

  const actionsManager = (actionType, actionPayload = null) => {
      if(actionType === ACTIONS.ADD_TODO) {
        try {
          addTodo(actionPayload.newTodoText, actionPayload.setNewTodoText)
        } catch(err) {
          console.error("An Error Occurred:" + err)
        } 

      } else if(actionType === ACTIONS.DELETE_TODO) {
        try {
          deleteTodoFn(actionPayload.id)
        } catch(err) {
          console.error("An Error Occurred:" + err)
        }

      } else if(actionType === ACTIONS.TOGGLE_TODO_COMPLETED) {
        try {
          toggleTodoCompleted(actionPayload.id)
        } catch(err) {
          console.error("An Error Occurred:" + err)
        }
        
      } else if(actionType === ACTIONS.SET_TODO_DUE_DATE) {
        try {
          setTodoDueDate(actionPayload.id, actionPayload.dueDate)
        } catch(err) {
          console.error("An Error Occurred:" + err)
        }

      } else if(actionType === ACTIONS.FILTER_TODOS_BY_DATE) {
        try {
          filterTodosByDate(actionPayload.date)
        } catch(err) {
          console.error("An Error Occurred:" + err)
        }

      } else if(actionType === ACTIONS.RESET_TODOS_DATE_FILTER) {
        try {
          resetTodosDateFilter()
        } catch(err) {
          console.error("An Error Occurred:" + err)
        }

      } else if(actionType === ACTIONS.LOAD_MORE_TODOS) {
        try {
          loadMoreTodos(actionPayload.setIsBottom)
        } catch(err) {
          console.error("An Error Occurred:" + err)
        }
        
      } else if(actionType === ACTIONS.CHANGE_TODO_PRIORITY) {
        try {
          changeTodoPriority(actionPayload.dragid, actionPayload.dropid, actionPayload.priority)
        } catch(err) {
          console.error("An Error Occurred:" + err)
        }
      }
  }

  const dispatcher = (actionType, actionPayload = null) => actionsManager(actionType, actionPayload)

  const utils = { dispatcher, ACTIONS, state }

  return(
        <Provider value={utils}>
            {props.children}
        </Provider>
    )
}

const useTodosContext = () => React.useContext(TodosContext)

export { TodosContext, TodosContextProvider, useTodosContext }