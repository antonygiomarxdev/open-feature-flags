import { ProviderRegistry } from '../domain/providers/provider.registry';
import { StrategyRegistry } from '../domain/strategies/strategy.registry';
import { FeatureFlag } from '../domain/entities/feature-flag.entity';

export class FeatureFlagManager {
    private providerRegistry: ProviderRegistry;
    private strategyRegistry: StrategyRegistry;

    constructor(providerRegistry: ProviderRegistry, strategyRegistry: StrategyRegistry) {
        this.providerRegistry = providerRegistry;
        this.strategyRegistry = strategyRegistry;
    }

    async loadFeatureFlags(providerName: string): Promise<FeatureFlag[]> {
        const flags = await this.providerRegistry.loadFeatureFlags(providerName);

        return flags.map(flag => ({
            ...flag,
            strategy: this.strategyRegistry.getStrategy(flag.strategyType, ...flag.strategyParams)
        }));
    }

    async isFeatureEnabled<T>(providerName: string, featureName: string, userContext?: T): Promise<boolean> {
        const flags = await this.loadFeatureFlags(providerName);
        const featureFlag = flags.find(flag => flag.name === featureName);
        return !!featureFlag;
    }
}