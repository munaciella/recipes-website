/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { supabase } from '@/lib/supabaseClient';
import { useSupabaseAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

const SignupPage: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [businessCode, setBusinessCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setSession } = useSupabaseAuth();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const validateName = (name: string) => /^[a-zA-Z\s]+$/.test(name);
  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/.test(password);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!validateName(name)) {
      toast.error('Name should only contain letters.');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        'Password must be at least 8 characters long, include at least one uppercase letter, one number, one special character, and no spaces.'
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      const user = data.user;
      const role = businessCode === '170282' ? 'business' : 'user';

      const { error: insertError } = await supabase.from('users').insert([
        {
          user_uuid: user?.id,
          email,
          name,
          role,
          business_code: businessCode ? parseInt(businessCode, 10) : null,
        },
      ]);

      if (insertError) throw insertError;

      setSession(data.session);

      toast.success('Successfully signed up and logged in');
      setTimeout(() => router.push('/'), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('An unknown error occurred during sign up');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center p-4 max-w-4xl mx-auto bg-background mt-8 dark:bg-background">
      <h1 className="text-3xl lg:text-5xl md:text-3xl font-bold mb-8 mt-14 text-center">Sign Up for VeloVegans</h1>

      {loading ? (
        <SkeletonCard />
      ) : (
        <div className="bg-card dark:bg-background rounded-lg shadow-lg p-8 mt-8 w-full max-w-2xl border border-border dark:border-slate-700">
          <h2 className="text-3xl font-bold mb-6 text-center text-card-foreground dark:text-card-foreground">
            Sign Up
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg bg-card dark:bg-input dark:border-border text-card-foreground"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg bg-card dark:bg-input dark:border-border text-card-foreground"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg bg-card dark:bg-input dark:border-border text-card-foreground"
            />
            <Input
              type="text"
              placeholder="Business User Code (optional)"
              value={businessCode}
              onChange={(e) => setBusinessCode(e.target.value)}
              className="w-full px-4 py-3 border border-input rounded-lg bg-card dark:bg-input dark:border-border text-card-foreground"
            />
            <Button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground"
            >
              Sign Up
            </Button>
          </form>
        </div>
      )}
    </section>
  );
};

export default SignupPage;