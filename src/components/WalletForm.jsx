import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrency, saveExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      currencies: [],
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
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
    this.setState({ currencies, data });
    const codes = Object.keys(data);
    this.setState({ currency: codes[0] });
    dispatch(saveCurrency(codes));
  };

  submitExpense = () => {
    const {
      data,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { dispatch, expenses } = this.props;
    const expense = {
      exchangeRates: data,
      value,
      description,
      currency,
      method,
      tag,
      id: expenses.length,
    };
    dispatch(saveExpense(expense));
    this.setState({
      value: '',
      description: '',
      method: 'money',
      tag: 'food',
    });
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

    const { sumExpenses } = this.props;

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
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ async () => {
            this.economiaAPI();
            await this.submitExpense();
            sumExpenses();
          } }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  sumExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
