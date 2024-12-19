import React from 'react';
import { render, screen } from '@testing-library/react';

import Welcome from '../components/Welcome';

window.React = React;

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

test('renders Hello component', async () => {
    render(<Welcome />);
    expect(screen.getByText('Welcome!'))
    expect(screen.getByText('Thank you for using DoneDeal!'))
});