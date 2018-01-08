class Queue {

    constructor() {
        this.queue = [];
    }

    size () {
        return this.queue.length;
    }

    enqueue(data) {
        this.queue.push(data);
    }

    dequeue() {
        return this.queue.shift();
    }
    
    peek() {
        return this.queue[0];
    }

    print() {
        console.log(this.queue);
    }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.print(); // => [ 1, 2, 3 ]
console.log('size is 3:', queue.size()); // => 3
console.log('peek is 1:', queue.peek()); // => 1
console.log('dequeue is 1:', queue.dequeue()); // => 1
queue.print(); // => [ 2, 3 ]
console.log('dequeue is 2:', queue.dequeue()); // => 2
console.log('size is 1:', queue.size()); // => 1
console.log('peek is 3:', queue.peek()); // => 3
console.log('dequeue is 3:', queue.dequeue()); // => 3
queue.print(); // => '[]'
console.log('dequeue is undefined:', queue.dequeue()); // => undefined