def currency_converter(from_curr,to_curr,amount):
    if((from_curr=="inr")and (to_curr=="npr")):
        return amount*1.6
    elif((from_curr=="npr")and (to_curr=="inr")):
        return amount*1.6