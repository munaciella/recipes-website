'use client';
import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

interface UserDetails {
  user_id: number | null;
  user_uuid: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  created_at: string | null;
  business_code: string | null;
}

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  userDetails: UserDetails;
  setSession: Dispatch<SetStateAction<Session | null>>;
  setUserDetails: Dispatch<SetStateAction<UserDetails>>;
  storeIntendedURL: (url: string) => void;
  getStoredIntendedURL: () => string | null;
  clearStoredIntendedURL: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    user_id: null,
    user_uuid: null,
    name: null,
    email: null,
    role: null,
    created_at: null,
    business_code: null,
  });

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      updateSession(session);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateSession = async (session: Session | null) => {
    setSession(session);
    if (session) {
      const user: User = session.user;
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('user_uuid', user.id)
          .single();

          if (error && error.code === 'PGRST116') {
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                user_uuid: user.id,
                name: user.user_metadata.full_name || null,
                email: user.email,
                role: 'user',
                created_at: new Date().toISOString(),
                business_code: null
              });
  
            if (insertError) {
              console.error('Error inserting user:', insertError.message);
            }
          } else if (error) {
            console.error('Error fetching user details:', error.message);
          } else {
            setUserDetails(data as UserDetails);
          }
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      }
      setLoading(false);
    };

  const storeIntendedURL = (url: string) => {
    localStorage.setItem('intendedURL', url);
  };

  const getStoredIntendedURL = () => {
    return localStorage.getItem('intendedURL');
  };

  const clearStoredIntendedURL = () => {
    localStorage.removeItem('intendedURL');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        loading,
        userDetails,
        setUserDetails,
        storeIntendedURL,
        getStoredIntendedURL,
        clearStoredIntendedURL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};