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
  const [delaySeconds, setDelaySeconds] = useState<number>(2430);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTimerSettings();
  }, []);

  const fetchTimerSettings = async () => {
    if (!supabase) {
      console.warn('Supabase not configured, using default 2430 seconds');
      setDelaySeconds(2430);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('timer_settings')
        .select('delay_seconds')
        .eq('id', 1)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching timer settings:', fetchError);
        setDelaySeconds(2430);
        return;
      }

      if (data) {
        console.log('Loaded timer from Supabase:', data.delay_seconds);
        setDelaySeconds(data.delay_seconds);
        localStorage.setItem('timerDelay', data.delay_seconds.toString());
      } else {
        console.log('No timer settings found, using default 2430 seconds');
        setDelaySeconds(2430);
      }
    } catch (err) {
      console.error('Exception fetching timer settings:', err);
      setDelaySeconds(2430);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTimerSettings = async (newDelay: number): Promise<boolean> => {
    if (newDelay < 0 || newDelay > 10000) {
      setError('Delay must be between 0 and 10000 seconds');
      return false;
    }

    if (!supabase) {
      console.warn('Supabase not configured, saving to localStorage only');
      setDelaySeconds(newDelay);
      localStorage.setItem('timerDelay', newDelay.toString());
      setSuccessMessage('Timer saved!');
      setTimeout(() => setSuccessMessage(null), 3000);
      return true;
    }

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
        console.error('Error saving timer settings:', updateError);
        setDelaySeconds(newDelay);
        localStorage.setItem('timerDelay', newDelay.toString());
        setSuccessMessage('Timer saved (local)!');
        setTimeout(() => setSuccessMessage(null), 3000);
        return true;
      }

      console.log('Saved timer to Supabase:', newDelay);
      setDelaySeconds(newDelay);
      localStorage.setItem('timerDelay', newDelay.toString());
      setSuccessMessage('Timer saved!');
      setTimeout(() => setSuccessMessage(null), 3000);
      return true;
    } catch (err) {
      console.error('Exception saving timer settings:', err);
      setDelaySeconds(newDelay);
      localStorage.setItem('timerDelay', newDelay.toString());
      setSuccessMessage('Timer saved (local)!');
      setTimeout(() => setSuccessMessage(null), 3000);
      return true;
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
