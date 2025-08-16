const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deletePublicAgents() {
  try {
    console.log('Starting deletion of public agents...');
    
    // First, get count of public agents
    const { count, error: countError } = await supabase
      .from('agents')
      .select('*', { count: 'exact', head: true })
      .eq('is_public', true);

    if (countError) {
      throw countError;
    }

    console.log(`Found ${count} public agents to delete`);

    if (count === 0) {
      console.log('No public agents found. Nothing to delete.');
      return;
    }

    // Delete all public agents
    const { error: deleteError } = await supabase
      .from('agents')
      .delete()
      .eq('is_public', true);

    if (deleteError) {
      throw deleteError;
    }

    console.log(`Successfully deleted ${count} public agents`);
    
  } catch (error) {
    console.error('Error deleting public agents:', error);
    process.exit(1);
  }
}

// Run the deletion
deletePublicAgents(); 