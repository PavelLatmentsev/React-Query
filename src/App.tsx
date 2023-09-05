import { useQuery } from "@tanstack/react-query";
import todoService from "./services/todo.service";
function App() {
  // const {isLoading, isSuccess,error, data}=useQuery(["todos", todoId],()=>fetch("https://jsonplaceholder.typicode.com/todos/1").then(res=>res.json())); // вариант с фетчем
  const { isLoading, isSuccess, error, data } = useQuery(
    ["todos"],
    // () => axios.get<ITodo>("https://jsonplaceholder.typicode.com/todos/1"), для примера одиночный запрос
    () => todoService.getAllTodos(),
    {
      select: ({ data }) => data,
    }
  );
  console.log(data, isLoading, isSuccess, error);
  return (
    <div>
      {/* {error && <div>{error}</div>} */}
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.length ? data.map(todo => (
        <div><b>{todo.id}:</b>{todo.title}</div>
      )) : (
        <h1>data not found</h1>
      )}
    </div>
  );
}

export  {App};
