import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import Todos from "./Todos"
import {TodosContextProvider} from "../../TodosContext"
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import serverRequestHandlers from "../../__test__/serverSetupHandlers"

const server = setupServer(...serverRequestHandlers)

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
});

afterEach(() => {
    server.resetHandlers()
})
afterAll(() => server.close())

it("renders without crashing and user can see Tasks", async () => {
    render(<TodosContextProvider><Todos/></TodosContextProvider>)
    expect(screen.getByText("Loading...")).toBeInTheDocument()
    await waitFor( async() => expect(screen.getByText("Incomplete Task")).toBeInTheDocument())
})