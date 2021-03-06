import { Injectable } from '@angular/core';
import { TarzanConfig } from '../tarzan-config';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class NodeProcessorService {

  PRODUCTCONFIG: any;

  constructor(productConfig: any) { 
    this.PRODUCTCONFIG = productConfig;
  }


  public performNodeIdentification(documentData: any): any {
    let elementsQueried = documentData.querySelectorAll('span, div, a, p, h4'); // These are elements that typically contain product data. Adjust as needed. 

    let productNameClass = this.findProductClassName(elementsQueried);
    //productNameClass = productNameClass ? '.' + productNameClass.replace(/\s/g, '.') : 'Not Found';

    let currencyClass = this.findCurrencyClassName(elementsQueried);
    //currencyClass = currencyClass ? '.' + currencyClass.replace(/\s/g, '.') : 'Not Found';

    let containerClass = this.findContainerClassName(documentData, productNameClass, currencyClass);
    //containerClass = containerClass ? '.' + containerClass.replace(/\s/g, '.') : 'Not Found';

    let ebayDistanceClass = this.findDistanceClassNameEbay(elementsQueried);
    //ebayDistanceClass = ebayDistanceClass ? '.' + ebayDistanceClass.replace(/\s/g, '.') : 'Not Found';

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
      let individualWordMatches = this.nodeTextMatchAsNumber(element, this.PRODUCTCONFIG.productNameMustContainAtLeastOneWordFrom)
      if (individualWordMatches > 0) {
        productNameElementsIdentified.push(element);
      } 
    }
    return this.getMostCommonClassName(productNameElementsIdentified);
  }

  public findCurrencyClassName(elementsToSearchThrough: any): String {
    let currencyElementsIdentified = [];
    for (const element of elementsToSearchThrough) {
      if (element.textContent.includes(this.PRODUCTCONFIG.currencySymbol)) {
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

    // Process each common class to find the most broad container that doesn't overlap
    let possibleContainerClass = commonClasses[0];

    for (const c of commonClasses) {
      //console.log(c + ': ' + documentData.querySelector(c).querySelectorAll(productClassName).length);
      let containerElement = documentData.querySelector(c);
      let childProductNameElementsFound = containerElement.querySelectorAll(productClassName);

      if (childProductNameElementsFound && childProductNameElementsFound.length > 0 && childProductNameElementsFound.length < 2) {
        possibleContainerClass = c;
      }
    } 
    return possibleContainerClass;
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
      if (element.textContent.toLowerCase().includes(this.PRODUCTCONFIG.productNameMustContainWord.toLowerCase()) || element.textContent.includes(this.PRODUCTCONFIG.currencySymbol)) {
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
            ancestorElementClassNames.push('.' + parentNode.className.trim().replace(/\s/g, '.'));
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
  public nodeTextMatchAsNumber(element:any, productWordsToFind: Array<String>): Number {
    let wordMatches = 0;
    for (const word of productWordsToFind) {
      if (element.textContent.toLowerCase().includes(word.toLowerCase())) {
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
          //elementClassNames.push(element.parentNode.className + '> ' + element.className);

          elementClassNames.push('.' + element.parentNode.className.trim().replace(/\s/g, '.') + '>.' + element.className.trim().replace(/\s/g, '.'));
        } else {
          //elementClassNames.push(element.className);
          elementClassNames.push('.' + element.className.trim().replace(/\s/g, '.'));
        }
      } else {
        // Element has no class name. Attempt to query it using it's parent node's class name
        if (element.parentNode.className && element.parentNode.className != 'None' && element.parentNode.className != '') {
          //elementClassNames.push(element.parentNode.className);
          elementClassNames.push('.' + element.parentNode.className.trim().replace(/\s/g, '.'));
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

  // Given a list of strings, them re-ordered by most-common
  public sortListByMostCommonString(strings): String[] {
    const stringFrequencies = strings.reduce((freqs, aString) => Object.assign(freqs, { [aString]: (freqs[aString] || 0 ) + 1 }), {});
    
    const stringFrequencyArr = Object.keys(stringFrequencies).map(aString => ({ aString, frequency: stringFrequencies[aString] }));
    stringFrequencyArr.sort((a, b) => b.frequency - a.frequency || a.aString.localeCompare(b.aString));
    let ocurrancesArray = stringFrequencyArr.map(aFreq => aFreq.aString);
    return ocurrancesArray;
  }





}
