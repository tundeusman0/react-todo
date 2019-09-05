import React from 'react';
import { Link } from 'react-router-dom';

export class Todo extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/todo-edit/:id`}>Todo 1</Link>
        <Link to={`/todo-edit/:id`}>Todo 1</Link>
      </div>
    );
  }
}
export default Todo;
