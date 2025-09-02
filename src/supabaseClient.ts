import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mvisfbkqnsslvgsescnc.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12aXNmYmtxbnNzbHZnc2VzY25jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MTA4NjUsImV4cCI6MjA3MjA4Njg2NX0.fmeBbBsL2Hiznb00xuVDglE4kMARAeho7sguUb4erMQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
