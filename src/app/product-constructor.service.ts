import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductConstructorService {

  constructor() { }

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
        price = element.querySelector(nbResponse.currencyClass).textContent.match(/\d+/)[0];
      } catch (e) { }
      
      let hyperlink = element.querySelector('a') ? element.querySelector('a').href.replace('http://localhost:4200',websiteName) : '';
      let distance = element.querySelector(nbResponse.ebayDistanceClass) ? element.querySelector(nbResponse.ebayDistanceClass).textContent.replace(',','').match(/\d+/)[0] : '';

      //let constructedDate = new Date();
      //let formattedDateString;
      //constructedDate.setDate(constructedDate.getDate());
      /*
      formattedDateString =
        constructedDate.getFullYear() + '-'
        + ('0' + (constructedDate.getMonth()+1)).slice(-2) + '-'
        + ('0' + constructedDate.getDate()).slice(-2) + ' '
        + ('0' + constructedDate.getHours()).slice(-2) + ':'
        + ('0' + constructedDate.getMinutes()).slice(-2) + ':'
        + ('0' + constructedDate.getSeconds()).slice(-2);
      */
      constructedProducts.push({
        name: name,
        price: price,
        hyperlink: hyperlink,
        distance: distance,
        query: websiteUrl,
        createdDate: new Date()
      });
    }
    return constructedProducts;
  }
}
