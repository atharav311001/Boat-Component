import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';
import REVIEW_OBJECT from '@salesforce/schema/BoatReview__c';
import NAME_FIELD from '@salesforce/schema/BoatReview__c.Name';
import RATING_FIELD from '@salesforce/schema/BoatReview__c.Rating__c';
import COMMENT_FIELD from '@salesforce/schema/BoatReview__c.Comment__c';

export default class ReviewForm extends LightningElement {
    @track reviewer = '';
    @track selectedRating = 0;
    @track comment = '';

    starList = [
        { value: 1, iconName: 'utility:rating' },
        { value: 2, iconName: 'utility:rating' },
        { value: 3, iconName: 'utility:rating' },
        { value: 4, iconName: 'utility:rating' },
        { value: 5, iconName: 'utility:rating' }
    ];

    handleReviewerChange(event) {
        this.reviewer = event.target.value;
    }

    handleCommentChange(event) {
        this.comment = event.target.value;
    }

    handleStarClick(event) {
        this.selectedRating = parseInt(event.currentTarget.dataset.value, 10);
        this.updateStarIcons();
    }

    updateStarIcons() {
        this.starList = this.starList.map(star => ({
            ...star,
            iconName: star.value <= this.selectedRating ? 'utility:favorite' : 'utility:rating'
        }));
    }

    handleSubmit() {
        if (!this.reviewer || !this.comment || this.selectedRating === 0) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please fill all fields',
                    variant: 'error'
                })
            );
            return;
        }

        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.reviewer;
        fields[RATING_FIELD.fieldApiName] = this.selectedRating;
        fields[COMMENT_FIELD.fieldApiName] = this.comment;

        const recordInput = { apiName: REVIEW_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Review submitted successfully',
                        variant: 'success'
                    })
                );

                this.reviewer = '';
                this.selectedRating = 0;
                this.comment = '';
                this.updateStarIcons();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error submitting review',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
    }
}
