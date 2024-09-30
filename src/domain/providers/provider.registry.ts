import { FeatureFlag } from '../entities/feature-flag.entity';

export interface CustomProvider {
    loadFeatureFlags(): Promise<FeatureFlag[]>;
}

export class ProviderRegistry {
    private providers: { [key: string]: CustomProvider } = {};

    registerProvider(name: string, provider: CustomProvider): void {
        this.providers[name] = provider;
    }

    async loadFeatureFlags(providerName: string): Promise<FeatureFlag[]> {
        const provider = this.providers[providerName];

        if (!provider) {
            throw new Error(`Provider ${providerName} is not registered.`);
        }

        return provider.loadFeatureFlags();
    }

    getAvailableProviders(): string[] {
        return Object.keys(this.providers);
    }
}