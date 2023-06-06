import Tree from "./tree.js";
// -----------------------------------------------------------------------------
// const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// tree.printTree();
// tree.insert(45);
// tree.printTree();
// tree.delete(67);
// tree.printTree();
// tree.find(324);
// console.log("Level Order: " + tree.levelOrder());
// console.log("In Order: " + tree.inOrder());
// console.log("Pre-Order: " + tree.preOrder());
// console.log("Post-Order: " + tree.postOrder());
// console.log("Height: " + tree.height())
// console.log("Depth: " + tree.depth(7));
// console.log("Balanced: " + tree.isBalanced());
// -----------------------------------------------------------------------------

function randomArray(size){
    return Array.from({ length: size}, () => Math.floor(Math.random() * 100))
}

const myArray = randomArray(30);
const tree = new Tree(myArray);

console.log(myArray);
tree.printTree();