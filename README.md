## Elliot for Water New Tab Extension

Elliot for Water is the search engine that donates water with your searches: https://elliotforwater.com
Here you can find the code for Chrome and Firefox web extension.

We are very small team, incessantly working on ElliotForWater to make it become a reality which can help million of people. To do so we need to develop more functionalities which allow the project to move faster and to delivery a product that our users love to use. If you are considering contributing, there is a lot you could gain from this project: you could actually help people in need and make the difference in the world. You will work with modern technologies and have the chance to work on small to medium size task, which will actually make the difference for the product and leave your mark once in production. On top of that you will work with an open-minded and young team which welcome new ideas and inputs.

### System versions

Node 14.xx

npm 6.14.xx

## How to start

This project is built with `Reactjs`, `Typescript`, `Jest` and `webpack`.
To run the project you need to have install on your machine:

- `Nodejs > 8`
- `npm > 4`

Once you clone the repo go ahead and install all the packages:

- `npm i` must be run from `root` folder.
- `npm run test` to run test coverage

#### To build the project:

This project share the same code to serve different targets. This code can be run on:

- web
- chrome extension
- firefox extension

While developing you can run the web version with:
`npm run dev`

To develop for chrome or firefox you will need to build the project for the corresponding browser and then uploading in developer mode in their respective extension dashboard.

To build the project you can run those commands:

- web: `npm run build`
- chrome: `npm run build:chromium`
- firefox: `npm run build:firefox`

Once the project is built, you can find a `dist` folder in the root of the project whit the production ready code.
Please be aware that the `dist` folder gets erase every time a build process is started.
Which means if you created a build code for firefox and then run the build command for chromium, your firefox build code will no longer exist.
You will need to run again `npm run build:firefox` in order to get firefox production code available again.

Please have a look at `package.json` to discover which libraries we use and other configuration.

## I want to help out! How can I start?

Since we are very small team and unfortunately we don't have much time, we decided to set up some tasks where support is more needed.
You can find those tasks in the Issue section of our Github repo: https://github.com/ElliotForWater/elliot-dashboard/issues
You are more then welcome to grab any of this task and work on it.
Please write in the issue that you want to work on and tag the team `@ElliotForWater/elliotforwater-team` so we can assign the task to you; communicate to the team any doubts, concern, unclear specification or improvement's ideas.
We always welcome new feedbacks! If you have any ideas on how to improve the project, please feel free to open an issue, label with `ideas` and we will check and answer you asap.
Again, please remember we are very small team and we might need some times before getting back to you :prayhands:

## Got a problem or found a bug?

If you encounter any problem in the installation or product in general, please open an [issue](https://github.com/ElliotForWater/elliot-dashboard/issues).

## License

Licensed under [MIT](https://github.com/ElliotForWater/elliot-dashboard/blob/develop/LICENSE.md)

Copyright 2016-2021 Elliot for Water Organisation LTD.

Check our [Trademark guideline](https://github.com/ElliotForWater/efw-webapp/wiki/ElliotForWater-Trademark).
