*** Settings ***
Resource    resource.robot
Suite Setup    Setup
Suite Teardown    Teardown

*** Keywords ***
Setup
    Create Visual Build    name=Sauce Visual Examples -- Robot Framework    project=Visual Examples - Robot Framework

Teardown
    Finish Visual Build
    Visual Build Status
