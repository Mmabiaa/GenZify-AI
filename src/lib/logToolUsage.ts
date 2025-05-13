
import supabase from './supabaseClient';

export async function logToolUsage(tool_name: string, user_id: string) {
  // Ensure Supabase is properly initialized
  if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
    console.warn('Supabase not properly initialized. Tool usage not logged.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('tool_usage')
      .insert([{ tool_name, user_id, timestamp: new Date().toISOString() }]);

    if (error) {
      console.error('Error logging tool usage:', error);
      return false;
    }

    console.log('Tool usage logged successfully.');
    return true;
  } catch (error) {
    console.error('Exception when logging tool usage:', error);
    return false;
  }
}

export async function logToolUsageAuto(tool_name: string) {
  // Ensure Supabase is properly initialized
  if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
    console.warn('Supabase not properly initialized. Tool usage not logged.');
    return false;
  }

  try {
    const { data: session } = await supabase.auth.getSession();

    if (!session || !session.session || !session.session.user) {
      console.warn('User not authenticated, skipping tool usage logging');
      return false;
    }

    return await logToolUsage(tool_name, session.session.user.id);
  } catch (error) {
    console.error('Exception when auto-logging tool usage:', error);
    return false;
  }
}
