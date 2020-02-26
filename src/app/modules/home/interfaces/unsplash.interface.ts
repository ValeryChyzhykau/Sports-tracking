import { ImageInterface } from './image.interface';

export interface UnspalshInterface {
  results: Array<{
    id: string;
    urls: ImageInterface;
  }>;
}
