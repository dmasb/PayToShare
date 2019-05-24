export class Level {
  name: string;
  licenses: number;

  constructor() {
    this.name = 'Level';
    this.licenses = 0;
  }
}

export class PlanLevels {

  private levels: Level[] = [];
  private small: Level = {
    name: 'Small',
    licenses: 2
  };

  private medium: Level = {
    name: 'Medium',
    licenses: 4
  };

  private large: Level = {
    name: 'Large',
    licenses: 6
  };

  private xxl: Level = {
    name: 'XXL',
    licenses: 10
  };

  constructor() {
    this.levels.push(this.small);
    this.levels.push(this.medium);
    this.levels.push(this.large);
    this.levels.push(this.xxl);
  }

  getLevels(): Level[] {
    return this.levels;
  }
}
