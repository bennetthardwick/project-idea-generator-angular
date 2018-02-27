import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class GraphService {

  private apiPrefix = '/api/';
  private urls = {
    graph: `${this.apiPrefix}graph`,
    saveGraph: `${this.apiPrefix}graph/save`,
    createPoint: `${this.apiPrefix}point/add`,
    createEdge: `${this.apiPrefix}edge/add`,
    removeEdge: `${this.apiPrefix}edge/remove`
  };

  constructor(private http: HttpClient) { }

  getSentence(): Observable<any> {
    return this.http.get<any>("/api/sentence");
  }

  getGraph(): Observable<Graph> {
    return this.http.get<Graph>(this.urls.graph);
  }

  saveGraph(): Observable<Graph> {
    return this.http.get<Graph>(this.urls.saveGraph);
  }

  createPoint(body: IPointCreationOptions): Observable<IGraphEdge> {
    return this.http.post<IGraphEdge>(this.urls.createPoint, body);
  }

  createEdge(body: IEdgeUpdateOptions): Observable<IUpdateResponse> {
    return this.http.post<IUpdateResponse>(this.urls.createEdge, body);
  }

  removeEdge(body: IEdgeUpdateOptions): Observable<IUpdateResponse> {
    return this.http.post<IUpdateResponse>(this.urls.removeEdge, body);
  }

}

type Graph = IGraphEdge[];

interface IUpdateResponse {
  updated: number;
}

interface IGraphEdge {
  _id: string;
  to: string[];
  word: string;
  type: string;
}

interface IPointCreationOptions {
  word: string;
  type: string;
}

interface IEdgeUpdateOptions {
  from: string;
  to: string;
  word?: string;
  type?: string;
}