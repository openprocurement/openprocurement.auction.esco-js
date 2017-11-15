describe('auctionTest', function () {

  beforeEach(module('auction'));

  let controller, scope, AuctionUtils, rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_, AuctionUtils){
    scope = _$rootScope_.$new();
    rootScope = _$rootScope_;
    controller = _$controller_('AuctionController', {$scope: scope, AuctionUtils: AuctionUtils, $rootScope: rootScope});
  }));

//$scope.post_bid
  it('should be Defined', function () {
    expect(scope.post_bid).toBeDefined();
  });

  it('should push alerts', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    let length = scope.alerts.length;
    rootScope.get_annual_costs_reduction = function(bidder_id) {};
    rootScope.auction_doc = {noticePublicationDate: null, NBUdiscountRate:null};
    rootScope.minimal_bid = {amount: "12"};
    AuctionUtils.npv = function() {return "12"};
    scope.form.BidsForm = {$valid: true};
    expect(!!scope.post_bid()).toEqual(false);
    expect(scope.alerts.length).toEqual(length + 1);
  }]));

  it('should warn if the proposal you have submitted coincides with a proposal of the other participant bid',
      angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    let length = scope.alerts.length;
    scope.form.BidsForm = {$valid: true};
    rootScope.auction_doc = {noticePublicationDate: null, NBUdiscountRate:null};
    rootScope.get_annual_costs_reduction = function(bidder_id) {};
    rootScope.minimal_bid = {amount: "12"};
    AuctionUtils.npv = function() {return "12"};
    scope.post_bid(14, 20, 85);

    expect(scope.alerts.length).toEqual(length + 1);
    expect(scope.alerts[0].msg && scope.alerts[0].type=='warning').toEqual(true);
  }]));
//$scope.edit_bid
  it('should be Defined', function () {
    expect(scope.edit_bid).toBeDefined();
  });
  it('should change allow_bidding', function () {
    scope.edit_bid();
    expect(scope.allow_bidding).toBe(true);
  });
//$scope.max_bid_amount
  it('should be Defined', function () {
    expect(scope.max_bid_amount).toBeDefined();
  });
  it('should return 0', function () {
    expect(scope.max_bid_amount()).toBe(0);
  });
  it('should find max bid amount', function () {
    rootScope.bidder_id = '{}';
    rootScope.auction_doc = {current_stage : 0};
    rootScope.auction_doc.stages = [{amount: 1240}];
    rootScope.auction_doc.minimalStepPercentage = 0.006;
    expect(scope.max_bid_amount()).toBe(1247.44);
  });
//$scope.calculate_minimal_bid_amount
  it('should be Defined', function () {
    expect(scope.calculate_minimal_bid_amount).toBeDefined();
  });
  it('should find minimal bid', function () {
    rootScope.auction_doc = {};
    scope.auction_doc.stages = [];
    scope.auction_doc.initial_bids = [{amount:1},{amount:2},{amount:3}];
    scope.calculate_minimal_bid_amount();
    expect(scope.minimal_bid).toBeDefined(1);
    scope.auction_doc.initial_bids = [{amount:100000},{amount:200000},{amount:300000},{amount:200000},{amount:300000},{amount:300000},{amount:200000},{amount:300000}];
    expect(scope.minimal_bid).toBeDefined(100000);
  });
//$scope.start_sync
  it('should be Defined', function () {
    expect(scope.start_sync).toBeDefined();
  });
//$scope.start_auction_process
  it('should be Defined', function () {
    expect(scope.start_auction_process).toBeDefined();
  });
//$scope.restart_changes
  it('should be Defined', function () {
    expect(scope.restart_changes).toBeDefined();
  });
//$scope.replace_document
  it('should be Defined', function () {
    expect(scope.replace_document).toBeDefined();
  });
//$scope.calculate_rounds
  it('should be Defined', function () {
    expect(scope.calculate_rounds).toBeDefined();
  });
  it('should work correct', function () {
    rootScope.auction_doc = {stages : [{type:'pause'},{type:'pause'},5,{type:'pause'},{type:'pause'},{type:'pause'}]};
    scope.calculate_rounds();
    expect(scope.Rounds).toEqual([0, 1, 3, 4, 5]);
  });
//$scope.scroll_to_stage
  it('should be Defined', function () {
    expect(scope.scroll_to_stage).toBeDefined();
  });
//
//$scope.array
  it('should be Defined', function () {
    expect(scope.array).toBeDefined();
  });
  it('should return Array', function () {
    expect(scope.array() instanceof Array).toBe(true);
  });
//$scope.open_menu
  it('should be Defined', function () {
    expect(scope.open_menu).toBeDefined();
  });
//$scope.calculate_full_price_temp
  it('should be Defined', function () {
    expect(scope.calculate_full_price_temp).toBeDefined();
  });
  it('should work correct', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    rootScope.get_annual_costs_reduction = function(bidder_id) {};
    rootScope.auction_doc = {noticePublicationDate: null, NBUdiscountRate:null};
    AuctionUtils.npv = function() {return 11};
    scope.form.BidsForm = {$valid: true};
    rootScope.bidder_coeficient = 3;
    scope.calculate_full_price_temp();
    expect(scope.form.full_price_temp).toBe(33);
  }]));


/*//controller 'OffCanvasController'
//$scope.allert
  it('should be Defined', function () {
    expect(scope.allert).toBeDefined();
  });
//$scope.ok
  it('should be Defined', function () {
    expect(scope.ok).toBeDefined();
  });
//$scope.cancel
  it('should be Defined', function () {
    expect(scope.cancel).toBeDefined();
  });
//$scope.post_bid
  it('should be Defined', function () {
    expect(scope.post_bid).toBeDefined();
  });*/

//TODO directive 



});