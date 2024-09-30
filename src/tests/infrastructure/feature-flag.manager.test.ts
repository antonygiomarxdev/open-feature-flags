import {
  FeatureFlag,
  FeatureFlagStrategy,
} from "../../domain/entities/feature-flag.entity";
import { ProviderRegistry } from "../../domain/providers/provider.registry";
import { StrategyRegistry } from "../../domain/strategies/strategy.registry";
import { FeatureFlagManager } from "../../infrastructure/feature-flag.manager";

class MockProvider {
  async loadFeatureFlags(): Promise<FeatureFlag[]> {
    return [
      {
        name: "test-feature",
        enabled: true,
        provider: "mock",
      },
    ];
  }
}

class MockStrategy implements FeatureFlagStrategy {
  isEnabled(): boolean {
    return true;
  }
}

describe("FeatureFlagManager", () => {
  let providerRegistry: ProviderRegistry;
  let strategyRegistry: StrategyRegistry;
  let featureFlagManager: FeatureFlagManager;

  beforeEach(() => {
    providerRegistry = new ProviderRegistry();
    strategyRegistry = new StrategyRegistry();

    const mockProvider = new MockProvider();
    const mockStrategy = new MockStrategy();
    providerRegistry.registerProvider("mock", mockProvider);
    strategyRegistry.registerStrategy("mock", mockStrategy);

    featureFlagManager = new FeatureFlagManager(
      providerRegistry,
      strategyRegistry,
    );
  });

  it("should return true when the feature is enabled", async () => {
    const isEnabled = await featureFlagManager.isFeatureEnabled(
      "mock",
      "test-feature",
    );
    expect(isEnabled).toBe(true);
  });

  it("should return false when the feature flag is not found", async () => {
    const isEnabled = await featureFlagManager.isFeatureEnabled(
      "mock",
      "non-existent-feature",
    );
    expect(isEnabled).toBe(false);
  });
});
