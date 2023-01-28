import { changeTodo } from "../ts/functions";
import { Todo } from "../ts/models/Todo"

test('should change todo done status', () => {
  let todo: Todo = new Todo('example todo', false);

  changeTodo(todo);

  expect(todo.done).toBeTruthy();
})