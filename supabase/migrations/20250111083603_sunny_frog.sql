/*
  # Add code column to agents table

  1. Changes
    - Add `code` column to `agents` table to store generated LangGraph code
    - Make column nullable since not all agents will have code initially
    - Add comment explaining the column's purpose

  2. Security
    - Inherits existing RLS policies from agents table
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'agents' AND column_name = 'code'
  ) THEN
    ALTER TABLE agents ADD COLUMN code text;
    COMMENT ON COLUMN agents.code IS 'Generated LangGraph code for the agent implementation';
  END IF;
END $$;