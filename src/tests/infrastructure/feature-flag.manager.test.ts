import { FeatureFlagStrategy } from "../../domain/strategies/feature-flag.strategy";
import { FeatureFlag } from "../../domain/entities/feature-flag.entity";
import { StrategyRegistry } from "../../../dist/src";
import { FeatureFlagManagerService } from "../../application/services/feature-flag-manager.service";
import { Provider } from "../../domain/providers/provider.interface";
import { ProviderRepository } from "../../domain/repositories/provider.repository";
import { ProviderRepositoryImpl } from "../../infrastructure/persistence/provider.repository-impl";

class MockProvider implements Provider {
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
  let providerRegistry: ProviderRepository;
  let strategyRegistry: StrategyRegistry;
  let featureFlagManager: FeatureFlagManagerService;

  beforeEach(() => {
    providerRegistry = new ProviderRepositoryImpl();
    strategyRegistry = new StrategyRegistry();

    const mockProvider = new MockProvider();
    const mockStrategy = new MockStrategy();
    providerRegistry.registerProvider("mock", mockProvider);
    strategyRegistry.registerStrategy("mock", mockStrategy);

    featureFlagManager = new FeatureFlagManagerService(
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
