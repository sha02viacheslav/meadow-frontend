import { Injectable } from '@angular/core';
import { ApiService } from '@services/api/api/api.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models';
import { UpdateUserDto } from '@dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private apiService: ApiService) {}

  updateUser(data: UpdateUserDto): Observable<ApiResponse<string>> {
    return this.apiService.post('user', data);
  }
}
