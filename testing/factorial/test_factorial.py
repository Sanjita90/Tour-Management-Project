from factorial import factorial
def test_factorial_for_1():
    expected_result=1
    assert expected_result==factorial(1)

def test_factorial_for_0():
    expected_result=1
    assert expected_result==factorial(0)

def test_factorial_for_2():
    expected_result=2
    assert expected_result==factorial(2)

def test_factorial_for_6():
    expected_result=720
    assert expected_result==factorial(6)

def test_factorial_for_negative_and_string():
    expected_result = "invalid"
    assert expected_result==factorial(-1)
    assert expected_result==factorial("a")

def test_factorial_for_floats():
    expected_result="invalid"
    assert expected_result==factorial(6.5)
