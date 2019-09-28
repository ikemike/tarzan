import { Component, OnInit } from '@angular/core';
import { HttpdomService } from './httpdom.service';
import { NodeProcessorService } from './node-processor.service';
import { ProductConstructorService } from './product-constructor.service';
import { ProductValidatorService } from './product-validator.service';
import { LocalStorageService } from './local-storage.service';
import { TarzanConfig } from './tarzan-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tarzan';
  SEARCHSETTINGS: any;
  VALIDATIONSETTINGS: any;
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

  

  constructor() {
    this.SEARCHSETTINGS = new TarzanConfig().searchSettings;
    this.VALIDATIONSETTINGS = new TarzanConfig().validationSettings;

    this.httpDomService = new HttpdomService();
    this.nodeProcessorService = new NodeProcessorService();
    this.productConstructorService = new ProductConstructorService();
    this.productValidatorService = new ProductValidatorService();
    this.localStorageService = new LocalStorageService();
  }

  async ngOnInit() {
    this.products = [];
    this.products = this.localStorageService.getProductsFromStorage();
    this.lastUpdated = this.localStorageService.getLastUpdatedDate();
    setInterval(()=>this.refreshProducts(), 1200000);
  }

  /**
   * 1. Performs an initial HTTP callout to the website, saving the returned HTML document
   * 2. Performs simple node identification based on element content like price
   * 3. Construct a JSON representation of the 
   */
  public async retrievePageData() {
    this.lastUpdated = new Date();
    let newProducts = [];

    newProducts = newProducts.concat(await this.getProductsFromSite(`https://www.ebay.com/sch/i.html?_nkw=${encodeURI(this.SEARCHSETTINGS.productName)}&_stpos=${this.SEARCHSETTINGS.localZip}&_sadis=${this.SEARCHSETTINGS.maxDistance}&_fspt=1`));
    newProducts = newProducts.concat(await this.getProductsFromSite(`https://mobile.facebook.com/marketplace/${this.SEARCHSETTINGS.city}/?radius_in_km=17&query=${encodeURI(this.SEARCHSETTINGS.productName)}`));
    newProducts = newProducts.concat(await this.getProductsFromSite(`https://${this.SEARCHSETTINGS.city}.craigslist.org/search/sss?query=${encodeURI(this.SEARCHSETTINGS.productName)}&sort=rel`));
    newProducts = newProducts.concat(await this.getProductsFromSite(`https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURI(this.SEARCHSETTINGS.productName)}`));
    
    newProducts = newProducts.sort((a, b) => (a.price > b.price) ? 1 : -1);

    return newProducts;
  }


  /**
   * Given a website, retrieve selectors for product information, process the nodes for data, construct products. 
   * @param website A website URL
   */
  public async getProductsFromSite(website: string) {
    let siteDom = await this.httpDomService.getDocument(website);                             // 1. Peform an HTTP callout to the website
    let processedNodeData = this.nodeProcessorService.performNodeIdentification(siteDom);     // 2. Analyze the website DOM and conduct simple node identification for product name, price, and container 
    let products = this.productConstructorService.buildProducts(processedNodeData, siteDom, website);  // 3. Construct products based on the nodes identified
    let validatedProducts = await this.productValidatorService.validateProducts(products);          // 4. Process each product and make sure it meets defined criteria
    
    this.statusMsg = `Validated: ${validatedProducts.length}/${products.length} products from ${website}`;
    
    return validatedProducts;
  }

  /**
   * Called via on-click action in app.component.html
   * Initiates data retrieval 
   */
  public async refreshProducts() {
    console.log('Refreshing Products...');
    this.addedProductsMsg = null;
    this.isRefreshing = true;
    this.statusMsg = 'Refreshing Products...';
    let existingProducts = this.localStorageService.getProductsFromStorage();
    let newProducts = await this.getNewProducts();
    if (newProducts.length > 0) this.addedProductsMsg = 'Added ' + newProducts.length + ' New Product(s)!';

    this.products =  existingProducts ? existingProducts.concat(newProducts) : newProducts;
    this.products = this.products.sort((a, b) => (a.price > b.price) ? 1 : -1);
    for (let product of this.products) product.age = Math.abs( Date.parse(product.createdDate) - new Date().getTime()) / 36e5;

    this.localStorageService.storeData(this.products);

    this.statusMsg = null;
    this.isRefreshing = false;
  }

  /**
  * Do a full retrieve of products. Compare those already in the cache.
  * Return only products that were not found in the cache. 
  * @returns  new products
  */
  public async getNewProducts() {
    let newProductsList = [];
    let existingProducts = this.localStorageService.getProductsFromStorage();
    let newProducts = await this.retrievePageData();

    if (existingProducts) {
      let existingProductKeys = existingProducts.map(product => product.name + product.price + product.hyperlink.substring(0, 20) );

      for (const product of newProducts) {
        let newProductKey = product.name + product.price + product.hyperlink.substring(0, 20);
        if (!existingProductKeys.includes(newProductKey)) {
          newProductsList.push(product);
        }
      }
      return newProductsList;
    } 
    return newProducts;
  }

  public generateTestProducts() {
    return [{name: 'test product', price: '500', hyperlink: '', query: ''}];
  }

  




}