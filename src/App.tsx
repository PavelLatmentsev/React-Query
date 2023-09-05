import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ITodo } from "./app.interface";
const todoId = 1;
function App() {
  // const {isLoading, isSuccess,error, data}=useQuery(["todos", todoId],()=>fetch("https://jsonplaceholder.typicode.com/todos/1").then(res=>res.json())); // вариант с фетчем
  const { isLoading, isSuccess, error, data } = useQuery(
    ["todos", todoId],
    () => axios.get<ITodo>("https://jsonplaceholder.typicode.com/todos/1"),
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
      ) : data ? (
        <h1>Todo: {data.title}</h1>
      ) : (
        <h1>data not found</h1>
      )}
    </div>
  );
}

export default App;
