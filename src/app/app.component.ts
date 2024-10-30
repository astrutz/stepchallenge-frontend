import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {initFlowbite} from "flowbite";
import {FooterComponent} from "./components/reusable/footer/footer.component";
import {HeaderComponent} from "./components/reusable/header/header.component";
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'kickathon-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FooterComponent, HeaderComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'kickathon';

  ngOnInit(): void {
    initFlowbite();
  }
}
