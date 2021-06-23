import { FC, useState } from "react";
import { Tree } from "./Tree";
import { useAppDispatch } from "../redux/hooks";
import { ContentItemDTO, fetchContentItem } from "../redux/contentReducer";
import { StyledTreeItem } from "../styles";
import { unwrapResult } from "@reduxjs/toolkit";
import { Spin } from "antd";

interface Props {
    dataItem: ContentItemDTO
    level: number
}

export const TreeItem: FC<Props> = ({ dataItem, level }) => {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { id, title, children } = dataItem;
    const isCollapsed = children !== undefined && children.length > 0

    const handleClick = async (id: number) => {
        if (!isCollapsed) {
            try {
                setIsLoading(true)
                const resultAction = await dispatch(fetchContentItem(id))
                unwrapResult(resultAction)
            } catch (error) {
                console.error("Failed to fetch content: ", error);
                setIsLoading(false)
            } finally {
                setIsLoading(false)
                setIsOpen(true)
            }
        } else {
            setIsOpen(!isOpen)
        }
    }

    return (
        <StyledTreeItem
            key={`${level}_${id}`}
            data-level={`${level}_${id}`}
            level={level}
            isFile={!children}
        >
            {isLoading && <Spin />}<span onClick={() => handleClick(id)}>{title}</span>
            {isOpen && isCollapsed && <Tree data={children} level={level + 1}/>}
        </StyledTreeItem>
    )
}