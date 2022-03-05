import {createReducer, on, Action} from "@ngrx/store";
import {Todo} from "../../models/todo";
import { AppState } from "../app.state";
import { AddTodo, DeleteTodo, LoadingState, loadTodos, loadTodosSuccess, loadTodosError } from "./todo.actions";
import * as TodoActions from "./todo.actions";
 import  * as State from "../app.state";

 
export interface TodoState {
    todos: Todo[];
    loading: boolean
}
    
const initialState: TodoState = {
    todos: [],
    loading: false
};

export const todoReducer = createReducer(
    // The Initial State.
    initialState,
    
    // Add new Todo to State.
    on(AddTodo, (state, {content}) => ({
        ...state,
        todos: [...state.todos, content]
    })),

    // Remove todo from state
    on(DeleteTodo, (state, {id}) => ({
        ...state,
        todos: [...removeAtIndex(id, state)]
        // todos: [...state.todos.slice(id, 1)]
    })),

    // Change loading state
    on(LoadingState, (state, {isLoading}) => ({
        ...state,
        loading: isLoading
    })),

    // Loadtodos => set loading true
    on(loadTodos, (state, {}) => ({
        ...state,
        loading: true
    })),
    
    // Loading has succeded => new state with todos. Reducer is called by the effect.
    on(loadTodosSuccess, (state, {todos}) => ({
        ...state,
        todos: todos,
        loading: false
    })),


    // Loading has Failed. State slice does not contain errors. 
    


    
)

function removeAtIndex(x: number, state: TodoState){
    let newTodos = [...state.todos];
    newTodos.splice(x, 1);
    return newTodos;
}
