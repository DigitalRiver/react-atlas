# Contributing
Please note that this project is released with a [Contributor Code of Conduct](https://github.com/DigitalRiver/react-atlas/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
## READ: [General Contributing Guidelines on Github](https://guides.github.com/activities/contributing-to-open-source/#contributing)

### Development
1. Fork repo to your personal profile
2. Clone your forked repo to your machine
3. Go inside newly cloned directory and `git remote add upstream https://github.com/DigitalRiver/react-atlas.git`
4. run `npm install`
5. run `npm run build:dev` to have lerna install and setup the different packages as well as generate atlas code.
7. run `npm run docs:dev` to start the local docs server at port 6060
8. write tests & code in ES6 goodness :-)
9. Run prettier and eslint on your updated JavaScript files, then run the test suite
```bash
node_modules/prettier/bin/prettier.js --write packages/react-atlas-core/src/Component/Component.js
node_modules/eslint/bin/eslint.js --fix packages/react-atlas-core/src/Component/Component.js
npm run test
```
10. Confirm that there were no errors in the test results
11. Commit your changes
12. Push your changes to your personal fork
13. Create a PR back into DigitalRiver/react-atlas
* If this is your first PR into React-Atlas you will be asked to sign a Contributor's License Agreement online
14. wait patiently :-)

## Questions?
Check out [our wiki](https://github.com/DigitalRiver/react-atlas/wiki) for more information on coding conventions, how we document our code, why we made certain decisions and a roadmap.
