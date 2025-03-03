import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import Combo_Box from '@salesforce/messageChannel/Combo_Box__c';
import { NavigationMixin } from 'lightning/navigation';

export default class SearchBoatComponent extends NavigationMixin(LightningElement) {
    value = 'All Types';
    @wire(MessageContext)
    messageContext;

    get options() {
        return [
            { label: 'All Types', value: 'All Types' },
            { label: 'Sail Boats', value: 'Sail Boats' },
            { label: 'Motorboats', value: 'Motorboats' },
            { label: 'Fishing Boats', value: 'Fishing Boats' },
            { label: 'Personal Watercraft', value: 'Personal Watercraft' }
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        const payload = { boatTypeId: this.value };
        console.log('Payload:', JSON.stringify(payload));
        publish(this.messageContext, Combo_Box, payload);
    }


    handleNewBoat(event) {
        let pageRef = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Boat__c',
                actionName: 'new'
            }
        };
        console.log("Page" + pageRef);
        this[NavigationMixin.Navigate](pageRef);
    }
}