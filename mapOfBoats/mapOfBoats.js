import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import location_message from '@salesforce/messageChannel/locationMessageChannel__c';
export default class MapOfBoats extends LightningElement {
    subscription = null;
    showData = false;
    @wire(MessageContext) messageContext;
    mapMarkers = [];
    connectedCallback() {
        this.subscription = subscribe(this.messageContext, location_message, (message) => {
            this.handleMessage(message);
        });
    }

    handleMessage(message) {
        this.showData = true;
        this.mapMarkers = [{
            location: {
                Latitude: message.lat,
                Longitude: message.long
            }
        }];
    }
}
