var auction_doc_id = 'test';

beforeEach(function() {
    module('auction')
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });

afterEach(function() {
    jasmine.clock().uninstall();
  });

angular.mock.module('auction');

describe('Unit: Testing AuctionUtils "pad" ', function() {
  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.pad).toBeDefined();
  }]));

  it('should be convert 10 to "10"', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.pad(10)).toEqual("10");
  }]));

  it('should be convert 1 to "01"', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.pad(1)).toEqual("01");
  }]));


});


describe('Unit: Testing AuctionUtils "prepare_info_timer_data" ', function() {
  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.prepare_info_timer_data).toBeDefined();
  }]));
});

describe('Unit: Testing AuctionUtils "npv"', function() {
  var AuctionUtils;

  beforeEach(angular.mock.module('auction'));

  beforeEach(inject(function(_AuctionUtils_) {
    AuctionUtils = _AuctionUtils_;
  }));

  it('Should AuctionUtils exist', function() {
    expect(AuctionUtils).toBeDefined();
  });

  describe('.npv()', function() {
    it('Should exist', function() {
      expect(AuctionUtils.npv).toBeDefined();
    });

    it('Test npv calculation', function() {
      var announcement_dates = [
        "2017-12-30", "2017-12-31", "2018-01-01", "2018-12-31"
      ];
      var expected_results = [
        "1540.63620088962", "1513.14383477073", "1471.31191860622", "1513.14383477073"
      ];

      var annual_costs_reduction = [92.47];
      for (var i = 0; i < 20; i++) {
        annual_costs_reduction.push(250);
      };
      var nbu_discount_rate = 0.125;
      var yearly_payments_percentage = 0.7;
      var contract_duration_days = 10;
      var contract_duration_years = 2;

      for (var c = 0; c < announcement_dates.length; c++) {
        expect(AuctionUtils.npv(contract_duration_years, contract_duration_days,
          yearly_payments_percentage, annual_costs_reduction,
          announcement_dates[c], nbu_discount_rate)).toEqual(expected_results[c]);
      };
    });
  });
});
