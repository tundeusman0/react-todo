import React, { Component } from 'react';

export default class TodosForm extends Component {
  state = {
    description: '',
    completed: '',
    msg: null
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log('submitted');
  };
  render() {
    return (
      <div>
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>{this.props.formName}</h2>
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
