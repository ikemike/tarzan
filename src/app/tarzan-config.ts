export class TarzanConfig {
    searchSettings = {
        productName:      'Note 10',
        currencySymbol:   '$',
        city:             'Madison',    // Your city : Used in FB Marketplace queries 
        localZip:         '53716',      // Your local zip code. Used in Ebay queries. 
        maxDistance:      '60'          // How close the product has to be (in miles). Used in Ebay queries. 
      };
      validationSettings = {
        productMustContainWords: ['Note', '10'],
        validLowPrice: 100,
        validHighPrice: 1000,
        maxDistance: parseInt(this.searchSettings.maxDistance)
      };


}
