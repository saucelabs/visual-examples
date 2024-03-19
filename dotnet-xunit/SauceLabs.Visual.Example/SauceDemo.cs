using System;
using System.Threading.Tasks;
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
            Driver.ExecuteScript("sauce:job-name=xUnit C#/.Net Visual Session");

            VisualClient = await VisualClient.Create(Driver, Region.UsWest1, new CreateBuildOptions()
            {
                Name = "My Visual Build",
                Project = "csharp-project",
                Branch = "csharp-branch"
            });
            VisualClient.CaptureDom = true;
        }

        [Fact]
        public async Task VisualSauceDemo()
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

            await VisualClient.VisualCheck("C# capture",
                new VisualCheckOptions()
                {
                    IgnoreElements = new[] { btnAction },
                    IgnoreRegions = new[] { new IgnoreRegion(10, 10, 100, 100) }
                });

            var results = await VisualClient.VisualResults();
            Assert.AreEqual(1, results?[DiffStatus.Unapproved]);
        }

        public async Task DisposeAsync()
        {
            Driver?.Quit();
            await VisualClient.Cleanup();
            VisualClient.Dispose();
        }
    }
}
