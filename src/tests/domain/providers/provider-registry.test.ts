import {
  CustomProvider,
  ProviderRegistry,
} from "../../../domain/providers/provider.registry";
import { FeatureFlag } from "../../../domain/entities/feature-flag.entity";

class MockProvider implements CustomProvider {
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
    const providerRegistry = new ProviderRegistry();
    const mockProvider = new MockProvider();
    providerRegistry.registerProvider("mock", mockProvider);

    const flags = await providerRegistry.loadFeatureFlags("mock");
    expect(flags).toHaveLength(1);
    expect(flags[0].name).toBe("test-feature");
    expect(flags[0].enabled).toBe(true);
  });

  it("should throw an error if provider is not registered", async () => {
    const providerRegistry = new ProviderRegistry();
    await expect(
      providerRegistry.loadFeatureFlags("non-existent"),
    ).rejects.toThrow("Provider non-existent is not registered.");
  });
});
