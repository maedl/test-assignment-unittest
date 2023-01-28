import { changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo"

test('should change todo done status', () => {
  let todo: Todo = new Todo('example todo', false);

  changeTodo(todo);

  expect(todo.done).toBeTruthy();
})

test('should remove all todos from array', () => {
  let todoList: Todo[] = [];

  for (let i = 0; i < 3; i++) {
    let todo: Todo = new Todo('example todo', false);
    todoList.push(todo)
  }

  let originalLength = todoList.length;

  removeAllTodos(todoList);

  expect(originalLength).toBe(3);
  expect(todoList.length).toBe(0);
})
