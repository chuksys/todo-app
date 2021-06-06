import React, {useState,useEffect} from "react";
import {
    Typography,
    Button,
    Icon,
    Box,
    Checkbox
  } from "@material-ui/core";
import DatePicker from "../todo_date_picker/TodoDatePicker"
import { useTodosContext } from "../../context/TodosContext"
import  useDraggable  from "../../hooks/useDraggable"
import { useDispatch } from "react-redux"
import { toggleTodoCompleted, deleteTodoFn, setTodoDueDate } from "../../redux/todosReducer"

function Todo(props) {
    const { id, text, completed, dueDate, priority } = props.todo
    const { TOGGLE_TODO_COMPLETED, DELETE_TODO, SET_TODO_DUE_DATE } = props.actions
    const { todoContainerStyle, todoTextCompleted, deleteTodo } = props.classes
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    //const { dispatch } = useTodosContext()
    const dispatch = useDispatch()
    const { dragStartHandler, dragOverHandler, dropHandler } = useDraggable()
    
    useEffect(() => {
      if(priority !== undefined) {
        localStorage.setItem(id, {priority})
        const i = localStorage.getItem(id)
        console.log(i)
      } 
    },[])
    
    const handleClick = (id) => {
        setDialogIsOpen(true)
        setIsFocused(true)
    }

    function showSetDueDateButton() {
      if(!completed) {
        return (
              <Button
              className={deleteTodo}
              startIcon={<Icon>schedule</Icon>}
              onClick={()=>handleClick(id)}
              >
              {dueDate !== undefined ? "CHANGE" : "SET"} Due Date
              </Button>
        )
      }
    }

    return (
        <Box
            draggable="true"
            onDragStart={(e) => dragStartHandler(e, priority, id)}
            onDragOver={dragOverHandler}
            onDrop={(e) => dropHandler(e, priority, id)}
            display="flex"
            flexDirection="row"
            alignItems="center"
            className={todoContainerStyle}
            style={isFocused ? {backgroundColor: "#3f51b5", color: "#ffffff"} : null}
        >
               <DatePicker 
                setIsParentFocused={setIsFocused}
                dialogIsOpen={dialogIsOpen}
                setDialogIsOpen={setDialogIsOpen}
                parentId={id}
                defaultDueDate={dueDate}
                actions={{SET_TODO_DUE_DATE}}
                dispatcher={dispatch}
                setTodoDueDateFn={setTodoDueDate}
              />
                <Checkbox
                  checked={completed}
                  onChange={() => dispatch(toggleTodoCompleted(id))}
                />
                <Box flexGrow={1}>
                  <Typography
                    className={completed ? todoTextCompleted : ""}
                    variant="body1"
                  >
                    {text}
                  </Typography>
                </Box>
                
               { showSetDueDateButton() }
            
                <Button
                  className={deleteTodo}
                  startIcon={<Icon>delete</Icon>}
                  onClick={() => dispatch(deleteTodoFn(id))}
                >
                  Delete
                </Button>
              </Box>

    )
}

export default Todo