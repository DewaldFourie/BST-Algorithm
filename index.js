import Tree from "./tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);


tree.printTree();
tree.insert(45);
tree.printTree();
tree.delete(67);
tree.printTree();
