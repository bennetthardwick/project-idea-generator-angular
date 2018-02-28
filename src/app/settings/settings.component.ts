import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SentenceService } from '../sentence.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  placeHolders = {
    "_adjective": "Orange",
    "_noun": "Cats",
    "_verb": "Open",
    "_app": "Uber",
    "_people": "Children",
    "_build": "Create",
    "_app_type": "A Calendar App"
  };

  word_type: string = "_adjective";
  input_text: string = "";

  dictionary_url: string = "http://";
  grammar_url: string = "http://";


  constructor(private snack: MatSnackBar,
              private sentence: SentenceService) { }

  ngOnInit() {
  }

  resetGrammar() {

    console.log(this.input_text);

    this.sentence.createGraph()
      .then(() => this.snack.open('Graph reset success', "", { duration: 500 }))
      .catch(() => this.snack.open('Reset failed', "", { duration: 1000 }));
  }

  resetDictionary() {
    this.sentence.createDictionary()
      .then(() => this.snack.open('Dictionary reset success', "", { duration: 500 }))
      .catch(() => this.snack.open('Reset failed', "", { duration: 1000 }));

  }

  resetBoth() {
    Promise.all([
      this.sentence.createDictionary(),
      this.sentence.createGraph()
    ]).then(() => this.snack.open('Reset success', "", { duration: 500 }))
      .catch(() => this.snack.open('Reset failed', "", { duration: 1000 }));
  }

  addWord() {  
    if (this.input_text !== "") 
      this.sentence.addDictionaryEntry({ word: this.input_text, type: this.word_type })
        .then(() => this.snack.open('Entry add success', '', { duration: 500 }))
        .catch(() => this.snack.open('Entry add failed', '', { duration: 1000 }));
    else this.snack.open('Please write something, anything!', '', { duration: 1500 });
  }

  uploadDict() {
    if (this.dictionary_url !== "") 
      try {
        this.sentence.createDictionary(this.dictionary_url)
        .then(() => this.snack.open('Dictionary upload success', "", { duration: 500 }))
        .catch(() => this.snack.open('An error occured', "", { duration: 1000 }));
      } catch {
        this.snack.open('An error occured', "", { duration: 1000 });
      }      
    else this.snack.open('Please write a url to JSON', '', { duration: 1500 });
  }

  uploadGrammar() {
    if (this.grammar_url !== "") 
      this.sentence.createGraph(this.grammar_url)
        .then(() => this.snack.open('Grammar upload success', "", { duration: 500 }))
        .catch(() => this.snack.open('An error occured', "", { duration: 1000 }));
    else this.snack.open('Please write a url to JSON', '', { duration: 1500 });
  }

}
