import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import {TodosContextProvider} from "../../TodosContext"
import TodoDatePicker from "./TodoDatePicker"
import { v4 as uuidv4 } from "uuid"

it("renders without crashing", () => {
    render(
    <TodosContextProvider><TodoDatePicker
    dialogIsOpen = {true} 
    setDialogIsOpen = {jest.fn()}
    setIsParentFocused = {jest.fn()}
    parentId = {uuidv4()}
    actions = "SET_TODO_DUE_DATE"
    dispatcher = {jest.fn()}
    defaultDueDate = {new Date()} /></TodosContextProvider>)

    expect(screen.getByText("Cancel")).toBeInTheDocument()
})