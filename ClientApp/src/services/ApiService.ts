import { RequestService } from "./RequestService";
import Photo from "../contracts/Photo";
import { SearchResponse } from "../contracts/SearchResponse";
import { ValidationException } from "../exceptions/ValidationException";
import { API_URL } from "../constants/config";
import { ErrorResponse } from "../contracts/ErrorResponse";

export class ApiService {
  private static readonly LATEST_QUERY_KEY = "latestQuery";
  private static readonly CURRENT_PAGE_KEY = "currentPage";

  constructor(private requestService: RequestService) {}

  async searchPhotos(query: string): Promise<Photo[]> {
    this.validateInput(query);
    const page = this.getNextPageNumber(query);
    const url = `${API_URL}/Photos/Search?query=${query}&page=${page}`;
    const response = await this.requestService.request(url, {
      method: "GET",
      mode: "cors",
    });

    if (response.ok) {
      const { photos, page: currentPage }: SearchResponse =
        await response.json();
      this.saveLatestQueryAndPage(query, currentPage);
      return photos;
    } else {
      const error: ErrorResponse = await response.json();
      return Promise.reject(new ValidationException(error.message));
    }
  }

  private getNextPageNumber(query: string): number {
    const latestQuery = this.getLatestQuery();
    const currentPage = this.getCurrentPageNumber();
    if (query === latestQuery) {
      return currentPage + 1;
    } else {
      return 1;
    }
  }

  private getLatestQuery(): string {
    return sessionStorage.getItem(ApiService.LATEST_QUERY_KEY) || "";
  }

  private getCurrentPageNumber(): number {
    const page = sessionStorage.getItem(ApiService.CURRENT_PAGE_KEY);
    return page ? parseInt(page, 10) : 1;
  }

  private saveLatestQueryAndPage(query: string, page: number): void {
    sessionStorage.setItem(ApiService.LATEST_QUERY_KEY, query);
    sessionStorage.setItem(ApiService.CURRENT_PAGE_KEY, page.toString());
  }

  validateInput(query: string): boolean {
    if (!query) {
      throw new Error("Invalid input: query is empty");
    }
    return true;
  }
}
