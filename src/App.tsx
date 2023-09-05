import { useTodos } from "./hooks/useTodos";

function App() {
  // const {isLoading, isSuccess,error, data}=useQuery(["todos", todoId],()=>fetch("https://jsonplaceholder.typicode.com/todos/1").then(res=>res.json())); // вариант с фетчем

  // //вариант через компонент
  // const { isLoading, isSuccess, error, data } = useQuery(
  //   ["todos"],
  //   // () => axios.get<ITodo>("https://jsonplaceholder.typicode.com/todos/1"), для примера одиночный запрос
  //   () => todoService.getAllTodos(),
  //   {
  //     select: ({ data }) => data,
  //     enabled:true, //   enabled:!!Query.id, когда product/1 не выполнится пока не будет id, false/true
  //     retry:5, //колво повторных запросов до момента показа ошибки
  //     onSuccess(data) {
  //       alert(data[0].title)
  //     },
  //     onError(error) {
  //       alert(error)
  //     }
  //   }
  // );

  // Вариант через хук

  const{data, isLoading, isSuccess, error} = useTodos();
  console.log(data, isLoading, isSuccess, error);
  return (
    <div>
      {/* {error && <div>{error}</div>} */}
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.length ? data.map(todo => (
        <div key={todo.id}><b>{todo.id}:</b>{todo.title}</div>
      )) : (
        <h1>data not found</h1>
      )}
    </div>
  );
}

export  {App};
