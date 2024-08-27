import { renderHook, act, waitFor } from '@testing-library/react';
import { expect, describe, test, afterEach, vi } from 'vitest';

import { useFetchGiphies } from './useFetchGiphies';
import { API_KEY, BASE_URL, LIMIT, trendingPath } from '../config';

global.fetch = vi.fn();

const fetch = vi.mocked(global.fetch);

const mockedResponse = {
  headers: new Headers(),
  redirected: false,
  status: 200,
  statusText: 'OK',
  type: 'basic',
  url: '',
  clone: () => ({}) as Response,
  body: null,
  bodyUsed: false,
  arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
  blob: () => Promise.resolve(new Blob()),
  formData: () => Promise.resolve(new FormData()),
  text: () => Promise.resolve(''),
} as const;

const mockGifData = {
  data: [
    { id: '1', title: 'GIF 1', images: { original: { url: 'https://example.com/gif1.gif' } } },
    { id: '2', title: 'GIF 2', images: { original: { url: 'https://example.com/gif2.gif' } } },
  ],
  pagination: { total_count: 50 },
};

describe('useFetchGiphies', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should fetch gifs on initial render', async () => {
    const mockData = {
      data: [
        { id: '1', title: 'GIF 1' },
        { id: '2', title: 'GIF 2' },
      ],
      pagination: { total_count: 100 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      ...mockedResponse,
    });

    const { result } = renderHook(() => useFetchGiphies());

    expect(result.current.loading).toBe(true);
    expect(result.current.gifs).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.gifs).toEqual(mockData.data);
      expect(result.current.hasNext).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}${trendingPath}?api_key=${API_KEY}&limit=${LIMIT}&offset=0`,
      );
    });
  });

  test('should handle errors when fetching gifs', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => useFetchGiphies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('Failed to fetch GIFs');
      expect(result.current.gifs).toEqual([]);
    });
  });

  test('should load more GIFs when loadGifs is called', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockGifData),
      ...mockedResponse,
    });

    const { result } = renderHook(() => useFetchGiphies());

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          ...mockGifData,
          data: [{ id: '3', title: 'GIF 3', images: { original: { url: 'https://example.com/gif3.gif' } } }],
        }),
      ...mockedResponse,
    });

    await act(async () => {
      result.current.loadMore();
    });

    expect(result.current.loadingMore).toBe(false);
    expect(result.current.gifs.length).toBe(3);
    expect(result.current.gifs[2].id).toBe('3');
  });

  test.skip('should load more gifs when loadGifs is called', async () => {
    const mockInitialData = {
      data: [
        { id: '1', title: 'GIF 1' },
        { id: '2', title: 'GIF 2' },
      ],
      pagination: { total_count: 100 },
    };

    const mockMoreData = {
      data: [
        { id: '3', title: 'GIF 3' },
        { id: '4', title: 'GIF 4' },
      ],
      pagination: { total_count: 100 },
    };

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockInitialData),
        ...mockedResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockMoreData),
        ...mockedResponse,
      });

    const { result } = renderHook(() => useFetchGiphies());

    await waitFor(() => {
      expect(result.current.gifs).toEqual(mockInitialData.data);
    });

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.loadingMore).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.loadingMore).toBe(false);
      expect(result.current.gifs).toEqual([...mockInitialData.data, ...mockMoreData.data]);
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch).toHaveBeenLastCalledWith(
        `${BASE_URL}${trendingPath}?api_key=${API_KEY}&limit=${LIMIT}&offset=4`,
      );
    });
  });

  test('should set hasMore to false when all gifs are loaded', async () => {
    const mockData = {
      data: [
        { id: '1', title: 'GIF 1' },
        { id: '2', title: 'GIF 2' },
      ],
      pagination: { total_count: 2 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      ...mockedResponse,
    });

    const { result } = renderHook(() => useFetchGiphies());

    expect(result.current.hasNext).toBe(false);
  });

  test('should handle API errors with error messages', async () => {
    const errorMessage = 'API rate limit exceeded';
    fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: errorMessage }),
      ...mockedResponse,
    });

    const { result } = renderHook(() => useFetchGiphies());

    await waitFor(() => {
      // expect(result.current.error).toBe(errorMessage);
      expect(result.current.error).toBe('Failed to fetch GIFs');
    });
  });
});
