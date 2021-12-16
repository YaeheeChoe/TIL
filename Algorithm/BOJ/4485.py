while True:
    N = int(input())
    if N == 0:
        break
    maxnum = 125*125*9
    cave = []
    road = [[maxnum]*N] * N
    for _ in range(N):
        cave.append(list(map(int,input().split(' '))))
    minimum = maxnum
    
    road[0][0] = cave[0][0]
    def walk(x,y):
        if y>=N or x>=N:
            return maxnum
        if y <0 or x < 0:
            return maxnum
        road[y][x] = cave[y][x]
        road[y][x] += min(walk(x,y-1),walk(x-1,y))
        return road[y][x]
    walk(0,0)
    print(road)