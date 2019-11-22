import React, {useState} from "react";
import ReactDOM from "react-dom";

// import "./sass/style.scss";
import "./css/main.css";

const App = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div className="App">
            <h1>{counter}</h1>
            <button className="play-button" onClick={() => setCounter(counter + 1)}>Press me</button>
        </div>
    )
};

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
