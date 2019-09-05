import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTodo, deleteTodo } from '../actions/todo';

export class Todo extends React.Component {
  state = {
    isLoading: true
  };
  componentDidUpdate() {
    const { isLoading } = this.props;
    if (isLoading !== this.state.isLoading) {
      this.setState({ isLoading: false });
      if (this.state.isLoading === isLoading) {
        this.props.getTodo();
      }
    }
  }
  componentDidMount() {
    this.props.getTodo();
  }
  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <h1>Loading Todo....</h1>
        ) : (
          <div>
            {this.props.todos.todos.length === 0 && <h2>You Have No Todos</h2>}
            {this.props.todos.todos &&
              this.props.todos.todos.map(
                ({ _id: id, description, createdAt, completed }) => (
                  <li key={id}>
                    <Link to={`/todo-edit/${id}`}>{description}</Link>
                    <p>completed status: {JSON.stringify(completed)}</p>
                    <p>{createdAt}</p>
                    <button onClick={() => this.props.deleteTodo(id)}>
                      Delete
                    </button>
                  </li>
                )
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.todos.isLoading
});
export default connect(
  mapStateToProps,
  { getTodo, deleteTodo }
)(Todo);
