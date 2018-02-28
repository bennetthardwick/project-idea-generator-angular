import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

import * as Nedb from 'nedb';

let dictionaryUrl = "https://gist.githubusercontent.com/bennetthardwick/0a51d675d72ed056db78bdea5d5b4a55/raw/app-name-generator-dictionary.json";
let graphUrl = "https://gist.githubusercontent.com/bennetthardwick/ec1984f8c04b30495e59cc83de701c77/raw/app-name-generator-graph.json";


@Injectable()
export class SentenceService {

  private graph;
  private dictionary;

  constructor(private http: HttpClient) { 
    this.graph = new Nedb({ filename: "graph", autoload: true });
    this.dictionary = new Nedb({ filename: "dictionary", autoload: true });

    // Even if it already exists, create it again anyway
    this.createGraph();
    this.createDictionary();

  }

  async generateSentence(): Promise<string> {
    let sentence = [];
    let current = await this.findFirstWord();

    while(current.word !== "_end") {
      if (current.to.length == 0) break;
      current = await this.findNextWord(current.to[randomIndex(current.to)]);
      if (current.word.split("")[0] === "_") 
        sentence.push(await this.generateRandomWord(current.word));
      else sentence.push(current.word);
    }

    return new Promise<string>((resolve) => resolve(createSentenceFromArray(sentence)));

  }

  private getDictionaryRemote(url: string): Observable<IDictionaryData> {
    return this.http.get<IDictionaryData>(url);
  }

  private getGraphRemote(url: string): Observable<IGraphData> {
    return this.http.get<IGraphData>(url);
  }

  resetDatabase(): void {
    this.dictionary.remove({}, { multi: true }, () => {
      this.dictionary.loadDatabase((err) => {
        this.createDictionary();
      });
    });

    this.graph.remove({}, { multi: true }, () => {
      this.graph.loadDatabase((err) => {
        this.createGraph();
      });
    });
  }

  createDictionary(url?: string): Promise<any> {
    if (!url) url = dictionaryUrl;
    return new Promise((resolve, reject) => {
      this.getDictionaryRemote(url)
      .subscribe((data) => {
        this.dictionary.remove({}, { multi: true }, () => {
          this.dictionary.loadDatabase(() => {
            data.dictionary.map((entry) => {
              this.dictionary.insert(entry);
            });
            resolve();
          });
        });
      }, err => reject(err));
    });
  }

  createGraph(url?: string): Promise<any> {
    if (!url) url = graphUrl;
    return new Promise((resolve, reject) => {
      this.getGraphRemote(url).subscribe((data) => {

        this.graph.remove({}, { multi: true }, () => {
          this.graph.loadDatabase(() => {
            let promises = [];

            data.nodes.forEach(node => {
              promises.push(new Promise(r => { this.graph.insert({ _id: node.id, word: node.title }, (err, doc) => r(doc))}));
            });

            Promise.all(promises)
              .then(() => {
                 data.edges.map(edge => {
                   this.graph.update({ _id: edge.source }, { $addToSet: { to: edge.target }})
                 });
                 resolve();
              });
          });
        });
      }, err => reject(err));
    });
  }

  // Dictionary Methods

  private findFirstWord(): Promise<IGrammarEntry> {
    return new Promise<IGrammarEntry>((resolve) => {
      this.graph.find({ word: "_start" }, (err, docs) => {
        return resolve(docs[randomIndex(docs)]);
      });
    });
  }

  private findNextWord(nextID: number): Promise<IGrammarEntry> {
    return new Promise<IGrammarEntry>((resolve) => {
      this.graph.findOne({ _id: nextID }, (err, doc) => {
        return resolve(doc);
      });
    });
  }

  private generateRandomWord(type: string): Promise<string> {
    return new Promise<string>((resolve) => {
      if (type === "_end") return resolve();

      this.dictionary.find({ type: type }, (err, docs) => {
        return resolve(docs[randomIndex(docs)].word);
      })
    })
  }

  // Adding Data

  addDictionaryEntry(entry: IDicionaryEntry): Promise<IDicionaryEntry> {
    return new Promise<IDicionaryEntry>((resolve, reject) => {
      this.dictionary.insert(entry, (err, doc) => {
        if (err) reject(err);
        else resolve(doc);
      });
    });
  }
}

// Interfaces 
interface IDictionaryData {
  dictionary: IDicionaryEntry[];
}

interface IDicionaryEntry {
  type: string;
  word: string;
}

interface IGrammarEntry {
  id: number;
  to: number[];
  word: string;
}

interface IGraphData {
  nodes: { id: number; title: string }[];
  edges: { source: number; target: number }[];
}

// Util Functions
function randomWordFromSet(words: string[]): string {
 return words[randomIndex(words)];
}

function randomIndex(array: any[]): number {
  return Math.floor(Math.random() * array.length);
}

function createSentenceFromArray(array: string[]): string {
  array = array.join(" ").split("");

  return array.map((x, n) => {
    if (n === 0) return x.toUpperCase();
    else if (n === array.length - 1) return ".";
    else return x;
  }).join("");
}