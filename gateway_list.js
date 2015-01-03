var PairsDatabase = require('./pairs_database');
var rp = require('request-promise');

var FIAT_CURRENCIES = [
    'EUR',
    'JPY',
    'GBP',
    'CHF',
    'AUD',
    'NZD',
    'USD'
]

var OTHER_CURRENCIES = [
    'BTC',
    'LTC',
    'STR',
    'XRP'
]

var initialize = module.exports = function(){
    return rp('https://raw.githubusercontent.com/you21979/ripple-gateway-list/master/list/list.json').then(JSON.parse).then(function(data){
        var p = new PairsDatabase();
        data.forEach(function(v){
            var w = Object.keys(v.assets).map(function(key){
                        return v.assets[key].
                                map(function(c){ return [key, c] })
                    }).reduce(function(r, v){
                        v.forEach(function(w){
                            r.push(w);
                        })
                        return r;
                    }, [])
            w.forEach(function(v){
                p.addCurrency(v[1], v[0])
            })
        })
        FIAT_CURRENCIES.forEach(function(currency1){
            FIAT_CURRENCIES.forEach(function(currency2){
                p.addPair([currency1, currency2].join('_'));
            })
        })
        OTHER_CURRENCIES.forEach(function(currency1){
            OTHER_CURRENCIES.forEach(function(currency2){
                p.addPair([currency1, currency2].join('_'));
            })
        })
        FIAT_CURRENCIES.forEach(function(currency1){
            OTHER_CURRENCIES.forEach(function(currency2){
                p.addPair([currency2, currency1].join('_'));
            })
        })
        return p;
    })
}
