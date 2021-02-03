import ReactCarousel from "./components/ReactCarousel";
import images from "./images";

import "./styles/App.style.scss";

function App() {
    return (
        <ReactCarousel
            images={images[0]}
            imageStyle={{
                borderRadius: "20px",
                boxShadow: "0 7px 20px 2px rgb(150, 170, 180)",
                margin: "1rem",
            }}
            imageBackgroundStyle={{
                backgroundColor: "#ece4db",
                borderRadius: "3px",
                boxShadow: "8px 12px 14px -6px black",
            }}
            containerBackgroundStyle={{
                filter: "blur(7px)",
                backgroundColor: "rgba(62, 212, 214, 0.3)",
            }}
            itemMaxWidth={50}
            itemMaxHeight="500px"
        />
    );
}

export default App;
