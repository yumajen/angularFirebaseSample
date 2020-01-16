import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class MockWebApiService implements InMemoryDbService {
  createDb() {
    const messages = [
      // { id: 1, contents: 'あいうえお' },
      // { id: 2, contents: '今日もいいペンキ☆' },
      // { id: 3, contents: '浦和レッズ' },
      // { id: 4, contents: 'roserade' },
    ];
    return { messages };
  }
}
