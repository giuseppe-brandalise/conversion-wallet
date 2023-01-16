import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setInitialState, saveUSer } from '../redux/actions';

class Login extends React.Component {
  state = {
    password: '',
    email: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setInitialState());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  isButtonDisabled = () => {
    const { password, email } = this.state;
    const number = 5;
    const validatePassword = password.length > number;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return !(validatePassword && validEmail.test(email));
  };

  executeLogin = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(saveUSer(email));
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="email"
            placeholder="email"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="senha"
            data-testid="password-input"
            name="password"
            onChange={ this.handleChange }
          />
          <Link to="/carteira">
            <button
              type="button"
              disabled={ this.isButtonDisabled() }
              onClick={ this.executeLogin }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
