import { useCallback, useEffect, useState } from 'react';

import { API_KEY, BASE_URL, LIMIT, trendingPath } from '../config';
import { GifType } from '../types/GifType';

interface UseFetchGiphiesResult {
  gifs: GifType[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  loadGifs: () => void;
  hasMore: boolean;
}

export const useFetchGiphies = (): UseFetchGiphiesResult => {
  const [gifs, setGifs] = useState<GifType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchGifs = useCallback(
    async (isLoadMore = false) => {
      setError(null);
      setLoading(isLoadMore ? false : true);
      setLoadingMore(isLoadMore);

      try {
        const response = await fetch(`${BASE_URL}${trendingPath}?api_key=${API_KEY}&limit=${LIMIT}&offset=${offset}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong while fetching GIFs');
        }

        setTotalCount(data.pagination.total_count);

        setGifs((prevGifs) => (isLoadMore ? [...prevGifs, ...data.data] : data.data));
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to fetch GIFs');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [offset],
  );

  useEffect(() => {
    fetchGifs();
  }, [fetchGifs]);

  const loadGifs = () => {
    setOffset((prevOffset) => prevOffset + LIMIT);
    fetchGifs(true);
  };

  const hasMore = gifs.length < totalCount;

  return { gifs, loading, error, loadGifs, loadingMore, hasMore };
};
