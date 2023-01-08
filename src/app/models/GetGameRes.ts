import { Attribute } from "./Attribute";

export class GetGameRes {
  constructor(
    public games: Attribute[],
    public count: number
  ){}
}