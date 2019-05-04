import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { OptionsPage } from '../pages/options/options';
import { AuthPage } from '../pages/auth/auth';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  optionsPage: any = OptionsPage;
  authPage: any = AuthPage;
  isAuth: boolean;
  @ViewChild('content') content: NavController;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      let config = {
        apiKey: "AIzaSyCYOVSy_LgPOITiVHLvV96pEwk-H-1SOQ0",
        authDomain: "my-project-1529866236274.firebaseapp.com",
        databaseURL: "https://my-project-1529866236274.firebaseio.com",
        projectId: "my-project-1529866236274",
        storageBucket: "my-project-1529866236274.appspot.com",
        messagingSenderId: "174977233140"
      };
      firebase.initializeApp(config);
      /**
       * Ceci permet de connaitre si l'utilsateur est connecté
       * ou non pour afficher certains éléments du menu à
       * travers le boolean isAuth
       */
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true;
            this.content.setRoot(TabsPage);
          } else {
            this.isAuth = false;
            this.content.setRoot(AuthPage, { mode: 'connect' });
          }
        }
      );
    });
  }

  /**
   * On a modifier cette methode pour envoyer des données vers une page
   * @param page 
   * @param data 
   */
  onNavigate(page: any, data?: {}) {
    //this.content.setRoot(page);
    this.content.setRoot(page, data ? data : null);
    this.menuCtrl.close();
  }
  
  /**
   * Cette fonction gere la deconnection du user connecté
   */
  onDisconnect() {
    firebase.auth().signOut();
    this.menuCtrl.close();
  }
}

