using System;
using System.Collections.Generic;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Safari;

namespace SauceLabs.Visual.Example
{
    internal static class Utils
    {
        public static Dictionary<string, object> GetSauceOptions()
        {
            return new Dictionary<string, object>
            {
                { "username", GetSauceUsername() },
                { "accessKey", GetSauceAccessKey() }
            };
        }

        public static string GetSauceUsername()
        {
            var username = Environment.GetEnvironmentVariable("SAUCE_USERNAME");
            if (username == null)
            {
                throw new Exception("No SAUCE_USERNAME found");
            }

            return username;
        }

        public static string GetSauceAccessKey()
        {
            var accessKey = Environment.GetEnvironmentVariable("SAUCE_ACCESS_KEY");
            if (accessKey == null)
            {
                throw new Exception("No SAUCE_ACCESS_KEY found");
            }

            return accessKey;
        }

        public static string GetSauceRegion()
        {
            var region = Environment.GetEnvironmentVariable("SAUCE_REGION");
            if (region == null)
            {
                throw new Exception("No SAUCE_REGION found");
            }

            return region;
        }

        public static Uri GetOnDemandURL()
        {
            var regionName = GetSauceRegion();
            var tld = regionName == "staging" ? "net" : "com";
            return new Uri("https://ondemand." + regionName + ".saucelabs." + tld + "/wd/hub");
        }

        public static DriverOptions GetBrowserOptions()
        {
            DriverOptions browserOptions;
            if (Environment.GetEnvironmentVariable("BROWSER_NAME") == "Firefox")
            {
                browserOptions = new FirefoxOptions();
            }
            else if (Environment.GetEnvironmentVariable("BROWSER_NAME") == "Safari")
            {
                browserOptions = new SafariOptions();
            }
            else
            {
                browserOptions = new ChromeOptions();
            }
            browserOptions.PlatformName =
                Environment.GetEnvironmentVariable("PLATFORM_NAME") ?? "Windows 11";
            browserOptions.BrowserVersion =
                Environment.GetEnvironmentVariable("BROWSER_VERSION") ?? "latest";
            return browserOptions;
        }
    }
}
