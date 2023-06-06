import Node from "./node.js";

export default class Tree{
    constructor(array){
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);     //Sorts the array and removes any duplicates
        this.root = this.buildTree(sortedArray);
    }

    // Algorithm to build the binary search tree from an array
    buildTree(sortedArray) {
        if (sortedArray.length === 0){
            return null;
        }
        let midpoint = Math.floor(sortedArray.length / 2);
        let newNode = new Node(sortedArray[midpoint]);
        newNode.leftNode = this.buildTree(sortedArray.slice(0, midpoint));
        newNode.rightNode = this.buildTree(sortedArray.slice(midpoint + 1));
        return newNode;
    }

    // Method visualizes the tree in the console for practicality
    printTree(){
        prettyPrint(this.root);
        console.log("------------------------------------------------------------------------");
    }

    // Methods to check if the tree is balanced
    isBalanced(){
        return this.checkBalanced(this.root)
    }

    checkBalanced(node){
        if (node === null){
            return true;
        }
        const leftHeight = this.height(node.leftNode);
        const rightHeight = this.height(node.leftNode);
        
        const heightDiff = Math.abs(leftHeight - rightHeight);
        if (heightDiff > 1){
            return false
        } 
        return this.checkBalanced(node.leftNode) && this.checkBalanced(node.rightNode);
    }

    // Methods to balance an unbalanced tree
     reBalance(){
        const sortedArray = this.inOrder();
        this.root = this.buildTree(sortedArray);
     }

    // Method to search for a value in the tree, returns the node where it is
    find(value){
        this.root = this.findValue(this.root, value);
        if (this.root == null){
            console.log(`Value: ${value} not in tree`);
        }
        else{
            console.log(this.root);
        }
    }

    findValue(root, value){
        if (root == null || root.value == value){
            return root;
        }
        if (root.value < value){
            return this.findValue(root.rightNode, value);
        }
        else{
            return this.findValue(root.leftNode, value);
        }
    }

    // Methods to insert a new value in the tree
    insert(value){
        this.root = this.insertNode(this.root, value)
    }

    insertNode(root, value) {
        if (root == null){
            root = new Node(value);
        }
        if (value < root.value){
            root.leftNode = this.insertNode(root.leftNode, value);
        }
        else if (value > root.value){
            root.rightNode = this.insertNode(root.rightNode, value);
        }
        return root;
    }

    // Methods to delete an existing value in the tree 
    delete(value){
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root, value) {
        if (root == null){
            return root;
        }
        if (value < root.value){
            root.leftNode = this.deleteNode(root.leftNode, value);
        }
        else if (value > root.value){
            root.rightNode = this.deleteNode(root.rightNode, value);
        }
        else {
            if (root.leftNode == null){
                return root.rightNode;
            }
            else if (root.rightNode == null){
                return root.leftNode;
            }

            root.value = this.minValue(root.rightNode);
            root.rightNode = this.deleteNode(root.rightNode, root.value);
        }

        return root;
    }

    minValue(root){
        let minV = root.value;
        while (root.leftNode != null){
            minV = root.leftNode.value;
            root = root.leftNode;
        }
        return minV;
    }

    // Level Order method to traverse the tree in a breadth-first manner
    levelOrder(cbFunction){
        const queue = [this.root];
        const levelOrderList = [];
        while (queue.length > 0){
            const currentNode = queue.shift();
            if (cbFunction){
                cbFunction(currentNode);
            }
            else {
                levelOrderList.push(currentNode.value);
            }
            if (currentNode.leftNode){
                queue.push(currentNode.leftNode);
            }
            if (currentNode.rightNode){
                queue.push(currentNode.rightNode);
            }
        }
        return levelOrderList;
    }

    // Method to perform an in-order traversal of the tree
    inOrder(cbFunction){
        const result = [];
        this.inOrderTraversal(this.root, cbFunction, result);
        return result;
    }

    inOrderTraversal(node, cbFunction, result){
        if (node === null){
            return;
        }
        this.inOrderTraversal(node.leftNode, cbFunction, result);
        if (cbFunction){
            cbFunction(node);
        } 
        else {
            result.push(node.value);
        }
        this.inOrderTraversal(node.rightNode, cbFunction, result);
    }

    // Method to perform a pre-order traversal of the tree
    preOrder(cbFunction){
        const result = [];
        this.preOrderTraversal(this.root, cbFunction, result);
        return result;
    }

    preOrderTraversal(node, cbFunction, result){
        if (node === null){
            return;
        }
        if (cbFunction){
            cbFunction(node);
        }
        else {
            result.push(node.value);
        }
        this.preOrderTraversal(node.leftNode, cbFunction, result);
        this.preOrderTraversal(node.rightNode, cbFunction, result);
    }

    // Method to perform a post-order traversal of the tree
    postOrder(cbFunction){
        const result = [];
        this.postOrderTraversal(this.root, cbFunction, result);
        return result;
    }

    postOrderTraversal(node, cbFunction, result){
        if (node === null){
            return
        }
        this.postOrderTraversal(node.leftNode, cbFunction, result);
        this.postOrderTraversal(node.rightNode, cbFunction, result);
        if (cbFunction){
            cbFunction(node);
        }
        else {
            result.push(node.value);
        }
    }

    // Method to get the height of the tree, (defined as the number of edges in longest path from a given node to a leaf node.)
    height(node = this.root){
        if (node === null){
            return -1;
        }
        const leftHeight = this.height(node.leftNode);
        const rightHeight = this.height(node.rightNode);
        return Math.max(leftHeight, rightHeight) + 1
    }

    // Method to get the depth of the tree, (defined as the number of edges in path from a given node to the tree’s root node)
    depth(nodeVal, node = this.root, edgeCount = 0){
        if (node === null){
            return;
        }
        if (node.value === nodeVal){
            return edgeCount;
        }
        if (node.value < nodeVal){
            return this.depth(nodeVal, node.rightNode, edgeCount + 1);
        }
        else {
            return this.depth(nodeVal, node.leftNode, edgeCount + 1);
        }
    }

}

// function describes the logic for the visualization of the tree in the console
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.rightNode !== null) {
        prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.leftNode !== null) {
        prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};