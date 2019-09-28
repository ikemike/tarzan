import { Injectable } from '@angular/core';
import { TarzanConfig } from './tarzan-config';

@Injectable({
  providedIn: 'root'
})
export class ProductValidatorService {
  VALIDATIONSETTINGS: any;

  constructor() { 
    this.VALIDATIONSETTINGS = new TarzanConfig().validationSettings; 
  }


  /**
   * 
   * @param products
   */
  public async validateProducts(products: any[]) {
    let validProducts: any[] = [];
    for (const product of products) {

      let priceValid: boolean = product.price >= this.VALIDATIONSETTINGS.validLowPrice && product.price <= this.VALIDATIONSETTINGS.validHighPrice && product.price != '';
      let productNameValid: boolean = this.VALIDATIONSETTINGS.productMustContainWords.every( word => product.name.toLowerCase().includes(word.toLowerCase()) );
      //let productNameValid: boolean = this.VALIDATIONSETTINGS.productMustContainWords.every( word => product.name.match(/note/i) );

      let productDistanceValid: boolean = product.distance != '' ? this.VALIDATIONSETTINGS.maxDistance >= product.distance.replace(',','').match(/\d+/)[0]
        : product.distance == '' && product.hyperlink.includes('ebay') ? false : true;

      if (priceValid && productNameValid && productDistanceValid) {
        validProducts.push(product);
      }
    }
    return validProducts;
  }

}
