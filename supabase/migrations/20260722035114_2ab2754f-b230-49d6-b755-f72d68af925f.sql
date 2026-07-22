ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_class_min_check;
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_class_max_check;
ALTER TABLE public.courses ADD CONSTRAINT courses_class_min_check CHECK (class_min >= 1 AND class_min <= 30);
ALTER TABLE public.courses ADD CONSTRAINT courses_class_max_check CHECK (class_max >= 1 AND class_max <= 30);