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
});

describe('tests for createNewTodo', () => {

  test('should call addTodo', () => {
    let todoList: Todo[] = [];
    let inputText = 'valid todo text';
    
    let addedResponse: IAddResponse = {success: true, error: ''};
    let spyOnAddTodo = jest.spyOn(functions, 'addTodo').mockReturnValue(addedResponse); 
    
    main.createNewTodo(inputText, todoList);
    expect(spyOnAddTodo).toHaveBeenCalled();
  
    spyOnAddTodo.mockRestore();
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