import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductValidatorService {

  PRODUCTCONFIG: any;

  constructor(productConfig: any) { 
    this.PRODUCTCONFIG = productConfig;
  }

  /**
   * 
   * @param products
   */
  public async validateProducts(products: any[]) {
    let validProducts: any[] = [];
    for (const product of products) {

      let priceValid: boolean = product.price >= this.PRODUCTCONFIG.validLowPrice && product.price <= this.PRODUCTCONFIG.validHighPrice && product.price != '';

      let productContainsAtLeastOnePredefinedWord = false;
      for (const word of this.PRODUCTCONFIG.productNameMustContainAtLeastOneWordFrom) {
        if (product.name.toLowerCase().includes(word.toLowerCase())) {
          productContainsAtLeastOnePredefinedWord = true;
          continue;
        }
      }
      
      let productContainsRequiredWord = product.name.toLowerCase().includes(this.PRODUCTCONFIG.productNameMustContainWord.toLowerCase());

      let productDistanceValid: boolean = product.distance != '' ? this.PRODUCTCONFIG.maxDistance >= product.distance.replace(',','').match(/\d+/)[0]
        : product.distance == '' && product.hyperlink.includes('ebay') ? false : true;

      if (priceValid && productContainsAtLeastOnePredefinedWord && productContainsRequiredWord && productDistanceValid) {
        validProducts.push(product);
      } 
    }
    return validProducts;
  }

}
