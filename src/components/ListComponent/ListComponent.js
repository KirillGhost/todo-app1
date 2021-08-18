// Core
import React, { useEffect } from 'react';
import TodoItem from '../TodoItem/TodoItem';

function ListComponent(props) {

  const {
    getTodos, todos, changeHandler, editHandler, deleteHandler,
  } = props;

  useEffect(() => {
    getTodos();
  }, []);

  const onTaskStatusChange = (id, data) => {
    changeHandler(id, data);
  }

  const onTaskEdit = (id, data) => {
    editHandler(id, data);
  }

  const onTaskDelete = id => {
    deleteHandler(id);
  }

  const renderTodoItems = () => {
//    console.log('render ', todos);
    if (todos) {
      return todos.map(item => (
        <TodoItem
          key={item.id}
          item={item}
          onTaskStatusChange={onTaskStatusChange}
          onTaskEdit={onTaskEdit}
          onTaskDelete={onTaskDelete}
        />
      ));
    }
  };

  return (
    <div className="todo-list">
      {renderTodoItems()}
    </div>
  );
}

export default ListComponent;