using System.Threading.Tasks;
using NUnit.Framework;
using SauceLabs.Visual;

namespace SauceLabs.Visual.Example;

[SetUpFixture]
public class SetupFixture
{
    [OneTimeTearDown]
    public async Task RunAfterAnyTests()
    {
        await VisualClient.Finish();
    }
}