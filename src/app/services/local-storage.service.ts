import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Store data via localstorage
   */
  public storeData(products: any) {
    window.localStorage.setItem('products', JSON.stringify(products));
    window.localStorage.setItem('last-updated', JSON.stringify(new Date()));
  }

  public getProductsFromStorage() {
    return JSON.parse(window.localStorage.getItem('products'));
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
}
