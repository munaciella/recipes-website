import React from 'react';
import { render, screen } from '@testing-library/react';
import CookiePolicyPage from '@/app/cookie-policy/page';

describe('CookiePolicyPage', () => {
  beforeEach(() => {
    render(<CookiePolicyPage />);
  });

  it('renders the page title', () => {
    const title = screen.getByRole('heading', { name: /cookie policy/i, level: 1 });
    expect(title).toBeInTheDocument();
  });

  it('renders the introductory paragraph', () => {
    const introText = screen.getByText(/we value your privacy and are committed to being transparent about how we use cookies/i);
    expect(introText).toBeInTheDocument();
  });

  it('renders all section headings', () => {
    const headings = [
      /what are cookies\?/i,
      /types of cookies we use/i,
      /how we use cookies/i,
      /managing cookies/i,
      /updates to this cookie policy/i,
      /contact us/i,
    ];

    headings.forEach((heading) => {
      const sectionHeading = screen.getByRole('heading', { name: heading });
      expect(sectionHeading).toBeInTheDocument();
    });
  });

  it('renders all types of cookies in the list', () => {
    const cookieTypes = [
      /essential cookies/i,
      /analytics cookies/i,
      /functionality cookies/i,
      /advertising cookies \(if applicable\)/i,
    ];

    cookieTypes.forEach((type) => {
      const listItem = screen.getByText(type);
      expect(listItem).toBeInTheDocument();
    });
  });

  it('renders the link to "All About Cookies"', () => {
    const externalLink = screen.getByRole('link', { name: /all about cookies/i });
    expect(externalLink).toBeInTheDocument();
    expect(externalLink).toHaveAttribute('href', 'https://www.allaboutcookies.org/manage-cookies/');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the contact link', () => {
    const contactLink = screen.getByRole('link', { name: /here/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});