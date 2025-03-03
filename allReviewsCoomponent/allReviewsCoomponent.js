import { LightningElement, wire } from 'lwc';
import getAllReviews from '@salesforce/apex/BoatDataDetails.getAllReviews';

export default class AllReviewsCoomponent extends LightningElement {
    data = [];

    @wire(getAllReviews)
    wiredMethod({ data, error }) {
        if (data) {
            this.data = data.map(item => {
                return {
                    ...item,
                    RatingHtml: this.generateRatingHtml(item.Rating__c)
                };
            });
            console.log('Data:', JSON.stringify(this.data));
        } else if (error) {
            console.log('Error:', error);
        }
    }

    generateRatingHtml(rating) {
        let ratingHtml = [];
        for (let i = 1; i <= 5; i++) {
            ratingHtml.push({
                iconName: i <= rating ? 'utility:favorite' : 'utility:rating',
                value: i
            });
        }
        return ratingHtml;
    }
}