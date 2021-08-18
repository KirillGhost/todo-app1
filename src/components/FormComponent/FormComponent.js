// Core
import React, { useState } from 'react';
import ListComponent from '../ListComponent/ListComponent';
import PropTypes from 'prop-types';
// Api
import {
  getTodoData, addNewTask, changeCurTaskStatus, editCurrentTask, deleteCurrentTask
} from '../../api/Api';
// Styles
import './FormComponent.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function FormComponent() {

  const [todos, setState] = useState([]);
  const [value, setValue] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    // TODO: add form submit handler
  };

  const onInputTextChange = (event) => {
    setValue(event.target.value);
  };

  const onAddTaskClick = () => {
    setValue('');
    addNewTask(value)
      .then((data) => {
        setState([...todos, data]);
      });
  };

  const getTodos = () => {  
    getTodoData()
      .then((data) => {
        setState(data);
      });
  };

  const changeHandler = (id, data) => {
    changeCurTaskStatus(id, data)
      .then(() => {

        setState(() => {
          const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
              todo.isDone = !todo.isDone
            }
            return todo;
          })
          return updatedTodos;
        })
      });
  }

  const editHandler = (id, data) => {
    editCurrentTask(id, data)
      .then(() => {

        setState(() => {
          const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
              todo.title = data.title
            }
            return todo;
          })
          return updatedTodos;
        })
      });
  }

  const deleteHandler = (id) => {
    deleteCurrentTask(id)
      .then(() => {    
        setState(todos.filter(todo => todo.id !== id));
      })
  }

  return (
    <form className="todo-form" onSubmit={onFormSubmit}>
      <div className="todo-header">
        <div className="todo-add">
          <TextField
            variant="outlined"
            size="small"
            color="primary"          
            className="todo-add-input"
            value={value}
            onChange={onInputTextChange}
          />
        </div>
        <div className="todo-add">
          <Button      
            variant="outlined"          
            color="primary"
            className="todo-add-button"
            size="small"
            value="Add"
            onClick={onAddTaskClick}
          >
            Add
          </Button>
        </div>
      </div>

      <ListComponent
        getTodos={getTodos}
        todos={todos}
        changeHandler={changeHandler}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </form>
  );  
};

FormComponent.propTypes = {
  todos: PropTypes.array,
  value: PropTypes.string,
};

FormComponent.defaultProps = {
  todos: [],
  value: '',  
};

export default FormComponent;