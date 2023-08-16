import { configureStore } from "@reduxjs/toolkit";
import { CanvasContainer } from "./components/Canvas/CanvasContainer"
import { Nvabar } from "./components/Navbar"
import { Provider } from "react-redux";
import { combinedReducer } from "./reducers/combinerdReducer";
import { ColorContainer } from "./components/Color/ColorContainer";

const store = configureStore({reducer:combinedReducer})


function App() {
  return (
    <Provider store={store}>
      <section className="page">
      <Nvabar/>
      <div className="page__container">
        <CanvasContainer/>
        <ColorContainer/>
      </div>
      </section>
    </Provider>
  )
}

export default App
