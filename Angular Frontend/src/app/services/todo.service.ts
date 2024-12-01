import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../interfaces/todo-response';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
    apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addToDo(newTodo: string): Observable<TodoItem> {
    const userId = this.getUserIdFromToken();
    const newTodoItem: TodoItem = {
      todo: newTodo,
      isComplete: false,
      user_Id: userId,
      id: 0
    };

    console.log("Sending new todo item:", newTodoItem);
    return this.http.post<TodoItem>(`${this.apiUrl}ToDoItems/`, newTodoItem);
  }

  deleteTodoItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}ToDoItems/${id}`);
  }

  getUserTodoList(): Observable<TodoItem[]> {
    const userId = this.getUserIdFromToken(); // Dynamically fetch user ID
    return this.http.get<TodoItem[]>(`${this.apiUrl}ToDoItems/user/${userId}`);
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('token'); // Adjust key if different
    if (!token) {
      throw new Error('Token not found!');
    }
  
    // Decode the token
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    // alert(payload.nameid);
    return payload.userId; // Adjust based on your token structure
  }

  updateTodoItem(updatedItem: TodoItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}ToDoItems/${updatedItem.id}`, updatedItem);
  }
}