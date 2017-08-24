(function (global) {
  var Store = global.Store = function () {};

  Store.prototype.preload = function () {
    this.game.load.image('backgroundMenu', backgroundMenu); // Load image background.
  };

  Store.prototype.create = function () {
    // Add background.
    this.background = this.game.add.sprite(0, 0, 'backgroundMenu');
    this.background.name = 'backgroundMenu';

    // Add Store buttons.
    this.exitButton = this.game.add.button(this.game.world.width * 0.85, this.game.world.height * 0.03, 'exit', this.startMenu, this);
    this.scorex2Button = this.game.add.button(this.game.world.width * 0.2, this.game.world.height * 0.1, 'scorex2', this.startPaymentScorex2, this);
    this.scorex3Button = this.game.add.button(this.game.world.width * 0.55, this.game.world.height * 0.1, 'scorex3', this.startPaymentScorex3, this);
    this.scorex4Button = this.game.add.button(this.game.world.width * 0.2, this.game.world.height * 0.55, 'scorex4', this.startPaymentScorex4, this);
    this.scorex6Button = this.game.add.button(this.game.world.width * 0.55, this.game.world.height * 0.55, 'scorex6', this.startPaymentScorex6, this);
  };

  Store.prototype.startMenu = function () {
    this.game.state.start('Menu'); // Start Menu state.
  };

  Store.prototype.startPaymentScorex2 = function () {
    // alert('score x2');
    var that = this;

    // store.verbosity = store.INFO;

    // Prepare product.
    store.register({
      id:    "scorex2",
      alias: "Score x2",
      type:  store.CONSUMABLE
    });

    // Purchase product.
    store.order("scorex2");
    store.refresh();
    store.when("scorex2").approved(function (order) {
      order.finish();
      store.refresh();

      // Add extra score and begin the game.
      localStorage.scoreRate = 2;
      that.game.state.start("Store");
    });
  };

  Store.prototype.startPaymentScorex3 = function () {
    // alert('score x3');
    var that = this;

    // store.verbosity = store.INFO;

    // Prepare product.
    store.register({
      id:    "scorex3",
      alias: "Score x3",
      type:  store.CONSUMABLE
    });

    // Purchase product.
    store.order("scorex3");
    store.refresh();
    store.when("scorex3").approved(function (order) {
      order.finish();
      store.refresh();

      // Add extra score and begin the game.
      localStorage.scoreRate = 3;
      that.game.state.start("Store");
    });
  };

  Store.prototype.startPaymentScorex4 = function () {
    // alert('score x4');
    var that = this;

    // store.verbosity = store.INFO;

    // Prepare product.
    store.register({
      id:    "scorex4",
      alias: "Score x4",
      type:  store.CONSUMABLE
    });

    // Purchase product.
    store.order("scorex4");
    store.refresh();
    store.when("scorex4").approved(function (order) {
      order.finish();
      store.refresh();

      // Add extra score and begin the game.
      localStorage.scoreRate = 4;
      that.game.state.start("Store");
    });
  };

  Store.prototype.startPaymentScorex6 = function () {
    // alert('score x6');
    var that = this;

    // store.verbosity = store.INFO;

    // Prepare product.
    store.register({
      id:    "scorex6",
      alias: "Score x6",
      type:  store.CONSUMABLE
    });

    // Purchase product.
    store.order("scorex6");
    store.refresh();
    store.when("scorex6").approved(function (order) {
      order.finish();
      store.refresh();

      // Add extra score and begin the game.
      localStorage.scoreRate = 6;
      that.game.state.start("Store");
    });
  };
}(this));