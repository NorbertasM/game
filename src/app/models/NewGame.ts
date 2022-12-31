
export class NewGame {
  constructor(
    public name: string,
    public image: string,
    public genreIds: number[],
    public tagIds: number[]
  ){}
}