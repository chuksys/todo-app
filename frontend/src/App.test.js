import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen, act, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import App from "./App"
import {TodosContextProvider} from "./TodosContext"
import { setupServer } from 'msw/node'
import serverRequestHandlers from "./__test__/serverSetupHandlers"
//import TodoDatePicker from "./components/todo_date_picker/TodoDatePicker"

const server = setupServer(...serverRequestHandlers)

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
});

afterEach(() => {
    server.resetHandlers()
})
afterAll(() => server.close())

it("App should show Loading... message on initial load then fetch and display tasks from backend", async () => {
        const { getByText, getByPlaceholderText, debug, getByRole, getByLabelText } = render(<TodosContextProvider><App/></TodosContextProvider>)
        expect(getByText("Loading...")).toBeInTheDocument()

        await waitFor(async () => expect(getByText("Incomplete Task")).toBeInTheDocument())
})

it("User should be able to enter tasks in Add Todo TextField", () => {
        const { getByText, getByPlaceholderText, debug, getByRole, getByLabelText } = render(<TodosContextProvider><App/></TodosContextProvider>)
        const addTodoTextField = getByPlaceholderText("Enter Tasks Here")
        expect(addTodoTextField).toBeInTheDocument()

        userEvent.type(addTodoTextField, "Task One")
        expect(addTodoTextField.value).toBe("Task One")
})

it("When User enters tasks in Add Todo TextField, tasks are added to DOM", async () => {
        const { getByText, getByPlaceholderText, debug, getByRole, getByLabelText } = render(<TodosContextProvider><App/></TodosContextProvider>)
        const addTodoTextField = getByPlaceholderText("Enter Tasks Here")
        const addTodoButton = getByRole("button", { name: "Add"})

        expect(addTodoTextField).toBeInTheDocument()
        expect(addTodoButton).toBeInTheDocument()

        await waitFor(async () => expect(getByText("Incomplete Task")).toBeInTheDocument())

        userEvent.type(addTodoTextField, "Task One")
        userEvent.click(addTodoButton)

        await waitFor(async () => expect(getByText("Task One")).toBeInTheDocument())

        userEvent.type(addTodoTextField, "Task Two")
        userEvent.click(addTodoButton)

        await waitFor(async () => expect(getByText("Task Two")).toBeInTheDocument())
})

it("When User clicks on checkbox of incomplete task, task completion status is toggled and Set Due Date disappears", async () => {
      const { getByText, getByPlaceholderText, debug, getByRole, getByLabelText } = render(<TodosContextProvider><App/></TodosContextProvider>) 
      let todoCheckBox
      let incompleteTaskEl
      await waitFor(async() => {
          todoCheckBox = getByRole("checkbox", {checked: false})
          incompleteTaskEl = getByText("Incomplete Task") 
      })

      expect(getByText("SET Due Date")).toBeInTheDocument()

      userEvent.click(todoCheckBox)

      waitForElementToBeRemoved(getByText("SET Due Date"))
})

// I'll update this test to render the DatePicker Dialog... it's a Portal
xit("When User clicks on Set Due Date DatePicker Dialog Appears", async () => {
    const { getByText, getByPlaceholderText, debug, getByRole, getByLabelText } = render(<TodosContextProvider><App/></TodosContextProvider>) 
    let setDueDateBtn
    let incompleteTaskNode 
    
    await waitFor(async() => {
        incompleteTaskNode = getByText("Incomplete Task")
        setDueDateBtn = getByRole("button", {name: "SET Due Date"})
    })

    userEvent.click(setDueDateBtn)

    let setDueDateDialog
    await waitFor(async() => {
        setDueDateDialog = getByRole("button",{name: "OK"})
        
    })

    expect(setDueDateDialog).toBeInTheDocument()
    
})

// I'll update this test to render the DatePicker Dialog... it's a Portal 
xit("When User clicks on Ok button in DatePicker, task due date is set", async () => {
    const { getByText, getByPlaceholderText, debug, getByRole, getByLabelText } = render(<TodosContextProvider><App/></TodosContextProvider>) 
    let setDueDateBtn
    let incompleteTaskNode 

    await waitFor(async() => {
        incompleteTaskNode = getByText("Incomplete Task")
        setDueDateBtn = getByText("SET Due Date")
    })

    userEvent.click(setDueDateBtn)

    let setDueDateDialog
    await waitFor(async() => {
        setDueDateDialog = getByRole("button",{name: "OK"})
        
    })

    expect(setDueDateDialog).toBeInTheDocument()

    userEvent.click(getByText("OK"))

    await waitFor(async() => expect(getByText("CHANGE Due Date").toBeInTheDocument()))

})

/**xit("When DatePicker Pops up, dates in the past are disabled")

xit("When user focuses on filter tasks by date textfield, tasks are filtered by today's date")

it("When user clicks on delete button, task is removed from DOM") */