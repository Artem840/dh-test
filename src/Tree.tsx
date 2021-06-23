import { FC } from "react"
import { ContentItemDTO } from "./redux/contentReducer"
import {TreeItem} from "./TreeItem";

interface Props {
    data: ContentItemDTO[]
    level: number
}

export const Tree: FC<Props> = ({ data, level }) => (
    <>
        {data.map((dataItem) => <TreeItem key={dataItem.id} dataItem={dataItem} level={level} />)}
    </>
)