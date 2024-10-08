import { FeatureFlag } from "../../../domain/entities/feature-flag.entity";
import { Provider } from "../../../domain/providers/provider.interface";
import { ProviderRepositoryImpl } from "../../../infrastructure/persistence/provider.repository-impl";

class MockProvider implements Provider {
  async loadFeatureFlags(): Promise<FeatureFlag[]> {
    return [
      {
        name: "test-feature",
        enabled: true,
        provider: "default",
      },
    ];
  }
}

describe("ProviderRegistry", () => {
  it("should register and load a provider", async () => {
    const providerRegistry = new ProviderRepositoryImpl();
    const mockProvider = new MockProvider();
    providerRegistry.registerProvider("mock", mockProvider);

    const flags = await providerRegistry.loadFeatureFlags("mock");
    expect(flags).toHaveLength(1);
    expect(flags[0].name).toBe("test-feature");
    expect(flags[0].enabled).toBe(true);
  });

  it("should throw an error if provider is not registered", async () => {
    const providerRegistry = new ProviderRepositoryImpl();
    await expect(
      providerRegistry.loadFeatureFlags("non-existent"),
    ).rejects.toThrow("Provider non-existent is not registered.");
  });
});
