# LWC Superbadge - Boat Component

## Overview
This repository contains Lightning Web Components (LWC) for the **Boat** component, developed as part of the Salesforce LWC Superbadge. It includes various functionalities like displaying a list of boats, filtering, reviewing, and showing boat locations.

## Components & Files
Below is a list of key components included in this repository:

- **allBoatsLocation** - Displays all boats on a map.
- **allReviewsComponent** - Handles boat reviews.
- **boatData** - Stores boat-related data.
- **boatDataTable** - Displays boat data in a tabular format.
- **mapOfBoats** - Maps out boat locations.
- **messageChannels** - Handles Lightning Message Service (LMS) for component communication.
- **reviewBoat** - Allows users to review boats.
- **searchBoatComponent** - Enables users to search for boats.
- **singleBoatDetailsComponent** - Displays details for a selected boat.
- **BoatDataDetails.cls** - Apex class managing boat data.

## Features
- Boat listing with details like type, price, and length.
- Search functionality for boats.
- Review system to add and display user feedback.
- Interactive map for boat locations.
- Lightning Message Service (LMS) for cross-component communication.

## Installation & Setup
### Prerequisites
- Salesforce Developer Org
- Salesforce CLI
- Visual Studio Code with Salesforce Extension Pack

### Steps to Deploy
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo-url.git
   cd lwc-boat-superbadge
   ```
2. Authenticate with your Salesforce org:
   ```sh
   sfdx force:auth:web:login
   ```
3. Deploy the metadata:
   ```sh
   sfdx force:source:push -u YourOrgAlias
   ```
4. Assign the permission set:
   ```sh
   sfdx force:user:permset:assign -n BoatAppPermissions
   ```
5. Open the Salesforce org:
   ```sh
   sfdx force:org:open
   ```

## Screenshot
Below is an image of the Boat component in action:
![image](https://github.com/user-attachments/assets/772f9b73-3f02-4390-9360-b598091da7f9)


## Contribution
Feel free to fork this repository and contribute enhancements or bug fixes via pull requests.

## License
This project is licensed under the MIT License.

