import ReactDOM from "react-dom";

// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// project imports
import App from "./App";
import { store } from "./store";
// style + assets
import "./assets/scss/style.scss";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
