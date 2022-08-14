import { foodAdj } from './food-assets/adjectives';
import { foodNouns } from './food-assets/nouns';

class Food {
  private adjectives: string[] = [];
  private nouns: string[] = [];

  constructor() {
    this.adjectives = foodAdj;
    this.nouns = foodNouns;
  }

  getFood() {
    const adjIndex = Math.floor(Math.random() * this.adjectives.length);
    const nounIndex = Math.floor(Math.random() * this.nouns.length);

    return `${this.adjectives[adjIndex]} ${this.nouns[nounIndex]}`;
  }
}

export const foodService = new Food();
console.debug('[init] foodService initialised');
