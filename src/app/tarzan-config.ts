export class TarzanConfig {
    /*
    searchSettings = {
        productName:      'Oculus Quest',
        currencySymbol:   '$',
        city:             'minneapolis',    // Your city : Used in FB Marketplace queries 
        localZip:         '55404',      // Your local zip code. Used in Ebay queries. 
        maxDistance:      '60'          // How close the product has to be (in miles). Used in Ebay queries. 
      };
      
      validationSettings = {
        productMustContainWord: 'Oculus',
        productMustContainAtLeastOneWord: ['Quest'],
        validLowPrice: 100,
        validHighPrice: 1000, 
        maxDistance: parseInt(this.searchSettings.maxDistance)
      };
      */
      
     /*
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
      */
    
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

  searchConfig: any; 
  constructor(searchConfig: any) {
    this.searchConfig = searchConfig;
  }

  sitesToReview = [
      `https://www.ebay.com/sch/i.html?_nkw=${encodeURI(this.searchConfig.productName)}&_stpos=${this.searchConfig.localZip}&_sadis=${this.searchConfig.maxDistance}&_fspt=1`
    ,`https://mobile.facebook.com/marketplace/${this.searchConfig.city}/?radius_in_km=17&query=${encodeURI(this.searchConfig.productName)}`
    ,`https://${this.searchConfig.city}.craigslist.org/search/sss?query=${encodeURI(this.searchConfig.productName)}&sort=rel`
    //,`https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURI(this.searchSettings.productName)}`
    //,`https://www.walmart.com/search/?cat_id=0&query=${encodeURI(this.searchSettings.productName)}`
    //,`https://us.letgo.com/en/scl/wisconsin/dane-county/${this.searchSettings.city}?searchTerm=${encodeURI(this.searchSettings.productName)}&price[min]=${this.validationSettings.validLowPrice}&price[max]=${this.validationSettings.validHighPrice}`
    //,`https://www.amazon.com/gp/offer-listing/B07W7VSLMT/ref=olp_twister_all?ie=UTF8&mv_color_name=all&mv_size_name=all&mv_style_name=all`
  ]

      

      



}
