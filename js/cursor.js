import { gsap } from "gsap";
import { lerp, getMousePos, getSiblings } from "./utils";

// set/get of mouse position
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse = getMousePos(e);
});

export default class Cursor {
  constructor(el) {
    this.Cursor = el;
    this.Cursor.style.opacity = 0;

    this.Item = document.querySelectorAll(".hero-inner-link-item");
    this.Hero = document.querySelector(".hero-inner-banner");

    this.cursorConfig = {
      x: { pre: 0, curnt: 0, amt: 0.2 },
      y: { pre: 0, curnt: 0, amt: 0.2 },
    };

    this.onScaleMouse();

    // mouse move function
    this.onMouseMove = () => {
      gsap.to(this.Cursor, { duration: 1, opacity: 1, ease: "power3.easeOut" });

      requestAnimationFrame(() => this.render());

      window.removeEventListener("mousemove", this.onMouseMove);
    };

    window.addEventListener("mousemove", this.onMouseMove);
  }

  render() {
    this.cursorConfig.x.curnt = mouse.x;
    this.cursorConfig.y.curnt = mouse.y;

    for (const key in this.cursorConfig) {
      this.cursorConfig[key].pre = lerp(
        this.cursorConfig[key].pre,
        this.cursorConfig[key].curnt,
        this.cursorConfig[key].amt
      );
    }

    this.Cursor.style.transform = `translate(${this.cursorConfig.x.pre}px,${this.cursorConfig.y.pre}px)`;

    requestAnimationFrame(() => this.render());
  }

  onScaleMouse() {
    this.Item.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        this.selectElement(link, 0.4);
      });

      link.addEventListener("mouseleave", (e) => {
        this.selectElement(link, 0);
      });

      link.children[1].addEventListener("mouseenter", (e) => {
        this.selectElement(link, 0.8);
      });
    });
  }

  selectElement(el, scale) {
    let src = el.getAttribute("data-vedio-src");
    let video = document.querySelector(`#${src}`);

    document.querySelectorAll(".cursor-media").forEach((cursorMedia) => {
      if (cursorMedia.children[0].getAttribute("id") == src) {
        this.scaleAnimation(cursorMedia, scale);
      } else {
        cursorMedia.style.scale = 0;
      }
    });
  }

  scaleAnimation(element, scale, duration = 0.6) {
    gsap.to(element, {
      duration: duration,
      scale: scale,
      ease: "power3.easeOut",
    });
  }
}
