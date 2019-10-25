import { Component, OnInit, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.css']
})
export class ProductConfigComponent implements OnInit {

  searchConfigs: any;
  newConfig: any;

  // Status Variables 
  addingNew: Boolean;
  editingExisting: Boolean;

  // Properties of newConfig Object
  id;
  productName;
  productNameMustContainWord;
  productNameMustContainAtLeastOneWordFrom;
  productNameMustContainAtLeastOneWordFromString;
  city;
  localZip;
  maxDistance;
  validLowPrice;
  validHighPrice;

  ngOnInit() {
    // Retrieve current config settings from local storage
    this.searchConfigs = new LocalStorageService().getSearchConfigs();
    this.newConfig = {};
    if (this.searchConfigs) this.sortEntries();
  }

  /**
   * Called via on-click action on the page. Adds a new configuration setting. 
   */
  saveConfig() {

    // Modify the user-provided setting as needed
    this.newConfig.productNameMustContainAtLeastOneWordFrom = this.newConfig.productNameMustContainAtLeastOneWordFromString.split(',').map(word => word.trim());
    this.newConfig.validHighPrice = parseFloat(this.newConfig.validHighPrice); 
    this.newConfig.validLowPrice = parseFloat(this.newConfig.validLowPrice); 
    this.newConfig.maxDistance = parseFloat(this.newConfig.maxDistance); 
    this.newConfig.localZip = parseFloat(this.newConfig.localZip); 

    if (this.searchConfigs) {
      this.searchConfigs = this.searchConfigs.filter(config => config != this.newConfig); // If the config option previously existed, remove it
      this.newConfig.id = this.newConfig.id ? this.newConfig.id : this.searchConfigs.length + 1;
      this.searchConfigs = this.searchConfigs.concat(this.newConfig);
    } else {
      this.newConfig.id = 1;
      this.searchConfigs = [this.newConfig];
    }
    new LocalStorageService().setSearchConfigs(this.searchConfigs);
    this.newConfig = {};
    this.addingNew = false, this.editingExisting = false;
    this.sortEntries();
  }

  /**
   * Called via on-click action on the page. Removes a configuration setting. 
   */
  edit(configSetting: any) {
    this.addingNew = false, this.editingExisting = true;
    this.newConfig = configSetting;
  }

  remove(configSetting: any) {
    this.searchConfigs = this.searchConfigs.filter(config => config != configSetting);
    new LocalStorageService().setSearchConfigs(this.searchConfigs); // Update local-storage 
    this.sortEntries();
  }

  clone(configSetting: any) {
    let newSetting = { 
      id: this.searchConfigs.length + 1, productName: configSetting.productName
      , productNameMustContainWord: configSetting.productNameMustContainWord
      , productNameMustContainAtLeastOneWordFrom: configSetting.productNameMustContainAtLeastOneWordFrom
      , productNameMustContainAtLeastOneWordFromString: configSetting.productNameMustContainAtLeastOneWordFromString
      , maxDistance: configSetting.maxDistance, currencySymbol: configSetting.currencySymbol 
      , city: configSetting.city, localZip: configSetting.localZip, validLowPrice: configSetting.validLowPrice
      , validHighPrice: configSetting.validHighPrice
    };

    this.searchConfigs = this.searchConfigs.concat(newSetting);
    new LocalStorageService().setSearchConfigs(this.searchConfigs); // Update local-storage 
    this.sortEntries();
  }

  createNewConfigAction() {
    this.addingNew = true;
  }

  activate(configSetting: any) {
    configSetting.active = true;
    this.searchConfigs = this.searchConfigs.filter(config => config != configSetting);
    this.searchConfigs = this.searchConfigs.concat(configSetting);
    new LocalStorageService().setSearchConfigs(this.searchConfigs);
    this.sortEntries();
  }

  deactivate(configSetting: any) {
    configSetting.active = false;
    this.searchConfigs = this.searchConfigs.filter(config => config != configSetting);
    this.searchConfigs = this.searchConfigs.concat(configSetting);
    new LocalStorageService().setSearchConfigs(this.searchConfigs);
    this.sortEntries();
  }

  sortEntries() {
    this.searchConfigs = this.searchConfigs.sort((a, b) => 
      (a.productName < b.productName) ? 1 : -1
    );
    this.searchConfigs = this.searchConfigs.sort((a, b) => 
      (!a.active && b.active) ? 1 : -1
    );
  }

  @Output() handleSaveEvent = new EventEmitter<boolean>();
  exitConfigMenu() {
    // Emit to the parent component 
    this.handleSaveEvent.emit(false);
  }

}
