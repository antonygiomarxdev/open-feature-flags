import { FeatureFlag } from "../entities/feature-flag.entity";
import { Provider } from "../providers/provider.interface";

export interface ProviderRepository {
  loadFeatureFlags(providerName: string): Promise<FeatureFlag[]>;
  registerProvider(name: string, provider: Provider): void;
  getAvailableProviders(): string[];
}
