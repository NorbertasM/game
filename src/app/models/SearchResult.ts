import { Attribute } from "./Attribute"
import { Tag } from "./Tag";

export class SearchResult {
  constructor(
    public games: Attribute,
    public tags:  Tag,
    public genre: Attribute
  ){}
}
