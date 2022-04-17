const board = artifacts.require("board");

module.exports = function (deployer) {
  deployer.deploy(board,'metaboard','MB');
};
