'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/change`,
      });

      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success('Password reset email sent.');
      }
    } catch (error) {
      toast.error('An error occurred while sending the reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center p-4 max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-8">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="space-y-4 w-full">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </section>
  );
};

export default ResetPasswordPage;