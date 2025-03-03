public with sharing class BoatDataDetails {
    
    @AuraEnabled(cacheable=true)
    public static List<Boat__c> getBoatDetails(String boatTypeId) {
        try {
            String query = 'SELECT Id, Name, Type__c, Price__c, Image__c, Length__c, Location__c FROM Boat__c';
            if (boatTypeId != 'All Types') {
                query += ' WHERE Type__c = :boatTypeId';
            }
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Boat__c> getAllBoatDetails(){
        try {
            return [SELECT Id, Name, Type__c, Price__c, Image__c, Length__c, Location__c FROM Boat__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Boat__c> getBoatsNearLocation(Double latitude, Double longitude, Double radius, String boatTypeId) {
        try {
            String query = 'SELECT Id, Name, Type__c, Price__c, Image__c, Length__c, Location__c ' +
                'FROM Boat__c ' +
                'WHERE DISTANCE(Location__c, GEOLOCATION(:latitude, :longitude), \'mi\') < :radius';
            if (boatTypeId != 'All Types') {
                query += ' AND Type__c = :boatTypeId';
            }
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable = true)
    public static List<BoatReview__c> getAllReviews(){
        return[SELECT Id,Name,Boat__c,Comment__c,Rating__c FROM BoatReview__c];
    }
}