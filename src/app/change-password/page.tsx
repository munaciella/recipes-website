'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.success('Password updated successfully.');
        router.push('/login');
      }
    } catch (error) {
      toast.error('An error occurred while changing the password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-8">Change Password</h1>
      <form onSubmit={handleChangePassword} className="space-y-4 w-full">
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </Button>
      </form>
    </section>
  );
};

export default ChangePasswordPage;