/* eslint-disable @next/next/no-img-element */
'use client';

import { useSupabaseAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UserPage() {
  const { session, setSession } = useSupabaseAuth();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<{ role?: string; avatar_url?: string } | null>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
      toast.success('Successfully logged out');
      router.push('/');
    } else {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (session) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('user_uuid', session.user.id)
          .single();

        if (!error) {
          setUserDetails(data);
        } else {
          toast.error('Failed to fetch user details');
        }
      }
    };

    fetchUserDetails();
  }, [session]);

  const handleAddRecipeClick = () => {
    router.push('/add-recipe');
  };

  const handleSuggestRecipeClick = () => {
    router.push('/suggest-recipe');
  };

  if (session) {
    const user = session.user;

    return (
      <div className="container mx-auto p-6 mt-16 md:mt-24 lg:mt-32">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Your Dashboard</h1>
        
        <div className="flex items-center justify-center mb-6">
          {userDetails?.avatar_url ? (
            <img
              src={userDetails.avatar_url}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-xl text-white">{user.email?.[0] || 'U'}</span>
            </div>
          )}
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-lg mb-4">
            <strong>Logged in as:</strong> {user.email || 'N/A'}
          </p>
          <ul className="space-y-4">
            <li>
              <button
                onClick={
                  userDetails?.role === 'business'
                    ? handleAddRecipeClick
                    : handleSuggestRecipeClick
                }
                className="text-primary hover:underline underline-offset-4 text-lg"
              >
                {userDetails?.role === 'business'
                  ? 'Add a Recipe'
                  : 'Suggest a Recipe'}
              </button>
            </li>
            <li>
              <button
                onClick={() => router.push('/saved-recipes')}
                className="text-primary hover:underline underline-offset-4 text-lg"
              >
                View Saved Recipes
              </button>
            </li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 dark:text-white font-semibold rounded-lg hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return null;
}