var order = require('./order');
var timeUtil = require('../util/time_util');

var filterNodeTrades = function(tx){
    return function(v){
        return tx.transaction.Account !== v.fields.Account
            && v.entryType === 'Offer'
            && (v.nodeType == 'ModifiedNode' || v.nodeType == 'DeletedNode')
    }
}

var mapTrades = function(tx, gateway_list){
    return function(v){
        var o = order.makeFromNode(v.fields, v.fieldsPrev, gateway_list);
        return {
            order : o,
            pair: o.getPair(),
            pairfull: o.getFullPair(),
            type: o.getType(),
            price: o.getQuality(),
            amount: {
                base:o.getAmountBase(),
                counter: o.getAmountCounter(),
            },
            txtype:tx.transaction.TransactionType,
            nodetype:v.nodeType,
            account:{
                trigger:tx.transaction.Account,
                stakeholder:[tx.transaction.Account, v.fields.Account],
            },
            hash:tx.transaction.hash,
            time:timeUtil.rippleTimeToMoment(tx.transaction.date),
        }
    }
}

var filterTradesZero = function(){
    return function(v){
        return v.order.getAmountBase() > 0 && v.order.getAmountCounter() > 0
    }
}

var trades = module.exports = function(tx, gateway_list){
    switch(tx.transaction.TransactionType){
    case "OfferCreate":
    case "Payment":
        return tx.mmeta.
            filter(filterNodeTrades(tx)).
            map(mapTrades(tx, gateway_list)).
            filter(filterTradesZero())
    default:
        return []
    }
}

