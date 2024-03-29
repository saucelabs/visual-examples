using System;
using System.Threading.Tasks;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using SauceLabs.Visual;
using SauceLabs.Visual.Models;

namespace SauceLabs.Demo.Visual.Example;

public class SauceDemo
{
    private RemoteWebDriver? Driver { get; set; }
    private VisualClient? VisualClient { get; set; }

    [OneTimeSetUp]
    public async Task Setup()
    {
        var browserOptions = Utils.GetBrowserOptions();
        var sauceOptions = Utils.GetSauceOptions();
        browserOptions.AddAdditionalOption("sauce:options", sauceOptions);

        var sauceUrl = Utils.GetOnDemandURL();
        Driver = new RemoteWebDriver(sauceUrl, browserOptions);
        Driver.ExecuteScript("sauce:job-name=NUnit C#/.Net Visual Session");

        VisualClient = await VisualClient.Create(Driver, Region.UsWest1, new CreateBuildOptions()
        {
            Name = "My Visual Build",
            Project = "csharp-project",
            Branch = "csharp-branch"
        });
        VisualClient.CaptureDom = true;
        TestContext.Progress.WriteLine($"Build: {VisualClient.Build.Url}");
    }

    [Test]
    public async Task SauceDemo_CheckInventory_ShouldAddBackpackToCart()
    {
        Driver.Navigate().GoToUrl("https://www.saucedemo.com");

        var usernameLocator = By.CssSelector("#user-name");
        var passwordLocator = By.CssSelector("#password");
        var submitLocator = By.CssSelector(".btn_action");

        var wait = new WebDriverWait(Driver, TimeSpan.FromSeconds(15));
        wait.Until(drv => drv.FindElement(usernameLocator));

        await VisualClient.VisualCheck("Login Page");

        var usernameElement = Driver.FindElement(usernameLocator);
        var passwordElement = Driver.FindElement(passwordLocator);
        var submitElement = Driver.FindElement(submitLocator);


        usernameElement.SendKeys(Utils.GetDemoUsername());
        passwordElement.SendKeys(Utils.GetDemoPassword());
        submitElement.Click();

        Assert.AreEqual("https://www.saucedemo.com/inventory.html", Driver.Url);
        var addToBackpack = Driver.FindElement(By.Id("add-to-cart-sauce-labs-backpack"));

        await VisualClient.VisualCheck("Inventory Page");

        var results = await VisualClient.VisualResults();
        Assert.AreEqual(2, results?[DiffStatus.Unapproved]);
    }

    [OneTimeTearDown]
    public async Task Teardown()
    {
        Driver.Quit();
        VisualClient.Dispose();
    }
}