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
      // Sign up user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) throw authError;
  
      // Wait for the user to be created in Auth
      const user = authData.user;
  
      if (!user) {
        throw new Error('User creation failed. Please try again.');
      }
  
      // Insert user details into your custom 'users' table
      const role = businessCode === '170282' ? 'business' : 'user';
  
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            user_uuid: user.id,
            email: user.email,
            name,
            role,
            business_code: businessCode ? parseInt(businessCode, 10) : null,
          },
        ]);
  
      if (insertError) throw insertError;
  
      // Set session and handle redirection
      setSession(authData.session);
  
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

  const handleGoogleSignUp = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        toast.error(`Error: ${error.message}`);
        setLoading(false);
        return;
      }

      setTimeout(async () => {
        try {
          const { data: sessionData, error: sessionError } =
            await supabase.auth.getSession();
          if (sessionError) {
            throw new Error(`Error fetching session: ${sessionError.message}`);
          }

          const session = sessionData.session;
          if (session) {
            const user = session.user;

            const { data: existingUser, error: fetchError } = await supabase
              .from('users')
              .select('*')
              .eq('email', user.email)
              .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
              throw new Error(`Error fetching user: ${fetchError.message}`);
            }

            if (!existingUser) {
              const { error: insertError } = await supabase
                .from('users')
                .insert([
                  {
                    user_uuid: user.id,
                    name: user.user_metadata.full_name || user.email,
                    email: user.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    business_code: null,
                  },
                ]);

              if (insertError) {
                throw new Error(`Error inserting user: ${insertError.message}`);
              }
            }

            setSession(session);
            toast.success('Successfully signed in');
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(`An error occurred: ${error.message}`);
            console.error('Error during Google sign-in:', error);
          } else {
            toast.error('An unknown error occurred');
            console.error('Unknown error during Google sign-in:', error);
          }
        } finally {
          setLoading(false);
        }
      }, 3000);
    } catch (error) {
      toast.error('An error occurred during Google sign-in');
      console.error('Error during Google sign-in:', error);
      setLoading(false);
    }
  };

  const handleLogInRedirect = () => {
    router.push('/login');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background">
      <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border dark:border-slate-700">
      <h1 className="text-3xl font-bold mb-8 mt-6 text-center text-card-foreground dark:text-white">Sign Up for VeloVegans</h1>

      {loading ? (
        <SkeletonCard />
      ) : (
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
              Sign Up with Email
            </Button>
          </form>
      )}
      <Button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"
        >
          <img src="/assets/google-icon.png" alt="Google Logo" className="w-6 h-6 mr-2" />
          Sign Up with Google
        </Button>
        <p className="text-center text-card-foreground dark:text-white mt-4">
          Already a user?{' '}
          <button
            onClick={handleLogInRedirect}
            className="text-primary hover:underline"
          >
            Log In here
          </button>
          </p>
      </div>
    </section>
  );
};

export default SignupPage;