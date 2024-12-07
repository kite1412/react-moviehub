import Collection from "./Collection";

export default class Reviews extends Collection {
  constructor(array, setArray) {
    super(array, setArray);
  }

  editContent(review, newContent) {
    const map = this.list.map(e =>
      review.id === e.id ? { ...e, content: newContent, updated_on: new Date() } : e
    );
    this.setList(map);
  }
}