import { Injectable } from '@angular/core';
import { TarzanConfig } from './tarzan-config';

@Injectable({
  providedIn: 'root'
})
export class NodeProcessorService {
  SEARCHSETTINGS: any;

  constructor() { 
    this.SEARCHSETTINGS = new TarzanConfig().searchSettings; 
  }


  public performNodeIdentification(documentData: any): any {
    let elementsQueried = documentData.querySelectorAll('span, div, a, p, h4'); // These are elements that typically contain product data. Adjust as needed. 

    let productNameClass = this.findProductClassName(elementsQueried);
    productNameClass = productNameClass ? '.' + productNameClass.replace(/\s/g, '.') : 'Not Found';

    let currencyClass = this.findCurrencyClassName(elementsQueried);
    currencyClass = currencyClass ? '.' + currencyClass.replace(/\s/g, '.') : 'Not Found';

    let containerClass = this.findContainerClassName(documentData, productNameClass, currencyClass);
    containerClass = containerClass ? '.' + containerClass.replace(/\s/g, '.') : 'Not Found';

    let ebayDistanceClass = this.findDistanceClassNameEbay(elementsQueried);
    ebayDistanceClass = ebayDistanceClass ? '.' + ebayDistanceClass.replace(/\s/g, '.') : 'Not Found';

    return {
      productNameClass:   productNameClass,
      currencyClass:      currencyClass,  
      containerClass:     containerClass,
      ebayDistanceClass:  ebayDistanceClass
    };

  }

  public findProductClassName(elementsToSearchThrough: any): String {
    let productNameElementsIdentified = [];
    for (const element of elementsToSearchThrough) {

      if (element.textContent.includes(this.SEARCHSETTINGS.productName.split(" ")[0])) { // Ensure the element contains at least the first word of the product name
        let individualWordMatches = this.nodeTextMatchAsNumber(element, this.SEARCHSETTINGS.productName)
        if (individualWordMatches > 0) {
          productNameElementsIdentified.push(element);
        } 
      }
    }

    return this.getMostCommonClassName(productNameElementsIdentified);
  }

  public findCurrencyClassName(elementsToSearchThrough: any): String {
    let currencyElementsIdentified = [];
    for (const element of elementsToSearchThrough) {
      if (element.textContent.includes(this.SEARCHSETTINGS.currencySymbol)) {
        let digits = element.textContent.replace(/^\D+/g, '');
        
        if (digits.length > 0 && digits.length <= 6) { 
          if (element.className != '' && element.className) {
            currencyElementsIdentified.push(element);
          }
        }
      }
    }
    return this.getMostCommonClassName(currencyElementsIdentified);
  }

  public findDistanceClassNameEbay(elementsToSearchThrough: any): String {
    let distanceElementsIdentified = [];
    for (const element of elementsToSearchThrough) {
      if (element.textContent.includes('mi from') && element.className != '' && element.className) {
        distanceElementsIdentified.push(element);
      }
    }
    return this.getMostCommonClassName(distanceElementsIdentified);
  }

  public findContainerClassName(documentData, productClassName, currencyClassName) {
    let productNameAncestorClasses = this.retrieveElementAncestorClassNames(productClassName, documentData);
    let currencyAncestorClasses = this.retrieveElementAncestorClassNames(currencyClassName, documentData);
    let commonClasses = [];
    
    for (let nodeClass of productNameAncestorClasses) {
      if (currencyAncestorClasses.includes(nodeClass)) {
        commonClasses.push(nodeClass);
      }
    }
    return commonClasses[0];
  }

  /**
   * Pass in an element class selector '.product-name' and this method
   * will return all parent node class selectors. 
   * 
   * @param elementClassName A class selector
   */
  public retrieveElementAncestorClassNames(elementClassName, documentData): any {
    // Since node identification isn't perfect, make sure that we actually grabed a node with data in it
    let startingElements = documentData.querySelectorAll(elementClassName);

    let startingNode; 
    for (const element of startingElements) {
      if (element.textContent.includes(this.SEARCHSETTINGS.productName) || element.textContent.includes(this.SEARCHSETTINGS.currencySymbol)) {
        startingNode = element;
        continue;
      }
    }

    let previousParentNode = startingNode;
    let ancestorElementClassNames = [];

    for (let i = 0; i < 100; i++) {
      if (startingNode && previousParentNode) {
        let parentNode = previousParentNode.parentNode;

        if (parentNode != null) {
          if (parentNode.className != null && parentNode.className != 'None' && parentNode.className != '') {
            ancestorElementClassNames.push(parentNode.className);
          }
          previousParentNode = parentNode;
        }
      } 
    }
    return ancestorElementClassNames;
  }

  /**
   * Return number of words that were common among an element 
   * @param element 
   * @param searchText  
   */
  public nodeTextMatchAsNumber(element:any, searchText: String): Number {
    let wordMatches = 0;
    let searchTextAsArrayOfWords = searchText.split(" ");
    for (const word of searchTextAsArrayOfWords) {
      if (element.textContent.includes(word)) {
        wordMatches++;
      }
    }
    return wordMatches;
  }

  public getMostCommonClassName(elements: any): String {
    let elementClassNames = [];
    for (const element of elements) {

      if (element.className && element.className != 'None' && element.className != '') {
        // Element has a class name. Check if it has a parent with a class name for additional specificity during querying. 
        if (element.parentNode && element.parentNode.className && element.parentNode.className != '' && element.parentNode.className != 'None') {
          elementClassNames.push(element.parentNode.className + '> ' + element.className);
        } else {
          elementClassNames.push(element.className);
        }
      } else {
        // Element has no class name. Attempt to query it using it's parent node's class name
        if (element.parentNode.className && element.parentNode.className != 'None' && element.parentNode.className != '') {
          elementClassNames.push(element.parentNode.className);
        }
      }
    }
    // Sort the array of strings and return the first index
    return this.getMostOccurringString(elementClassNames);
  }

  public getMostOccurringString(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}





}
