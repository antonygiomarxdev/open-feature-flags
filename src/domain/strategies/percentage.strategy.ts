import {Strategy} from "../../../lib/src/domain/feature-flag.entity";

export class PercentageStrategy implements Strategy {
    private readonly percentage: number;

    constructor(percentage: number) {
        this.percentage = percentage;
    }

    isEnabled(userContext: any): boolean {
        const hash = this.getHash(userContext.userId);
        return hash < this.percentage;
    }

    private getHash(userId: number): number {
        return userId % 100;
    }
}