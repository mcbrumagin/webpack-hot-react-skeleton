# webpack-hot-react-skeleton
Webpack, react, flow, babel, express, hot reloading, and production-ready packaging all wired up and ready to go

### Install and run for development
Run `npm install && npm start` to install all dependencies and start a development server

### Development overview
- Modifying client scripts should be loaded into the browser automatically
- Modifying server scripts will restart the server
- After modifying the server, you will need to manually refresh to reconnect to the client hot-loader
- Shared files will be compiled via Webpack for the client and babel for the server

#### Using flow
- Flow is a sophisticated static type-checker
- Put `/* @flow */` at the top of files you want checked
- Run `npm run flow-init` to install `flow-bin` globally
- Run `flow` to check types
- Babel will remove flow annotations and types for production

### Packaging and running in production

#### For osx/linux
Run `npm run package`
This will output files into `prod/`
Change to the prod directory
Run `npm run production` to install dependencies and start the server

#### For Windows
Commands are `npm run package-windows` and `npm run production-windows`

###  Todo
- Automatically refresh on dev if the hot loader connection is severed
- Wire up reactive datasource (MongoDB and/or PostgresSQL)
- Unit and integration tests
