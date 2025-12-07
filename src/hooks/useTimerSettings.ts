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
  const [delaySeconds, setDelaySeconds] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  console.log('🟡 useTimerSettings hook inicializado');
  console.log('🟡 Supabase URL:', supabaseUrl);
  console.log('🟡 Supabase Key exists:', !!supabaseAnonKey);
  console.log('🟡 Supabase client exists:', !!supabase);

  useEffect(() => {
    console.log('🟢 useEffect executado - carregando timer do Supabase');
    localStorage.removeItem('timerDelay');
    fetchTimerSettings();
  }, []);

  const fetchTimerSettings = async () => {
    if (!supabase) {
      console.warn('Supabase not configured, using localStorage');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching timer settings from Supabase...');
      const { data, error: fetchError } = await supabase
        .from('timer_settings')
        .select('delay_seconds')
        .eq('id', 1)
        .maybeSingle();

      console.log('Supabase response:', { data, error: fetchError });

      if (fetchError) {
        console.error('Error fetching timer settings:', fetchError);
        setError(`Failed to load: ${fetchError.message}`);
        return;
      }

      if (data) {
        console.log('Loaded timer from Supabase:', data.delay_seconds);
        setDelaySeconds(data.delay_seconds);
        localStorage.setItem('timerDelay', data.delay_seconds.toString());
      } else {
        console.warn('No timer settings found in database');
      }
    } catch (err) {
      console.error('Exception fetching timer settings:', err);
      setError(`Exception: ${err}`);
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
