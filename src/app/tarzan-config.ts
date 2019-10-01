export class TarzanConfig {
    
    searchSettings = {
        productName:      'Note 10',
        currencySymbol:   '$',
        city:             'madison',    // Your city : Used in FB Marketplace queries 
        localZip:         '53716',      // Your local zip code. Used in Ebay queries. 
        maxDistance:      '60'          // How close the product has to be (in miles). Used in Ebay queries. 
      };

      validationSettings = {
        productMustContainWord: '10',
        productMustContainAtLeastOneWord: ['samsung', 'plus', 'note', 'galaxy'],
        validLowPrice: 100,
        validHighPrice: 1000, 
        maxDistance: parseInt(this.searchSettings.maxDistance)
      };
    /*
    searchSettings = {
      productName:      'Nanoleaf',
      currencySymbol:   '$',
      city:             'madison',    // Your city : Used in FB Marketplace queries 
      localZip:         '53716',      // Your local zip code. Used in Ebay queries. 
      maxDistance:      '200'          // How close the product has to be (in miles). Used in Ebay queries. 
    };

    validationSettings = {
      productMustContainWord: 'leaf',
      productMustContainAtLeastOneWord: ['nanoleaf', 'nano', 'leaf', 'light', 'panel'],
      validLowPrice: 50,
      validHighPrice: 300, 
      maxDistance: parseInt(this.searchSettings.maxDistance)
    };
    */
      sitesToReview = [
         `https://www.ebay.com/sch/i.html?_nkw=${encodeURI(this.searchSettings.productName)}&_stpos=${this.searchSettings.localZip}&_sadis=${this.searchSettings.maxDistance}&_fspt=1`
        ,`https://mobile.facebook.com/marketplace/${this.searchSettings.city}/?radius_in_km=17&query=${encodeURI(this.searchSettings.productName)}`
        ,`https://${this.searchSettings.city}.craigslist.org/search/sss?query=${encodeURI(this.searchSettings.productName)}&sort=rel`
        //,`https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURI(this.searchSettings.productName)}`
        //,`https://www.walmart.com/search/?cat_id=0&query=${encodeURI(this.searchSettings.productName)}`
        //,`https://us.letgo.com/en/scl/wisconsin/dane-county/${this.searchSettings.city}?searchTerm=${encodeURI(this.searchSettings.productName)}&price[min]=${this.validationSettings.validLowPrice}&price[max]=${this.validationSettings.validHighPrice}`
      ]




}
