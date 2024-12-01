import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../../interfaces/todo-response';
import { TodoService } from '../../services/todo.service';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService)

  // userId: string = '';
  // userDetails: any = {};
  // todoList: TodoItem[] = [];
  // isLoading: boolean = true;
  newTodo: string = '';
  todoList: TodoItem[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  editingId: number | null = null;
  editingText: string = '';

  constructor(private todoService: TodoService) { }


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadTodos();
    } else {
      console.log('No token found in localStorage');
    }
  }

  loadTodos(): void {
    this.todoService.getUserTodoList().subscribe(
      (data) => {
        this.todoList = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching todo list:', error);
        this.errorMessage = 'No todo items were found';
        this.isLoading = false;
      }
    );
  }

  addTodo(): void {
    if (this.newTodo.trim() === '') {
      return; // Don't add empty todo items
    }

    this.isLoading = true;
    this.todoService.addToDo(this.newTodo).subscribe(
      (addedTodo) => {
        this.todoList.push(addedTodo); // Add the new todo to the list
        this.newTodo = ''; // Clear input
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error adding to-do item.', error;
        this.isLoading = false;
      }
    );
  }

  deleteTodo(item: TodoItem): void {
    this.todoService.deleteTodoItem(item.id).subscribe(
      () => {
        this.todoList = this.todoList.filter((todo) => todo.id !== item.id);
        console.log(`Todo item deleted: ${item.todo}`);
      },
      (error) => {
        console.error('Error deleting todo item:', error);
        this.errorMessage = 'Failed to delete the item. Please try again.';
      }
    );
  }

  toggleComplete(item: TodoItem): void {
    // Update the item's completion status
    this.todoService.updateTodoItem(item).subscribe(
      () => {
        console.log(`Todo item updated: ${item.todo} - isComplete: ${item.isComplete}`);
      },
      (error) => {
        console.error('Error updating todo item:', error);
      }
    );
  }

  startEditing(item: TodoItem): void {
    this.editingId = item.id;
    this.editingText = item.todo; // Prepopulate with the current to-do text
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingText = '';
  }

  updateTodo(item: TodoItem): void {
    if (!this.editingText || this.editingText.trim() === '') {
      alert('Todo text cannot be empty!');
      this.cancelEdit();
      return;
    }
  
    // Update the item's text locally for preview
    const updatedItem: TodoItem = { ...item, todo: this.editingText };
  
    this.todoService.editTodoItem(updatedItem).subscribe(
      (updated) => {
        // Update the local todoList with the new text
        const index = this.todoList.findIndex((todo) => todo.id === item.id);
        if (index !== -1) {
          this.todoList[index] = updated;
        }
        // Exit edit mode
        this.cancelEdit();
      },
      (error) => {
        console.error('Failed to update the todo item:', error);
        alert('Failed to update the todo item. Please try again.');
        this.cancelEdit(); // Exit edit mode even on failure
      }
    );
  }
  // ngOnInit(): void {
  //   this.userId = this.getUserId(); // Implement logic to get userId
  //   this.loadTodoList();
  // }

  // getUserId(): string {
  //   // Example: Fetch userId from localStorage or a user service
  //   return localStorage.getItem('userId') || '';
  // }

  // loadTodoList(): void {
  //   this.todoService.getUserTodoList(this.userId).subscribe(
  //     (todos) => {
  //       this.todoList = todos;
  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Error fetching todo list:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }
}