import { FeatureFlag } from "../entities/feature-flag.entity";

export interface Provider {
  loadFeatureFlags(): Promise<FeatureFlag[]>;
}
