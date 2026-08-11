import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveGameSession(gameId: string, category: string, intensity: string, title: string, completed: boolean) {
  const { data, error } = await supabase
    .from('game_sessions')
    .insert([{
      game_id: gameId,
      game_category: category,
      intensity,
      game_title: title,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
    }]);

  if (error) {
    console.error('Error saving game session:', error);
    return null;
  }
  return data;
}

export async function getGameHistory(limit: number = 10) {
  const { data, error } = await supabase
    .from('game_sessions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching history:', error);
    return [];
  }
  return data || [];
}

export async function getPlayedGameIds() {
  const { data, error } = await supabase
    .from('game_sessions')
    .select('game_id')
    .eq('completed', true);

  if (error) {
    console.error('Error fetching played games:', error);
    return [];
  }
  return data?.map(row => row.game_id) || [];
}
