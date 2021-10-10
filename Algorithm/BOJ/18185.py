N = int(input())
A  = list(map(int, input().split()))
pay = 0
A.append(0)
A.append(0)
# 간편한 인덱싱을 위해 뒤에 0을 두개 붙여줌
for i in range(N):
  if A[i] and A[i+1] and A[i+2]:
    m = min(A[i], A[i+1],A[i+2])
    A[i], A[i+1], A[i+2] = A[i]-m, A[i+1]-m,A[i+2]-m
    pay +=7*m
  if A[i] and A[i+1]:
    m = min(A[i], A[i+1])
    A[i], A[i+1]= A[i]-m, A[i+1]-m
    pay +=5*m
  if A[i] >0:
    pay +=3*A[i]
print(pay)