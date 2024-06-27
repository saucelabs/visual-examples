*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot
Suite Setup    Open Browser    browser=${BROWSER}    remote_url=${REMOTE URL}    options=set_capability('sauce:options', ${DESIRED CAPABILITIES})
Suite Teardown    Close Browser

*** Test Cases ***
Valid Login
    Open Browser To Login Page
    ${username} =     Setup User
    Input Username    ${username}
    Input Password    secret_sauce

    # Capture snapshot with selective regions
    ${username_element}     Get Webelements     id:user-name
    ${password_element}     Get Webelements     id:password
    # Ignore all changes on ${username_element}
    ${ignore_username} =    Visual Ignore Element       ${username_element}     diffing_options={}
    # Only checks for style changes on ${password_element}
    ${ignore_password} =    Visual Ignore Element       ${password_element}     diffing_options={"style":True}
    ${ignore_regions} =     Create List     ${ignore_username}      ${ignore_password}
    Visual Snapshot     Login Page     capture_dom=True        ignore_regions=${ignore_regions}        diffing_method=BALANCED

    Submit Credentials
    Welcome Page Should Be Open
    Visual Snapshot    Valid Login    capture_dom=True

Invalid Login
    Open Browser To Login Page
    Input Username    locked_out_user
    Input Password    secret_sauce
    Submit Credentials
    Login Page Should Be Open
    Visual Snapshot    Invalid Login    capture_dom=True
