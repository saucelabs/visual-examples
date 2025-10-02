# WDIO + Figma baseline example

This is an example repo using `baselineOverrides` which is a feature geared towards cross-platform / OS visual comparisons to leverage Figma as a baseline / source of truth for visual comparison. You can see more information on the full feature, [here](https://docs.saucelabs.com/visual-testing/workflows/cross-browser-os/).

We have provided a sample [Figma file](https://www.figma.com/community/file/1554925939348729358/sauce-labs-demo-application) for our [Sauce Demo App website](https://www.saucedemo.com/) which can be used to test the Figma integration with this repo. You can also view the full documentation for the Figma plugin on [Sauce Docs](https://docs.saucelabs.com/visual-testing/integrations/figma/).

## Using this Repo

- Checkout this repo, navigate to this folder `wdio-figma` and run `npm install` using an up-to-date version of node
- Open the [Sauce Labs Demo App Figma file](https://www.figma.com/community/file/1554925939348729358/sauce-labs-demo-application)
- Add / install the [Sauce Labs Visual Testing plugin](https://www.figma.com/community/plugin/1552015177501558356/sauce-labs-visual-testing) to your Figma desktop app and follow the in-app prompts to login
- Select all the frames on the 'Web app' page, then click the 'Export to Sauce Labs' button
- Click the link that appears in the notification in the plugin, or navigate to the build in your dashboard manually and approve the baselines
  - These will be the 'source of truth' that we will use as comparison
  - If at any point you wished to update these you could re-export from Figma and re-approve the baselines before rerunning another test
- Run the E2E tests in this repo using `npm run sauce-visual`
- View the resulting Visual build in the Sauce Labs dashboard and compare differences between the Figma files and the E2E tests for each browser
