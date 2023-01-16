import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = (expense) => {
    const { dispatch, expenses } = this.props;
    const newExpenses = expenses.filter((teste) => teste.id !== expense.id);
    // const correctsIds = newExpenses.map((teste, index) => ({
    //   ...teste,
    //   id: index,
    // }));
    dispatch(deleteExpense(newExpenses));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.length === 0 ? null : expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ (+expense.value).toFixed(2) }</td>
              <td>
                { `${expense.exchangeRates[expense.currency].name}/Real Brasileiro` }
              </td>
              <td>{ (+expense.exchangeRates[expense.currency].ask).toFixed(2) }</td>
              <td>
                {
                  ((+expense.value)
                * (+expense.exchangeRates[expense.currency].ask)).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => {
                    this.deleteExpense(expense);
                  } }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    tag: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
