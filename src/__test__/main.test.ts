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
    let inputText = 'invalid todo text';
    
    let addedResponse: IAddResponse = {success: false, error: ''};
    let spyOnAdddisplayError = jest.spyOn(functions, 'addTodo').mockReturnValue(addedResponse); 
    
    main.createNewTodo(inputText, todoList);
    expect(spyOnAdddisplayError).toHaveBeenCalled();
  
  })

})

describe('tests for createHtml', () => {
  
  test('should add li elements to ul container', () => {
    let todoList: Todo[] = [];

      let todo: Todo = new Todo('example todo', false);
      todoList.push(todo)

    main.createHtml(todoList);

    // expect ett html element

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