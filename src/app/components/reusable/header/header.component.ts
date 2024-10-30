import { Component, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgClass, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'kickathon-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  onLogout(): void {
    this.userService.logout();
  }
}
