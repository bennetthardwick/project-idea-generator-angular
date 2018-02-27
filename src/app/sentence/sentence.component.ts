import { Component, OnInit } from '@angular/core';
import { GraphService } from '../graph.service';

@Component({
  selector: 'app-sentence',
  templateUrl: './sentence.component.html',
  styleUrls: ['./sentence.component.css']
})
export class SentenceComponent implements OnInit {

  sentence: any = { sentence: "" };

  constructor(private graph: GraphService) { }

  ngOnInit() {
  }

  generate() {
    this.graph.getSentence()
      .subscribe(x => this.sentence = x);
  }

}
