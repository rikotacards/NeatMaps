#Neat Maps

##Summary
* A Single Page App that allows users to plot multiple markers onto Google Maps based on specified addresses listed in an uploaded CSV file (see sample CSV files).
* View on Heroku https://neatmaps.herokuapp.com/

##How to Get Started
### To run locally
* Run ```npm install``` to install required packages
* Run ```npm run build``` to build bundle
* Run ```npm run start``` to start node server
* Open up browser, and enter localhost:8080, this is the port that is set initially.

##Problem
* User addresses are in string format. However, in order to plot markers, Google requires geographical coordinates in DD (Decimal Degrees) format.

##Solution
* Using the Google geocoding API, we can convert street addresses into coordinates.

##Features
* Basic authentication of user, checking against NEAT user database.
* CSV file upload.
* User defined column mapping via dropdown select menu.
* Color coded markers based on category column.
* Conversion of street address to geographical coordinates.
* Limit of 3 uploads. Subsequent uploads will replaces earliest upload.

