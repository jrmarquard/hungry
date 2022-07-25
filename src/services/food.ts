import * as fs from 'fs';
import path from 'path';

class Food {
  private adjectives: string[] = [];
  private nouns: string[] = [];

  private adjFile = '../../assets/dictionary.food.adjectives.txt';
  private nounFile = '../../assets/dictionary.food.nouns.txt';

  constructor() {
    this.adjectives = this.fileToArray(this.adjFile);
    this.nouns = this.fileToArray(this.nounFile);
  }

  private fileToArray(filePath: string) {
    const relPath = path.resolve(__dirname, filePath);
    const lines = fs
      .readFileSync(relPath)
      .toString('utf-8')
      .split('\n')
      .map((l) => l.replace(/(\r\n|\n|\r)/gm, ''));
    console.debug(`[init] loading ${lines.length} lines from ${filePath}`);
    return lines;
  }

  getFood() {
    const adjIndex = Math.floor(Math.random() * this.adjectives.length);
    const nounIndex = Math.floor(Math.random() * this.nouns.length);

    return `${this.adjectives[adjIndex]} ${this.nouns[nounIndex]}`;
  }
}

export const foodService = new Food();
console.debug('[init] foodService initialised');
