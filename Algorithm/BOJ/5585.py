cost = int(input())
change = 1000-cost
answer = 0
coins =[500,100,50,10,5,1]

for coin in coins:
  answer+= change//coin
  change = change%coin
print(answer)