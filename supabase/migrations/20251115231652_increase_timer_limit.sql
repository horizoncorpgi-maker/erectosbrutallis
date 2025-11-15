/*
  # Increase timer settings maximum limit

  1. Changes
    - Remove the existing check constraint (max 300 seconds)
    - Add new check constraint allowing up to 3600 seconds (1 hour)
    
  2. Notes
    - This allows for much longer reveal timers
    - Maximum is now 1 hour (3600 seconds)
*/

ALTER TABLE timer_settings DROP CONSTRAINT IF EXISTS timer_settings_delay_seconds_check;

ALTER TABLE timer_settings ADD CONSTRAINT timer_settings_delay_seconds_check 
  CHECK (delay_seconds >= 0 AND delay_seconds <= 3600);
