import { useQuery } from "@tanstack/react-query";
const todoId=1;
function App() {
  const {isLoading, isSuccess,error, data}=useQuery(["todos", todoId],()=>fetch("https://jsonplaceholder.typicode.com/todos/1").then(res=>res.json()));
  console.log(data, isLoading, isSuccess,error,)
  return (<>
  {data ? <h1>Todo: {data.title}</h1>: <h1>Идет загрузка</h1>}
  </>);
}

export default App;
