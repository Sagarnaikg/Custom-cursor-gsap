import Cursor from "./cursor";
import { gsap } from "gsap";

let body = document.querySelector("body");

window.onload = () => {
  gsap.to(body, { duration: 2, visibility: "visible", opacity: 1 });

  const cursor = new Cursor(document.querySelector(".cursor"));
};
