import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useTodos } from "./hooks/useTodos";
import "./App.css";
import { SyntheticEvent, useState } from "react";
import todoService from "./services/todo.service";

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
  //     retry:5, //кол-во повторных запросов до момента показа ошибки
  //     onSuccess(data) {
  //       alert(data[0].title)
  //     },
  //     onError(error) {
  //       alert(error)
  //     }
  //   }
  // );

  // Вариант через хук

  // const{data, isLoading, isSuccess, error, refetch} = useTodos();//вытаскиваем из хука рефетч
  const [title, setTitle] = useState("");
  const { data, isLoading, isSuccess, error, refetch } = useTodos();
  const queryClient = useQueryClient();
  console.log(data, isLoading, isSuccess, error);
  const countFetching = useIsFetching();
  const { mutate } = useMutation(
    ["create todo"],
    (title: string) => todoService.create(title),
    {
      async onSuccess() {
        setTitle(" "), alert("Todo created");
        await refetch(); //просто для примера обычно так не пишут
      },
      onSettled() {
        console.log("Выполняюсь всегда");
      },
    }
  );

  const submitHeandler = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate(title);
  };

  return (
    <div>
      {/* <button onClick={()=> refetch()}>Refresh</button> Вариант с рефетчем*/}
      {/* {error && <div>{error}</div>} */}
      <button onClick={() => queryClient.invalidateQueries(["todos"])}>
        Refresh
      </button>
       {!!countFetching && <h3>countFetching: {countFetching}</h3>}
      <h1>TODOS</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.length ? (
        <div className="todosItem">
          {data.map((todo) => (
            <div key={todo.id}>
              <b>{todo.id}:</b>
              {todo.title}
            </div>
          ))}
        </div>
      ) : (
        <div>data not found</div>
      )}
      <div>
        <h2>Create Todo</h2>
        <form onSubmit={submitHeandler}>
          <div>
            <input
              type="text"
              title={title}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Enter todo title"
            />
          </div>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
}

export { App };
