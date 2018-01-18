To publish an atlas package first set `NODE_ENV` to production. Note you may have to open a different terminal window for your enviroment variables changes take place.

 Next sign into your npm account using `npm adduser`.

 Change to the branch you want to publish, for example the `0.1.0-beta` branch.

 Now manually increment the package versions in `packages/react-atlas`, `packages/react-atlas-core`, and  `packages/react-atlas-default-theme` package.json files.

 Add and commit the version updates with git.

 Now build react-atlas with `npm run build`.

 Copy the generated CSS file from `packages/react-atlas-default-theme/lib/` to `packages/react-atlas/lib/`.

 Finally you can run `npm run publish` to publish the new packages.
