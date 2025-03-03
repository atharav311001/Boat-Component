import { LightningElement, wire } from 'lwc';
import getBoatDetails from '@salesforce/apex/BoatDataDetails.getBoatDetails';
import { publish, subscribe, MessageContext } from 'lightning/messageService';
import location_message from '@salesforce/messageChannel/locationMessageChannel__c';
import Combo_Box from '@salesforce/messageChannel/Combo_Box__c';

export default class BoatData extends LightningElement {
    data = [];
    boatTypeId = 'All Types';

    @wire(MessageContext) messageContext;

    @wire(getBoatDetails, { boatTypeId: '$boatTypeId' })
    wiredMethod({ error, data }) {
        if (data) {
            this.data = data.map(item => ({
                ...item,
                ImageHtml: item.Image__c ? `<img src="${item.Image__c}" alt="Boat Image" style="height: 200px; width: 200px; object-fit: cover; border: none;" />` : ''
            }));
            console.log('Data:', data);
        } else if (error) {
            console.log('Error:', error);
        }
    }

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, Combo_Box, (message) => {
            this.handleMessage(message);
        });
    }

    handleMessage(message) {
        this.boatTypeId = message.boatTypeId;
    }

    handleOnClick(event) {
        const item = event.currentTarget.dataset.id;
        console.log('Item:', item);
        const selectedItem = this.data.find(boat => boat.Id === item);
        console.log('Selected Item:', JSON.stringify(selectedItem));
        const payload = {
            lat: selectedItem.Location__c.latitude, long: selectedItem.Location__c.longitude, name: selectedItem.Name, boattype: selectedItem.Type__c,
            length: selectedItem.Length__c, price: selectedItem.Price__c, id: selectedItem.Id
        };
        console.log('Payload:', payload);
        publish(this.messageContext, location_message, payload);
    }
}