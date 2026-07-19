
REVOKE EXECUTE ON FUNCTION public.cleanup_debug_error_captures() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cleanup_debug_error_captures() TO service_role, postgres;
