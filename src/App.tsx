import { useEffect } from "react"
import { fetchContentList } from "./redux/contentReducer"
import { useAppDispatch } from "./redux/hooks"
import { Container, Header } from "./styles"
import { ContentList } from "./components/ContentList";

export const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchContentList())
  }, [dispatch])
  
  return (
    <>
      <Header title="DH Test" />
      <Container>
        <ContentList />
      </Container>
    </>
  )
}
