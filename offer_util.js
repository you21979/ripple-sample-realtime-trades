
var makeCurrencySymbol = exports.makeCurrencySymbol = function(amount, is_issuer){
    var key = amount.currency().to_json();
    var w = [key];
    if (key !== 'XRP' && is_issuer) {
        w.push(amount.issuer().to_json());
    }
    return w.join('.');
}

var makeCurrencyPair = exports.makeCurrencyPair = function(gets, pays, is_issuer){
    return [gets, pays].
        map(function(v){return makeCurrencySymbol(v, is_issuer)}).
        join('_');
}


