import { ContentItemDTO } from "./redux/contentReducer";

export const findIndexById = (data: ContentItemDTO[], id: number): number[] | void => {
    const result: number[] = []
    data.forEach((item, index) => {
        if (item.id === id) {
            result.push(index)
        } else if (item.children && item.children.length > 0) {
            const nodeIndex = findIndexById(item.children, id)
            if (nodeIndex) {
                result.push(index)
                result.push(...nodeIndex)
            }
        }
    })
    if (result.length > 0) {
        return result
    }
    return
}