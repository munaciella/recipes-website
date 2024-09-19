/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { NextPage } from 'next';
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
  const [requiresBusinessCode, setRequiresBusinessCode] =
    useState<boolean>(false);

  const { setSession, getStoredIntendedURL, clearStoredIntendedURL } =
    useSupabaseAuth();
  const router = useRouter();

  const handleSuccessfulLogin = useCallback(() => {
    setLoading(false);
    const intendedUrl = getStoredIntendedURL();
    clearStoredIntendedURL();
    router.push(intendedUrl || '/');
  }, [clearStoredIntendedURL, getStoredIntendedURL, router]);

  const checkIfBusinessUser = useCallback(
    async (session: any) => {
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
    },
    [handleSuccessfulLogin]
  );

  useEffect(() => {
    setLoading(true);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setSession(session);

          setTimeout(() => {
            toast.success('Successfully logged in');
          }, 2000);

          checkIfBusinessUser(session);
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully logged out');
        }
        setLoading(false);
      }
    );

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
      const {
        data: { user },
      } = await supabase.auth.getUser();

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

  const handleGoogleSignIn = async () => {
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
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
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
            checkIfBusinessUser(session);
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

  const handleSignUpRedirect = () => {
    router.push('/signup');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background">
  <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-8 space-y-6 border border-border dark:border-slate-700">
    <h1 className="text-3xl font-bold text-center mb-6 text-card-foreground dark:text-white">Login to VeloVegans</h1>
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
      <Button type="submit" className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
        Continue with Email
      </Button>
    </form>
    <Button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex justify-center items-center"
    >
      <img src="/google-icon.svg" alt="Google" className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
    <p className="text-center text-card-foreground dark:text-white mt-4">
      Don't have an account?{' '}
      <button onClick={handleSignUpRedirect} className="text-primary hover:underline">
        Sign Up
      </button>
    </p>
    <p className="text-center mt-4">
  Forgot your password?{' '}
  <a href="/reset-password" className="text-primary hover:underline">
    Reset it here
  </a>
</p>
  </div>
</section>

  );
};

export default LoginPage;
