To get started with the project, run the command:

### `npm install`

This command will install all the required pre-requisites that are necessary for the frontend to work properly.

To start the project, run the command:

### `npm start`

This will start the frontend on the local host, specifically [http://localhost:3000](http://localhost:3000).

Since the app is currently in the deployment stage, the backend connection is set to the deployment website version. If you want to test the frontend on a local host backend, then you will need to either run from the `test` branch or change the variable `baseUrl` found in `App.js`.

There is a commented out line that can revert it back to the localhost version. If that is the path chosen, comment out the existing line, and uncomment the one beneath it.
