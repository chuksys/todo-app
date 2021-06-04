import {Container} from "@material-ui/core";
import Header from "./Header"
import {TodosContextProvider} from "./TodosContext"
import AddTodo from "./components/add_todo/AddTodo"
import Todos from "./components/todos/Todos"
import useLoadMore from "./hooks/useLoadMore"

function App() {
  return (
        <Container maxWidth="md">
                <Header/>
                <TodosContextProvider>
                    <AddTodo />
                    <Todos />
                </TodosContextProvider>
        </Container>
  );
}

export default App;