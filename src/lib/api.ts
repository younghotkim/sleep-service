/**
 * Common API Infrastructure for SleepTune
 */

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export const handleApiError = (error: Error | unknown): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
};

export const wrapApiResponse = <T>(data: T | null, error: Error | unknown = null, status: number = 200): ApiResponse<T> => {
  return {
    data,
    error: error ? handleApiError(error) : null,
    status,
  };
};
