import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AddTodo,
  DeleteTodo,
  loadTodos,
  loadTodosSuccess
} from './todo.actions';
// import { TodoService } from '../../todo/todo.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectAllTodos } from './todo.selectors';
import { AppState } from '../app.state';
import { TodoService } from 'src/app/services/todo.service';

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}


  // Run this code when the addTodo or removeTodo action is dispatched
  saveTodos$ = createEffect(
      () => 
    this.actions$.pipe(
        ofType(AddTodo, DeleteTodo),
        withLatestFrom(this.store.select(selectAllTodos)),
        switchMap(([action, todos]) => (from(this.todoService.saveTodos(todos))))
    ),
    { dispatch: false }
  );

  // Add effect to load todos
    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodos),
            switchMap(() => from(this.todoService.loadTodos()).pipe(
                map((todos) => loadTodosSuccess({todos: todos}))
            )
            )
        )
    );

}