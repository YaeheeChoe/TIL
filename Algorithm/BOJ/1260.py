from typing import Deque
def DFS(v):
    print(v,end=" ")
    visit[v] = 1
    for i in range(n+1):
        if graph[v][i] and not visit[i]:
            DFS(i)
    
def BFS(v):
    q =list()
    for i in range(n+1):
        if graph[v][i] and not visit[i]:
            q.append(i)
    while q:
        BFS(q.pop(0))
        
n,m,s = map(int,input().split())
graph = [[0] * (n+1) for _ in range(n+1)]
visit  =[0 for _ in range(n+1)]
for i in range(n):
    a,b = map(int ,input().split())
    graph[a][b] = 1
    graph[b][a] =1

DFS(s)
visit  =[0 for _ in range(n+1)]
print("")
BFS(s)