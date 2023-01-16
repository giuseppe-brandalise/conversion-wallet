import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';

describe('tests for Login page', () => {
  it('should have two inputs and one button', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should able the button after being filled out', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(button).toBeDisabled();

    userEvent.type(inputPassword, '123456');
    userEvent.type(inputEmail, 'teste@teste.com');
    expect(button).not.toBeDisabled();
  });
});
