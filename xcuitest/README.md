# Getting started with XCUITest

Add visual testing to your XCUITest UI tests with the Sauce Visual SDK for Apple platforms. Each check takes a screenshot of your app, uploads it to Sauce Visual and compares it with an approved baseline, so you see every visual change before it ships.

This example runs [`VisualTest.swift`](https://github.com/saucelabs/my-demo-app-ios/blob/main/MyDemoAppUITests/Tests/VisualTest.swift) from the [Sauce Labs iOS Demo App](https://github.com/saucelabs/my-demo-app-ios) on a local simulator.

## What the example covers

| Test | Flow | SDK features |
|---|---|---|
| `testCatalogToCheckout` | Catalog → Product details → Cart → Login | Full-screen checks, `ignoreElements`, `captureDom`, `clipElement` |
| `testCatalogFullPage` | Catalog | `fullPage`: scrolls the product list and stitches it into one image |
| `testCatalogAfterLogin` | Login → Catalog | Detecting real changes: run with a standard user, then with `VISUAL_CHECK=true` to log in as `visual@example.com` |

## Add Sauce Visual to your project

The Demo App is already set up. To use Sauce Visual in your own app:

1. In Xcode, choose **File → Add Package Dependencies… → Add Local…** and select the `visual-sdks/visual-apple` folder.
2. Add the `SauceVisual` product to your **UI test target only**, never to the app target. XCUITest runs your tests in a separate runner that drives the app from outside, so the app doesn't need the SDK. The SDK links XCTest, so an app that embeds it won't launch outside a test run.
3. Embed the framework in the UI test bundle. `SauceVisual` is a dynamic framework, and linking it isn't enough on a real device:
   1. Select the UI test target and open **Build Phases**.
   2. Choose **+ → New Copy Files Phase**, set **Destination** to **Frameworks** and leave **Subpath** empty.
   3. Click **+** in the new phase, add `SauceVisual`, and check **Code Sign On Copy**.

Without step 3, tests still pass on a simulator, which loads the framework from DerivedData, but fail on a device with `Library not loaded: @rpath/SauceVisual.framework/SauceVisual`.

## How it works

Create a client. Clients with the same options share one Sauce Visual build, and the SDK finishes the build when the tests end.

```swift
import SauceVisual

var visual: VisualClient!

override func setUpWithError() throws {
    try super.setUpWithError()
    visual = try VisualClient(options: VisualBuildOptions(
        name: "Xcuitest Sauce Visual demo",
        project: "xcuitest sauce demo",
        branch: "feature/visual-xcui-demo",
        defaultBranch: "main"
    ))
}
```

Drive the app to a screen, then check it. Checks run on the main actor, like the XCUI APIs, so mark async tests `@MainActor`.

```swift
@MainActor
func testCatalogToCheckout() async throws {
    XCTAssert(PageObject().catalogScreen.waitForExistence(timeout: 2))
    try await visual.sauceVisualCheck("Catalog")
}
```

Pass `VisualCheckOptions` to change what is captured and compared:

```swift
// Leave the status bar clock out of the comparison. The status bar belongs to
// SpringBoard, and its height depends on the device.
let statusBar = XCUIApplication(bundleIdentifier: "com.apple.springboard").statusBars.firstMatch
try await visual.sauceVisualCheck("Catalog", options: VisualCheckOptions(
    ignoreElements: [statusBar]
))

// Or leave out a fixed area, in points
try await visual.sauceVisualCheck("Catalog", options: VisualCheckOptions(
    ignoreRegions: [CGRect(x: 0, y: 0, width: 100, height: 40)]
))

// Upload the element tree, so the dashboard shows which element changed
try await visual.sauceVisualCheck("Cart", options: VisualCheckOptions(captureDom: true))

// Snapshot one element only
try await visual.sauceVisualCheck("Login button", options: VisualCheckOptions(
    clipElement: app.buttons["Login"].firstMatch
))

// Scroll a list and snapshot all of its content
try await visual.sauceVisualCheck("Catalog - full page", options: VisualCheckOptions(
    fullPage: FullPageScreenshot(scrollElement: app.collectionViews.firstMatch, scrollLimit: 15)
))
```

## Prerequisites

- macOS with Xcode 26 and an iOS Simulator
- Sauce Labs Account

## Set up

- Clone the Demo App and the Sauce Visual SDK into the same folder. The Demo App uses the SDK as a local Swift package at `../visual-sdks/visual-apple`, which isn't on the SDK's `main` branch yet.

```sh { name=clone }
git clone https://github.com/saucelabs/my-demo-app-ios.git
git clone -b feat/visual-apple-fixes https://github.com/saucelabs/visual-sdks.git
cd my-demo-app-ios
```

```
your-folder/
├── my-demo-app-ios/
└── visual-sdks/
    └── visual-apple/
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh { name=set-credentials }
export SAUCE_USERNAME=__YOUR_SAUCE_USERNAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
# Optional: us-west-1 (default), us-east-4, eu-central-1 or asia-south-2
export SAUCE_REGION=us-west-1
```

Tests on a simulator don't inherit your shell's variables, so the commands below pass them with the `TEST_RUNNER_` prefix, which `xcodebuild` strips. Without credentials, the tests are skipped.

## Run the demo

### 1. Create the baselines

```sh { name=xcodebuild-test }
TEST_RUNNER_SAUCE_USERNAME="$SAUCE_USERNAME" TEST_RUNNER_SAUCE_ACCESS_KEY="$SAUCE_ACCESS_KEY" \
TEST_RUNNER_SAUCE_REGION="$SAUCE_REGION" \
xcodebuild test -project "My Demo App.xcodeproj" -scheme "My Demo App" \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  -only-testing MyDemoAppUITests/VisualTest
```

Open https://app.saucelabs.com/visual/builds and select the latest build. Every snapshot is **New**, because nothing has been approved yet:

| Snapshot | Test |
|---|---|
| Catalog, Product details, Cart, Login, Login button | `testCatalogToCheckout` |
| Catalog - full page | `testCatalogFullPage` |
| Catalog - login | `testCatalogAfterLogin` |

Accept all of them, so they become the baselines. Run the command again if you like: every snapshot now matches its baseline.

### 2. Detect a visual change

The Demo App has a built-in user, `visual@example.com`, whose catalog has random prices, two swapped product images and a centred title. With `VISUAL_CHECK` set, `testCatalogAfterLogin` logs in as that user instead of the standard one. Rerun it with the variable:

```sh { name=xcodebuild-visual-test }
TEST_RUNNER_SAUCE_USERNAME="$SAUCE_USERNAME" TEST_RUNNER_SAUCE_ACCESS_KEY="$SAUCE_ACCESS_KEY" \
TEST_RUNNER_SAUCE_REGION="$SAUCE_REGION" TEST_RUNNER_VISUAL_CHECK=true \
xcodebuild test -project "My Demo App.xcodeproj" -scheme "My Demo App" \
  -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  -only-testing MyDemoAppUITests/VisualTest/testCatalogAfterLogin
```

In the new build, **Catalog - login** shows the changed prices, images and title. Because the snapshot captures the element tree, the dashboard can point to the elements that changed. Don't accept it, so the standard user's baseline stays. Runs without `VISUAL_CHECK` use the standard user again.

### Run from Xcode instead

1. Open `My Demo App.xcodeproj`.
2. **Product → Scheme → Manage Schemes…**: duplicate **My Demo App** and untick **Shared** on the copy, so your keys stay out of git.
3. In the copy, **Edit Scheme… → Test → Arguments**: untick **Use the Run action's arguments and environment variables**, then add `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` under **Environment Variables**. To detect a visual change, also add `VISUAL_CHECK` = `true`, and untick it to go back to the standard user.
4. Open `MyDemoAppUITests/Tests/VisualTest.swift` and click the ◇ next to `class VisualTest`, or next to a single test.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `the package at '…/visual-sdks/visual-apple' cannot be accessed`, or `No such module 'SauceVisual'` | Clone `visual-sdks` next to `my-demo-app-ios` on a branch that has `visual-apple`, as in [Set up](#set-up) |
| Every test is skipped | `SAUCE_USERNAME` and `SAUCE_ACCESS_KEY` didn't reach the test runner. Pass them with the `TEST_RUNNER_` prefix, or set them in the scheme's Test action |
| `Invalid Sauce Labs credentials` | Check the username and access key, and set `SAUCE_REGION` if your account isn't in `us-west-1` |
| On a device, tests fail at launch with `Library not loaded: @rpath/SauceVisual.framework/SauceVisual` | The UI test target links `SauceVisual` but doesn't embed it. Add the Copy Files phase from [Add Sauce Visual to your project](#add-sauce-visual-to-your-project) |
| The app crashes at launch outside tests, or `SauceVisual` shows up in the app bundle | `SauceVisual` was added to the app target. Remove it there and keep it on the UI test target only |
| The destination isn't found | List simulators with `xcrun simctl list devices available` and use one of them in `-destination` |
| A snapshot is compared with the wrong baseline, or shows as **New** again | Baselines match on snapshot name, test and suite names, device and iOS version. A new simulator or renamed test needs a new baseline |

## Learn more

- [Sauce Visual SDK for Apple platforms](https://github.com/saucelabs/visual-sdks/blob/feat/visual-apple-fixes/visual-apple/README.md): every check option, sharing builds between workers, baseline overrides and Objective-C usage
- [Sauce Visual documentation](https://docs.saucelabs.com/visual-testing/)
- [Demo App README](https://github.com/saucelabs/my-demo-app-ios#sauce-visual): embedding the framework and running on a real device
