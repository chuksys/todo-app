import {useState, useEffect} from "react"

function useTodos(){
    const LOADING_LIMIT = 20;
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filteredTodos, setFilteredTodos] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)
    const [filterDate, setFilterDate] = useState("")
    const [offset, setOffset] = useState(todos.length)

    function loadTodos() {
          setOffset(0)
          fetch(`http://localhost:3001/api/todos?offset=0&limit=${LOADING_LIMIT}`)
            .then(handleErrors)
            .then((response) => response.json())
            .then((todos) => {
              setTodos(todos)
              setIsLoading(false)
              setOffset(prevState => (prevState + LOADING_LIMIT))
            })
            .catch(error => console.error("An Error Occured!", error))
    }

     function loadMoreTodos(setIsBottom) {
          fetch(`http://localhost:3001/api/todos?offset=${offset}&limit=${LOADING_LIMIT}`)
            .then(handleErrors)
            .then((response) => response.json())
            .then((todos) => {
              if(todos.length < 1) return null
              setTodos(prevTodos => ([...prevTodos, ...todos]))
              setOffset(prevState => (prevState + LOADING_LIMIT))
              setIsBottom(false)
            })
            .catch(error => console.error("An Error Occured!", error))
      }

       function loadFilteredTodos() {
          setOffset(0)
          fetch(`http://localhost:3001/api/todos?offset=0&limit=${LOADING_LIMIT}&date=${filterDate}`)
            .then(handleErrors)
            .then((response) => response.json())
            .then((todos) => {
              setFilteredTodos(todos)
              setIsLoading(false)
              setOffset(prevState => (prevState + LOADING_LIMIT))
            })
            .catch(error => console.error("An Error Occured!", error))
    }

     function loadMoreFilteredTodos(date, setIsBottom) {
          fetch(`http://localhost:3001/api/todos?offset=${offset}&limit=${LOADING_LIMIT}&date=${filterDate}`)
            .then(handleErrors)
            .then((response) => response.json())
            .then((todos) => {
              if(todos.length < 1) return null
              setFilteredTodos(prevTodos => ([...prevTodos, ...todos]))
              setOffset(prevState => (prevState + LOADING_LIMIT))
              setIsBottom(false)
            })
            .catch(error => console.error("An Error Occured!", error))
      }

      useEffect(() => {
        const controller = new AbortController()
        if(!isFiltered) { 
            loadTodos()
        } else {
          loadFilteredTodos()
        }
        return () => controller.abort()

      }, [setIsFiltered, isFiltered]);

      function handleErrors(response) {
        if (!response.ok) {
            throw Error(`${response.status} => ${response.statusText}`);
        }
        return response;
      }

      function addTodo(text, setNewTodoText) {
        resetTodosDateFilter()
        if(text === "") return
        fetch("http://localhost:3001/api/todos", {
           headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ text }),
        })
          .then(handleErrors)
          .then((response) => response.json())
          .then((todo) => setTodos([...todos, todo]))
          .catch(error => console.error("An Error Occured!", error))
          setNewTodoText("")
      }  

    function filterTodosByDate(date) {
        const filteredTodos = todos.filter(todo => todo.due_date === date)
        setFilterDate(date)
        setFilteredTodos(filteredTodos)
        setIsFiltered(true)
    }
 
    function toggleTodoCompleted(id) {
        fetch(`http://localhost:3001/api/todos/${id}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    completed: !todos.find(todo => todo.id === id).completed,
                }),
                }).then(handleErrors)
                .then(() => {
                const newTodos = [...todos];
                const modifiedTodoIndex = newTodos.findIndex(todo => todo.id === id);
                newTodos[modifiedTodoIndex] = {
                    ...newTodos[modifiedTodoIndex],
                    completed: !newTodos[modifiedTodoIndex].completed,
                };
                setTodos(newTodos);
                }).catch(error => console.error("An Error Occured!", error))
        }
    
        function deleteTodoFn(id) {
              fetch(`http://localhost:3001/api/todos/${id}`, {
                method: "DELETE",
              }).then(handleErrors)
              .then(() => setTodos(todos.filter(todo => todo.id !== id)))
              .catch(error => console.error("An Error Occured!", error));
        } 

        function setTodoDueDate(id, dueDate) {
              fetch(`http://localhost:3001/api/todos/${id}`, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                  due_date: dueDate,
                }),
              }).then(handleErrors).then(() => {
                const newTodos = [...todos];
                const modifiedTodoIndex = newTodos.findIndex(todo => todo.id === id);
                newTodos[modifiedTodoIndex] = {
                  ...newTodos[modifiedTodoIndex],
                  due_date: dueDate,
                };
                setTodos(newTodos);
              }).catch(error => console.error("An Error Occured!", error));
        }

        function resetTodosDateFilter() {
          setIsFiltered(false)
          setOffset(LOADING_LIMIT)
        }

        function changeTodoPriority(dragid, dropid, priority) {
            fetch(`http://localhost:3001/api/todos/${dragid}`, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                  priority: priority,
                }),
              }).then(handleErrors).then(response => response.json())
              .then((updatedtodos) => {
                setTodos(updatedtodos);
              }).catch(error => console.error("An Error Occured!", error));
        }

        return {
            todos,
            isLoading,
            filteredTodos,
            isFiltered,
            resetTodosDateFilter,
            addTodo,
            toggleTodoCompleted,
            deleteTodoFn,
            setTodoDueDate,
            filterTodosByDate,
            loadMoreTodos,
            changeTodoPriority
        }

}

export default useTodos