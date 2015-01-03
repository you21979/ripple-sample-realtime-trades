var CONSTANT = require('./constant');

var PairsDatabase = module.exports = function(){
    this.currency = {};
    this.database = {};
    this.currency[CONSTANT.NATIVE_CURRENCY] = ['']
}

PairsDatabase.prototype._updateDatabase = function(pair){
    var rev = pair.split('_').reverse().join('_');
    if(!(rev in this.database)){
        this.database[pair] = true;
    }
}

PairsDatabase.prototype.addCurrency = function(currency, issuer){
    currency = currency.toUpperCase();
    if( !(currency in this.currency) ){
        this.currency[currency] = [];
    }
    this.currency[currency].push(issuer);
}
PairsDatabase.prototype.addPair = function(pair){
    var self = this;
    var w = pair.
            toUpperCase().
            split('_').
            map(function(currency){
                if(!(currency in self.currency)){
                    return [];
                }
                return self.currency[currency].
                    map(function(v){
                        var list = [currency];
                        if(currency !== CONSTANT.NATIVE_CURRENCY){
                            list.push(v);
                        }
                        return list.join('.')
                    })
            })
    w[0].
        map(function(base){
            return w[1].
                filter(function(counter){
                    return base !== counter
                }).
                map(function(counter){
                    return [base, counter].join('_')
                })
        }).
        forEach(function(pairs){
            pairs.forEach(function(pair){
                self._updateDatabase(pair);
            })
        })
}

