import { configureStore } from "@reduxjs/toolkit";
import { CanvasContainer } from "./components/Canvas/CanvasContainer"
import { Nvabar } from "./components/Navbar"
import { Provider } from "react-redux";
import { combinedReducer } from "./reducers/combinerdReducer";

const store = configureStore({reducer:combinedReducer})


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
