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
  SEARCHSETTINGS: any;
  VALIDATIONSETTINGS: any;
  SITESTOREVIEW: any;

  httpDomService;
  nodeProcessorService;
  productConstructorService;
  productValidatorService;
  localStorageService;

  // Information Visible on App.Component.html
  products: any;
  queries: any;         // newer storage of products by query
  lastUpdated: Date;
  isRefreshing: Boolean;
  addedProductsMsg: string;
  statusMsg: string;
  editingConfig: Boolean; // Show/Hide Config Component


  constructor() {
    this.localStorageService = new LocalStorageService();
    /*
    this.httpDomService = new HttpdomService();
    this.nodeProcessorService = new NodeProcessorService();
    this.productConstructorService = new ProductConstructorService();
    this.productValidatorService = new ProductValidatorService();
    this.localStorageService = new LocalStorageService();
    */
  }

  async ngOnInit() {

    this.queries = this.localStorageService.getQueriesFromStorage() ? this.localStorageService.getQueriesFromStorage() : [];
    /*
    this.products = [];
    this.products = this.localStorageService.getProductsFromStorage();
    this.lastUpdated = this.localStorageService.getLastUpdatedDate();
    setInterval(()=>this.refreshProducts(), 1200000);
    */
  }

  handleEditingConfigEvent($event) {
    console.log($event);
    this.editingConfig = $event;
  }


  /**
   * 1. Performs an initial HTTP callout to the website, saving the returned HTML document
   * 2. Performs simple node identification based on element content like price
   * 3. Construct a JSON representation of the 
   */
  public async retrievePageData() {
    /*
    this.lastUpdated = new Date();
    let newProducts = [];
    
    // Loop through each site, configured in tarzan-config.ts 
    for (const site of this.SITESTOREVIEW) {
      newProducts = newProducts.concat(await this.getProductsFromSite(site));
    }
    newProducts = newProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);

    return newProducts;
    */
  }


  /**
   * Given a website, retrieve selectors for product information, process the nodes for data, construct products. 
   * @param website A website URL
   */
  public async getProductsFromSite(website: string) {
    /*
    let siteDom = await this.httpDomService.getDocument(website);                             // 1. Peform an HTTP callout to the website
    let processedNodeData = this.nodeProcessorService.performNodeIdentification(siteDom);     // 2. Analyze the website DOM and conduct simple node identification for product name, price, and container 
    //console.log(processedNodeData);
    let products = this.productConstructorService.buildProducts(processedNodeData, siteDom, website);  // 3. Construct products based on the nodes identified
    //console.log(products);
    let validatedProducts = await this.productValidatorService.validateProducts(products);          // 4. Process each product and make sure it meets defined criteria
    this.statusMsg = `Validated: ${validatedProducts.length}/${products.length} products from ${website}`;
    return validatedProducts;
    */
  }

  /**
   * Called via on-click action in app.component.html
   * Initiates data retrieval 
   */
  public async refreshProducts() {
  
    this.addedProductsMsg = null, this.isRefreshing = true, this.statusMsg = 'Refreshing Products...';
    this.queries = [];

    // For each configured product, do a product retrieval 
    try {
      for (const searchConfig of new LocalStorageService().getActiveSearchConfigs()) {
        // Perform a data retrieval 
        let retrievedProducts = await new ProductRetrieverService().retrieveProducts(searchConfig, new SitesConfigService(searchConfig).getSitesToReview() );

        // Construct a 'query' object 
        retrievedProducts = retrievedProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
        let newlyConstructedQuery = {productName: searchConfig.productName, products: retrievedProducts};
        this.queries = this.queries.concat(newlyConstructedQuery);
      }

      this.addedProductsMsg = null, this.isRefreshing = false, this.statusMsg = null;
      this.localStorageService.saveQueriesToStorage(this.queries);

    } catch (exception) {
      console.log(exception.message);
      this.addedProductsMsg = null, this.isRefreshing = false, this.statusMsg = 'Exception: ' + exception.message + ' | Check console log for details';
    }

  }

  /**
  * Do a full retrieve of products. Compare those already in the cache.
  * Return only products that were not found in the cache. 
  * @returns  new products
  */
  public async getNewProducts() {
    /*
    let newProductsList = [];
    let existingProducts = this.localStorageService.getProductsFromStorage();
    let newProducts = await this.retrievePageData();

    if (existingProducts) {
      let existingProductKeys = existingProducts.map(product => product.name + product.price + product.hyperlink.substring(0, 20) );
      let existingHyperlinks = existingProducts.map(product => product.hyperlink);

      for (const product of newProducts) {
        let newProductKey = product.name + product.price + product.hyperlink.substring(0, 20);
        
        if (!existingProductKeys.includes(newProductKey) && !existingHyperlinks.includes(product.hyperlink)) {
          newProductsList.push(product);
        }
      }
      return newProductsList;
    } 
    return newProducts;
    */
  }
  

}