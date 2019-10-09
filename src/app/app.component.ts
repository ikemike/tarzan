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
  lastUpdated: Date;
  isRefreshing: Boolean;
  addedProductsMsg: string;
  statusMsg: string;
  editingConfig: Boolean; // Show/Hide Config Component

  constructor() {
    /*
    this.httpDomService = new HttpdomService();
    this.nodeProcessorService = new NodeProcessorService();
    this.productConstructorService = new ProductConstructorService();
    this.productValidatorService = new ProductValidatorService();
    this.localStorageService = new LocalStorageService();
    */
  }

  async ngOnInit() {
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
    /*
    console.log('Refreshing Products...');
    this.addedProductsMsg = null, this.isRefreshing = true, this.statusMsg = 'Refreshing Products...';

    let existingProducts = this.localStorageService.getProductsFromStorage();
    let newProducts = await this.getNewProducts();  // A list of new products, not previously saved 
    if (newProducts.length > 0) this.addedProductsMsg = 'Added ' + newProducts.length + ' New Product(s)!';

    this.products =  existingProducts ? existingProducts.concat(newProducts) : newProducts;
    this.products = this.products.sort((a, b) => (a.price > b.price) ? 1 : -1);
    for (let product of this.products) product.age = Math.abs( Date.parse(product.createdDate) - new Date().getTime()) / 36e5;

    this.localStorageService.storeData(this.products);

    this.statusMsg = null;
    this.isRefreshing = false;
    */

    this.addedProductsMsg = null, this.isRefreshing = true, this.statusMsg = 'Refreshing Products...';
    let newlyRetrievedProducts = [];
    // For each configured product, do a product retrieval 
    try {

      for (const searchConfig of new LocalStorageService().getActiveSearchConfigs()) {
        let retrievedProducts = await new ProductRetrieverService().retrieveProducts(searchConfig, new SitesConfigService(searchConfig).getSitesToReview() );
        newlyRetrievedProducts = newlyRetrievedProducts.concat(retrievedProducts);
        this.addedProductsMsg = 'Added ' + newlyRetrievedProducts.length + ' New Products!'
      }
      console.log(newlyRetrievedProducts);
      this.addedProductsMsg = null, this.isRefreshing = false, this.statusMsg = null;
      this.products = newlyRetrievedProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);
       //this.localStorageService.storeData(newlyRetrievedProducts);

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