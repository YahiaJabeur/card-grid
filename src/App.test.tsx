import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';
import App from './App';

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

describe('App Integration Test', () => {
  afterEach(() => {
    // cleanup();
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    const mockData = {
      data: [
        { id: '1', title: 'GIF 1', images: { original: { url: 'https://example.com/gif1.gif' } } },
        { id: '2', title: 'GIF 2', images: { original: { url: 'https://example.com/gif2.gif' } } },
      ],
      pagination: { total_count: 100 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      ...mockedResponse,
    });

    render(<App />);
    expect(screen.getByTestId('loading-indicator')).toBeDefined();
  });

  it('renders error state when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeDefined();
    });
  });

  it('renders gifs and load more button when fetch succeeds', async () => {
    const mockData = {
      data: [
        { id: '1', title: 'GIF 1', images: { original: { url: 'https://example.com/gif1.gif' } } },
        { id: '2', title: 'GIF 2', images: { original: { url: 'https://example.com/gif2.gif' } } },
      ],
      pagination: { total_count: 100 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      ...mockedResponse,
    });

    render(<App />);

    expect(screen.getByText('GIF 1')).toBeDefined();
    expect(screen.getByText('GIF 2')).toBeDefined();
    expect(screen.getByText('Load More')).toBeDefined();
  });

  it('loads more gifs when Load More button is clicked', async () => {
    const mockData = {
      data: [
        { id: '1', title: 'GIF 1', images: { original: { url: 'https://example.com/gif1.gif' } } },
        { id: '2', title: 'GIF 2', images: { original: { url: 'https://example.com/gif2.gif' } } },
      ],
      pagination: { total_count: 100 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      ...mockedResponse,
    });

    render(<App />);

    fireEvent.click(screen.getByText('Load More'));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it.skip('opens modal when a gif is clicked', async () => {
    const mockData = {
      data: [
        { id: '1', title: 'GIF 1', images: { original: { url: 'https://example.com/gif1.gif' } } },
        { id: '2', title: 'GIF 2', images: { original: { url: 'https://example.com/gif2.gif' } } },
      ],
      pagination: { total_count: 100 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      ...mockedResponse,
    });

    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('GIF 1'));
      expect(screen.getByTestId('modal')).toBeDefined();
    });
  });

  it.skip('closes modal when close button is clicked', async () => {
    const mockData = {
      data: [
        { id: '1', title: 'GIF 1', images: { original: { url: 'https://example.com/gif1.gif' } } },
        { id: '2', title: 'GIF 2', images: { original: { url: 'https://example.com/gif2.gif' } } },
      ],
      pagination: { total_count: 100 },
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
      ...mockedResponse,
    });

    render(<App />);

    await waitFor(() => {
      screen.getByText('GIF 1');
    });

    fireEvent.click(screen.getByText('GIF 1'));
    expect(screen.getByTestId('modal')).toBeDefined();

    await waitFor(() => {
      fireEvent.click(screen.getByTestId('close-button'));
      expect(screen.queryByTestId('modal')).not.toBeDefined();
    });
  });
});
