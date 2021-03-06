#!/usr/bin/env node
var redis = require('redis');

var cli = redis.createClient();

var key = ['EXCHANGE', 'TRADES', 'XRP_JPY'].join('|')

cli.hgetall(key, function(err, data){
    if(err) return;
    Object.keys(data).forEach(function(key){
        console.log(JSON.parse(data[key]))
    })
});
cli.subscribe(key);

cli.on('message', function(key, data){
    var trades = JSON.parse(data);
    console.log({
        pair:trades.pairfull,
        type:trades.type,
        price:Math.floor(trades.price*1000000)/1000000,
        amount:trades.amount,
        time:trades.time,
    })
})

