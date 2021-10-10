
N = int(input())
F = input().split()
answer = 0


while N > 0:
  if F[N] != '0':
    answer += (len(str(F[N])) +1)
    F[N] = '0'
  else:
    F.pop()
    N-=1
    answer +=2
print(answer)