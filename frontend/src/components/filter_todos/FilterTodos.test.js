import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import FilterTodos from "./FilterTodos"
import {TodosContextProvider} from "../../TodosContext"

it("renders without crashing", () => {
    render(<TodosContextProvider><FilterTodos/></TodosContextProvider>)
    expect(screen.getByLabelText("Filter Tasks By Date")).toBeInTheDocument()
    expect(screen.getByText("Reset Filter")).toBeInTheDocument()
})