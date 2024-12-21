import PrivacyPolicyPage from '@/app/privacy-policy/page';
import { render, screen } from '@testing-library/react';

describe('PrivacyPolicyPage', () => {
  it('renders the Privacy Policy page with the correct title', () => {
    render(<PrivacyPolicyPage />);

    const mainTitle = screen.getByRole('heading', { name: /privacy policy/i, level: 1 });
    expect(mainTitle).toBeInTheDocument();
  });

  it('renders all the headings correctly', () => {
    render(<PrivacyPolicyPage />);

    const headings = [
      'Information We Collect',
      'How We Use Your Information',
      'Sharing Your Information',
      'Cookies and Tracking',
      'Data Security',
      'Your Rights',
      'Third-Party Services',
      'Changes to This Privacy Policy',
      'Contact Us',
    ];

    headings.forEach((heading) => {
      expect(screen.getByRole('heading', { name: new RegExp(heading, 'i') })).toBeInTheDocument();
    });
  });

  it('renders the contact link', () => {
    render(<PrivacyPolicyPage />);

    const contactLink = screen.getByRole('link', { name: /here/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('renders the paragraph content correctly', () => {
    render(<PrivacyPolicyPage />);

    const paragraphText = /this privacy policy describes how we collect, use, and protect your personal information/i;
    const paragraph = screen.getByText(paragraphText);
    expect(paragraph).toBeInTheDocument();
  });
});