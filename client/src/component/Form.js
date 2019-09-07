import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
  state = {
    name: this.props.user ? this.props.user.name : '',
    email: this.props.user ? this.props.user.email : '',
    password: '',
    password2: '',
    msg: null
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (
        error.id === 'LOGIN_FAIL' ||
        error.id === 'REGISTER_FAIL' ||
        error.id === 'EDIT_FAIL'
      ) {
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
    const { name, email, password, password2 } = this.state;
    const register = { name, email, password };
    const edit = { name, email };
    const login = { email, password };
    if (this.props.formName === 'Register') {
      if (password !== password2) {
        this.setState({ msg: 'Password must tally' });
      } else {
        this.props.submitForm(register);
      }
    }
    if (this.props.formName === 'Login') {
      this.props.submitForm(login);
    }
    if (this.props.formName === 'Edit User') {
      this.props.submitForm(edit);
    }
  };
  render() {
    const { formName } = this.props;
    return (
      <div>
        <div className="form_wrapper">
          <div className="form_container">
            <div className="title_container">
              <h2>{formName}</h2>
              <div className="row clearfix">
                <div className="">
                  <form onSubmit={this.onSubmit}>
                    {this.state.msg && <h3>{this.state.msg}</h3>}
                    {(formName === 'Register' || formName === 'Edit User') && (
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
                    {formName !== 'Edit User' && (
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
                    )}

                    {formName === 'Register' && (
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

                    <input className="button" type="submit" value={formName} />
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
  error: state.authError
});
export default connect(mapStateToProps)(Form);
