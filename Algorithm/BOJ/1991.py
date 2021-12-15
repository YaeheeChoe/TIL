# 트리 순회


# 트리 배열. A : 1, ....
MAX_N = 26
tree= ['.','A'] + ['.'] * MAX_N*2

N = int(input())
index_dic = {}
for i in range(1,N):
    reaf = input().split(' ')
    pos = ord(reaf[0])-ord('A')+1
    tree[pos*2],tree[pos*2+1] = reaf[1],reaf[2]
for i in range(len(tree)):
    print(i,tree[i])

def preorder(index):
    for node in tree:
        if node != '.':
            print(node,end='')

def postorder(index):
    if tree[index] =='.':
        return
    postorder(index*2)
    postorder(index*2+1)
    print(tree[index],end='')
    return
preorder(1)
print("")
postorder(1)