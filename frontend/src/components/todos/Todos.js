import React, {useEffect} from "react";
import {
  Container,
  Paper,
  Box,
} from "@material-ui/core";
//import { useTodosContext } from "../../context/TodosContext"
import FilterTodos from "../filter_todos/FilterTodos"
import Todo from "../todo/Todo"
import useLoadMore from "../../hooks/useLoadMore"
import useStyles from "../../hooks/useStyles"
import ACTIONS from "../../actions"
import { useSelector, useDispatch } from "react-redux"
import { loadTodos, loadMoreTodos } from "../../redux/todosReducer"

function Todos() {
  //const { ACTIONS, state, dispatcher } = useTodosContext()

  const classes = useStyles()
  const { todosContainer, todoTextCompleted, deleteTodo } = classes
  const state = useSelector(state => state)
  const { todos, isLoading, isFiltered, filteredTodos } = state
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTodos())
  }, [])

 /*  const { 
    todos, 
    isLoading, 
    isFiltered, 
    filteredTodos, 
    todosContainer, todoTextCompleted, deleteTodo } = state */

  const { 
    DELETE_TODO, TOGGLE_TODO_COMPLETED, SET_TODO_DUE_DATE, LOAD_MORE_TODOS } = ACTIONS

  useLoadMore(dispatch, loadMoreTodos)

  const showNoTasksMessage = () => {
    if(showTodos().length < 1) { 
      return isFiltered ? <h2>No Matches</h2> : <h2>No Tasks Added</h2>
    }
  }

  const showIsLoading = () => {
    return isLoading ? <h2 style={{textAlign: "center"}}>Loading...</h2> : null
  }

  const showTodos = () => isFiltered ? filteredTodos : todos
  
  return (
    <Container maxWidth="md">
        <Paper className={todosContainer}>
          <Box display="flex" flexDirection="column" alignItems="stretch">

            { todos.length > 1 ? <FilterTodos/> : null }

            { showIsLoading() }
            { !isLoading ? showNoTasksMessage() : null }

            {React.useMemo(() => showTodos().map(todo => (
              <Todo 
              key={todo.id}
              id={todo.id}
              todo={todo}
              classes={{todosContainer, todoTextCompleted, deleteTodo}}
              actions={{DELETE_TODO, TOGGLE_TODO_COMPLETED, SET_TODO_DUE_DATE}}
              />
            )),[showTodos])}

          </Box>
        </Paper>
    </Container>
  );
}

export default Todos;
