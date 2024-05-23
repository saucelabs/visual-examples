# Selenium / No Framework Example

This is an example using Python's selenium bindings, without a framework, to give some basic examples for taking Visual snapshots without relying on / having a framework specific implementation.

Have a framework you'd like to see us officially support? You can submit a feature request on our [Productboard](https://portal.productboard.com/sauceprod/2-sauce-labs-portal/tabs/4-under-consideration/submit-idea) to help us prioritize which SDKs we roll out first.

## Prerequisites

- A device with Python 3+ Support
- Sauce Labs Account

## Run the demo

- Install & setup Python dependencies (we recommend using a virtual environment)

```sh
# Create the virtual environment for this project if you haven't already
python -m venv .venv

# Activate the venv in your shell (bash/zsh)
# See here for Windows / other dist instructions:
# https://docs.python.org/3/library/venv.html#how-venvs-work
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

- Configure with your Sauce credentials from https://app.saucelabs.com/user-settings

```sh
export SAUCE_USERNAME=__YOUR_SAUCE_USER_NAME__
export SAUCE_ACCESS_KEY=__YOUR_SAUCE_ACCESS_KEY__
```

- Run the test

```sh
python test.py
```

- Go to https://app.saucelabs.com/visual/builds and select your latest test run
- Accept all diffs, so they become new baselines.
- Re-run the tests

```sh
VISUAL_CHECK=1 python test.py
```

- Open the test or go to https://app.saucelabs.com/visual/builds to review changes.
- It should detect changes and display differences between the two runs of the inventory page test
