```sh
# Sauce Visual Getting Started
```

## Adding Sauce Visual to an existing wdio project

This is not required if you only wanna run tests from this repo

INTERNAL ONLY: use artifactory to resolve @saucelabs/wdio-sauce-visual-service

```sh
echo "@saucelabs:registry=https://artifactory.tools.saucelabs.net/artifactory/api/npm/all-npm" >> .npmrc
```

Add the @saucelabs/wdio-sauce-visual-service dependency to your project

```sh
npm i --save @saucelabs/wdio-sauce-visual-service
```

Add the SauceVisualService to your wdio.conf