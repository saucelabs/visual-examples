const plugin: Cypress.PluginConfig = (on, config) => {
  //@ts-ignore
  on('after:screenshot', (...args) => {
    debugger;
  })
}

export default plugin