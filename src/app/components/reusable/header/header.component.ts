import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'stepchallenge-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router: Router = inject(Router);
}
