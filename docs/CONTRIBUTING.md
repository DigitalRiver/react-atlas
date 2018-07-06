React-Atlas Contributing Guidelines

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.
External Contributors

Fork repo to your personal profile.
Clone your forked repo to your machine.
Go inside newly cloned directory and:

    git remote add upstream https://github.com/DigitalRiver/react-atlas.git             # to add the ability to fetch the most recent code from React-Atlas master branch
    npm install                                                                         # to install node modules
    npm run bootstrap:dev                                                               # to have lerna install and setup the different packages as well as generate atlas code
    npm run docs:dev                                                                    # to start a local docs server at port 6060
Write tests & code in ES6 goodness :-)
 un the test suite:
    npm run test

If any snapshot tests need to be updated, run the following command:
    npm run updateSnapshot

 Confirm that there were no errors in the test results. Commit your changes. A pre-commit hook will run Prettier and Eslint on your changes. Fix any errors found, then commit again. Rebase your branch to upstream/master and squash any unhelpful commits. Push your branch to your personal fork. Create a PR back into DigitalRiver/react-atlas or the appropriate release candidate branch. If this is your first PR into React-Atlas you will be asked to sign a Contributor's License Agreement online Wait patiently :-)


Internal Contributor Rules/Expectations

    Only branches that are release candidates or will be contributed to by multiple developers should be pushed to DigitalRiver/React-Atlas.
    Any branch pushed to DigitalRiver/React-Atlas must have an associated issue and reference that issue in a commit message. The issues should have a list of expected changes, and the commit messages should reference which changes have been completed so that  another developer could assist with that development effort.
    Experimental branches or feature branches that will only be contributed to by one developer should be pushed to a private fork to keep the master repository as clean as possible.
    PRs can contain more than one commit, but each commit must solve an issue, be releasable on its own, and contain a helpful message.

