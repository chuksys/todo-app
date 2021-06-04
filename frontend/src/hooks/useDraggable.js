import React from "react"
import { useTodosContext } from "../TodosContext"

function useDraggable() {
    const { dispatcher, ACTIONS } = useTodosContext()
    const { CHANGE_TODO_PRIORITY } = ACTIONS

    function dropHandler(e, todoPriority, todoId) {
        e.preventDefault()
        const dragTargetTodoId = e.dataTransfer.getData("todoId")
        let dragTargetTodoPriority = e.dataTransfer.getData("todoPriority")

        const priority = todoPriority + 1
        dispatcher(CHANGE_TODO_PRIORITY, {dragid: dragTargetTodoId, dropid: todoId, priority})
    }

    function dragOverHandler(e){
        e.preventDefault()
    }

    function dragStartHandler(e, todoPriority, todoId) {
        e.dataTransfer.setData("todoPriority", todoPriority)
        e.dataTransfer.setData("todoId", todoId)
        e.dataTransfer.dropEffect = "move"
        /*  setTimeout(()=> {
            e.target.style = "display: none"
        }, 0)  */
    }

    return {
        dragStartHandler,
        dropHandler,
        dragOverHandler
    }
}

export default useDraggable