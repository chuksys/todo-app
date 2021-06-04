import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import AddTodo from "./AddTodo"
import {TodosContextProvider} from "../../TodosContext"


it("renders without crashing", () => {
    render(<TodosContextProvider><AddTodo/></TodosContextProvider>)
    expect(screen.getByPlaceholderText("Enter Tasks Here")).toBeInTheDocument()
    expect(screen.getByText("Add")).toBeInTheDocument()
})