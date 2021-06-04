import React,{ useState } from "react"
import {Paper, Box,TextField,Button,Icon} from "@material-ui/core";

import {useTodosContext} from "../../TodosContext"

function AddTodo() {
    const [newTodoText, setNewTodoText] = useState("");
    const { dispatcher, ACTIONS, state } = useTodosContext()
    const { addTodoContainer, addTodoButton } = state
    const { ADD_TODO } = ACTIONS
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
                        dispatcher(ADD_TODO, {newTodoText, setNewTodoText})
                        }
                    }}
                    onChange={(event) => setNewTodoText(event.target.value)}
                    />
                </Box>
                <Button
                    data-testid="add-to-do-btn"
                    className={addTodoButton}
                    startIcon={<Icon>add</Icon>}
                    onClick={() => dispatcher(ADD_TODO, {newTodoText, setNewTodoText})}
                >
                    Add
                </Button>
            </Box>
        </Paper>
    )
}

export default AddTodo