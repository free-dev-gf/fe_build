import xmlData from "./data.xml";
import "./style.css";
import "./style.less";
import Img from "./pic.jpeg";
import printMe from "./print";
// import './login_modal';
// import './chart';
import(/* webpackPrefetch: true */ "./login_modal");
import(/* webpackPreload: true */ "./chart");
// import { cube } from './math.js';
import AudioPlayer from "./music.mp3";
import txt from "./test.txt";

async function component() {
    console.log("xmlData:", xmlData);
    console.log("AudioPlayer:", AudioPlayer);
    const element = document.createElement("div");
    const btn = document.createElement("button");

    // const { default: _ } = await import("lodash");
    element.innerHTML = join(["Hello123", "webpack123"], " ");

    // element.innerHTML = '5 cubed is equal to ' + cube(5);

    element.classList.add("hello");
    element.classList.add("world");

    const img = document.createElement("img");
    img.src = Img;
    element.appendChild(img);

    btn.innerHTML = "Click me and check the console!";
    btn.onclick = printMe;

    element.appendChild(btn);

    console.log(process.env.ASSET_PATH);

    // fetch("/api")
    //     .then((res) => res.text())
    //     .then((res) => console.log(res));

    return element;
}
component().then((res) => {
    document.body.appendChild(res);
    document.body.innerHTML += AudioPlayer;
    document.body.innerHTML += `<div>${txt}</div>`;
});
