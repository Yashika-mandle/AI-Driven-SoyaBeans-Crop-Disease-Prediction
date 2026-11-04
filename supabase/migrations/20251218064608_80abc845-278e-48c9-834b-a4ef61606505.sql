-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can insert their own analysis" ON public.analysis_history;
DROP POLICY IF EXISTS "Users can view their own analysis" ON public.analysis_history;
DROP POLICY IF EXISTS "Users can delete their own analysis" ON public.analysis_history;

-- Create PERMISSIVE policies (default behavior)
CREATE POLICY "Users can insert their own analysis"
ON public.analysis_history
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own analysis"
ON public.analysis_history
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analysis"
ON public.analysis_history
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);