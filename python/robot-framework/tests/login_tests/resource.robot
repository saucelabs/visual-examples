*** Settings ***
Documentation     A resource file with reusable keywords and variables.
...
...               The system specific keywords created here form our own
...               domain specific language. They utilize keywords provided
...               by the imported SeleniumLibrary.
Library           SeleniumLibrary
Library           saucelabs_visual.frameworks.robot.SauceLabsVisual

*** Variables ***
${BROWSER}        Chrome
${DELAY}          0
${LOGIN URL}      https://www.saucedemo.com/
${INVENTORY PAGE}    https://www.saucedemo.com/inventory.html
# NOTE: If using an ondemand Sauce region other than us-west-1, you need to supply the matching
# region to the `SAUCE_REGION` ENV before visual build creation to have it utilize the same
# datacenter.
# Ex:
# REMOTE URL=https://ondemand.eu-central-1.saucelabs.com/wd/hub
# SAUCE_REGION=eu-central-1
${REMOTE URL}    https://ondemand.us-west-1.saucelabs.com:443/wd/hub
${DESIRED CAPABILITIES}    {"username": "%{SAUCE_USERNAME}", "accessKey": "%{SAUCE_ACCESS_KEY}", "sauce:options": {"browser_version": "latest", "platform_name": "Windows 11", "browser": "chrome"}}

*** Keywords ***
Open Browser To Login Page
    Go To    ${LOGIN URL}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Location Should Be    ${LOGIN URL}
    Title Should Be    Swag Labs

Go To Login Page
    Go To    ${LOGIN URL}
    Login Page Should Be Open

Input Username
    [Arguments]    ${username}
    Input Text    user-name    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    login-button

Welcome Page Should Be Open
    Location Should Be    ${INVENTORY PAGE}
    Title Should Be    Swag Labs

Setup User
    TRY
        IF    "%{VISUAL_CHECK}" == "1"
            VAR    ${username}    visual_user
        ELSE
            VAR    ${username}    standard_user
        END
    EXCEPT
        VAR    ${username}    standard_user
    END
    RETURN    ${username}
