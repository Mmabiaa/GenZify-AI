
import supabase from './supabaseClient'

export async function logToolUsage(tool_name: string, user_id: string) {
  // Ensure Supabase is properly initialized
  if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
    console.warn('Supabase not properly initialized. Tool usage not logged.');
    return false;
  }

  try {
    const { error } = await supabase
      .from('tool_usage')
      .insert([{ tool_name, user_id, timestamp: new Date() }])

    if (error) {
      console.error('Error logging tool usage:', error)
      return false
    }

    console.log('Tool usage logged successfully.')
    return true
  } catch (error) {
    console.error('Exception when logging tool usage:', error)
    return false
  }
}

export async function logToolUsageAuto(tool_name: string) {
  // Ensure Supabase is properly initialized
  if (!supabase || !import.meta.env.VITE_SUPABASE_URL) {
    console.warn('Supabase not properly initialized. Tool usage not logged.');
    return false;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      console.error('User not authenticated or error getting user')
      return false
    }

    return await logToolUsage(tool_name, user.id)
  } catch (error) {
    console.error('Exception when auto-logging tool usage:', error)
    return false
  }
}
