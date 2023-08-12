
import { configureStore } from "@reduxjs/toolkit";
import { CanvasContainer } from "./components/Canvas/CanvasContainer"
import { Nvabar } from "./components/Navbar"
import { Provider } from "react-redux";

const store = configureStore({})


function App() {
  return (
    <Provider store={store}>
      <section className="page">
      <Nvabar/>
      <CanvasContainer/>
      </section>
    </Provider>
  )
}

export default App
