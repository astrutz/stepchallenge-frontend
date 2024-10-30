import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { TabItem, Tabs } from 'flowbite';
import { DataService } from '../../../services/data.service';
import { RequestService } from '../../../services/request.service';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Game } from '../../../data/game.data';
import { JsonPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../reusable/loading-spinner/loading-spinner.component';
import { ToastComponent } from '../../reusable/toast/toast.component';
import { pairwise } from 'rxjs';
import { Player } from '../../../data/player.data';

@Component({
  selector: 'kickathon-results',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    LoadingSpinnerComponent,
    ToastComponent,
    JsonPipe,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements AfterViewInit {
  protected dataService: DataService = inject(DataService);
  protected requestService: RequestService = inject(RequestService);
  protected router: Router = inject(Router);

  protected singleFormGroup = new FormGroup({
    timestamp: new FormControl(new Date().toISOString(), [Validators.required]),
    player1: new FormControl(0, [Validators.required, Validators.min(1)]),
    player2: new FormControl(0, [Validators.required, Validators.min(1)]),
    scoreTeam1: new FormControl(0, [Validators.required]),
    scoreTeam2: new FormControl(0, [Validators.required]),
  });

  protected doubleFormGroup = new FormGroup({
    timestamp: new FormControl(new Date().toISOString(), [Validators.required]),
    player1: new FormControl(0, []),
    player2: new FormControl(0, []),
    player3: new FormControl(0, []),
    player4: new FormControl(0, []),
    scoreTeam1: new FormControl(0, [Validators.required]),
    scoreTeam2: new FormControl(0, [Validators.required]),
  });

  protected selectableSinglePlayers$ = computed(() => {
    return this.dataService.players$().filter((player) => {
      return (
        this.selectedPlayer1() !== player.id &&
        this.selectedPlayer2() !== player.id
      );
    });
  });

  protected selectableDoublePlayers$ = computed(() => {
    return this.dataService.players$().filter((player) => {
      return (
        this.selectedPlayer3() !== player.id &&
        this.selectedPlayer4() !== player.id &&
        this.selectedPlayer5() !== player.id &&
        this.selectedPlayer6() !== player.id
      );
    });
  });


  protected selectedPlayer1: WritableSignal<number | null> = signal(null);
  protected selectedPlayer2: WritableSignal<number | null> = signal(null);
  protected selectedPlayer3: WritableSignal<number | null> = signal(null);
  protected selectedPlayer4: WritableSignal<number | null> = signal(null);
  protected selectedPlayer5: WritableSignal<number | null> = signal(null);
  protected selectedPlayer6: WritableSignal<number | null> = signal(null);

  state: 'idle' | 'sending' | 'sent' = 'idle';

  @ViewChild('defaultTab') tabElement!: ElementRef;

  @ViewChild('oneVsOneTab') oneVsOneTab!: ElementRef;
  @ViewChild('oneVsOne') oneVsOne!: ElementRef;

  @ViewChild('twoVsTwoTab') twoVsTwoTab!: ElementRef;
  @ViewChild('twoVsTwo') twoVsTwo!: ElementRef;

  tabsElements!: TabItem[];

  options = {
    defaultTabId: 'settings',
    activeClasses:
      'text-primary-500 hover:text-primary-400 dark:text-primary-300 dark:hover:text-primary-200 border-primary-500 dark:border-primary-400',
    inactiveClasses:
      'text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300',
  };

  instanceOptions = {
    id: 'tabs-example',
    override: true,
  };

  ngAfterViewInit() {
    this.tabsElements = [
      {
        id: 'oneVsOne',
        triggerEl: this.oneVsOneTab.nativeElement,
        targetEl: this.oneVsOne.nativeElement,
      },
      {
        id: 'twoVsTwo',
        triggerEl: this.twoVsTwoTab.nativeElement,
        targetEl: this.twoVsTwo.nativeElement,
      },
    ];

    let tabs: Tabs = new Tabs(
      this.tabElement.nativeElement,
      this.tabsElements,
      this.options,
      this.instanceOptions,
    );
    tabs.show('oneVsOne');
  }

  playerChange(event: Event, index: number) {
    const value =
      (event.target as HTMLInputElement).value !== ''
        ? +(event.target as HTMLInputElement).value
        : null;
    switch (index) {
      case 0:
        this.selectedPlayer1.set(value);
        return;
      case 1:
        this.selectedPlayer2.set(value);
        return;
      case 2:
        this.selectedPlayer3.set(value);
        return;
      case 3:
        this.selectedPlayer4.set(value);
        return;
      case 4:
        this.selectedPlayer5.set(value);
        return;
      case 5:
        this.selectedPlayer6.set(value);
        return;
    }
  }

  async submitGame(is1v1: boolean): Promise<void> {
    if (is1v1) {
      let rawData = this.singleFormGroup.getRawValue();
      if (this.isSingleValid) {
        const game: Game = {
          team1Players: [rawData.player1!],
          team2Players: [rawData.player2!],
          scoreTeam1: rawData.scoreTeam1!,
          scoreTeam2: rawData.scoreTeam2!,
          timestamp: rawData.timestamp!,
        };
        this.state = 'sending';
        await this.requestService.postGame(game);
        this.state = 'sent';
        this.singleFormGroup.reset();
        this.singleFormGroup = new FormGroup({
          timestamp: new FormControl(new Date().toISOString(), [Validators.required]),
          player1: new FormControl(0, [Validators.required, Validators.min(1)]),
          player2: new FormControl(0, [Validators.required, Validators.min(1)]),
          scoreTeam1: new FormControl(0, [Validators.required]),
          scoreTeam2: new FormControl(0, [Validators.required]),
        });
        this.doubleFormGroup.reset();

        this.doubleFormGroup = new FormGroup({
          timestamp: new FormControl(new Date().toISOString(), [Validators.required]),
          player1: new FormControl(0, []),
          player2: new FormControl(0, []),
          player3: new FormControl(0, []),
          player4: new FormControl(0, []),
          scoreTeam1: new FormControl(0, [Validators.required]),
          scoreTeam2: new FormControl(0, [Validators.required]),
        });
      }
    } else {
      let rawData = this.doubleFormGroup.getRawValue();
      if (this.isDoubleValid) {
        const team1Players = [];
        if (rawData.player1) {
          team1Players.push(rawData.player1);
        }
        if (rawData.player2) {
          team1Players.push(rawData.player2);
        }
        const team2Players = [];
        if (rawData.player3) {
          team2Players.push(rawData.player3);
        }
        if (rawData.player4) {
          team2Players.push(rawData.player4);
        }
        const game: Game = {
          team1Players,
          team2Players,
          scoreTeam1: rawData.scoreTeam1!,
          scoreTeam2: rawData.scoreTeam2!,
          timestamp: rawData.timestamp!,
        };
        this.state = 'sending';
        await this.requestService.postGame(game);
        this.state = 'sent';
      }
    }
  }

  get isSingleValid() {
    let rawData = this.singleFormGroup.getRawValue();
    return (
      this.singleFormGroup.valid &&
      rawData.player1 &&
      rawData.player2 &&
      rawData.player1 !== rawData.player2 &&
      ((rawData.scoreTeam1 ?? 0) > 0 || (rawData.scoreTeam2 ?? 0) > 0)
    );
  }

  get isDoubleValid() {
    let rawData = this.doubleFormGroup.getRawValue();
    return (
      this.doubleFormGroup.valid &&
      (rawData.player1 || rawData.player2) &&
      (rawData.player3 || rawData.player4) &&
      rawData.player1 !== rawData.player2 &&
      rawData.player1 !== rawData.player3 &&
      rawData.player1 !== rawData.player4 &&
      rawData.player2 !== rawData.player3 &&
      rawData.player2 !== rawData.player4 &&
      rawData.player3 !== rawData.player4 &&
      ((rawData.scoreTeam1 ?? 0) > 0 || (rawData.scoreTeam2 ?? 0) > 0)
    );
  }
}
