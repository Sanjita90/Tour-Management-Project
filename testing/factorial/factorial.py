
def factorial(n):
    num=n
    if(not(isinstance(n,int)) or n<0):
        return "invalid"
    elif(n==0):
       return 1
    else:
       if(num>=1):
           return (n*factorial(n-1))
           n-=1

