import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import store from "./store/store";
import router from "./config/routes/Route";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </div>
  );
}

export default App;
