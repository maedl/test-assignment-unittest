import { addTodo, changeTodo, removeAllTodos, sortTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo"

describe('test for changeTodo', () => {

  test('should change todo done status', () => {
    let todo: Todo = new Todo('example todo', false);
    changeTodo(todo);
    expect(todo.done).toBeTruthy();
  })

})

describe('test for removeAllTodos', () => {

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
  
})

describe('tests for addTodo', () => {

  test('should add todo to list', () => {
    let todoList: Todo[] = [];
    let todoText: string = 'example todo'
  
    addTodo(todoText, todoList);
    expect(todoList.length).toBe(1);
    expect(todoList[todoList.length - 1].text).toBe(todoText);
  })
  
  test('should NOT add todo to list', () => {
    let todoList: Todo[] = [];
    let todoText: string = 'a'  // should be too short
    let originalLength: number = todoList.length;
  
    addTodo(todoText, todoList);
    expect(todoList.length).toBe(originalLength);
  })
  
})


describe('sorting test', () => {
  test('should sort todo list', () => {
    let todoList: Todo[] = [
      new Todo('b', false),
      new Todo('c', false),
      new Todo('a', false)
    ]
 
    sortTodos(todoList);

    expect(todoList[0].text).toBe('a');
    expect(todoList[1].text).toBe('b');
    expect(todoList[2].text).toBe('c');
  })

})