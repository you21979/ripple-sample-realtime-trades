var mergeOption = exports.mergeOption = function(params, opt){
    Object.keys(opt).forEach(function(k){ params[k] = opt[k] })
    return params;
}

