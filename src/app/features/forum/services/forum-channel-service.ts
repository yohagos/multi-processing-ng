import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForumChannelService {
  private readonly baseUrl = "http://localhost:8080/api/forum/channels"
  private httpClient = inject(HttpClient)
}
