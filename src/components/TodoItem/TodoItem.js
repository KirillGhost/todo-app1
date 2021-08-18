// Core
import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
// Engine
import { keyCodes } from '../../engine/config/constants/keyCodes';
// Styles
import './TodoItem.css';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

function TodoItem(props) {
  const {
    item, onTaskStatusChange, onTaskEdit, onTaskDelete,
  } = props;

  const [edit, setEdit] = useState(false);  

  const { id, isDone, title } = item;

  const todoTextClassNames = classnames('todo-text', {
    'task-done-style': isDone,
  });

  const ref = useRef(null);

  const changeStatusHandler = () => {
    onTaskStatusChange(id, !isDone);
  }

  const editButtonHandler = (ev) => {
    setEdit(!edit);    
  }

  const editTaskHandler = () => {
    onTaskEdit(id, ref.current.value);
  }

  const deleteTaskHandler = () => {
    onTaskDelete(id);
  }

  const keyDownHandler = (ev) => {
    if ((ev.keyCode === keyCodes.ESC) || (ev.keyCode === keyCodes.ENTER)) {
      if (ev.keyCode === keyCodes.ESC) {
        ref.current.value=ref.current.defaultValue;
      }
      ev.target.blur();
      setEdit(!edit);      
    }
  }

  useEffect(() => {
    if (edit) {
      ref.current.focus();
    }
  }, [edit]);

  return (
    <div className="todo-item">
      <div>
        <Checkbox
          className="todo-check"
          checked={isDone}
          color="primary"
          onChange={changeStatusHandler}
        />
      </div>
      <div>
        <TextField
          inputRef={ref}
          className={todoTextClassNames}
          color="primary"
          defaultValue={title}
          disabled={!edit}          
          onBlur={editTaskHandler}
          onKeyDown={keyDownHandler}
        />
      </div>
      <div className="todo-edit">
        <Button
          variant="contained"
          color="primary"
          className="todo-edit-btn"
          size="small"
          value="Edit"
          onClick={editButtonHandler}
        >
          {edit ? 'Save' : 'Edit'}
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className="todo-delete-btn"
          value="Del"
          onClick={deleteTaskHandler}
        >
          Del
        </Button>
      </div>
    </div>
  );
}

export default TodoItem;