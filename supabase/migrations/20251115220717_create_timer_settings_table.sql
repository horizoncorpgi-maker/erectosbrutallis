/*
  # Create timer_settings table

  1. New Tables
    - `timer_settings`
      - `id` (integer, primary key) - Always 1, single row table
      - `delay_seconds` (integer, not null, default 10) - Timer delay in seconds
      - `updated_at` (timestamptz, default now()) - Last update timestamp
  
  2. Security
    - Enable RLS on `timer_settings` table
    - Add policy for public read access (anyone can read the timer setting)
    - Add policy for public write access (anyone can update the timer setting)
  
  3. Data
    - Insert default row with id=1 and delay_seconds=10
*/

CREATE TABLE IF NOT EXISTS timer_settings (
  id integer PRIMARY KEY DEFAULT 1,
  delay_seconds integer NOT NULL DEFAULT 10 CHECK (delay_seconds >= 0 AND delay_seconds <= 300),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE timer_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to timer settings"
  ON timer_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public update access to timer settings"
  ON timer_settings
  FOR UPDATE
  TO public
  USING (id = 1)
  WITH CHECK (id = 1);

CREATE POLICY "Allow public insert access to timer settings"
  ON timer_settings
  FOR INSERT
  TO public
  WITH CHECK (id = 1);

INSERT INTO timer_settings (id, delay_seconds, updated_at)
VALUES (1, 10, now())
ON CONFLICT (id) DO NOTHING;