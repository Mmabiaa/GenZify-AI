import supabase from './supabaseClient'

export async function logToolUsage(tool_name: string, user_id: string) {
  const { error } = await supabase
    .from('tool_usage')
    .insert([{ tool_name, user_id }])

  if (error) {
    console.error('Error logging tool usage:', error)
    return false
  }

  console.log('Tool usage logged successfully.')
  return true
}

export async function logToolUsageAuto(tool_name: string) {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('User not authenticated or error getting user')
    return false
  }

  return await logToolUsage(tool_name, user.id)
}
