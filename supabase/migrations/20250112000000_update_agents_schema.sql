/*
  # Update agents table schema to use text instead of text[]

  1. Changes
    - Change `capabilities` column from text[] to text
    - Change `integrations` column from text[] to text
    - This aligns with frontend expectations and simplifies data handling

  2. Migration Strategy
    - Convert existing array data to newline-separated strings
    - Update column types
    - Preserve existing data
*/

-- First, create a backup of existing data
CREATE TABLE IF NOT EXISTS agents_backup AS SELECT * FROM agents;

-- Convert existing array data to text format
UPDATE agents 
SET 
  capabilities = array_to_string(capabilities, E'\n'),
  integrations = array_to_string(integrations, E'\n')
WHERE capabilities IS NOT NULL OR integrations IS NOT NULL;

-- Change column types from text[] to text
ALTER TABLE agents 
  ALTER COLUMN capabilities TYPE text,
  ALTER COLUMN integrations TYPE text;

-- Add comments to document the change
COMMENT ON COLUMN agents.capabilities IS 'Newline-separated list of agent capabilities';
COMMENT ON COLUMN agents.integrations IS 'Newline-separated list of agent integrations'; 