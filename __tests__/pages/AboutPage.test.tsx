import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '@/app/about/page';
import { copy } from '@/copy';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('AboutPage', () => {
  const { details } = copy.about;

  it('renders the heading correctly', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(details.heading);
    expect(heading).toHaveClass('text-4xl font-bold');
  });

  it('renders the paragraph correctly', () => {
    render(<AboutPage />);
    const paragraph = screen.getByText(details.paragraph);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-lg');
  });

  it('renders the subheading correctly', () => {
    render(<AboutPage />);
    const subheading = screen.getByRole('heading', { level: 2 });
    expect(subheading).toHaveTextContent(
      'Click on the links to start your awareness journey'
    );
    expect(subheading).toHaveClass('text-3xl font-semibold');
  });
});