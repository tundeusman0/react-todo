import React, { Component } from 'react';
import { connect } from 'react-redux';

export class TodosForm extends Component {
  state = {
    description: '',
    completed: '',
    msg: null
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'TODO_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
        this.props.history.push('/dashboard');
      }
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { description, completed } = this.state;
    const todo = { description, completed };
    console.log(todo);
    this.props.submitForm(todo);
    console.log('submitted');
  };
  render() {
    return (
      <div>
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>{this.props.formName}</h2>
              {this.state.msg && this.state.msg}
              <div className="row clearfix">
                <div className="">
                  <form onSubmit={this.onSubmit}>
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-user"></i>
                      </span>
                      <input
                        type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onChange}
                        name="description"
                        required
                      />
                    </div>
                    <div className="input_field radio_option">
                      <input
                        type="radio"
                        name="completed"
                        value={true}
                        id="rd1"
                        onChange={this.onChange}
                      />
                      <label htmlFor="rd1">Completed</label>
                      <input
                        type="radio"
                        name="completed"
                        value={false}
                        id="rd2"
                        onChange={this.onChange}
                      />
                      <label htmlFor="rd2">Not Completed</label>
                    </div>
                    <input
                      className="button"
                      type="submit"
                      value={this.props.formName}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.todoError
});
export default connect(mapStateToProps)(TodosForm);
