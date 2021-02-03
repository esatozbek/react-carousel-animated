import ReactCarousel from "./components/ReactCarousel";
import images from "./images";

import "./styles/App.style.scss";

function App() {
    return <ReactCarousel images={images[0]} />;
}

export default App;
