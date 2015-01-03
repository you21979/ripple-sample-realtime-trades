#!/usr/bin/env node
var util = require('util');
var GatewayList = require('./gateway/gateway_list');
var connectUtil = require('./util/connect_util');
var trades = require('./exchange/trades');

connectUtil.connect(30).then(function(remote){
    GatewayList().then(function(gateway){
        remote.on('transaction_all', function(v){
            if(v.engine_result_code !== 0)  return;

            trades(v, gateway.database).filter(function(v){return v.order.isFilter()}).forEach(function(v){
                console.log({
                    pair: v.pair,
                    type: v.type,
                    price: v.price,
                    amount: v.amount,
                    txtype: v.txtype,
                    nodetype: v.nodetype,
                    hash: v.hash,
                    time: v.time.format('YYYY/MM/DD HH:mm:ss'),
                    pairfull: v.pairfull,
                })
            })
        })
    })
});

