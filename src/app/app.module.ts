import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SentenceComponent } from './sentence/sentence.component';
import { NavComponent } from './nav/nav.component';
import { SettingsComponent } from './settings/settings.component';

import { SentenceService } from './sentence.service';

// Material Components
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './about/about.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';


let routes: Routes = 
[
  { path: '', component: SentenceComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SentenceComponent,
    NavComponent,
    SettingsComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    // Material Components
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,

  ],
  providers:
    [
      SentenceService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
