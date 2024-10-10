import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { filter, map, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment.development';

export interface Suscriptor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
  phone: string;
  age: number;
  birthDate: Date;
}

export interface RootSuscriptorsObject {
  users: Suscriptor[];
  total: number;
  skip: number;
  limit: number;
}

export const ITEMS_PER_PAGE = 10;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'test-flowbite';
  ready = false;
  $items: Observable<number[]> = of([1, 2, 3]);
  items: number[] = [];
  private http = inject(HttpClient);
  private baseUrl: string = `${environment.API_URL}/users`;
  private start = signal(0);
  private end = signal(0);
  private total = signal(0);

  public users = signal<Suscriptor[]>([]);
  public currentPage = signal(1);
  ngOnInit(): void {
    initFlowbite();
    this.loadPage(this.currentPage());
    this.$items.subscribe();
  }

  loadPage(page: number, searchValue: string = '') {
    if (page < 1) {
      return;
    }
    this.currentPage.set(page);
    this.getSuscriptors(page, searchValue)
      .pipe(filter((res) => res.users.length > 0))
      .subscribe((res: RootSuscriptorsObject) => {
        this.users.set(res.users);
        this.total.set(res.total);
        this.start.set(res.skip + 1);
        this.end.set(res.skip + res.limit);
      });
  }

  getSuscriptors(
    page: number = 1,
    search: string = ''
  ): Observable<RootSuscriptorsObject> {
    const skip: number = (page - 1) * ITEMS_PER_PAGE;
    const url: string = `${this.baseUrl}/search`;
    return this.http
      .get<RootSuscriptorsObject>(url, {
        params: {
          skip: skip,
          limit: ITEMS_PER_PAGE,
          select:
            'id,firstName,lastName,email,gender,age,image,phone,birthDate',
          q: search,
        },
      })
      .pipe(map((response) => response));
  }
}
