class Queue {

    constructor() {
        this._oldestIndex = 1;
        this._newestIndex = 1;
        this._storage = {};
    }

    size() {
        return this._newestIndex - this._oldestIndex;
    }

    enqueue(data) {
        this._storage[this._newestIndex] = data;
        this._newestIndex++;
    }

    dequeue() {
        if (this._oldestIndex !== this._newestIndex) {
            let deletedData = this._storage[this._oldestIndex];
            delete this._storage[this._oldestIndex];
            this._oldestIndex++;

            return deletedData;
        }
    }
    
    peek() {
        return this._storage[this._oldestIndex];
    }

    print() {
        console.log(this._storage);
    }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.print(); // => { '1': 1, '2': 2, '3': 3 }
console.log('size is 3:', queue.size()); // => 3
console.log('peek is 1:', queue.peek()); // => 1
console.log('dequeue is 1:', queue.dequeue()); // => 1
queue.print(); // => { '2': 2, '3': 3 }
console.log('dequeue is 2:', queue.dequeue()); // => 2
console.log('size is 1:', queue.size()); // => 1
console.log('peek is 3:', queue.peek()); // => 3
console.log('dequeue is 3:', queue.dequeue()); // => 3
queue.print(); // => '{}'
console.log('dequeue is undefined:', queue.dequeue()); // => undefined