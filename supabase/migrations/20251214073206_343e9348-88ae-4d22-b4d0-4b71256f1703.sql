-- Create portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Allow public read access (visitors can see portfolio)
CREATE POLICY "Anyone can view portfolio items"
ON public.portfolio_items
FOR SELECT
USING (true);

-- Allow public insert/update/delete (password protection will be in the UI)
CREATE POLICY "Anyone can insert portfolio items"
ON public.portfolio_items
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update portfolio items"
ON public.portfolio_items
FOR UPDATE
USING (true);

CREATE POLICY "Anyone can delete portfolio items"
ON public.portfolio_items
FOR DELETE
USING (true);

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true);

-- Allow public read access to portfolio images
CREATE POLICY "Portfolio images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio');

-- Allow public upload to portfolio bucket (password protection in UI)
CREATE POLICY "Anyone can upload portfolio images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'portfolio');

-- Allow public delete from portfolio bucket
CREATE POLICY "Anyone can delete portfolio images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'portfolio');