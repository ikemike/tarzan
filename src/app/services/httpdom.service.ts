/**
 * Make and process a simple fetch request to a website. Return a Document.  
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpdomService {

  constructor() { }


  public async getDocument(url: string) {
    const data = await fetch(url);
    const parser = new DOMParser();
    return parser.parseFromString(await data.text(), "text/html");
  }

  public async getFB() {
    const data = await fetch("https://www.facebook.com/api/graphql/", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en-US,en;q=0.9","content-type":"application/x-www-form-urlencoded","sec-fetch-mode":"cors","sec-fetch-site":"same-origin"},"referrer":"https://www.facebook.com/marketplace/1466502713582666/search/?query=Note%2010&latitude=43.065881965178&longitude=-89.326051874541&vertical=C2C&sort=BEST_MATCH","referrerPolicy":"origin-when-cross-origin","body":"av=0&__user=0&__a=1&__dyn=7AzHK4HUOEjgDxKQ8zk2mq2W8GAdyedJ4WqK2W2q12xCahUWqK6otyEnCwMyaGubyRUC489p98Smi9K7EiwhEmwKzoboGq4fwAwxAyF8OES10wExuEC4Uqx61cxrwxxuVk3G1eyU427pE6aq3O4rGbKdxyho-m8xem9y9GwTgC3mbK2m261KUkBwDy89876icwGK2y16x2fz9rx6u1kwTwXyE4SEvDKi8xWbxm4UGqfwOG7Eaoy8xu22XwFwBgK7ovgvwEwkE7q2u2Wu264U4a5E9EaU-7EOqi48&__csr=&__req=l&__be=1&__pc=PHASED%3ADEFAULT&dpr=1&__rev=1001205873&__s=%3Ay00fvt%3Arxbc8w&__hsi=6739971752730212492-0&lsd=AVojQtMx&jazoest=2762&__spin_r=1001205873&__spin_b=trunk&__spin_t=1569271961&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=MarketplaceNewSearchFeedPaginationQuery&variables=%7B%22count%22%3A16%2C%22cursor%22%3A%22%7B%5C%22pg%5C%22%3A0%2C%5C%22b2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22%5C%22%2C%5C%22it%5C%22%3A0%7D%2C%5C%22c2c%5C%22%3A%7B%5C%22br%5C%22%3A%5C%22AbqXxAo-oqaS4VcVwCxr-0vNQM9SOMVFy2IVJLm0Cx4oySbevfhSZC_okZ9KtACfgyzISFsgLorgT3s10ilnI8u7C3XShjMHptA7F-wu1NpFEIY4oqg5XH0VY7y9_5_djgYo-exjAijwmvrTPWJBDo4of564X3d4O2jo77W8yq29p2AXuJ1_CDQomtGtfEzzdrjPA2U8ia_4qXAqzjIH4CTk2rs_48Ej_Mjt6t-4kh5jmi7UHtY4bSJdRZSkSam3vdS8MTJYBfw9lSvrfKqinTIX4qt1nfWvJLxXTPBV8Cd4i7bjxgnPshamNa1RkBTkGR4fCFfMf-jSnuUhWUtpUzJhtLGPNFaJRSb2RWP2uh8nzopWDBUOVXu14y2syS70b7ob_ysX8j37ga-tptwlzy5-%5C%22%2C%5C%22it%5C%22%3A8%2C%5C%22rpbr%5C%22%3A%5C%22%5C%22%2C%5C%22rphr%5C%22%3Afalse%7D%7D%22%2C%22MARKETPLACE_FEED_ITEM_IMAGE_WIDTH%22%3A196%2C%22VERTICALS_LEAD_GEN_PHOTO_HEIGHT_WIDTH%22%3A40%2C%22MERCHANT_LOGO_SCALE%22%3Anull%2C%22params%22%3A%7B%22bqf%22%3A%7B%22callsite%22%3A%22COMMERCE_MKTPLACE_WWW%22%2C%22query%22%3A%22Note%2010%22%7D%2C%22browse_request_params%22%3A%7B%22filter_location_latitude%22%3A43.065881965178%2C%22filter_location_longitude%22%3A-89.326051874541%2C%22commerce_search_sort_by%22%3A%22BEST_MATCH%22%2C%22filter_price_lower_bound%22%3A0%2C%22filter_price_upper_bound%22%3A214748364700%7D%2C%22custom_request_params%22%3A%7B%22surface%22%3A%22SEARCH%22%2C%22search_vertical%22%3A%22C2C%22%7D%7D%7D&doc_id=2289983294371758","method":"POST","mode":"no-cors"});
    const parser = new DOMParser();
    return parser.parseFromString(await data.text(), "text/html");
  }

}
