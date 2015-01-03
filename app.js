#!/usr/bin/env node
var util = require('util');
var RipplePromise = require('ripple-lib-promise');
var Promise = RipplePromise.promise();
var TXTrades = require('./tx_trades');

var GatewayList = require('./gateway_list');


RipplePromise.promiseConnect().then(function(remote){

    GatewayList().then(function(gateway){

        remote.on('transaction_all', function(v){

            if(v.engine_result_code !== 0)  return;

            //TXTrades.selectTradesPair(v, pair).forEach(function(v){console.log(v)})
            TXTrades.trades(v, gateway.database).filter(function(v){return v.order.isFilter()}).forEach(function(v){
console.log(v)
            })
        })
    })

});

