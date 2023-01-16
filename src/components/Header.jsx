import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from './WalletForm';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <div data-testid="email-field">
          { email }
        </div>
        <div data-testid="total-field">
          { expenses.reduce((acc, curr) => acc + curr.value
            * curr.exchangeRates[curr.currency].ask, 0).toFixed(2) }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
        <WalletForm />
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
