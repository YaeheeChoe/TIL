class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        def dfs(node:TreeNode):
            if not node:
                return 0
            # 불필요한 탐색을 배제한다.
            if node.val <low:
                return dfs(node.right)
            if node.val > high:
                return dfs(node.left)
            return node.val + dfs(node.left) + dfs(node.right)
        return dfs(root)