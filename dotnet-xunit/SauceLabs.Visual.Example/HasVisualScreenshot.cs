using System.Threading.Tasks;
using SauceLabs.Visual;
using Xunit;

namespace SauceLabs.Visual.Example;

public class HasVisualScreenshot : IAsyncLifetime
{
    public Task InitializeAsync()
    {
        return Task.CompletedTask;
    }

    public async Task DisposeAsync()
    {
        await VisualClient.Finish();
    }
}

[CollectionDefinition("HasVisualScreenshot")]
public class HasVisualScreenshotCollection : ICollectionFixture<HasVisualScreenshot>
{
}
