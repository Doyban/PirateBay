(function (global) {
  var FacebookAPI = global.FacebookAPI = function () {};

  FacebookAPI.prototype.shareGame = function () {
    // Share game.
    FB.ui({
      method: "share",
      href: "https://apps.facebook.com/doyban-piratebay/",
      quote: "Play PirateBay!"
    }, function (response) {
      // console.log(response);
    });
  };

  FacebookAPI.prototype.shareScore = function (score, round) {
    // Share game score.
    FB.ui({
      method: "share",
      href: "https://apps.facebook.com/doyban-piratebay/",
      quote: "My score in PirateBay is " + score + " in " + round + " round!"
    }, function (response) {
      // console.log(response);
    });
  };

  FacebookAPI.prototype.inviteFriends = function () {
    // Invite Facebook friends.
    FB.ui({
      method: 'apprequests',
      message: 'Play PirateBay with me!'
    }, function (response) {
      // console.log(response);
    });
  };

  FacebookAPI.prototype.showProducts = function () {
    // Show Facebook products to purchase in that game.
    FB.api(
      '/app/products',
      'get',
      function (response) {
        // console.log(response);
      }
    );
  };

  FacebookAPI.prototype.showPurchases = function () {
    // Show Facebook purchases in that game.
    var that = this;

    FB.getLoginStatus(function (response) {
      console.log(response.authResponse.accessToken);
      that.token = response.authResponse.accessToken;
    });

    FB.api(
      '/app/purchases',
      'get',
      {access_token: that.token},      // user access token
      function (payload) {        // callback function
        // console.log('purchases payload:');
        // console.log(payload);
      }
    );
  };

  FacebookAPI.prototype.consumePurchase = function (purchase_token, product_id) {
    // Consume Facebook purchases in that game.
    var that = this;

    FB.getLoginStatus(function (response) {
      // console.log(response.authResponse.accessToken);
      that.token = response.authResponse.accessToken;
    });

    FB.api(
      '/' + purchase_token + '/consume',    // Replace the PURCHASE_TOKEN
      'post',
      {access_token: that.token},         // Replace with a user access token TODO: find access_token of user
      function (result) {
        // console.log('consuming product: ', product_id, 'with purchase token', purchase_token);
        // console.log('Result:');
        // console.log(result);
      }
    );
  };

  FacebookAPI.prototype.check_purchase = function (extraScore, response) {
    var that = this;

    if (response.hasOwnProperty("product_id")) {
      // Purchase has been done.
      // localStorage.scoreRate = parseInt(localStorage.scoreRate) * extraScore; // Add appropriate quantity of extra coins.
      localStorage.scoreRate = extraScore; // Add appropriate quantity of extra coins.
      global.FacebookAPI.prototype.consumePurchase(response.purchase_token, response.product_id); // Consume purchase to make possibility to buy later on more product with the same ID.
      // console.log("Purchase has been done.");
    } else {
      // Purchase has not been done.
      // console.log("Purchase has not been done.")
    }
  };

  FacebookAPI.prototype.purchaseScorex2 = function () {
    var that = this;

    // Facebook API to purchase score x2.
    FB.ui(
      {
        method: 'pay',
        action: 'purchaseiap',
        product_id: 'scorex2'
      }, function (response) { // Callback function
        // console.log(response);
        this.extraScore = 2;
        that.check_purchase(this.extraScore, response); // Check if item has been purchased.
      }
    );
  };

  FacebookAPI.prototype.purchaseScorex3 = function () {
    var that = this;

    // Facebook API to purchase score x3.
    FB.ui(
      {
        method: 'pay',
        action: 'purchaseiap',
        product_id: 'scorex3'
      }, function (response) { // Callback function
        // console.log(response);
        this.extraScore = 3;
        that.check_purchase(this.extraScore, response); // Check if item has been purchased.
      }
    );
  };

  FacebookAPI.prototype.purchaseScorex4 = function () {
    var that = this;

    // Facebook API to purchase score x4.
    FB.ui(
      {
        method: 'pay',
        action: 'purchaseiap',
        product_id: 'scorex4'
      }, function (response) { // Callback function
        // console.log(response);
        this.extraScore = 4;
        that.check_purchase(this.extraScore, response); // Check if item has been purchased.
      }
    );
  };

  FacebookAPI.prototype.purchaseScorex6 = function () {
    var that = this;

    // Facebook API to purchase score x6.
    FB.ui(
      {
        method: 'pay',
        action: 'purchaseiap',
        product_id: 'scorex6'
      }, function (response) { // Callback function
        // console.log(response);
        this.extraCoins = 6;
        that.check_purchase(this.extraScore, response); // Check if item has been purchased.
      }
    );
  }
}(this));