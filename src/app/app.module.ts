import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PlayerCardComponent } from './player/player-card/player-card.component';
import { EnemyCardComponent } from './enemy/enemy-card/enemy-card.component';
import { UiCardComponent } from './ui/ui-card/ui-card.component';
import { PlayerDetailsComponent } from './player/player-card/player-details/player-details.component';
import { PlayerInventoryComponent } from './player/player-card/player-inventory/player-inventory.component';
import { EnemyDetailsComponent } from './enemy/enemy-card/enemy-details/enemy-details.component';
import { CharacterCreateComponent } from './ui/ui-card/character-create/character-create.component';
import { RollStatsComponent } from './ui/ui-card/roll-stats/roll-stats.component';
import { ArenaComponent } from './ui/ui-card/arena/arena.component';
import { LevelUpComponent } from './ui/ui-card/level-up/level-up.component';
import { StoreComponent } from './ui/ui-card/store/store.component';
import { HealerComponent } from './ui/ui-card/healer/healer.component';
import { TownComponent } from './ui/ui-card/town/town.component';
import { TrainerComponent } from './ui/ui-card/trainer/trainer/trainer.component';
import { PlayerAbilitiesComponent } from './player/player-card/player-abilities/player-abilities.component';
import { GameOverComponent } from './game-over/game-over.component';
import { Config } from './shared/config';

@NgModule({
  declarations: [
    AppComponent,
    PlayerCardComponent,
    EnemyCardComponent,
    UiCardComponent,
    PlayerDetailsComponent,
    PlayerInventoryComponent,
    EnemyDetailsComponent,
    CharacterCreateComponent,
    RollStatsComponent,
    ArenaComponent,
    LevelUpComponent,
    StoreComponent,
    HealerComponent,
    TownComponent,
    TrainerComponent,
    PlayerAbilitiesComponent,
    GameOverComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [Config],
  bootstrap: [AppComponent]
})
export class AppModule { }
