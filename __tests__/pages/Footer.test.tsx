import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/components/Footer';
import { copy } from '@/copy';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    resolvedTheme: 'dark',
  }),
}));

describe('Footer Component', () => {
  const { footer, nav } = copy.common;
  const companyName = 'Test Company';

  it('renders the logo correctly', () => {
    render(<Footer companyName={companyName} />);
    const logo = screen.getByAltText(nav.logo.alt);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', nav.logo.darkSrc);
  });

  it('displays the company name and message', () => {
    render(<Footer companyName={companyName} />);
    const companyMessage = screen.getByText(
      `© ${new Date().getFullYear()} ${companyName} ${footer.msg}`
    );
    expect(companyMessage).toBeInTheDocument();
    expect(companyMessage).toHaveClass('text-gray-700 dark:text-gray-400');
  });

  it('renders social links with correct icons', () => {
    render(<Footer companyName={companyName} />);
    footer.socials.forEach(({ name, href }) => {
      const socialLink = screen.getByRole('link', { name });
      expect(socialLink).toHaveAttribute('href', href);
      expect(socialLink).toHaveAttribute('target', '_blank');
      expect(socialLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders the "Made with ♡" section correctly', () => {
    render(<Footer companyName={companyName} />);
    const madeWithLove = screen.getByText(/Made with/i);
    expect(madeWithLove).toBeInTheDocument();
    const developerLink = screen.getByRole('link', { name: /Francesco's Image/i });
    expect(developerLink).toHaveAttribute('href', 'https://francesco-dev.vercel.app/');
    const developerImage = screen.getByAltText("Francesco's Image");
    expect(developerImage).toHaveAttribute('src', '/assets/FranIcon.png');
  });

  it('renders the policy links correctly', () => {
    render(<Footer companyName={companyName} />);
    const privacyPolicyLink = screen.getByRole('link', { name: /Privacy Policy/i });
    expect(privacyPolicyLink).toHaveAttribute('href', '/privacy-policy');
    const cookiePolicyLink = screen.getByRole('link', { name: /Cookie Policy/i });
    expect(cookiePolicyLink).toHaveAttribute('href', '/cookie-policy');
  });

  it('renders the developer website link correctly', () => {
    render(<Footer companyName={companyName} />);
    const developerWebsiteLink = screen.getByRole('link', { name: /Developer Website/i });
    expect(developerWebsiteLink).toHaveAttribute('href', 'https://francesco-dev.vercel.app/');
    expect(developerWebsiteLink).toHaveAttribute('target', '_blank');
    expect(developerWebsiteLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
}); 