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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
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
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          created_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          full_name: string
          email: string
          position: string
          experience: string
          cover_letter: string
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          position: string
          experience: string
          cover_letter: string
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          position?: string
          experience?: string
          cover_letter?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}