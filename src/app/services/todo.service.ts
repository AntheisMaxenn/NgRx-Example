import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Service for localStorage Persistance.

  constructor() { }

  // Local Storage.
  // Get todos async service
  async loadTodos(): Promise<Todo[]>{
    // Check if local storage has item
    var localResult = localStorage.getItem('todos');
    // Null check
    if(localResult == null) return []
    // return localStorage or empty Todo[]

    console.log("The localResult is: " + JSON.parse(localResult));
    return JSON.parse(localResult)
  }

  // Save todos async
  async saveTodos(todos: Todo[]): Promise<boolean>{

    try{

      localStorage.setItem('todos', JSON.stringify(todos))
      return true

    }catch(error){
      console.log('There was an error saving todos: ' + error);
      return false
    }

  }

  // TODO: Persist todos with backend.

}
