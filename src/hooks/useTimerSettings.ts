import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useTimerSettings() {
  const [delaySeconds, setDelaySeconds] = useState<number>(() => {
    const cached = localStorage.getItem('timerDelay');
    return cached ? parseInt(cached) : 10;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchTimerSettings();
  }, []);

  const fetchTimerSettings = async () => {
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
        setError('Failed to load timer settings');
        return;
      }

      if (data) {
        setDelaySeconds(data.delay_seconds);
        localStorage.setItem('timerDelay', data.delay_seconds.toString());
      }
    } catch (err) {
      console.error('Exception fetching timer settings:', err);
      setError('Failed to load timer settings');
    } finally {
      setIsLoading(false);
    }
  };

  const saveTimerSettings = async (newDelay: number): Promise<boolean> => {
    if (newDelay < 0 || newDelay > 300) {
      setError('Delay must be between 0 and 300 seconds');
      return false;
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
        setError('Failed to save timer settings');
        localStorage.setItem('timerDelay', newDelay.toString());
        setDelaySeconds(newDelay);
        return false;
      }

      setDelaySeconds(newDelay);
      localStorage.setItem('timerDelay', newDelay.toString());
      setSuccessMessage('Timer saved successfully!');

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);

      return true;
    } catch (err) {
      console.error('Exception saving timer settings:', err);
      setError('Failed to save timer settings');
      localStorage.setItem('timerDelay', newDelay.toString());
      setDelaySeconds(newDelay);
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
