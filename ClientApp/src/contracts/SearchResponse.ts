import Photo from "./Photo";

export interface SearchResponse {
  page: number;
  pages: number; // not used, could be useful for further development
  perPage: number; // not used, could be useful for further development
  total: number; // not used, could be useful for further development
  photos: Photo[];
}
