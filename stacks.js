class Stack {

	constructor() {
		this._storage = {};
		this._size = 0;
	}

	push(data) {
		this._size++;
		this._storage[this._size] = data;
	}

	pop() {
		if (this._size) {
			let deletedData = this._storage[this._size];

			delete this._storage[this._size];
			this._size--;

			return deletedData;
		}
	}
	
	length() {
		return this._size;
	}

	print() {
		console.log(this._storage);
	}
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);
stack.print(); // => 1 2 3
console.log('length is 3:', stack.length()); // => 3
console.log('pop is 3:', stack.pop()); // => 3
stack.print(); // => 1 2
console.log('pop is 2:', stack.pop()); // => 2
console.log('length is 1:', stack.length()); // => 1
console.log('pop is 1:', stack.pop()); // => 1
stack.print(); // => ''
console.log('pop is undefined:', stack.pop()); // => undefined
