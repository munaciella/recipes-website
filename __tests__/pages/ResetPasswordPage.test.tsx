import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';
import ResetPasswordPage from '@/app/reset-password/page';

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: jest.fn(),
    },
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/components/ui/use-toast', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the reset password page', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('renders the reset password form', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByText('Send Reset Link')).toBeInTheDocument();
  });

  it('displays an error message when the email is not provided', async () => {
    render(<ResetPasswordPage />);
    const submitButton = screen.getByText('Send Reset Link');
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('An error occurred while sending the reset email.');
    });
  });

  it('calls resetPasswordForEmail with the provided email', async () => {
    (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({
      error: null,
    });

    render(<ResetPasswordPage />);

    const emailInput = screen.getByPlaceholderText('Your email');
    const submitButton = screen.getByText('Send Reset Link');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        'test@example.com',
        {
          redirectTo: `${window.location.origin}/reset-password/change`,
        }
      );
      expect(toast.success).toHaveBeenCalledWith('Password reset email sent.');
    });
  });

  it('displays an error toast if resetPasswordForEmail returns an error', async () => {
    (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({
      error: { message: 'Invalid email' },
    });

    render(<ResetPasswordPage />);

    const emailInput = screen.getByPlaceholderText('Your email');
    const submitButton = screen.getByText('Send Reset Link');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error: Invalid email');
    });
  });

  it('displays loading state while submitting the form', async () => {
    (supabase.auth.resetPasswordForEmail as jest.Mock).mockResolvedValue({
      error: null,
    });

    render(<ResetPasswordPage />);

    const emailInput = screen.getByPlaceholderText('Your email');
    const submitButton = screen.getByText('Send Reset Link');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Sending...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Send Reset Link')).toBeInTheDocument();
    });
  });
});
