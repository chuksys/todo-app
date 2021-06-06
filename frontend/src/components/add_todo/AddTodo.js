import React,{ useState } from "react"
import {Paper, Box,TextField,Button,Icon} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux"
import useStyles from "../../hooks/useStyles"
import {addTodo} from "../../redux/todosReducer"
//import {useTodosContext} from "../../context/TodosContext"

function AddTodo() {

    const [newTodoText, setNewTodoText] = useState("");
    const classes = useStyles()
    const { addTodoContainer, addTodoButton } = classes
    const error = useSelector(state => state.error)
    const dispatch = useDispatch()

    //const { dispatcher, ACTIONS, state } = useTodosContext()
    //const { addTodoContainer, addTodoButton } = state
    //const { ADD_TODO } = ACTIONS
    return (
        <Paper className={addTodoContainer}>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                    <TextField
                    id="add-to-do-input"
                    name="add-to-do-input"
                    label="Enter Tasks Here"
                    fullWidth
                    value={newTodoText}
                    placeholder="Enter Tasks Here"
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            dispatch(addTodo(newTodoText, setNewTodoText))
                        }
                    }}
                    onChange={(event) => setNewTodoText(event.target.value)}
                    />
                </Box>
                <Button
                    data-testid="add-to-do-btn"
                    className={addTodoButton}
                    startIcon={<Icon>add</Icon>}
                    onClick={() => dispatch(addTodo(newTodoText, setNewTodoText))}
                >
                    Add
                </Button>
            </Box>
            {error && 
            <span style={
                {
                    display:"flex", 
                    flexDirection: "row",
                    justifyContent: "center", 
                    alignItems:"center",
                    fontSize: "20px",
                    color: "red",
                    padding: "0.01em",
                    marginTop: "4px"
                }
                }>{error}</span>}
        </Paper>
    )
}

export default AddTodo