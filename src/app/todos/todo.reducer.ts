import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, borrar, toggleAll, limpiar } from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Ironman'),
  new Todo('Robar escudo el Capitán América'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        }
      } else {
        return todo;
      }
    });
  }),
  on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
  on(toggleAll, (state, { completado }) => {
    return state.map(todo => {
      return {
        ...todo,
        completado,
      }
    });
  }),
  on(limpiar, state => state.filter(todo => !todo.completado)),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
