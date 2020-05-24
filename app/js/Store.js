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
    this.scorex2Button = this.game.add.button(this.game.world.width * 0.2, this.game.world.height * 0.2, 'scorex2', this.startPaymentScorex2, this);
    this.scorex3Button = this.game.add.button(this.game.world.width * 0.55, this.game.world.height * 0.2, 'scorex3', this.startPaymentScorex3, this);
    this.scorex4Button = this.game.add.button(this.game.world.width * 0.2, this.game.world.height * 0.6, 'scorex4', this.startPaymentScorex4, this);
    this.scorex6Button = this.game.add.button(this.game.world.width * 0.55, this.game.world.height * 0.6, 'scorex6', this.startPaymentScorex6, this);
  };

  Store.prototype.startMenu = function () {
    this.game.state.start('Menu'); // Start Menu state.
  };

  Store.prototype.startPaymentScorex2 = function () {
    FBInstant.payments.purchaseAsync({
      productID: 'scorex2'
    }).then(function (purchase) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex2 ran successfully. Purchase details: ', purchase); // Log "purchaseAsync" of "startPaymentScorex2" information to Facebook Analytics.
      FBInstant.payments.consumePurchaseAsync(purchase.purchaseToken).then(function () {
        localStorage.scoreRate = 2; // Set appropriate quantity of extra score rate.
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex2 ran successfully.'); // Log "consumePurchaseAsync" of "startPaymentScorex2" information to Facebook Analytics.
      }).catch(function (error) {
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex2 error: ', error); // Log "consumePurchaseAsync" of "startPaymentScorex2" error to Facebook Analytics.
      });
    }).catch(function (error) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex2 error: ', error); // Log "purchaseAsync" of "startPaymentScorex2" error to Facebook Analytics.
    });
  };

  Store.prototype.startPaymentScorex3 = function () {
    FBInstant.payments.purchaseAsync({
      productID: 'scorex3'
    }).then(function (purchase) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex3 ran successfully. Purchase details: ', purchase); // Log "purchaseAsync" of "startPaymentScorex3" information to Facebook Analytics.
      FBInstant.payments.consumePurchaseAsync(purchase.purchaseToken).then(function () {
        localStorage.scoreRate = 3; // Set appropriate quantity of extra score rate.
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex3 ran successfully.'); // Log "consumePurchaseAsync" of "startPaymentScorex3" information to Facebook Analytics.
      }).catch(function (error) {
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex3 error: ', error); // Log "consumePurchaseAsync" of "startPaymentScorex3" error to Facebook Analytics.
      });
    }).catch(function (error) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex3 error: ', error); // Log "purchaseAsync" of "startPaymentScorex3" error to Facebook Analytics.
    });
  };

  Store.prototype.startPaymentScorex4 = function () {
    FBInstant.payments.purchaseAsync({
      productID: 'scorex4'
    }).then(function (purchase) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex4 ran successfully. Purchase details: ', purchase); // Log "purchaseAsync" of "startPaymentScorex4" information to Facebook Analytics.
      FBInstant.payments.consumePurchaseAsync(purchase.purchaseToken).then(function () {
        localStorage.scoreRate = 4; // Set appropriate quantity of extra score rate.
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex4 ran successfully.'); // Log "consumePurchaseAsync" of "startPaymentScorex4" information to Facebook Analytics.
      }).catch(function (error) {
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex4 error: ', error); // Log "consumePurchaseAsync" of "startPaymentScorex4" error to Facebook Analytics.
      });
    }).catch(function (error) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex4 error: ', error); // Log "purchaseAsync" of "startPaymentScorex4" error to Facebook Analytics.
    });
  };

  Store.prototype.startPaymentScorex6 = function () {
    FBInstant.payments.purchaseAsync({
      productID: 'scorex6'
    }).then(function (purchase) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex6 ran successfully. Purchase details: ', purchase); // Log "purchaseAsync" of "startPaymentScorex6" information to Facebook Analytics.
      FBInstant.payments.consumePurchaseAsync(purchase.purchaseToken).then(function () {
        localStorage.scoreRate = 6; // Set appropriate quantity of extra score rate.
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex6 ran successfully.'); // Log "consumePurchaseAsync" of "startPaymentScorex6" information to Facebook Analytics.
      }).catch(function (error) {
        FBInstant.logEvent('Method consumePurchaseAsync of method startPaymentScorex6 error: ', error); // Log "consumePurchaseAsync" of "startPaymentScorex6" error to Facebook Analytics.
      });
    }).catch(function (error) {
      FBInstant.logEvent('Method purchaseAsync of method startPaymentScorex6 error: ', error); // Log "purchaseAsync" of "startPaymentScorex6" error to Facebook Analytics.
    });
  };
}(this));