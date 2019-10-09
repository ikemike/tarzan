import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductConstructorService {

  PRODUCTCONFIG: any;

  constructor(productConfig: any) { 
    this.PRODUCTCONFIG = productConfig;
  }

  // nB = Data constructed from Node Builder.
  public buildProducts(nbResponse: any, documentData: any, websiteUrl: string): any {
    let constructedProducts = [];
    const containerElements: any = documentData.querySelectorAll(nbResponse.containerClass);
    let websiteName = websiteUrl.substring(0, websiteUrl.indexOf('.com') !== -1 ? websiteUrl.indexOf('.com') + 4 : websiteUrl.indexOf('.org') + 4);
    websiteName = websiteName.replace('mobile.', '');

    for (const element of containerElements) {
      // Perform some light node processing/formatting of the data 
      let name = element.querySelector(nbResponse.productNameClass) ? element.querySelector(nbResponse.productNameClass).textContent : '';

      let price = '';
      try {
        //price = element.querySelector(nbResponse.currencyClass).textContent.match(/\d+/)[0];
        price = element.querySelector(nbResponse.currencyClass).textContent.replace(/\$|,/g,'');
      } catch (e) { }
      
      let hyperlink = element.querySelector('a') ? element.querySelector('a').href.replace('http://localhost:4200',websiteName) : '';
      let distance = element.querySelector(nbResponse.ebayDistanceClass) ? element.querySelector(nbResponse.ebayDistanceClass).textContent.replace(',','').match(/\d+/)[0] : '';

      constructedProducts.push({
        name: name,
        price: price,
        hyperlink: hyperlink,
        distance: distance,
        query: websiteUrl,
        createdDate: new Date(),
        configUsed: this.PRODUCTCONFIG
      });
    }
    return constructedProducts;
  }
}
