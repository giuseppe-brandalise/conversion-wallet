import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrency } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      value: '',
      description: '',
      currency: '',
      method: 'money',
      tag: 'food',
    };
  }

  componentDidMount() {
    this.economiaAPI();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  economiaAPI = async () => {
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    const currencies = Object.values(data);
    this.setState({ currencies });
    const codes = Object.keys(data);
    dispatch(saveCurrency(codes));
  };

  render() {
    const {
      currencies,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <form>
        <input
          type="number"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          { currencies.map(({ code }) => (
            <option
              key={ code }
              value={ code }
            >
              {code}
            </option>))}
        </select>
        <select
          name="method"
          data-testid="method-input"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="money">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transportation">Transporte</option>
          <option value="healthcare">Saúde</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
