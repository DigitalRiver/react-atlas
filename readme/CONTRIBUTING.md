# Contributing
Please note that this project is released with a [Contributor Code of Conduct](https://github.com/DigitalRiver/react-atlas/blob/master/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
## READ: [General Contributing Guidelines on Github](https://guides.github.com/activities/contributing-to-open-source/#contributing)

### Development
1. Fork repo to your personal profile
2. Clone your forked repo to your machine
3. Go inside newly cloned directory and `git remote add upstream https://github.com/DigitalRiver/react-atlas.git`
4. run `npm install`
5. run `npm run bootstrap` to have lerna install and setup the different packages as well as generate atlas code.
6. run `npm run docs` to start the development server
6. write tests & code in ES6 goodness :-)
7. run `git add whatever/files/you/changed.js`
8. run `npm run commit` and follow the prompt (this ensures that your commit message follows [our conventions](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)).
9. notice that there's a pre-commit hook that runs to ensure tests pass and coverage doesn't drop to prevent the build from breaking :-)
10. push your changes
11. create a PR with a link to the original issue
12. wait patiently :-)

## Questions?
Check out [our wiki](https://github.com/DigitalRiver/react-atlas/wiki) for more information on coding conventions, how we document our code, why we made certain decisions and a roadmap.
