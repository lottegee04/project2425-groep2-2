import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskOverview from '../components/tasks/TaskOverview';
import { useRouter } from 'next/router';
import Header from '../components/header';
import UserOverview from '../components/users/UserOverview';

const users = [
    {
        id: 1,
        username: 'lotte_g',
        role: 'user'
        },
        {
        id: 2,
        username: 'ode_m',
        role: 'user'
        }
]
window.React = React;

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));



test('renders UserOverview component', async () => {
    render(<UserOverview users={users} />);
    expect(screen.getByText('lotte_g'))
    expect(screen.getByText('ode_m'))
});