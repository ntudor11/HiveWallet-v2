# HiveWallet
A demo Bitcoin Wallet desktop application using an Express server, based on React and ElectronJS.

## System Installation Guidelines

1. Start your local MySQL server.
1. Run the SQL commands from within the file `hive_db.sql` (ei􏰄he􏰁􏰊r via Terminal or t􏰄he Ph􏰃pMyAdmin􏰇 interface) from the root directory, in order to create the database and to write some test data in it.
1. Clone the HiveWallet repository.
1. Install the dependencies both in the **root** directory and in the **client** directory with the command ```npm install```.
1. To start the Node.JS server and the React application, run from the root directory: ```npm run dev```.
1. Close the browser tab that opens with the React application.
1. To open the Electron desktop application framework, run from the root directory: ```npm run electron```.

The Node.JS server runs at: [http://localhost:5000/](http://localhost:5000/).

The React front-end runs at: [http://localhost:3000/](http://localhost:3000/).

