import os

from saucelabs_visual.client import SauceLabsVisual
from saucelabs_visual.typing import FullPageConfig, IgnoreRegion, IgnoreElementRegion, DiffingMethod
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait

build_name = 'Sauce Visual Examples -- No Framework'
test_name = 'Sample  Test Name'
sauce_ondemand_url = "https://ondemand.us-west-1.saucelabs.com:443/wd/hub"


def get_driver():
    # Not sure what to choose? Use our Platform Configurator to build platform / browser options:
    # https://saucelabs.com/products/platform-configurator
    options = ChromeOptions()
    options.browser_version = 'latest'
    options.platform_name = 'Windows 11'
    sauce_options = {
        'username': os.getenv('SAUCE_USERNAME'),
        'accessKey': os.getenv('SAUCE_ACCESS_KEY'),
        'build': build_name,
        'name': test_name,
    }
    options.set_capability('sauce:options', sauce_options)
    return webdriver.Remote(command_executor=sauce_ondemand_url, options=options)


def log_step(text: str):
    print(text)


def main():
    driver = get_driver()
    log_step("Starting Test")

    visual_client = SauceLabsVisual()

    # Create the visual build.
    # This needs to be done before creating any snapshots using the client.
    visual_client.create_build(build_name, project="visual-examples/python/no-framework")
    log_step("Visual Build Created")

    driver.get("https://www.saucedemo.com")
    assert "Swag Labs" in driver.title
    visual_client.create_snapshot_from_webdriver(
        "Before Login",
        driver=driver,
        # Both of these fields are optional, but if your test framework supports them,
        # or you identify your tests in a meaningful way we recommend setting them as they
        # provide additional ways for you to group and manage your tests in the Sauce Visual UI.
        #
        # test_name="Your Test Name",
        # suite_name="Your Suite Name",
    )
    log_step("Before Login Snapshot Taken")

    username_elem = driver.find_element(By.NAME, "user-name")
    password_elem = driver.find_element(By.NAME, "password")
    submit_elem = driver.find_element(By.NAME, 'login-button')

    username = "visual_user" if os.getenv('VISUAL_CHECK') else "standard_user"
    username_elem.send_keys(username)
    password_elem.send_keys("secret_sauce")
    submit_elem.click()
    log_step("Logged In")

    # Wait until the inventory page is visible
    WebDriverWait(driver, 5).until(
        expected_conditions.visibility_of_element_located((By.CSS_SELECTOR, '#inventory_container'))
    )

    add_to_cart_button = driver.find_element(By.CSS_SELECTOR, '.btn_inventory')
    visual_client.create_snapshot_from_webdriver(
        "Inventory Page",
        driver=driver,
        # Enable DOM capture, False by default.
        capture_dom=True,
        full_page_config=FullPageConfig(
            # Can customize full page behavior by customizing values here. Or omit completely to
            # disable full page screenshots:
            # ex:
            # scrollLimit=10,
            # hideAfterFirstScroll=['.fixed-header', '#cookie-banner']
        ),
        # ignore_regions=[
        #     # Ignore regions can be supplied to ignore certain areas of a page.
        #     # In the future we'll expose methods to pass elements here instead to streamline the
        #     # process.
        #     IgnoreRegion(x=100, y=100, width=100, height=100)
        # ],
        ignore_elements=[
            IgnoreElementRegion(
                # Ignore one or more elements returned by find_elements/find_element.
                element=driver.find_elements(By.CSS_SELECTOR, '.inventory_item_img'),
                # Disable changes detected only for 'content' changes. Can also be controlled via
                # `enable_only`, or completely via `diffingOptions`. NOTE - The 'BALANCED' diffing
                # method is required for this feature. See the selective diffing docs for more info:
                # https://docs.saucelabs.com/visual-testing/selective-diffing/
                disable_only=['content'],
            ),
            IgnoreElementRegion(
                # Can also pass an element that has been previously found via the driver
                element=add_to_cart_button,
            ),
        ],
        # Currently defaults to 'SIMPLE'. NOTE: The BALANCED diffing method is required for
        # selective regions. See the link for more information:
        # https://docs.saucelabs.com/visual-testing/selective-diffing/
        diffing_method=DiffingMethod.BALANCED,
    )
    log_step("Inventory Page Snapshot Taken")

    visual_client.create_snapshot_from_webdriver(
        "Inventory Page (Clipped)",
        driver=driver,
        # Clip the screenshot (and DOM capture) to a single element on the page
        clip_selector='#inventory_container',
        capture_dom=True,
        full_page_config=FullPageConfig(),
    )
    log_step("Inventory Page (Clipped) Snapshot Taken")

    # Finish the Visual build, so we can update the results UI and finish calculation.
    visual_client.finish_build()
    log_step("Visual Build Finished")

    driver.close()
    log_step("Finished Test")


if __name__ == '__main__':
    main()
