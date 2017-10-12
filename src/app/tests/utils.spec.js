var auction_doc_id = 'test';
beforeEach(module('auction'));

//stringifyQueryString
describe('Unit: Testing AuctionUtils "stringifyQueryString" ', function() {

  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString).toBeDefined();
  }]));

  it('should return empty string if argument is undefined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString()).toEqual('');
  }]));

  it('should convert object', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString({a:1,b:2,c:3})).toEqual('a=1&b=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:1,b:2})).toEqual('a=1&b=2');
    expect(AuctionUtils.stringifyQueryString({a:1})).toEqual('a=1');
  }]));

  it('should convert object with arrays', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString({a:[1,2,3],c:[1,2,3]})).toEqual('a=1&a=2&a=3&c=1&c=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:[1,2],c:[1,2,3]})).toEqual('a=1&a=2&c=1&c=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:[1],c:[1,2,3]})).toEqual('a=1&c=1&c=2&c=3');
    expect(AuctionUtils.stringifyQueryString({a:[1],c:[1,2]})).toEqual('a=1&c=1&c=2');
    expect(AuctionUtils.stringifyQueryString({a:[1],c:[1]})).toEqual('a=1&c=1');
  }]));

  it('should encodeURI', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.stringifyQueryString({'a v':'http://w3schools.com/my test.asp?name=ståle&car=saab'}))
      .toEqual('a%20v=http%3A%2F%2Fw3schools.com%2Fmy%20test.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab');
  }]));
});

//prepare_title_ending_data
describe('Unit: Testing AuctionUtils "prepare_title_ending_data" ', function() {

  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.prepare_title_ending_data).toBeDefined();
  }]));
});

//pad
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

//inIframe
describe('Unit: Testing AuctionUtils "inIframe" ', function() {
  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.inIframe).toBeDefined();
  }]));

  it('should return', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    window.self = true;
    window.top = false;
    expect(AuctionUtils.inIframe()).toEqual(true);
  }]));
});

//polarToCartesian
describe('Unit: Testing AuctionUtils "polarToCartesian" ', function() {
  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.polarToCartesian).toBeDefined();
  }]));

  it('should return correct result', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.polarToCartesian(10, 10, 10, 90)).toEqual({x: 20, y: 10});
    expect(AuctionUtils.polarToCartesian(10, 10, 10, 180)).toEqual({x: 10, y: 20});
    expect(AuctionUtils.polarToCartesian(1, 2, 10, 45)).toEqual({x: 8.071067811865476, y: -5.071067811865475});
  }]));
});

//generateUUID
describe('Unit: Testing AuctionUtils "generateUUID" ', function() {
  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.generateUUID).toBeDefined();
  }]));

  it('should return correct result', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    var UUID = AuctionUtils.generateUUID();
    var someUUID = AuctionUtils.generateUUID();
    var regEx = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/;

    expect(UUID[14]).toEqual('4');
    expect(someUUID[14]).toEqual('4');
    expect(UUID.split('-').length).toEqual(5);
    expect(UUID.length).toEqual(36);
    expect(UUID).not.toEqual(someUUID);
    expect(regEx.test(UUID)).toEqual(true);
  }]));
});

//detectIE
describe('Unit: Testing AuctionUtils "detectIE" ', function() {
  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.detectIE).toBeDefined();
  }]));

  it('should detect MSIE or Trident or Edge ', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    var ua = window.navigator.userAgent;
    var regEx = /MSIE|Trident|Edge/;
    expect(!!AuctionUtils.detectIE()).toEqual(regEx.test(ua));
  }]));
});

//UnsupportedBrowser
describe('Unit: Testing AuctionUtils "UnsupportedBrowser" ', function() {
  it('should be Defined', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.UnsupportedBrowser).toBeDefined();
  }]));
});

//npv
describe('Unit: Testing AuctionUtils "npv" ', function() {

  const annualCostsReduction = [92.47, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250];
  const nbuDiscountRate = 0.125;

  const baseBid = {
    'NBUdiscountRate': nbuDiscountRate,
    'annualCostsReduction': annualCostsReduction,
    'yearlyPaymentsPercentage': 0.70,
    'contractDuration': {'years': 2, 'days': 10},
    'announcementDate': new Date(2017, 8, 18)
  };

  /* ANNOUNCEMENT_DATE */

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 2),
        baseBid['NBUdiscountRate'])).toEqual('1493.11261864549');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 3),
        baseBid['NBUdiscountRate'])).toEqual('1493.29714530232');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 4),
        baseBid['NBUdiscountRate'])).toEqual('1493.48174786072');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 5),
        baseBid['NBUdiscountRate'])).toEqual('1493.66642643300');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 6),
        baseBid['NBUdiscountRate'])).toEqual('1493.85118113158');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 7),
        baseBid['NBUdiscountRate'])).toEqual('1494.03601206895');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 8),
        baseBid['NBUdiscountRate'])).toEqual('1494.22091935769');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 9),
        baseBid['NBUdiscountRate'])).toEqual('1494.40590311049');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 10),
        baseBid['NBUdiscountRate'])).toEqual('1494.59096344011');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        new Date(2017, 5, 11),
        baseBid['NBUdiscountRate'])).toEqual('1494.77610045941');
  }]));

  /* CONTRACT_DURATION */

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        15,
        0,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('650.19504129090');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        0,
        1,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1810.49606787280');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        3,
        11,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1390.67586224709');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        3,
        12,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1390.35400799300');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        3,
        13,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1390.03215373892');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        3,
        14,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1389.71029948483');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        3,
        15,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1389.38844523075');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        4,
        15,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1280.67323051781');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        5,
        15,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1184.03748410631');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        6,
        15,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1098.13904285164');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        7,
        15,
        baseBid['yearlyPaymentsPercentage'],
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1021.78487284750');
  }]));

  /* PAYMENTS_PERCENTAGE */

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7100,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1509.25419393209');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7200,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1505.00489590214');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7300,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1500.75559787220');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7400,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1496.50629984225');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7500,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1492.25700181231');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7600,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1488.00770378236');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7700,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1483.75840575242');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7800,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1479.50910772247');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.7900,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1475.25980969253');
  }]));

  it('should calculate it right', angular.mock.inject(['AuctionUtils', function(AuctionUtils) {
    expect(AuctionUtils.npv(
        baseBid['contractDuration']['years'],
        baseBid['contractDuration']['days'],
        0.8000,
        baseBid['annualCostsReduction'],
        baseBid['announcementDate'],
        baseBid['NBUdiscountRate'])).toEqual('1471.01051166258');
  }]));
});