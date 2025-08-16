/*
  # Delete all existing public agents
  
  This migration removes all agents that have is_public = true
  This is a one-time cleanup to remove existing public agents as requested
*/

-- Delete all public agents
DELETE FROM agents WHERE is_public = true;

-- Log the deletion (optional)
DO $$
BEGIN
  RAISE NOTICE 'Deleted all public agents from the agents table';
END $$; 