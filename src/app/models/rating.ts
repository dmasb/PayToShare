export class Rating {
  id?: string;
  objectID: string;
  userID: string;
  value: number;

  constructor(userID: string, objectID: string, value: number) {
    this.userID = userID;
    this.objectID = objectID;
    this.value = value;
  }

}
