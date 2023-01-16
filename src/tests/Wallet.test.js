import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('tests for Wallet page', () => {
  it('should have the basic informations on the page', () => {
    renderWithRouterAndRedux(<Wallet />);

    const userEmail = screen.getByTestId('email-field');
    const totalValue = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(userEmail).toBeInTheDocument();
    expect(totalValue).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });

  it('should be able to add new expenses', () => {
    renderWithRouterAndRedux(<Wallet />);

    const totalValue = screen.getByTestId('total-field');
    expect(totalValue.innerHTML).toBe('0.00');

    const valueChange = screen.getByRole('spinbutton');
    userEvent.type(valueChange, '1');

    const addButton = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    userEvent.click(addButton);
  });
});
