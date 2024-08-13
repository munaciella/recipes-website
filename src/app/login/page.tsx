/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/SkeletonCard'; 
import { useSupabaseAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const LoginPage: NextPage = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [businessCode, setBusinessCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isBusinessUser, setIsBusinessUser] = useState<boolean>(false);
  const [requiresBusinessCode, setRequiresBusinessCode] = useState<boolean>(false);

  const { setSession, getStoredIntendedURL, clearStoredIntendedURL } = useSupabaseAuth();
  const router = useRouter();

  const handleSuccessfulLogin = useCallback(() => {
    setLoading(false);
    const intendedUrl = getStoredIntendedURL();
    clearStoredIntendedURL();
    router.push(intendedUrl || '/');
  }, [clearStoredIntendedURL, getStoredIntendedURL, router]);

  const checkIfBusinessUser = useCallback(async (session: any) => {
    try {
      if (session && session.user) {
        const { data: userDetails, error } = await supabase
          .from('users')
          .select('role, business_code')
          .eq('user_uuid', session.user.id)
          .single();

        if (error) {
          toast.error(`Error: ${error.message}`);
          setLoading(false);
          return;
        }

        const userRole = userDetails.role;
        const userBusinessCode = userDetails.business_code;

        if (userRole === 'business') {
          setIsBusinessUser(true);
          if (!userBusinessCode) {
            setRequiresBusinessCode(true);
            toast.info('Please enter your business code to continue.');
          } else {
            handleSuccessfulLogin();
          }
        } else {
          handleSuccessfulLogin();
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`);
      } else {
        toast.error('An unknown error occurred');
      }
      setLoading(false);
    }
  }, [handleSuccessfulLogin]);

  useEffect(() => {
    setLoading(true);
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setSession(session);
        checkIfBusinessUser(session);
        toast.success('Successfully logged in');
      } else if (event === 'SIGNED_OUT') {
        toast.success('Successfully logged out');
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setSession, checkIfBusinessUser]);

  const handleBusinessCodeSubmit = async () => {
    if (businessCode.trim() === '') {
      toast.error('Business code cannot be empty.');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
    
      if (!user) {
        throw new Error('User not found');
      }

      const { error } = await supabase
        .from('users')
        .update({ business_code: businessCode })
        .eq('user_uuid', user.id);

      if (error) {
        throw error;
      }

      toast.success('Business code accepted. Redirecting...');
      setTimeout(() => {
        handleSuccessfulLogin();
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error updating business code: ${error.message}`);
      } else {
        toast.error('An unknown error occurred while updating business code');
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(`Error: ${error.message}`);
      setLoading(false);
    } else {
      const { session } = data;
      setSession(session);
      checkIfBusinessUser(session);
    }
  };

  const handleSignUpRedirect = () => {
    router.push('/signup');
  };

  return (
    <section className="flex flex-col items-center p-4 max-w-4xl mx-auto bg-background mt-4 dark:bg-background">
      <h1 className="text-4xl font-bold mb-8 mt-14 text-center">
        Login to VeloVegans
      </h1>

      {loading ? (
        <SkeletonCard />
      ) : (
        <>
          <div className="bg-card dark:bg-card rounded-lg shadow-lg p-8 mt-8 w-full max-w-lg border border-border dark:border-border">
            <h2 className="text-3xl font-bold mb-6 text-center text-card-foreground dark:text-card-foreground">
              Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
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
              <Button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground"
              >
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-card-foreground dark:text-card-foreground">
                Don't have an account?{" "}
                <button
                  onClick={handleSignUpRedirect}
                  className="text-primary dark:text-primary underline hover:text-primary/90 dark:hover:text-primary"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          {isBusinessUser && requiresBusinessCode && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Business Code Required
              </h2>
              <form onSubmit={handleBusinessCodeSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Business Code"
                  value={businessCode}
                  onChange={(e) => setBusinessCode(e.target.value)}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-card dark:bg-input dark:border-border text-card-foreground"
                />
                <Button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground"
                >
                  Submit
                </Button>
              </form>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default LoginPage;