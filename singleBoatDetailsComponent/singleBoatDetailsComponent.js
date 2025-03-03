import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import locationMessageChannel from '@salesforce/messageChannel/locationMessageChannel__c';
import { NavigationMixin } from 'lightning/navigation';

export default class SingleBoatDetailsComponent extends NavigationMixin(LightningElement) {
    subscription = null;
    showData = false;
    Name;
    type;
    length;
    price;
    id;

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, locationMessageChannel, (message) => {
            this.handleMessage(message);
        });
    }
    handleMessage(message) {
        this.showData = true;
        this.Name = message.name;
        this.type = message.boattype;
        this.length = message.length;
        this.price = message.price;
        this.id = message.id;
    }

    @wire(MessageContext)
    messageContext;


    handleFullDetails(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.id,
                objectApiName: 'Boat__c',
                actionName: 'view'
            }
        });
    }
}