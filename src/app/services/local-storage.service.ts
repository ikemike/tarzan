import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Store data via localstorage
   */
  
  public getQueriesFromStorage() {
    return JSON.parse(window.localStorage.getItem('queries'));
  }

  public saveQueriesToStorage(queries: any) {
    window.localStorage.setItem('queries', JSON.stringify(queries));
    window.localStorage.setItem('last-updated', JSON.stringify(new Date()));
  }

  public getLastUpdatedDate() {
    return JSON.parse(window.localStorage.getItem('last-updated'));
  }

  public setSearchConfigs(newSearchConfig: any) {
    window.localStorage.setItem('search-config', JSON.stringify(newSearchConfig));
  }

  public getSearchConfigs() {
    return JSON.parse(window.localStorage.getItem('search-config'));
  }

  public getActiveSearchConfigs() {
    return this.getSearchConfigs().filter(aConfig => aConfig.active); 
  }
}
