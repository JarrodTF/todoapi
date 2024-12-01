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
    // private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // getUserTodoList(userId: string): Observable<TodoItem[]> {
  //   const token = localStorage.getItem(this.tokenKey);

  //   if (!token) {
  //     throw new Error('Authentication token not found.');
  //   }

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   return this.http.get<TodoItem[]>(`${this.apiUrl}user/${userId}`, { headers });
  // }

  // getUserTodoList(): Observable<TodoItem[]> {
  //   // return this.http.get<TodoItem[]>(`${this.apiUrl}todoitems`);
  //   //need to use the id of the user
  //   return this.http.get<TodoItem[]>(`${this.apiUrl}ToDoItems/user/500000004`);
  // }

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
}