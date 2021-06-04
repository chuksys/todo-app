import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Todo from "./Todo"
import {TodosContextProvider} from "../../TodosContext"

it("renders without crashing", () => {
    render(
        <TodosContextProvider>
            <Todo key="23" todo={{ id:"1", text:"Task One", "completed":false }} 
            classes={{ todoContainer:"", todoTextCompleted:"", deleteTodoButton:"" }} 
            actions={{ DELETE_TODO: "DELETE_TODO", 
            TOGGLE_TODO_COMPLETED: "TOGGLE_TODO_COMPLETED", SET_TODO_DUE_DATE: "SET_TODO_DUE_DATE" }}/>
        </TodosContextProvider>    
    )

    expect(screen.getByText("SET Due Date")).toBeInTheDocument()
})