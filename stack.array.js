class Stack {

	constructor() {
		this.stack = [];
	}

	push(data) {
		this.stack.push(data);
	}

	pop() {
		return this.stack.pop();
	}
	
	size() {
		return this.stack.length;
	}
	
	peek() {
		return this.stack[this.stack.length - 1];
	}
	
	print() {
		console.log(this.stack);
	}
}

module.exports.Stack = Stack;

// const stack = new Stack();

// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.print(); // => [ 1, 2, 3 ]
// console.log('size is 3:', stack.size()); // => 3
// console.log('peek is 3:', stack.peek()); // => 3
// console.log('pop is 3:', stack.pop()); // => 3
// stack.print(); // => [ 1, 2 ]
// console.log('peek is 2:', stack.peek()); // => 2
// console.log('pop is 2:', stack.pop()); // => 2
// console.log('size is 1:', stack.size()); // => 1
// console.log('pop is 1:', stack.pop()); // => 1
// stack.print(); // => '[]'
// console.log('pop is undefined:', stack.pop()); // => undefined