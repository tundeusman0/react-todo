import React, { Component } from 'react';

export default class Form extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    msg: null
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
      e.preventDefault();
      console.log("submitted")
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
                    {this.props.formName === 'Register' && (
                      <div className="input_field">
                        <span>
                          <i aria-hidden="true" className="fa fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Name"
                          value={this.state.name}
                          onChange={this.onChange}
                          name="name"
                          required
                        />
                      </div>
                    )}

                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onChange}
                        name="email"
                        required
                      />
                    </div>
                    <div className="input_field">
                      <span>
                        <i aria-hidden="true" className="fa fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        required
                      />
                    </div>
                    {this.props.formName === 'Register' && (
                      <div className="input_field">
                        <span>
                          <i aria-hidden="true" className="fa fa-lock"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="confirm password"
                          value={this.state.password2}
                          onChange={this.onChange}
                          name="password2"
                          required
                        />
                      </div>
                    )}

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
