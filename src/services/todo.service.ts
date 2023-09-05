import axios  from "axios";
import { ITodo } from "../app.interface";

class TodoService {
  private URL = "https://jsonplaceholder.typicode.com/todos";

  async getById(id: string) {
    return axios.get<ITodo>(`${this.URL}/${id}`);
  }

  async getAllTodos() {
    return axios.get<ITodo[]>(`${this.URL}`);
  }
}

export default new TodoService();
