let controller = {

  resetGame: () => {
    model = new Model();
    view.renderBoard();
  },

  clickHandler: (target) => {
    model.clickHandler(target);
  }
};