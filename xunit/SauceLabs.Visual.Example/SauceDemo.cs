using System;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using SauceLabs.Visual;
using SauceLabs.Visual.Models;
using Xunit;
using Xunit.Abstractions;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace SauceLabs.Visual.Example
{
    public class SauceDemo : IAsyncLifetime
    {
        private RemoteWebDriver Driver { get; set; }
        private VisualClient VisualClient { get; set; }
        private VisualBuild VisualBuild { get; set; }

        private ITestOutputHelper OutputHelper { get; }

        public SauceDemo(ITestOutputHelper outputHelper)
        {
            OutputHelper = outputHelper;
        }

        public async Task InitializeAsync()
        {
            var browserOptions = Utils.GetBrowserOptions();
            var sauceOptions = Utils.GetSauceOptions();
            browserOptions.AddAdditionalOption("sauce:options", sauceOptions);

            var sauceUrl = Utils.GetOnDemandURL();
            Driver = new RemoteWebDriver(sauceUrl, browserOptions);
            VisualClient = await VisualClient.Create(Driver, DataCenter.UsWest1, Utils.GetSauceUsername(), Utils.GetSauceAccessKey());
            VisualBuild = await VisualClient.CreateBuild(name: "C# BUILD", project: "my-c#-project", branch: "my-c#-branch");
        }


        [Fact]
        public async void VisualSauceDemo()
        {
            Driver.Navigate().GoToUrl("https://www.saucedemo.com");

            var usernameLocator = By.CssSelector("#user-name");
            var passwordLocator = By.CssSelector("#password");
            var submitLocator = By.CssSelector(".btn_action");

            var wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(15));
            wait.Until(drv => drv.FindElement(usernameLocator));

            var usernameElement = Driver.FindElement(usernameLocator);
            var passwordElement = Driver.FindElement(passwordLocator);
            var submitElement = Driver.FindElement(submitLocator);

            usernameElement.SendKeys("standard_user");
            passwordElement.SendKeys("secret_sauce");
            submitElement.Click();

            Assert.AreEqual("https://www.saucedemo.com/inventory.html", Driver.Url);
            var btnAction = Driver.FindElement(By.CssSelector(".app_logo"));

            await VisualClient.VisualCheck(VisualBuild,
                "C# capture",
                ignoreElements: new[]
                {
                    btnAction
                },
                ignoreRegions: new[]
                {
                    new IgnoreRegion(10, 10, 100, 100)
                });

            var results = await VisualClient.VisualResults(VisualBuild.Id);
            Assert.AreEqual(1, results?[DiffStatus.Unapproved]);
        }

        [TestCleanup]
        public async Task DisposeAsync()
        {
            const string script = "sauce:job-result=passed";
            Driver.ExecuteScript(script);
            Driver?.Quit();
            await VisualClient.FinishBuild(VisualBuild);
        }
    }
}
