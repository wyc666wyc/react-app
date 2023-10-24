export interface AbstractTree {
    id: string,
    pid: string,
    children?: AbstractTree[],
    [P: string]: unknown
}
export function list2Tree<T extends AbstractTree>(list: T[]) {
    const map: Record<string, number> = {}
    const tree: T[] = []
    for (let i = 0; i < list.length; i++) {
        const target = list[i]
        map[target.id] = i
        target.children = []
    }
    for(let i = 0; i < list.length; i++) {
        const target = list[i]
        if (target.pid && list[map[target.pid]]) {
            list[map[target.pid]].children?.push(target)
        } else {
            tree.push(target)
        }
    }
    return tree
}
