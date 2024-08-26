import { GifType } from './GifType';

export type GiphyApiResponse = {
  data: GifType[];
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
};
