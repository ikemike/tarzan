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
  name;
  must_contain;
  must_contain_one;
  city;
  zip;
  distance;
  low;
  high;

  ngOnInit() {
    // Retrieve current config settings from local storage
    this.searchConfigs = new LocalStorageService().getSearchConfigs();
    this.newConfig = {};
  }

  /**
   * Called via on-click action on the page. Adds a new configuration setting. 
   */
  saveConfig() {
    this.searchConfigs = this.searchConfigs.filter(config => config != this.newConfig); // If the config option previously existed, remove it

    if (this.searchConfigs) {
      this.searchConfigs = this.searchConfigs.concat(this.newConfig);
    } else {
      this.searchConfigs = [this.newConfig];
    }
    new LocalStorageService().setSearchConfigs(this.searchConfigs);
    this.newConfig = {};
    this.addingNew = false, this.editingExisting = false;
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
  }

  createNewConfigAction() {
    this.addingNew = true;
  }

  @Output() handleSaveEvent = new EventEmitter<boolean>();
  exitConfigMenu() {
    // Emit to the parent component 
    this.handleSaveEvent.emit(false);
  }

}
