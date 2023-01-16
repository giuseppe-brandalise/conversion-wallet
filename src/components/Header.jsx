import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      sum: 0,
    };
  }

  componentDidMount() {
    const { expenses } = this.props;
    if (expenses === undefined) {
      this.setState({ sum: 0 });
    } else {
      this.sumExpenses(expenses);
    }
  }

  sumExpenses = () => {
    const { expenses } = this.props;
    if (expenses !== undefined) {
      this.setState({ sum: 0 });
      expenses.forEach((expense) => {
        const { sum } = this.state;
        const { exchangeRates, currency, value } = expense;
        this.setState({ sum: sum + (Number(value) * exchangeRates[currency].ask) });
      });
    }
  };

  render() {
    const { email } = this.props;
    const { sum } = this.state;
    return (
      <div>
        <div data-testid="email-field">
          { email }
        </div>
        <div data-testid="total-field">
          { sum.toFixed(2) }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
        <WalletForm sumExpenses={ this.sumExpenses } />
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
