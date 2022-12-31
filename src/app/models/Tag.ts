export class Tag {
  constructor(
    public id: number,
    public name: string,
    public image: string,
    public forChannel: boolean,
    public forGame: boolean
  ){}
}