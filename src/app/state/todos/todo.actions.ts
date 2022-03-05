import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Todo } from "src/app/models/todo";
import { createAction, props } from '@ngrx/store';


export const AddTodo = createAction(
    '[TODO] add',
    props<{content: Todo}>()
);

export const DeleteTodo = createAction(
    '[TODO] delete',
    props<{id: number}>()
);

export const LoadingState = createAction(
    '[TODO] loading',
    props<{isLoading: boolean}>()
);

export const loadTodos = createAction(
    '[TODO] loadTodos'
);

export const loadTodosSuccess = createAction(
    '[TODO] loadSuccess',
    props<{todos: Todo[]}>()
);

export const loadTodosError = createAction(
    '[TODO] loadError',
    props<{error: string}>()
);

