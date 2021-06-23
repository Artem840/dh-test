import { FC } from "react";
import {Alert, Empty, Spin} from "antd";
import { Tree } from "./Tree";
import { useAppSelector } from "../redux/hooks";
import { selectContent } from "../redux/contentReducer";

export const ContentList: FC = () => {
    const { data, isLoading, error } = useAppSelector(selectContent)

    if (isLoading) {
        return <Spin size="large" />
    }

    if (error) {
        return <Alert message={error} type="error" />
    }

    if (!data) {
        return <Empty description={'Нет данных'} />
    }

    return <Tree data={data} level={0} />
}