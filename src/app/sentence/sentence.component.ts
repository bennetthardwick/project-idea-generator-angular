import { Component, OnInit } from '@angular/core';
import { SentenceService } from '../sentence.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.css']
})
export class SentenceComponent implements OnInit {

  sentence: string = "Press the 'generate' button for a new app idea.";
  data: any;

  constructor(private sentenceService: SentenceService) { }

  ngOnInit() {
  }

  generate() {
    this.sentenceService.generateSentence()
      .then(x => this.sentence = x);
  }

  getGraph() {

  }

}
