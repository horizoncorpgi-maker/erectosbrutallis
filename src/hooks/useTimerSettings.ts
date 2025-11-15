import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase config:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey
});

const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function useTimerSettings() {
  const [delaySeconds, setDelaySeconds] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTimerSettings();
  }, []);

  const fetchTimerSettings = async () => {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured, using default value');
      setIsLoading(false);
      return;
    }

    console.log('🔄 Fetching timer settings from Supabase...');
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('timer_settings')
        .select('delay_seconds')
        .eq('id', 1)
        .maybeSingle();

      if (fetchError) {
        console.error('❌ Error fetching timer settings:', fetchError);
        setIsLoading(false);
        return;
      }

      if (data) {
        console.log('✅ Timer loaded from Supabase:', data.delay_seconds + 's');
        setDelaySeconds(data.delay_seconds);
      } else {
        console.log('⚠️ No timer data found in Supabase, using default');
      }
    } catch (err) {
      console.error('❌ Exception fetching timer settings:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTimerSettings = async (newDelay: number): Promise<boolean> => {
    if (newDelay < 0 || newDelay > 300) {
      setError('Delay must be between 0 and 300 seconds');
      return false;
    }

    if (!supabase) {
      console.warn('⚠️ Supabase not configured, cannot save');
      setError('Database not configured');
      return false;
    }

    console.log('💾 Saving timer to Supabase:', newDelay + 's');
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error: updateError } = await supabase
        .from('timer_settings')
        .update({
          delay_seconds: newDelay,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (updateError) {
        console.error('❌ Error saving timer settings:', updateError);
        setError('Failed to save: ' + updateError.message);
        return false;
      }

      console.log('✅ Timer saved to Supabase successfully');
      setDelaySeconds(newDelay);
      setSuccessMessage('Timer saved!');
      setTimeout(() => setSuccessMessage(null), 3000);
      return true;
    } catch (err) {
      console.error('❌ Exception saving timer settings:', err);
      setError('Failed to save timer');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    delaySeconds,
    isLoading,
    isSaving,
    error,
    successMessage,
    saveTimerSettings,
    refreshSettings: fetchTimerSettings
  };
}
