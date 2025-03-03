import { LightningElement, wire } from 'lwc';
import getBoatDetails from '@salesforce/apex/BoatDataDetails.getBoatDetails';
import { subscribe, MessageContext } from 'lightning/messageService';
import { refreshApex } from "@salesforce/apex";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import Combo_Box from '@salesforce/messageChannel/Combo_Box__c';

const columns = [
    { label: 'Boat Name', fieldName: 'Name', editable: true },
    { label: 'Type', fieldName: 'Type__c' },
    { label: 'Boat Length', fieldName: 'Length__c', editable: true },
    { label: 'Boat Price', fieldName: 'Price__c', editable: true }
];

export default class BoatDataTable extends LightningElement {
    data = [];
    boatTypeId = 'All Types';
    columns = columns;
    draftValues = [];
    refreshData;

    @wire(MessageContext)
    messageContext;

    @wire(getBoatDetails, { boatTypeId: '$boatTypeId' })
    wiredMethod(result) {
        this.refreshData = result;
        if (result.data) {
            this.data = result.data;
            console.log('Data:', JSON.stringify(this.data));
        } else if (result.error) {
            console.log('Error:', result.error);
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

    async handleSave(event) {
        let records = event.detail.draftValues;
        console.log('records:', JSON.stringify(records));
        let updatedRecordsArray = records.map((currItem) => {
            let fieldInput = { ...currItem };
            console.log('fieldInput:', JSON.stringify(fieldInput));
            return {
                fields: {
                    Id: currItem.Id,
                    ...fieldInput
                }
            };
        });

        this.draftValues = [];
        console.log('draft:', JSON.stringify(this.draftValues));
        console.log('updatedRecordsArray:', JSON.stringify(updatedRecordsArray));
        let updatedRecordsArrayPromise = updatedRecordsArray.map((currItem) =>
            updateRecord(currItem)
        );
        console.log('updatedRecordsArrayPromise:', JSON.stringify(updatedRecordsArrayPromise));
        try {
            await Promise.all(updatedRecordsArrayPromise);
            const eve = new ShowToastEvent({
                title: 'Success',
                message: 'Updated Successfully!',
                variant: 'success'
            });
            this.dispatchEvent(eve);
            await refreshApex(this.refreshData);
        } catch (error) {
            const eve = new ShowToastEvent({
                title: 'Error',
                message: 'Error updating records: ' + error.body.message,
                variant: 'error'
            });
            this.dispatchEvent(eve);
        }
    }
}