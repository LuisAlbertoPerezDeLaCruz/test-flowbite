import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'test-flowbite';
  ready = false;

  public items: any[] = [];

  async ngOnInit() {
    initFlowbite();
    await this.loadPage(1000);
  }

  async loadPage(delay = 0) {
    if (delay > 0) await this.sleep(delay);
    this.items.push(...[1, 2, 3, 4, 5, 6, 7]);
    return;
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
