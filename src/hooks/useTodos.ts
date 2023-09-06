import { useQuery } from "@tanstack/react-query";
import todoService from "../services/todo.service";
import { ITodo } from "../app.interface";
import { AxiosResponse } from "axios";

export const useTodos=()=> {

    const data: AxiosResponse<ITodo[], any> = {
        data: [
          {
            id:1,
            completed:false,
            title:"hello, im initial data",
            userId:1,
          }
        ]
      }
    return   useQuery(["todos"], () => todoService.getAllTodos(),
   {
        select: ({ data }) => data,
        initialData() {
            return data
        },
        enabled:true,
        retry:5,
        onSuccess(data) {
          alert(data[0].title)
        },
        onError(error) {
          alert(error)
        },
        staleTime:10,//время после которого данные считаются устаревшими и произойдет новый запрос.
        cacheTime:10// сколько времени данные будут лежать в кэше, после чего они будут полностью удалены
      }
    );
}