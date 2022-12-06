import RootStack from "./src/navigators/RootStack";
import store from "./src/redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}
