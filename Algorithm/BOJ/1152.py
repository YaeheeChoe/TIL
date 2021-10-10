li = input()
isWord = False
count = 0
for c in li:
  if not isWord and c != ' ':
    isWord =True
    count += 1
  if c ==' ':
    isWord = False
print(count)