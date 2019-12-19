import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { SitesConfigService } from './services/sites-config.service';
import { ProductRetrieverService } from './services/product-retriever.service';

// Child Component Imports
import { ProductConfigComponent } from './product-config/product-config.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tarzan';
  localStorageService;

  // Information Visible on App.Component.html
  queries: any;         // newer storage of products by query
  isRefreshing: Boolean;
  addedProductsMsg: string;
  statusMsg: string;

  constructor() {
    this.localStorageService = new LocalStorageService();
  }

  async ngOnInit() {
    this.queries = this.localStorageService.getQueriesFromStorage() ? this.localStorageService.getQueriesFromStorage() : [];
    //setInterval(()=>this.refreshProducts(), 1200000);
  }


  /**
   * Called via on-click action in app.component.html
   * Initiates data retrieval 
   */
  public async refreshProducts() {
    this.addedProductsMsg = null, this.isRefreshing = true, this.statusMsg = 'Refreshing Products...';
    this.queries = [];
    this.queries = await this.getNewQueries();

    // For each configured product, do a product retrieval 
    try {
      let newQueryData = await this.getNewQueries();
      let existingQueryData = this.localStorageService.getQueriesFromStorage();
      for (let newQ of newQueryData) {
        let existingProducts = existingQueryData.filter(newQ.productName)
        if (newQ.products) {
          // If the query returned products
          let newProducts = this.getOnlyNewAndUpdatedProducts(newQ.products);


        }
      }

      //let filteredNewOrUpdatedResults = this.getOnlyNewAndUpdatedProducts(await this.getNewQueries());  // Return a list of only new data
      //console.log(filteredNewOrUpdatedResults);
      //if (filteredNewOrUpdatedResults.length > 0) this.queries = this.queries.concat(filteredNewOrUpdatedResults);

      //this.queries = newQueries;
      this.localStorageService.saveQueriesToStorage(this.queries);
      

      this.addedProductsMsg = null, this.isRefreshing = false, this.statusMsg = null;

    } catch (exception) {
      this.addedProductsMsg = null, this.isRefreshing = false, this.statusMsg = 'Exception: ' + exception.message + ' | Check console log for details';
      throw exception;
    }

  }

  /**
   * Get new products!  
   */
  public async getNewQueries() {
    let newlyRetrievedProducts = [];

    for (const searchConfig of new LocalStorageService().getActiveSearchConfigs()) {
      let retrievedProducts = await new ProductRetrieverService().retrieveProducts(searchConfig, new SitesConfigService(searchConfig).getSitesToReview());
      retrievedProducts = retrievedProducts.sort((a, b) => (parseFloat(a.price) > parseFloat(b.price)) ? 1 : -1);
      newlyRetrievedProducts = newlyRetrievedProducts.concat({
        productName: searchConfig.productName, products: retrievedProducts
      });
    }

    return newlyRetrievedProducts;
  }

  /**
   * Return a list of only new or updated products
   * @param products 
   */
  public getOnlyNewAndUpdatedProducts(newlyCompletedQueries) {
    // 1.) Compare existing products
    let existingQueries = this.localStorageService.getQueriesFromStorage();
    //let existingProductUrlz = existingProducts.products.map((p) => p.hyperlink.toLowerCase());
    //let newResults = newlyCompletedQueries.filter(q => q.products.filter(p => !existingProductUrls.includes(p.hyperlink))); 

    let existingProductUrls = [];
    if (existingQueries) {
      existingQueries.forEach(q => { if (q.products) { q.products.forEach(p => existingProductUrls.push(p.hyperlink.toLowerCase())) } });
    }
    

    let validNewQueries = [];
    for (let q of newlyCompletedQueries) {
      let validNewProducts = [];
      for (let p of q.products) {
        if (!existingProductUrls.includes(p.hyperlink.toLowerCase())) validNewProducts.push(p);
      }
      q.products = validNewProducts;
      validNewQueries.push(q);
    }
    return validNewQueries;

  }

}