import React, {useState} from "react";
import ReactDOM from "react-dom";
import MainPage from './components/MainPage';
import "./styles/main.scss";


const App = () => {
    const [counter, setCounter] = useState(0);

    return (
        <div>
            <MainPage />
        </div>
    )
};

// Router
//  - login page (/login or index)
//      - header
//      - main
//          - menu
//              - button
//              - other links
//      - footer
//  - lobby page (/lobby)
//  - gameboard page (/game/:id)

ReactDOM.render(
    <App/>,
    document.getElementById("root"),
);
