var ripple = require('ripple-lib'),
    Amount = ripple.Amount;

var offerutil = require('./offer_util');

var makeFromNode = exports.makeFromNode = function (node, pairs) {
    var gets = Amount.from_json(node.TakerGets),
        pays = Amount.from_json(node.TakerPays),
        type, base, counter;

    if(offerutil.makeCurrencyPair(gets, pays, true) in pairs){
        type = "bid";
        base = gets;
        counter = pays;
    } else if(offerutil.makeCurrencyPair(pays, gets, true) in pairs) {
        type = "ask";
        base = pays;
        counter = gets;
    } else {
        type = "unknown"; // filter or bid
        base = gets;
        counter = pays;
    }
    return new Order(type, base, counter);
};
 
var Order = function(type, base, counter){
    this.type = type;
    this.base = base;
    this.counter = counter;
}

var amount_to_number = function(amount){
    return parseFloat(amount.to_human().split(',').join(''))
}

Order.prototype.getPair = function(){
    return offerutil.makeCurrencyPair(this.base, this.counter, false);
}

Order.prototype.getFullPair = function(){
    return offerutil.makeCurrencyPair(this.base, this.counter, true);
}

Order.prototype.getAmountBase = function(){
    return amount_to_number(this.base)
}
Order.prototype.getAmountCounter = function(){
    return amount_to_number(this.counter)
}
Order.prototype.getQuality = function(){
    return amount_to_number(this.counter) / amount_to_number(this.base)
}
Order.prototype.getType = function(){
    return this.type === 'unknown' ? 'bid' : this.type
}
Order.prototype.isFilter = function(){
    return this.type !== 'unknown'
}

