import { LightningElement, wire } from 'lwc';
import getBoatsNearLocation from '@salesforce/apex/BoatDataDetails.getBoatsNearLocation';
import { subscribe, MessageContext } from 'lightning/messageService';
import Combo_Box from '@salesforce/messageChannel/Combo_Box__c';

export default class AllBoatsLocation extends LightningElement {
    data = [];
    boatTypeId = 'All Types';
    mapMarkers = [];
    userLatitude;
    userLongitude;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, Combo_Box, (message) => {
            this.handleMessage(message);
        });
        this.getUserLocation();
    }

    handleMessage(message) {
        this.boatTypeId = message.boatTypeId;
        this.getBoatsNearMe();
    }

    getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.userLatitude = position.coords.latitude;
                this.userLongitude = position.coords.longitude;
                this.getBoatsNearMe();
            },
            (error) => {
                console.log('Error getting user location:', error);
            }
        );
    }

    getBoatsNearMe() {
        getBoatsNearLocation({ latitude: this.userLatitude, longitude: this.userLongitude, radius: 1000, boatTypeId: this.boatTypeId })
            .then(result => {
                this.data = result;
                this.setMapMarkers();
            })
            .catch(error => {
                console.log('Error getting boats near me:', error);
            });
    }

    setMapMarkers() {
        let userMarker = {
            location: {
                Latitude: this.userLatitude,
                Longitude: this.userLongitude
            },
            title: 'You are here!',
            description: 'You are here!',
        };
        console.log('User Marker:', JSON.stringify(userMarker));

        let boatMarkers = this.data.map(item => ({
            location: {
                Latitude: item.Location__c.latitude,
                Longitude: item.Location__c.longitude
            },
            title: item.Name,
            description: item.Description,
            icon: 'custom:custom26'
        }));
        this.mapMarkers = [userMarker, ...boatMarkers];
    }
}