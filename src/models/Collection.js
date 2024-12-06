export default class Collection {
  constructor(array, setArray) {
    this.list = array;
    this.setList = setArray;
  }

  add(item) {
    this.setList([...this.list, item]);
  }

  remove(item) {
    const newList = this.list.filter(e => e.id !== item.id);
    this.setList(newList);
  }

  contains(item) {
    for (let i = 0; i < this.list.length; i++) {
      if (item.id === this.list[i].id) return true; 
    }
    return false;
  }
}