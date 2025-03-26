# Creating PDF snapshots

## Prerequisites

-   NodeJS 16
-   Sauce Labs Account

## Run the demo

-   Install `npm` dependencies
    ```
    npm install
    ```
-   Configure with your Sauce credentials from https://app.saucelabs.com/user-settings
    ```sh
    export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
    export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
    export SAUCE_REGION=__YOUR_REGION_NAME__ # default - us-west-1
    ```
-   Upload baseline snapshots
    ```
    npm run demo-v1
    ```
-   Review your snapshots by clicking on the URL printed in the test, or go to https://app.saucelabs.com/visual/builds
-   Accept uploaded diffs, so they become new baselines
-   Upload changed snapshots
    ```
    npm run demo-v2
    ```

## Installation and usage

View installation and usage instructions on the [Sauce Docs website](https://docs.saucelabs.com/visual-testing/integrations/snapshots-cli/). <!-- TODO: Add the actual documentation link -->
