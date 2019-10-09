import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SitesConfigService {


  searchConfig: any; 
  constructor(searchConfig: any) {
    this.searchConfig = searchConfig;
  }

  getSitesToReview() {
    let sitesToReview = [
      `https://www.ebay.com/sch/i.html?_nkw=${encodeURI(this.searchConfig.productName)}&_stpos=${this.searchConfig.localZip}&_sadis=${this.searchConfig.maxDistance}&_fspt=1`
      ,`https://mobile.facebook.com/marketplace/${this.searchConfig.city}/?radius_in_km=17&query=${encodeURI(this.searchConfig.productName)}`
      ,`https://${this.searchConfig.city}.craigslist.org/search/sss?query=${encodeURI(this.searchConfig.productName)}&sort=rel`
      //,`https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURI(this.searchSettings.productName)}`
      //,`https://www.walmart.com/search/?cat_id=0&query=${encodeURI(this.searchSettings.productName)}`
      //,`https://us.letgo.com/en/scl/wisconsin/dane-county/${this.searchSettings.city}?searchTerm=${encodeURI(this.searchSettings.productName)}&price[min]=${this.validationSettings.validLowPrice}&price[max]=${this.validationSettings.validHighPrice}`
      //,`https://www.amazon.com/gp/offer-listing/B07W7VSLMT/ref=olp_twister_all?ie=UTF8&mv_color_name=all&mv_size_name=all&mv_style_name=all`
    ]
    return sitesToReview;
  }
  
  
}
