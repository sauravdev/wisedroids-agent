export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          capabilities: string[]
          personality: Json
          integrations: string[]
          is_public: boolean
          status: string
          api_key: string | null
          api_endpoint: string | null
          metrics: Json
          code: string | null
          service_id: string | null
          repo_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description: string
          capabilities: string[]
          personality: Json
          integrations: string[]
          is_public?: boolean
          status?: string
          api_key?: string | null
          api_endpoint?: string | null
          metrics?: Json
          code?: string | null
          service_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          capabilities?: string[]
          personality?: Json
          integrations?: string[]
          is_public?: boolean
          status?: string
          api_key?: string | null
          api_endpoint?: string | null
          metrics?: Json
          code?: string | null
          service_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // ... other tables remain the same
    }
  }
}