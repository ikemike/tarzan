/**
 * A main service class
 * Returns products based on a set of websites and a single product name
 */
import { Injectable } from '@angular/core';
import { HttpdomService } from './httpdom.service';
import { NodeProcessorService } from './node-processor.service';
import { ProductConstructorService } from './product-constructor.service';
import { ProductValidatorService } from './product-validator.service';

@Injectable({
  providedIn: 'root'
})
export class ProductRetrieverService {

  constructor() { }

  public async retrieveProducts(oneProductConfig: any, websites: string[]) {

    // Instantiate Node Processor, Product Constructor, Product Validator
    let nodeProcessorService = new NodeProcessorService(oneProductConfig);
    let productConstructorService = new ProductConstructorService(oneProductConfig);
    let productValidatorService = new ProductValidatorService(oneProductConfig);
    let validatedProducts = [];
    for (const site of websites) {
      let siteDom = await new HttpdomService().getDocument(site);    // 1. Peform an HTTP callout to the website
      let processedNodeData = nodeProcessorService.performNodeIdentification(siteDom);     // 2. Analyze the website DOM and conduct simple node identification for product name, price, and container 
      console.log(processedNodeData);
      let products = productConstructorService.buildProducts(processedNodeData, siteDom, site);  // 3. Construct products based on the nodes identified
      validatedProducts = validatedProducts.concat(await productValidatorService.validateProducts(products));          // 4. Process each product and make sure it meets defined criteria
    }
    return validatedProducts;
  }
}
