// src/lib/supabase.ts
// Supabase client configuration and helper functions

import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// TYPE DEFINITIONS
// =====================================================

export interface UserProfile {
  id: string;
  email: string;
  display_name: string | null;
  learning_style: 'visual' | 'auditory' | 'hands-on' | null;
  experience_level: 'beginner' | 'intermediate' | 'advanced' | null;
  goal: 'websites' | 'apps' | 'games' | null;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  current_lesson: number;
  points: number;
  streak: number;
  last_activity_date: string;
  total_lessons_completed: number;
  created_at: string;
  updated_at: string;
}

export interface CompletedLesson {
  id: string;
  user_id: string;
  lesson_id: number;
  completed_at: string;
  time_spent_seconds: number;
  attempts: number;
}

// =====================================================
// AUTHENTICATION FUNCTIONS
// =====================================================

export async function signUp(email: string, password: string, displayName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) throw error;

  // Create user profile
  if (data.user) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        display_name: displayName,
      });

    if (profileError) throw profileError;

    // Initialize progress
    const { error: progressError } = await supabase
      .from('user_progress')
      .insert({
        user_id: data.user.id,
        current_lesson: 1,
        points: 0,
        streak: 0,
      });

    if (progressError) throw progressError;
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// =====================================================
// USER PROFILE FUNCTIONS
// =====================================================

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// =====================================================
// PROGRESS FUNCTIONS
// =====================================================

export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching progress:', error);
    return null;
  }

  return data;
}

export async function updateUserProgress(
  userId: string,
  updates: Partial<UserProgress>
) {
  const { data, error } = await supabase
    .from('user_progress')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
      last_activity_date: new Date().toISOString().split('T')[0],
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// =====================================================
// COMPLETED LESSONS FUNCTIONS
// =====================================================

export async function getCompletedLessons(userId: string): Promise<number[]> {
  const { data, error } = await supabase
    .from('completed_lessons')
    .select('lesson_id')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching completed lessons:', error);
    return [];
  }

  return data.map((item) => item.lesson_id);
}

export async function markLessonComplete(
  userId: string,
  lessonId: number,
  timeSpentSeconds: number = 0
) {
  // Check if already completed
  const { data: existing } = await supabase
    .from('completed_lessons')
    .select('id, attempts')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();

  if (existing) {
    // Update attempts if already completed
    const { error } = await supabase
      .from('completed_lessons')
      .update({ attempts: existing.attempts + 1 })
      .eq('id', existing.id);

    if (error) throw error;
    return existing;
  }

  // Insert new completion
  const { data, error } = await supabase
    .from('completed_lessons')
    .insert({
      user_id: userId,
      lesson_id: lessonId,
      time_spent_seconds: timeSpentSeconds,
      attempts: 1,
    })
    .select()
    .single();

  if (error) throw error;

  // Update total lessons completed count
  const { error: progressError } = await supabase.rpc('increment_lessons_completed', {
    user_uuid: userId,
  });

  if (progressError) {
    // If the function doesn't exist, update manually
    const progress = await getUserProgress(userId);
    if (progress) {
      await updateUserProgress(userId, {
        total_lessons_completed: progress.total_lessons_completed + 1,
      });
    }
  }

  return data;
}

// =====================================================
// CODE SUBMISSION FUNCTIONS (optional)
// =====================================================

export async function saveCodeSubmission(
  userId: string,
  lessonId: number,
  code: string,
  isCorrect: boolean
) {
  const { data, error } = await supabase
    .from('code_submissions')
    .insert({
      user_id: userId,
      lesson_id: lessonId,
      code,
      is_correct: isCorrect,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// =====================================================
// LEADERBOARD FUNCTIONS (for future use)
// =====================================================

export async function getLeaderboard(limit: number = 10) {
  const { data, error } = await supabase
    .from('user_progress')
    .select(`
      points,
      streak,
      total_lessons_completed,
      user_profiles (display_name, email)
    `)
    .order('points', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getUserStats(userId: string) {
  const { data, error } = await supabase.rpc('get_user_stats', {
    user_uuid: userId,
  });

  if (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }

  return data[0];
}

// =====================================================
// MIGRATION HELPER (from localStorage to Supabase)
// =====================================================

export async function migrateFromLocalStorage(userId: string) {
  // Get data from localStorage
  const prefsString = localStorage.getItem('codelearn_preferences');
  const progressString = localStorage.getItem('codelearn_progress');

  if (!prefsString && !progressString) {
    return; // Nothing to migrate
  }

  try {
    // Migrate preferences
    if (prefsString) {
      const prefs = JSON.parse(prefsString);
      await updateUserProfile(userId, {
        learning_style: prefs.learningStyle,
        experience_level: prefs.experienceLevel,
        goal: prefs.goal,
      });
    }

    // Migrate progress
    if (progressString) {
      const progressData = JSON.parse(progressString);
      const progress = progressData.progress;
      const lessonIndex = progressData.lessonIndex;

      // Update progress
      await updateUserProgress(userId, {
        current_lesson: lessonIndex + 1,
        points: progress.points,
        streak: progress.streak,
      });

      // Mark completed lessons
      for (const lessonId of progress.completedLessons) {
        await markLessonComplete(userId, lessonId);
      }
    }

    // Clear localStorage after successful migration
    localStorage.removeItem('codelearn_preferences');
    localStorage.removeItem('codelearn_progress');

    console.log('✅ Successfully migrated data from localStorage to Supabase');
  } catch (error) {
    console.error('❌ Error migrating data:', error);
  }
}
