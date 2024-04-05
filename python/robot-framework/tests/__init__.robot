*** Settings ***
Resource    resource.robot
Suite Setup    Create Visual Build    name=Sauce Visual Examples -- Robot Framework    project=Visual Examples - Robot Framework
Suite Teardown    Finish Visual Build
