# Bearcation by Software Savants (Group 3)

## Group Members 
- Francis Boyle
- Patrick Boyle
- Josh McKone
- Timmy Frederiksen
- Yangzekun Gao

## Getting Started

To get started with the project, run the command:

### `npm install`

This command will install all the required pre-requisites that are necessary for the frontend to work properly.

To start the project, run the command:

### `npm start`

This will start the frontend on the local host, specifically [http://localhost:3000](http://localhost:3000).

Since the app is currently in the deployment stage, the backend connection is set to the deployment website version. If you want to test the frontend on a local host backend, then you will need to either run from the `test` branch or change the variable `baseUrl` found in `App.js`.

There is a commented out line that can revert it back to the localhost version. If that is the path chosen, comment out the existing line, and uncomment the one beneath it.

Heroku App Dashboard can be found at: [https://dashboard.heroku.com/apps/bearcation-frontend/resources](https://dashboard.heroku.com/apps/bearcation-frontend/resources)

Heroku App can be found at: [https://bearcation-frontend.herokuapp.com](https://bearcation-frontend.herokuapp.com)

## **Note: Make sure the backend is running before attempting to do anything with the Frontend. You WILL NOT be able to log in if the backend is not running.**
IMPORTANT! Before logging in as guest, you must first create an account and sign in to ensure that the data from the API is pulled correctly.


## Package.json Dependency list
{
  "name": "frontend-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@material-ui/core": "^4.12.4",
    "@mui/icons-material": "^5.6.1",
    "@mui/material": "^5.6.2",
    "@popperjs/core": "^2.11.5",
    "@progress/kendo-react-dropdowns": "^5.2.0",
    "@reach/combobox": "^0.16.5",
    "@react-google-maps/api": "^2.8.1",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.25.0",
    "bootstrap": "^5.1.3",
    "multiselect-react-dropdown": "^2.0.21",
    "react": "^17.0.2",
    "react-axios": "^2.0.5",
    "react-bootstrap": "^2.2.3",
    "react-dom": "^17.0.2",
    "react-icons": "^4.3.1",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.0",
    "react-select": "^5.3.0",
    "use-places-autocomplete": "^2.0.0",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "set HTTPS=true&&react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "description": "This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).",
  "main": "index.js",
  "author": "",
  "license": "ISC"
}
