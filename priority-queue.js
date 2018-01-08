/* 

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
pos   = [ 1, 2, 3 , 4, 5 , 6,  7  ]
*/

class PriorityQueue {

    constructor() {
        this.queue = [null];
    }

    insert(priority) {
        const data = priority;

        //add data to queue at last position
        this.queue.push(priority);

        //if queue only has one piece of data - return 
        if (this.queue.length < 3) return;

        //compare - always compare with a >> b
        let currentPosition = this.queue.length - 1;
        let parentPosition = currentPosition >> 1;
        //   console.log('current: ' + currentPosition, 'parentPos: ' + parentPosition)
        //   console.log('data: ' + this.queue[currentPosition] , 'parentVal: '+this.queue[parentPosition])

        while (this.queue[currentPosition] < this.queue[parentPosition]) {
            let pointer = this.queue[parentPosition];
            //swap values
            this.queue[parentPosition] = this.queue[currentPosition];
            this.queue[currentPosition] = pointer;

            currentPosition = parentPosition;
            parentPosition = currentPosition >> 1;
        }


        // console.log(this.queue);
    }

    remove() {

        if (this.queue.length > 1) {

            const toRemove = this.queue.slice(1, 2);
            const lastValue = this.queue.pop();

            if (this.queue.length > 1) {
                //remove last value of array


                let currentPosition = 1;
                let rightBranch = this.queue[currentPosition * 2];
                let leftBranch = this.queue[currentPosition * 2 + 1];
                //move last value to position one
                this.queue[currentPosition] = lastValue;

                while (this.queue[currentPosition] > rightBranch || this.queue[currentPosition] > leftBranch) {
                    let comparePosition = rightBranch <= leftBranch ? currentPosition * 2 : currentPosition * 2 + 1;
                    let pointer = this.queue[comparePosition];

                    //switch value with the smallest of the right or left
                    this.queue[comparePosition] = this.queue[currentPosition];
                    this.queue[currentPosition] = pointer;

                    //set new compare positions
                    currentPosition = comparePosition;

                    //if no value in branch, set it to compare priority so while statement will exit. if values equal - no execute
                    rightBranch = currentPosition * 2 < this.queue.length ? this.queue[currentPosition * 2] : this.queue[currentPosition];
                    leftBranch = currentPosition * 2 + 1 < this.queue.length ? this.queue[currentPosition * 2 + 1] : this.queue[currentPosition];

                    // console.log(this.queue);
                }
            }

            return toRemove;
        }
    }
    peek() {
        if (this.queue.length > 1) {
            return this.queue.slice(1, 1);
        }
    }

    print() {
        console.log(this.queue);
    }
}

const priorityQueue = new PriorityQueue();

priorityQueue.insert(5); // [5]
priorityQueue.insert(1); // [1,5]
priorityQueue.insert(10); // [1,5,10]
priorityQueue.insert(4); // [1,4,10,5]
priorityQueue.insert(11); // [1,4,10,11]
priorityQueue.insert(9); // [1,4,9,5,11,10]

priorityQueue.print(); // [1,4,9,5,11,10]

priorityQueue.remove(); //1
priorityQueue.print(); // [4,5,9,10,11]

priorityQueue.remove(); //4
priorityQueue.print(); // [5,10,9,11]

priorityQueue.remove(); //5
priorityQueue.print(); // [9,10,11]

priorityQueue.insert(9); // [9,9,11,10]
priorityQueue.insert(11); // [9,9,11,10,11]
priorityQueue.insert(10); // [9,9,10,10,11,11]
priorityQueue.insert(12); // [9,9,10,10,11,11,12]


priorityQueue.print(); // [9,9,10,10,11,11,12]

priorityQueue.remove(); // [9]
priorityQueue.print(); // [9,10,10,12,11,11]

priorityQueue.remove(); // [9]
priorityQueue.print(); // [10,11,10,12,11]

priorityQueue.remove(); // [10]
priorityQueue.print(); // [10,11,12,11]

priorityQueue.remove(); // [10]
priorityQueue.print(); // [11,12,11]

priorityQueue.remove(); // [11]
priorityQueue.print(); // [11,12]

priorityQueue.remove(); // [11]
priorityQueue.print(); // [12]

priorityQueue.remove(); // [12]
priorityQueue.print(); // [null]

priorityQueue.remove(); // undefined
priorityQueue.print(); // [null]
