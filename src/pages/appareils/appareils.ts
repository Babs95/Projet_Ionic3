import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController, ModalController, MenuController } from 'ionic-angular';
import { SingleAppareilPage } from './single-appareil/single-appareil';
import { Appareil } from '../../models/appareils';
import { AppareilsService } from '../../services/appareils.service';
import { AppareilFormPage } from './appareil-form/appareil-form';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'page-appareils',
    templateUrl: 'appareils.html'
})
export class AppareilsPage implements OnInit, OnDestroy{

    /*appareilsList = [
        {
            name: 'Machine à laver',
            description: [
                'Volume: 6 litres',
                'Temps de lavage: 2 heures',
                'Consommation: 173 kWh/an'
            ]
        },
        {
            name: 'Télévision',
            description: [
                'Dimensions: 40 pouces',
                'Consommation: 22 kWh/an'
            ]
        },
        {
            name: 'Ordinateur',
            description: [
                'Marque: fait maison',
                'Consommation: 500 kWh/an'
            ]
        },
        {
            name: 'Téléphone',
            description: [
                'Marque: Samsung',
                'Consommation: 40 kWh/an'
            ]
        }
        
    ];*/
    appareilsList: Appareil[];
    appaeilsSubscription: Subscription;
    
    constructor(private modalCtrl: ModalController,
                private appareilsService: AppareilsService,
                private menuCtrl: MenuController,
                private navCtrl: NavController) { }

    ngOnInit() {
        this.appaeilsSubscription = this.appareilsService.appareils$.subscribe(
            (appareils: Appareil[]) => {
                this.appareilsList = appareils.slice();
            }
        );
        this.appareilsService.emitAppareils();
    }

    /*ionViewWillEnter() {
        this.appareilsList = this.appareilsService.appareilsList.slice();
    }*/

    onLoadAppareil(index: number) {
        let modal = this.modalCtrl.create(SingleAppareilPage, { index: index });
        modal.present();
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }

    onNewAppareil() {
        this.navCtrl.push(AppareilFormPage);
    }

    ngOnDestroy() {
        this.appaeilsSubscription.unsubscribe();
    }
    /*onLoadAppareil(appareil: { name: string, description: string[] }) {
        let modal = this.modalCtrl.create(SingleAppareilPage, { appareil: appareil });
        modal.present();
    }*/

    /*constructor(private navCtrl: NavController) { }

    onLoadAppareil(name: string) {
        this.navCtrl.push(SingleAppareilPage, { appareilName: name });
    }
    onLoadAppareil(appareil: { name: string, description: string[] }) {
        this.navCtrl.push(SingleAppareilPage, { appareil: appareil });
    } */
}