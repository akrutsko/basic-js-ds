const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addLeaf(this.tree, data);

    function addLeaf(leaf, data) {
      if (!leaf) {
        return new Node(data);
      }

      if (leaf.data === data) {
        return leaf;
      }

      if (leaf.data > data) {
        leaf.left = addLeaf(leaf.left, data)
      } else {
        leaf.right = addLeaf(leaf.right, data)
      }

      return leaf;
    }
  }

  has(data) {
    return hasLeaf(this.tree, data);

    function hasLeaf(leaf, data) {
      if (!leaf) {
        return false;
      }

      if (leaf.data === data) {
        return true;
      }

      if (leaf.data > data) {
        return hasLeaf(leaf.left, data)
      } else {
        return hasLeaf(leaf.right, data)
      }
    }
  }

  find(data) {
    return findLeaf(this.tree, data);

    function findLeaf(leaf, data) {
      if (!leaf) {
        return null;
      }

      if (leaf.data === data) {
        return leaf;
      }

      if (leaf.data > data) {
        leaf = findLeaf(leaf.left, data)
      } else {
        leaf = findLeaf(leaf.right, data)
      }

      return leaf;
    }
  }

  remove(data) {
    this.tree = removeLeaf(this.tree, data);

    function removeLeaf(leaf, data) {
      if (!leaf) {
        return null;
      }

      if (leaf.data > data) {
        leaf.left = removeLeaf(leaf.left, data);
        return leaf;
      } else if (leaf.data < data) {
        leaf.right = removeLeaf(leaf.right, data);
        return leaf;
      } else {
        if (!leaf.left && !leaf.right) {
          return null;
        }

        if (!leaf.left) {
          leaf = leaf.right;
          return leaf;
        }

        if (!leaf.right) {
          leaf = leaf.left;
          return leaf;
        }

        let maxFromLeft = leaf.left;
        while (maxFromLeft.right) {
          maxFromLeft = maxFromLeft.right;
        }
        leaf.data = maxFromLeft.data;
        leaf.left = removeLeaf(leaf.left, maxFromLeft.data);

        return leaf;
      }
    }
  }

  min() {
    if (!this.tree) {
      return null;
    }

    let leaf = this.tree;
    while (leaf.left) {
      leaf = leaf.left;
    }

    return leaf.data;
  }

  max() {
    if (!this.tree) {
      return null;
    }

    let leaf = this.tree;
    while (leaf.right) {
      leaf = leaf.right;
    }

    return leaf.data;
  }
}

module.exports = {
  BinarySearchTree
};