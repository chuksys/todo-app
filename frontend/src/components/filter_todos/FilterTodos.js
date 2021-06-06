import React, { useState } from "react"
import {Container, TextField, Button} from "@material-ui/core"
import { useTodosContext } from "../../context/TodosContext"
import { format } from 'date-fns';
import { MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import { filterTodosByDueDate, resetTodosDateFilter } from "../../redux/todosReducer"
import { useSelector, useDispatch } from "react-redux"

const formatDate = (date = new Date()) => {
    return format(date, "yyyy-MM-dd")
}

function FilterTodos() {
    const todaysDate = new Date();
    const [selectedDate, setSelectedDate] = useState(formatDate())
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    //const { dispatcher, ACTIONS } = useTodosContext()
    //const { FILTER_TODOS_BY_DATE, RESET_TODOS_DATE_FILTER } = ACTIONS

    const handleChange = (e) => {
        const date = e.target.value
        setSelectedDate(formatDate(new Date(date)))
        dispatch(filterTodosByDueDate(formatDate(new Date(date))))

        //dispatcher(FILTER_TODOS_BY_DATE, {date: formatDate(new Date(date))})
    }

    const style = {
        flexDirection: "row", 
        padding: "0.1em", 
        display: "flex", 
        justifyContent: "space-around",
        alignItem: "center",
        marginBottom: "12px"
    }

    return (
         <Container style={style}>
            <TextField
            type="date" 
            id="filter-tasks-by-date"
            label="Filter Tasks By Date"
            value={selectedDate}
            onChange={handleChange}
            onFocus={handleChange}
            min={new Date()}
            max="2100-05-27"
            format="yyyy-MM-dd"
            InputLabelProps={{
                htmlFor: "filter-tasks-by-date", 
            }}
            /> 
            
            <Button 
            size="small"
            variant="outlined" 
            color="primary" 
            onClick={()=>dispatch(resetTodosDateFilter())}
            >
                Reset Filter
            </Button>

        </Container> 
    )
}

export default FilterTodos