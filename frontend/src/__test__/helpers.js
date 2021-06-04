import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

export function getAddTodoTextArea() {
    return screen.getByPlaceholderText("Enter Tasks Here")
}

export function typeIntoAddTodoTextArea(textAreaRef, text) {
    userEvent.type(textAreaRef, text)
}

export function assertTextToBeInTextArea(textAreaRef, text){
    expect(textAreaRef.value).toBe(text)
}

export function assertTextToBeInDOM(text) {
    expect(screen.getByText(text)).toBeInTheDocument()
}

export function getAddTaskButton() {
    return screen.getByText("Add")
}

export async function assertThatTaskAddedIsInDOM(task_added_text) {
    await waitFor(async () => expect(getByText(task_added_text)).toBeInTheDocument())
}
