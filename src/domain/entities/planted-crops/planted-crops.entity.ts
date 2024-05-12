export class PlantedCrop {
  readonly id: number;
  user_id: number;
  name: string;

  constructor(user_id: number, name: string) {
    this.user_id = user_id;
    this.name = name;
  }
}
