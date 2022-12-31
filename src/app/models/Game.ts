import { Attribute } from "./Attribute";

export class Game {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public genres: Attribute[],
    public tags: Attribute[]
  ){}
}