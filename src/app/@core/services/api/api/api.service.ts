import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = `${environment.apiURL}`;
  }

  public get(apiCall: string, filter?: unknown, options?: object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(`${this.apiURL}/${apiCall}${this.serializeParams(filter)}`, options);
  }

  public post(apiCall: string, data?: object) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(`${this.apiURL}/${apiCall}`, data);
  }

  public delete(apiCall: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.delete<any>(`${this.apiURL}/${apiCall}`);
  }

  protected serializeParams(obj: unknown): string {
    if (!obj) {
      return '';
    }
    const str: string[] = [];
    Object.entries(obj).forEach(([key, val]) => {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        val !== null &&
        val !== undefined &&
        val !== '' &&
        !(Array.isArray(val) && !val?.length)
      ) {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(Array.isArray(val) ? val?.join(',') : val)}`);
      }
    });
    return str.length ? '?' + str.join('&') : '';
  }
}
