import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {
  formatDateTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatRelative(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Gerade eben';
    if (diffMins < 60) return `Vor ${diffMins} Minuten`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Vor ${diffHours} Stunden`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Gestern';
    if (diffDays < 7) return `Vor ${diffDays} Tagen`;

    return this.formatDate(dateTimeString);
  }
}
