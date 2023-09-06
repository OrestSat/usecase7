import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyFormComponent from './MyFormComponent'; // Path to your component
import { act } from 'react-dom/test-utils';

beforeEach(() => {
  // Mock the console.log
  global.console.log = jest.fn();
});

test('submit the form with all fields filled correctly', async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('male'));
  });

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(console.log).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    agreeTerms: true,
    gender: 'male',
  });

  // Assert no errors are shown
  waitFor(() => {
    expect(screen.queryByText('Name must be at least 3 characters.')).not.toBeInTheDocument();
    expect(screen.queryByText('Email must be valid.')).not.toBeInTheDocument();
    expect(screen.queryByText('You must agree to the terms.')).not.toBeInTheDocument();
    expect(screen.queryByText('You must select a gender.')).not.toBeInTheDocument();
  });

});

test('submit the form with a very long valid name', async () => {
  render(<MyFormComponent />);

  const longName = 'A'.repeat(200); // example long name of 200 characters
  
  await act(async () => {
    userEvent.paste(screen.getByPlaceholderText('Name'), longName);
    userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('male'));
  });

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(console.log).toHaveBeenCalledWith({
    name: longName,
    email: 'john@example.com',
    agreeTerms: true,
    gender: 'male',
  });
});

test('submit the form with a complex email address', async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'test.name+alias@example.co.uk');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('male'));
  });

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(console.log).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'test.name+alias@example.co.uk',
    agreeTerms: true,
    gender: 'male',
  });
});

test('change gender and submit', async () => {
  render(<MyFormComponent />);
  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('female'));
  })

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(console.log).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    agreeTerms: true,
    gender: 'female',
  });
});

test('resubmit after an initial successful submission', async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('male'));
  });

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(console.log).toHaveBeenCalledTimes(2);
  expect(console.log).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    agreeTerms: true,
    gender: 'male',
  });
});

test("Submit the form with the 'Name' field left blank", async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('male'));
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
  });

  expect(screen.getByText('Name must be at least 3 characters.')).toBeInTheDocument();
});

test("Submit the form with an invalid email address", async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'testexample.com'); // Missing @ symbol
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('male'));
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
  });

  expect(screen.getByText('Email must be valid.')).toBeInTheDocument();
});

test("Submit the form without checking the 'Agree to Terms' checkbox", async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    userEvent.click(screen.getByTestId('male'));
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
  });

  expect(screen.getByText('You must agree to the terms.')).toBeInTheDocument();
});

test("Submit the form without selecting a gender", async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
  });

  expect(screen.getByText('You must select a gender.')).toBeInTheDocument();
});

test("Submit the form with a name that is less than 3 characters long", async () => {
  render(<MyFormComponent />);

  await act(async () => {
    userEvent.type(screen.getByPlaceholderText('Name'), 'Jo');
    userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    userEvent.click(screen.getByTestId('agreeTerms'));
    userEvent.click(screen.getByTestId('male'));
    userEvent.click(screen.getByRole('button', { name: /submit/i }));
  });

  expect(screen.getByText('Name must be at least 3 characters.')).toBeInTheDocument();
});