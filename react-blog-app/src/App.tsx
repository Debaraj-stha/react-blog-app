
import AllRoutes from "./components/AppRoutes"
import ErrorBoundary from "./components/Errorboundary"
import FlashMessageList from "./components/FlashMessageList"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import HorizontalPageScrollIndicator from "./components/HorizontalPageScrollIndicator"
import VerticalSopace from "./components/VerticalSopace"


function App() {


  return (
    <>
      <ErrorBoundary>
        <Header />
        <VerticalSopace />
        <HorizontalPageScrollIndicator />
        <AllRoutes />
        <FlashMessageList />
        <Footer />
      </ErrorBoundary>
    </>
  )
}

export default App
