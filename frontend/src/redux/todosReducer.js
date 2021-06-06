import ACTIONS from "../actions"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { v4 as generateId } from "uuid"

const { 
    ADD_TODO, 
    LOAD_TODOS,
    LOAD_MORE_TODOS, 
    SHOW_LOADER,
    HIDE_LOADER, 
    TOGGLE_TODO_COMPLETED, 
    DELETE_TODO, 
    SET_TODO_DUE_DATE,
    FILTER_TODOS_BY_DUE_DATE, 
    RESET_TODOS_DATE_FILTER, SHOW_ERROR, HIDE_ERROR } = ACTIONS

function handleErrors(response) {
    if (!response.ok) {
        throw Error(`${response.status} => ${response.statusText}`);
    }
    return response;
}

const showLoader = () => {
    return {
        type: SHOW_LOADER
    }
}

const hideLoader = () => {
    return {
        type: HIDE_LOADER
    }
}

const showError = (message) => {
    return {
        type: SHOW_ERROR,
        payload: message
    }
}

const hideError = () => {
    return {
        type: HIDE_ERROR
    }
}

export const addTodo = (text, setNewTodoText) => (dispatch, getState) => {
    if(text === "") {
        dispatch(showError("You cannot add an Empty Todo"))
        return 
    }
    if(getState().error !== null) dispatch(hideError())
    setNewTodoText("")

    const newTodo = { id: generateId(), text, completed: false, priority: 1 };

    fetch("http://localhost:3001/api/todos", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newTodo),
    })
    .then(handleErrors)
    .then((response) => response.json())
    .then((newTodo) => {
        dispatch({
            type: ADD_TODO,
            payload: newTodo
        })
    })
    .catch(error => console.error("An Error Occured!", error))
}

export const loadTodos = () => (dispatch, getState) => {
    const LOADING_LIMIT = getState().LOADING_LIMIT
    dispatch(showLoader())
    fetch(`http://localhost:3001/api/todos?offset=0&limit=${LOADING_LIMIT}`)
            .then(handleErrors)
            .then((response) => response.json())
            .then((todos) => {
              dispatch(hideLoader())  
              dispatch({
                  type: LOAD_TODOS,
                  payload: todos
              })
            })
            .catch(error => console.error("An Error Occured!", error))
}

export const loadMoreTodos = setIsBottom => (dispatch, getState) => {
    const { offset, LOADING_LIMIT } = getState()
    fetch(`http://localhost:3001/api/todos?offset=${offset}&limit=${LOADING_LIMIT}`)
            .then(handleErrors)
            .then((response) => response.json())
            .then((todos) => {
              dispatch({
                  type: LOAD_MORE_TODOS,
                  payload: todos
              })
              setIsBottom(false)
            })
            .catch(error => console.error("An Error Occured!", error))
}

export const toggleTodoCompleted = (id) => (dispatch, getState) => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
            completed: !getState().todos.find(todo => todo.id === id).completed,
        }),
    }).then(handleErrors)
    .then(() => {
        dispatch({
            type: TOGGLE_TODO_COMPLETED,
            payload: id
        })
    }).catch(error => console.error("An Error Occured!", error))
}

export const deleteTodoFn = id => dispatch => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
        method: "DELETE",
      }).then(handleErrors)
      .then(() => {
          dispatch({
              type: DELETE_TODO,
              payload: id
          })
      })
      .catch(error => console.error("An Error Occured!", error));
}

export const setTodoDueDate = (id, dueDate) => dispatch => {
    fetch(`http://localhost:3001/api/todos/${id}`, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                  dueDate: dueDate,
                }),
              }).then(handleErrors).then(() => {
                dispatch({
                    type: SET_TODO_DUE_DATE,
                    payload: {id, dueDate}
                })
              }).catch(error => console.error("An Error Occured!", error));
}

export const filterTodosByDueDate = dueDate => {
    return {
        type: FILTER_TODOS_BY_DUE_DATE,
        payload: dueDate
    }
}

export const resetTodosDateFilter = () => {
    return {
        type: RESET_TODOS_DATE_FILTER
    }
}

export function changeTodoPriority() {

}

const initialState = {
    todos: [],
    filteredTodos: [],
    isLoading: false,
    isFiltered: false,
    dateFilter: "",
    LOADING_LIMIT: 20,
    offset: 0,
    error: null
}

export const todosReducer = (state = initialState, action) => {
    switch(action.type){
        case LOAD_TODOS :
            return {
                ...state,
                todos: [...state.todos, ...action.payload],
                isLoading: false,
                offset: state.offset + state.LOADING_LIMIT
            }
        case LOAD_MORE_TODOS : {
            if(action.payload.length < 1) return state

              return {
                  ...state,
                  todos: [...state.todos, ...action.payload],
                  offset: state.offset + state.LOADING_LIMIT
              }
        }    
        case ADD_TODO : 
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case DELETE_TODO :
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }    
        case TOGGLE_TODO_COMPLETED : {

            const newTodos = [...state.todos];
            const modifiedTodoIndex = newTodos.findIndex(todo => todo.id === action.payload);
            newTodos[modifiedTodoIndex] = {
                ...newTodos[modifiedTodoIndex],
                completed: !newTodos[modifiedTodoIndex].completed,
            };

            return {
                ...state,
                todos: newTodos
            }
        }    
        case SET_TODO_DUE_DATE : {

            const newTodos = [...state.todos];
            const modifiedTodoIndex = newTodos.findIndex(todo => todo.id === action.payload.id);
            newTodos[modifiedTodoIndex] = {
              ...newTodos[modifiedTodoIndex],
              dueDate: action.payload.dueDate,
            };

            return {
                ...state,
                todos: newTodos
            }
        }
        case FILTER_TODOS_BY_DUE_DATE : {
            const filteredTodos = state.todos.filter(todo => todo.dueDate === action.payload)
            
            return {
                ...state,
                isFiltered: true,
                filteredTodos: filteredTodos,
                dateFilter: action.payload
            }
        }
        case RESET_TODOS_DATE_FILTER : {

            return {
                ...state,
                isFiltered: false,
                filteredTodos: [],
                dateFilter: ""
            }
        }
        case SHOW_LOADER :
            return {
                ...state,
                isLoading: true
            }
        case HIDE_LOADER :
            return {
                ...state,
                isLoading: false
            }
        case SHOW_ERROR :
            return {
                ...state,
                error: action.payload
            } 
        case HIDE_ERROR :
            return {
                ...state,
                error: null
            }               
        default:
            return state
    }
}

const store = createStore(todosReducer, composeWithDevTools(
        applyMiddleware(thunk)
    )
)
export default store