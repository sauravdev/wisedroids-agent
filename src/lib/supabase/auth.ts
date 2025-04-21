import { supabase } from './client';

export async function signUp(email: string, password: string, fullName: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: 'https://www.wisedroids.ai/auth/callback'
    }
  });

  if (authError) return { error: authError };
  return { data: authData };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // redirectTo: 'https://www.wisedroids.ai/auth/callback',
      queryParams: {
        access_type: 'offline',
        prompt: 'consent'
      }
    }
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}