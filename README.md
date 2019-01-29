# game-of-drones-mobile

This project provides a Web and Mobile application of the game.

This project was developed to show how to use a single codebase to get a multiplatform application. This app can run in a browser and can be compiled for many mobile platforms (tested in Android).It can also be builded for desktop platforms using Electron.

This app uses game-of-drones-api (master branch), and allows us to play against other mobile users or Web app players. This application is made for one user (player) only.

This project was generated with [Ionic CLI](https://ionicframework.com/docs/v3/intro/installation/).

## Important before run or build!!!
src/api/config/enviroment.ts has to be edited pointing to the IP address or the name of the API's pc where the server's variable is.

## Development server (Browser)

Run `ionic serve` for a dev server. Navigate to `http://localhost:8100/`. The app will automatically reload if you change any of the source files.

## Build (Android)

Run `ionic cordova build android` to build the project apk.
