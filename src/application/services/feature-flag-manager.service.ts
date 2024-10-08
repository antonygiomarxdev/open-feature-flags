import { ProviderRepository } from "../../domain/repositories/provider.repository";
import { StrategyRepository } from "../../domain/repositories/strategy.repository";
import { FeatureFlag } from "../../domain/entities/feature-flag.entity";

export class FeatureFlagManagerService {
  constructor(
    private providerRepository: ProviderRepository,
    private strategyRepository: StrategyRepository,
  ) {}

  async loadFeatureFlags(providerName: string): Promise<FeatureFlag[]> {
    const flags = await this.providerRepository.loadFeatureFlags(providerName);
    return flags.map((flag) => ({
      ...flag,
      strategy: this.strategyRepository.getStrategy(flag.provider),
    }));
  }

  async isFeatureEnabled(
    providerName: string,
    featureName: string,
    context?: unknown,
    strategyParams?: unknown[],
  ): Promise<boolean> {
    const flags = await this.loadFeatureFlags(providerName);
    const featureFlag = flags.find((flag) => flag.name === featureName);

    if (!featureFlag) return false;
    const strategy = this.strategyRepository.getStrategy(featureFlag.provider);
    return strategy.isEnabled(context, strategyParams);
  }
}
