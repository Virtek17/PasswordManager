export type Json =
string |
number |
boolean |
null |
{[key: string]: Json | undefined;} |
Json[];

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          color: string;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          color: string;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          color?: string;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      passwords: {
        Row: {
          id: string;
          user_id: string;
          service_name: string;
          login: string;
          password: string;
          group_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_name: string;
          login: string;
          password: string;
          group_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          service_name?: string;
          login?: string;
          password?: string;
          group_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}