///<reference path="BattleFrontierMilestone.ts"/>
///<reference path="BattleFrontierMilestoneItem.ts"/>

class BattleFrontierMilestones {

    public static milestoneRewards = [];

    public static addMilestone(milestone: BattleFrontierMilestone) {
        this.milestoneRewards.push(milestone);
        // Sort the milestones by lowest to highest stage incase they are added out of order
        this.milestoneRewards.sort((a, b) => a.stage - b.stage);
    }

    public static nextMileStone() {
        // Get the next possible reward
        return this.milestoneRewards.find(r => r.stage > App.game.statistics.battleFrontierHighestStageCompleted());
    }


    public static nextMileStoneStage(): number {
        // Return the stage number the next reward is unlocked at
        const reward = this.nextMileStone();
        if (reward) {
            return reward.stage;
        } else {
            return Infinity;
        }
    }

    public static nextMileStoneRewardDescription(): string {
        // Return the description of the next reward
        const reward = this.nextMileStone();
        if (reward) {
            return reward.description;
        } else {
            return 'Nothing';
        }
    }

    public static nextMileStoneRewardName(): string {
        // Return the description of the next reward
        const reward = this.nextMileStone();
        if (reward) {
            return reward.itemName;
        } else {
            return 'Nothing';
        }
    }

    public static gainReward(defeatedStage: number): void {
        const reward = this.nextMileStone();
        if (reward && reward.stage == defeatedStage) {
            Notifier.notify({ title: '[Battle Frontier]', message: `You've successfully defeated stage ${defeatedStage} and earned:<br/><code>${reward.description}</code>!`, type: GameConstants.NotificationOption.warning, timeout: 1e4 });
            reward.gain();
        }
    }
}

BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(5, 'Pokeball', 5));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestone(7, 'Flying Pikachu', () => {
    App.game.party.gainPokemonById(-1);
}));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(10, 'Pokeball', 50));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(20, 'Greatball', 50));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(30, 'Ultraball', 50));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(50, 'Ultraball', 100));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(100, 'Ultraball', 200));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(150, 'Ultraball', 400));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(200, 'Ultraball', 800));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(350, 'Ultraball', 1600));
BattleFrontierMilestones.addMilestone(new BattleFrontierMilestoneItem(400, 'Ultraball', 3200));