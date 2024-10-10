import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

export interface SuscriptorObject {
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
  users: SuscriptorObject[];
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
  public $items: Observable<any> | null = null;

  ngOnInit(): void {
    initFlowbite();
    this.loadPage();
  }

  loadPage() {
    this.$items = of([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    this.$items.subscribe();
  }
}
