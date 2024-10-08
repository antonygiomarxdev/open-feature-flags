import { ProviderRepository } from "../../domain/repositories/provider.repository";
import { FeatureFlag } from "../../domain/entities/feature-flag.entity";
import { Provider } from "../../domain/providers/provider.interface";

export class ProviderRepositoryImpl implements ProviderRepository {
  private providers: { [key: string]: Provider } = {};

  registerProvider(name: string, provider: Provider): void {
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
