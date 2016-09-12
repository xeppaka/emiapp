/**
 * Created by nnm on 3/13/16.
 */

import { createStore } from 'redux';
import todoApp from './reducers';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from './actions';

let store = createStore(todoApp);

console.log(store.getState());

let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

store.dispatch(addTodo('Learn about actions'));
store.dispatch(completeTodo(0));