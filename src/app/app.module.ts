import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditGraphComponent } from './edit-graph/edit-graph.component';
import { ViewGraphComponent } from './view-graph/view-graph.component';
import { SentenceComponent } from './sentence/sentence.component';
import { NavComponent } from './nav/nav.component';
import { SettingsComponent } from './settings/settings.component';

import { GraphService } from './graph.service';
import { SentenceService } from './sentence.service';

import { D3Service, D3_DIRECTIVES } from './d3/d3';
import { GraphComponent } from './d3/visuals/graph/graph.component';
import { SHARED_VISUALS } from './d3/visuals/shared';

let routes: Routes = 
[
  { path: '', component: SentenceComponent },
  { path: 'edit', component: EditGraphComponent },
  { path: 'graph', component: ViewGraphComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EditGraphComponent,
    ViewGraphComponent,
    SentenceComponent,
    NavComponent,
    SettingsComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers:
    [
      D3Service, 
      GraphService,
      SentenceService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
