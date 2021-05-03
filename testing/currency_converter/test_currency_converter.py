from currency_converter import currency_converter

def test_conversion_inr_to_npr():
    inr_currency=10*1.6
    assert inr_currency==currency_converter("inr","npr",10)