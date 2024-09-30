import {Strategy} from "../../../lib/src/domain/feature-flag.entity";

export class StrategyRegistry {
    private strategies: { [key: string]: new (...args: any[]) => Strategy } = {};

    registerStrategy(name: string, strategy: new (...args: any[]) => Strategy): void {
        this.strategies[name] = strategy;
    }

    getStrategy(name: string, ...args: unknown[]): Strategy {
        const StrategyClass = this.strategies[name];
        if (!StrategyClass) {
            throw new Error(`Strategy ${name} is not registered.`);
        }
        return new StrategyClass(...args);
    }
}