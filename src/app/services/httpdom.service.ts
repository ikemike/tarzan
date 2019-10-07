/**
 * Make and process a simple fetch request to a website. Return a Document.  
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpdomService {

  constructor() { }


  public async getDocument(url: string) {
    const data = await fetch(url);
    const parser = new DOMParser();
    return parser.parseFromString(await data.text(), "text/html");
  }

}
