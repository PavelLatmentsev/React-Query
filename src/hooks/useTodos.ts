import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todo.service";

export const useTodos=()=> {
    return   useQuery(["todos"], () => todoService.getAllTodos(),
   {
        select: ({ data }) => data,
        enabled:true,
        retry:5,
        onSuccess(data) {
          alert(data[0].title)
        },
        onError(error) {
          alert(error)
        }
      }
    );
}