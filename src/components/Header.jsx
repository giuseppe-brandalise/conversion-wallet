import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

  sumExpenses = (expenses) => {
    expenses.forEach((expense) => {
      const { sum } = this.state;
      this.setState({ sum: sum + expense.value });
    });
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
          { sum }
        </div>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape([
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
