/*
  # Create agents table and related functionality

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `description` (text)
      - `capabilities` (text[])
      - `personality` (jsonb)
      - `integrations` (text[])
      - `is_public` (boolean)
      - `status` (text)
      - `api_key` (text)
      - `api_endpoint` (text)
      - `metrics` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `agents` table
    - Add policies for CRUD operations
    - Add policy for public agent visibility
*/

CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  capabilities text[] NOT NULL,
  personality jsonb NOT NULL,
  integrations text[] NOT NULL,
  is_public boolean DEFAULT false,
  status text NOT NULL DEFAULT 'draft',
  api_key text,
  api_endpoint text,
  metrics jsonb DEFAULT '{"requests": 0, "success_rate": 0, "avg_response_time": 0}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Policies for agents table
CREATE POLICY "Users can create their own agents"
  ON agents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own agents"
  ON agents FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own agents"
  ON agents FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agents"
  ON agents FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public agents are viewable by everyone"
  ON agents FOR SELECT
  USING (is_public = true);