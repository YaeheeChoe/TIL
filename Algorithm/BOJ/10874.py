# 이교수님의 시험
N = int(input())
SCORE = [list(map(int,input().split())) for _ in range(N)]
buf =0
for i in range(N):
  buf = 0
  for j in range(10):
    if SCORE[i][j] == j%5+1:
      buf +=1
  if buf ==10:
    print(i+1)