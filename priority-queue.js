/* 
This implmentation uses bitwise operators
if you are not familiar with bitwise operators
refer to: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Right_shift

assumptions:
smaller number = highest priority

enhacements: 
-seperate variables for data and priority
-validate priority is a number upon insertion

steps: 
1. create queue
2. create node from data 
3. insert data at last position 
4. compare using half position logic
5. remove data at first position
6. move last piece to first position
7. compare and bring the data down

data 
            1
    5           10
6       11  20      ___            
array = [ 1, 5, 10, 6, 11, 20, __ ]
pos   = [ 0, 1, 2 , 3, 4 , 5,  6  ]
*/

class Element {
    constructor(priority, value) {
        this.value = value;
        this.priority = priority;
    }
}


class PriorityQueue {

    constructor() {
        this.queue = [];
    }

    enqueue(element) {
        // const newElement = new Element(priority, value);
        this.queue.push(element);
        this._bubbleUp(this.queue.length - 1);
    }

    dequeue() {
        const result = this.queue[0];
        const lastValue = this.queue.pop();

        if (this.queue.length > 0) {
            this.queue[0] = lastValue;

            this._bubbleDown(0);
        }

        return result;
    }
    reprioritizeElement(element){
        let n = this.queue.indexOf(element);
        console.log(n,element)
        console.log(this.queue)
        if (n > -1) {
            let el = this.queue.splice(n, 1);
            this._bubbleUp(n);
            console.log('e', el)
            return el;
        }
    }
    
    size() {
        return this.queue.length;
    }

    _bubbleUp(position) {

        let element = this.queue[position];

        // when at 0, an element is already at first position in array
        while (position > 0) {

            let parentPosition = position >> 1;
            let parent = this.queue[parentPosition];

            //if parent element has a higher priority (lower value) then break
            if (element.priority >= parent.priority) {
                break;
            }

            //else swpap the current element with the parent
            this.queue[parentPosition] = element;
            this.queue[position] = parent;

            //update the position of the element that is being sorted
            position = parentPosition;

        }
    }

    _bubbleDown(position) {

        while (true) {

            let leftChildPos = (position * 2) + 1;
            let leftChild = this.queue[leftChildPos];

            let rightChildPos = leftChildPos + 1;
            let rightChild = this.queue[rightChildPos];

            let minIndex = position;

            //if child 1 (left child) exists && has a higher priorty than min element 
            if (leftChild && (leftChild.priority - this.queue[minIndex].priority < 0)) {
                //store this position as having a higher priority
                minIndex = leftChildPos;
            }

            //if child 2 (right child) exists && has a higher priorty than min element 
            if (rightChild && (rightChild.priority - this.queue[minIndex].priority < 0)) {
                minIndex = rightChildPos;
            }

            //if a higher prioriry element was found
            if (minIndex !== position) {
                let pointer = this.queue[minIndex];

                //swap values 
                this.queue[minIndex] = this.queue[position];
                this.queue[position] = pointer;

                //update position value 
                position = minIndex;
            }
            else {
                break;
            }
        }
    }
    
    data() {
        return this.queue;
    }
    
    peek() {
        return this.queue[0];
    }

    print() {
        console.log(this.queue);
        console.log(this.queue.map(function(val) { return val.priority }));
    }
}

module.exports.PriorityQueue = PriorityQueue;

/* TESTS
const priorityQueue = new PriorityQueue();

priorityQueue.enqueue(5); // [5]
priorityQueue.enqueue(1); // [1,5]
priorityQueue.enqueue(10); // [1,5,10]
priorityQueue.enqueue(4); // [1,4,10,5]
priorityQueue.enqueue(11); // [1,4,10,11]
priorityQueue.enqueue(9); // [1,4,9,5,11,10]

priorityQueue.print(); // [1,4,9,5,11,10]

priorityQueue.dequeue(); //1
priorityQueue.print(); // [4,5,9,10,11]

priorityQueue.dequeue(); //4
priorityQueue.print(); // [5,10,9,11]

priorityQueue.dequeue(); //5
priorityQueue.print(); // [9,10,11]

priorityQueue.enqueue(9); // [9,9,11,10]
priorityQueue.enqueue(11); // [9,9,11,10,11]
priorityQueue.enqueue(10); // [9,9,10,10,11,11]
priorityQueue.enqueue(12); // [9,9,10,10,11,11,12]


priorityQueue.print(); // [9,9,10,10,11,11,12]

priorityQueue.dequeue(); // [9]
priorityQueue.print(); // [9,10,10,12,11,11]

priorityQueue.dequeue(); // [9]
priorityQueue.print(); // [10,11,10,12,11]

priorityQueue.dequeue(); // [10]
priorityQueue.print(); // [10,11,12,11]

priorityQueue.dequeue(); // [10]
priorityQueue.print(); // [11,12,11]

priorityQueue.dequeue(); // [11]
priorityQueue.print(); // [11,12]

priorityQueue.dequeue(); // [11]
priorityQueue.print(); // [12]

priorityQueue.dequeue(); // [12]
priorityQueue.print(); // [null]

priorityQueue.dequeue(); // undefined
priorityQueue.print(); // [null]
*/