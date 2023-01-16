import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
});
