import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTodo, deleteTodo } from '../actions/todo';

export class Todo extends React.Component {
  state = {
    isLoading: true
  };
  componentDidUpdate(prevState) {
    const { isLoading } = this.props;
    if (isLoading !== prevState.isLoading) {
      this.setState({ isLoading: false });
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
                    <Link to={`/edit-todo/${id}`}>{description}</Link>
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
  isLoading: state.todos.loading
});
export default connect(
  mapStateToProps,
  { getTodo, deleteTodo }
)(Todo);
