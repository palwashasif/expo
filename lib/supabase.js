import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const supabaseUrl = 'https://abbsqcujguvbqgtaowwp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYnNxY3VqZ3V2YnFndGFvd3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTk3MDgsImV4cCI6MjA2MDg5NTcwOH0.6k_KjXFTRHgMm6PSO-l0aQL9IPOX05viSx0hLXUDCT8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 