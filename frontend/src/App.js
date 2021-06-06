import {Container} from "@material-ui/core";
import Header from "./Header"
import {TodosContextProvider} from "./context/TodosContext"
import AddTodo from "./components/add_todo/AddTodo"
import Todos from "./components/todos/Todos"
import useLoadMore from "./hooks/useLoadMore"

function App() {
  return (
        <Container maxWidth="md">
            <Header/>
            <AddTodo />
            <Todos />
        </Container>
  );
}

export default App;