import { Appareil } from "../models/appareils";
import { Subject } from "rxjs/Subject";
//import * as firebase from 'firebase';

export class AppareilsService {
    
    appareils$ = new Subject<Appareil[]>();
    
    appareilsList: Appareil[] = [
        {
            name: 'Machine à laver',
            description: [
                'Volume: 6 litres',
                'Temps de lavage: 2 heures',
                'Consommation: 173 kWh/an'
            ],
            isOn: true,
            startTime: '',
            endTime: ''
        },
        {
            name: 'Télévision',
            description: [
                'Dimensions: 40 pouces',
                'Consommation: 22 kWh/an'
            ],
            isOn: true,
            startTime: '',
            endTime: ''
        },
        {
            name: 'Ordinateur',
            description: [
                'Marque: fait maison',
                'Consommation: 500 kWh/an'
            ],
            isOn: false,
            startTime: '',
            endTime: ''
        },
        {
            name: 'Téléphone',
            description: [
                'Marque: Samsung',
                'Consommation: 40 kWh/an'
            ],
            isOn: false,
            startTime: '',
            endTime: ''
        }

    ];
    
    /**
     * Cette fonction permet d'ajouter un appareils
     * en l'ajoutant à notre list
     * @param appareil 
     */
    addAppareil(appareil: Appareil) {
        this.appareilsList.push(appareil);
        this.emitAppareils();//Pour pouvoir ajouter 
    }

    emitAppareils() {
        this.appareils$.next(this.appareilsList.slice());
    }

    
    //firebase.database().dist()
   /*saveData() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('appareils').set(this.appareilsList).then(
                (data: DataSnapshot) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    retrieveData() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('appareils').once('value').then(
                (data: DataSnapshot) => {
                    this.appareilsList = data.val();
                    this.emitAppareils();
                    resolve('Données récupérées avec succès !');
                }, (error) => {
                    reject(error);
                }
            );
        });
    }*/
}
