import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from './components/reusable/footer/footer.component';
import { HeaderComponent } from './components/reusable/header/header.component';

@Component({
  selector: 'stepchallenge-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'stepchallenge';

  ngOnInit(): void {
    initFlowbite();
  }
}
