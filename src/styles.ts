import styled from 'styled-components'
import { PageHeader } from "antd";
import { Content } from 'antd/lib/layout/layout';

export const Header = styled(PageHeader)`
    border-bottom: 1px solid rgb(235, 237, 240);
`

interface StyledTreeProps {
    isFile?: boolean
    level: number
}

export const StyledTreeItem = styled.div<StyledTreeProps>`
  color: ${({ isFile }) => isFile ? 'red' : 'blue'};
  cursor: pointer;
  margin-left: ${({ level }) => level * 8}px;
  pointer-events: ${({ isFile }) => isFile && 'none'};
`

export const Container = styled(Content)`
  width: 100%;
  max-width: 290px;
  margin: 100px auto 0;
`