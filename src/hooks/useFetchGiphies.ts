import { useCallback, useEffect, useState } from 'react';

import { API_KEY, BASE_URL, LIMIT, trendingPath } from '../config';
import { GifType } from '../types/GifType';

interface UseFetchGiphiesResult {
  gifs: GifType[];
  loading: boolean;
  loadingMore: boolean;
  error: string | undefined;
  loadMore: () => void;
  hasNext: boolean;
}

export const useFetchGiphies = (): UseFetchGiphiesResult => {
  const [gifs, setGifs] = useState<GifType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchGifs = useCallback(async (newOffset: number, isLoadMore = false) => {
    setError(undefined);
    setLoading(isLoadMore ? false : true);
    setLoadingMore(isLoadMore);

    try {
      const response = await fetch(`${BASE_URL}${trendingPath}?api_key=${API_KEY}&limit=${LIMIT}&offset=${newOffset}`);
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
  }, []);

  useEffect(() => {
    fetchGifs(0);
  }, [fetchGifs]);

  const loadMore = () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    fetchGifs(newOffset, true);
  };

  const hasNext = gifs.length < totalCount;

  return { gifs, loading, error, loadMore, loadingMore, hasNext };
};
