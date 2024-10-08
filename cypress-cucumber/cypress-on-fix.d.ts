/// <reference types="cypress" />

declare module "cypress-on-fix"{
    declare function onProxy(on: Cypress.PluginEvents): Cypress.PluginEvents
    export = onProxy;
}
