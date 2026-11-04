-- Drop existing restrictive policies on predictions table
DROP POLICY IF EXISTS "Authenticated users can insert predictions" ON public.predictions;
DROP POLICY IF EXISTS "Users can view their own predictions" ON public.predictions;
DROP POLICY IF EXISTS "Users can update their own predictions" ON public.predictions;
DROP POLICY IF EXISTS "Admins can view all predictions" ON public.predictions;

-- Recreate policies as PERMISSIVE (default)
CREATE POLICY "Users can insert their own predictions"
ON public.predictions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own predictions"
ON public.predictions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own predictions"
ON public.predictions
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all predictions"
ON public.predictions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));