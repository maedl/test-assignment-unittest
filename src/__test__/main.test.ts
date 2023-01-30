/**
 * @jest-environment jsdom
 */

import * as main  from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from '../ts/models/Todo';
import { IAddResponse } from '../ts/models/IAddResult';
import { body } from './html';

beforeEach(() => {
  document.body.innerHTML = '';
  document.body.innerHTML = body;
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('tests for createNewTodo', () => {

  test('should call addTodo', () => {
    let todoList: Todo[] = [];
    let inputText = 'valid todo text';
    
    let addedResponse: IAddResponse = {success: true, error: ''};
    let spyOnAddTodo = jest.spyOn(functions, 'addTodo').mockReturnValue(addedResponse); 
    
    main.createNewTodo(inputText, todoList);
    expect(spyOnAddTodo).toHaveBeenCalled();
    expect(spyOnAddTodo).toHaveBeenCalledWith(inputText, todoList);
  })

  test('should call createHtml', () => {
    let todoList: Todo[] = [];
    let inputText = 'valid todo text';
    let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();

    main.createNewTodo(inputText, todoList);

    expect(spyOnCreateHtml).toHaveBeenCalled();
  })

  test('should call displayError', () => {
    let todoList: Todo[] = [];
    let inputText = 'a'; // invalid todo text, too short
    
    let spyOnDisplayError = jest.spyOn(main, 'displayError')

    main.createNewTodo(inputText, todoList);
    expect(spyOnDisplayError).toHaveBeenCalled();
  })

})

describe('tests for createHtml', () => {
  
  test('should add li elements to ul container', () => {
    let inputText: string = 'example todo';
    let doneStatus: boolean = false;
    let todoList: Todo[] = [];

    let todo: Todo = new Todo(inputText, doneStatus);
    todoList.push(todo)

    main.createHtml(todoList);

    let liElement: HTMLLIElement = document.querySelector('#todos li') as HTMLLIElement;
    expect(liElement.innerHTML).toBe('example todo');
  })

  test('should add done class to li elements in ul container', () => {
    let inputText: string = 'example todo';
    let doneStatus: boolean = true;
    let todoList: Todo[] = [];

    let todo: Todo = new Todo(inputText, doneStatus);
    todoList.push(todo)

    main.createHtml(todoList);

    let liElement: HTMLLIElement = document.querySelector('#todos li') as HTMLLIElement;
    expect(liElement.innerHTML).toBe('example todo');
    expect(liElement.classList.contains('todo__text--done')).toBeTruthy();
  })

  test('should add regular text class to li elements in ul container', () => {
    let inputText: string = 'example todo';
    let doneStatus: boolean = false;
    let todoList: Todo[] = [];

    let todo: Todo = new Todo(inputText, doneStatus);
    todoList.push(todo)

    main.createHtml(todoList);

    let liElement: HTMLLIElement = document.querySelector('#todos li') as HTMLLIElement;
    expect(liElement.innerHTML).toBe('example todo');
    expect(liElement.classList.contains('todo__text')).toBeTruthy();
  })

})

describe('test for toggleTodo', () => {

  test('should call changeTodo', () => {
    // arrange
    let todo: Todo = new Todo('example Todo', false);
    let spy = jest.spyOn(functions, 'changeTodo').mockReturnValue();

    main.toggleTodo(todo);

    expect(spy).toHaveBeenCalled();
  })

  test('should call createHtml', () => {
    let todo: Todo = new Todo('example Todo', false);
    let spy = jest.spyOn(main, 'createHtml').mockReturnValue();
    
    main.toggleTodo(todo);

    expect(spy).toHaveBeenCalled();
  })

}
)

describe('tests for displayError', () => {

  test('should add class to error container', () => {
    let errorMsg = 'Error!';
    let errContainer: HTMLDivElement = document.querySelector('#error') as HTMLDivElement;
    
    main.displayError(errorMsg, true);

    expect(errContainer.innerHTML).toBe('Error!');
    expect(errContainer.classList.contains("show")).toBeTruthy();
  })

  test('should NOT add class to error container', () => {
    let errorMsg = 'Error!';
    let errContainer: HTMLDivElement = document.querySelector('#error') as HTMLDivElement;
    
    main.displayError(errorMsg, false);

    expect(errContainer.classList.contains("show")).toBeFalsy();
  })

  test('should add error msg to error container', () => {
    let errorMsg = 'Error!';
    let errContainer: HTMLDivElement = document.querySelector('#error') as HTMLDivElement;
    
    main.displayError(errorMsg, true);

    expect(errContainer.innerHTML).toBe('Error!');
  })


})

describe('tests for clearTodos', () => {

  test('should call removeAllTodos', () => {
    let todoList: Todo[] = [];
    let spy = jest.spyOn(functions, 'removeAllTodos').mockReturnValue();

    main.clearTodos(todoList);

    expect(spy).toHaveBeenCalled();
  })

  test('should call removeAllTodos', () => {
    let todoList: Todo[] = [];
    let spy = jest.spyOn(main, 'createHtml').mockReturnValue();

    main.clearTodos(todoList);

    expect(spy).toHaveBeenCalled();
  })

})