import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { AddTodo, DeleteTodo, LoadingState, loadTodos } from 'src/app/state/todos/todo.actions';
import { selectAllTodos, selectLoadingState } from '../../state/todos/todo.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public allTodos$ = this.store.select(selectAllTodos);
  // public loading: Observable<boolean> = this.store.select(selectLoadingState);
  public loading?: boolean;
  public todo = '';

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
     this.store.select(selectLoadingState).subscribe(x => this.loading = x);
     this.store.dispatch(loadTodos())
  }

  addTodo(){
    this.store.dispatch(AddTodo({content: {body: this.todo, lastChanged: new Date() }}))
    this.todo = '';
  }

  removeTodo(i: number){
    this.store.dispatch(DeleteTodo({id: i}))
    console.log("Remove Todo Triggered " + i);
  }

  toggleLoading(){
    this.store.dispatch(LoadingState({isLoading: !this.loading}))
    console.log("The loading inverted: " + !this.loading)
  }

}
