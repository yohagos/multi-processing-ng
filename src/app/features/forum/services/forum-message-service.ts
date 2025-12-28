import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumMessageService {
  private readonly baseUrl = "http://localhost:8080/api/forum/messages"
  private httpClient = inject(HttpClient)
}
