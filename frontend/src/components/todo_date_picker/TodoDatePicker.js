import React, { useState,useEffect } from "react"
import { MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import { Paper, Box, Dialog } from "@material-ui/core";

function TodoDatePicker(props) {
    const { 
        dialogIsOpen, 
        setDialogIsOpen, 
        setIsParentFocused, 
        parentId, 
        actions,
        dispatcher, 
        defaultDueDate 
    } = props

    const formatDate = (date = new Date()) => {
         return format(new Date(date.toString()), "yyyy-MM-dd")
    }

    const [dueDate, setDueDate] = useState(formatDate(defaultDueDate));

    const handleDateChange = (date) => {
        setDueDate(formatDate(date))
        console.log(date)
        dispatcher(actions.SET_TODO_DUE_DATE, {"id": parentId, "dueDate": formatDate(date)})
    };

     useEffect(()=>{
        if(!dialogIsOpen) setIsParentFocused(false)
    }, [dialogIsOpen]) 

    return (
        <Dialog open={dialogIsOpen} onBackdropClick={()=> setDialogIsOpen(false)} >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Paper style={{ overflow: "hidden" }}>
                            <DatePicker
                                InputLabelProps={{
                                    htmlFor: "set-due-date", 
                                }}
                                id="set-due-date"
                                label="Set Due Date"
                                open={dialogIsOpen}
                                variant="dialog"
                                date={dueDate}
                                value={dueDate}
                                type="text"
                                format="yyyy-MM-dd"
                                disablePast={true}
                                initialFocusedDate={defaultDueDate}
                                onChange={handleDateChange}
                                onClose={() => setDialogIsOpen(false)}
                              />
                    </Paper>
                </MuiPickersUtilsProvider>
        </Dialog>
    )
}

export default TodoDatePicker