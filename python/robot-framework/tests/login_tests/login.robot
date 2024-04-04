*** Settings ***
Documentation     A test suite with a single test for valid login.
...
...               This test has a workflow that is created using keywords in
...               the imported resource file.
Resource          resource.robot

*** Test Cases ***
Valid Login
    Open Browser To Login Page
    ${username} =     Setup User
    Input Username    ${username}
    Input Password    secret_sauce
    Submit Credentials
    Welcome Page Should Be Open
    Visual Snapshot    Valid Login    capture_dom=True
    [Teardown]    Close Browser

Invalid Login
    Open Browser To Login Page
    Input Username    locked_out_user
    Input Password    secret_sauce
    Submit Credentials
    Login Page Should Be Open
    Visual Snapshot    Invalid Login    capture_dom=True
    [Teardown]    Close Browser
