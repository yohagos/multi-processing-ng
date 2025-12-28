import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumUserService {
  private readonly baseUrl = "http://localhost:8080/api/forum/users"
  private httpClient = inject(HttpClient)
}
