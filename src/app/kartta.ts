export class Kartta {
  // konstruktorimetodi joka rakentaa student-olion
  constructor(
    public _id: string, // mongon lisäämä _id
    public coordinate: string,
    public name: string,
    public info: string
  ) {}
}
