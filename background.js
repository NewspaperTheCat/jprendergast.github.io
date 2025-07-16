var palette = [];
// palette["celadon"] = "#BCD8C1";
palette["vanilla"] = "#F3E5AB";
// palette["flax"] = "#E3D985";
palette["crayola"] = "#E57A44";
palette["claret"] = "#740F35";
console.log(palette);

const numElements = 25;
const horizontalMargin = 50;
const pageHeight = 1000;

var parallaxParent;
var parallaxElements;
var parallaxInitials;
var parallaxDepths;

addEventListener("load", (event) => {
    console.log("hello")
    // recollect on load
    parallaxParent = document.getElementsByClassName("parallax")[0];
    parallaxElements = [];
    parallaxInitials = [];
    parallaxDepths = [];

    // populate parallax elements
    for (let i = 0; i < numElements; i++) {
        let y = pageHeight * Math.random();
        parallaxInitials.push(y);

        parallaxDepths.push(1 - Math.random() * .9);

        let x = 100 * Math.random();

        let rot = Math.random() * 360;

        let keys = Object.keys(palette);
        let color = palette[keys[Math.floor(Math.random() * keys.length)]];

        parallaxParent.insertAdjacentHTML("beforeend", "<div class='square' style='left:" + x + "%; top:" + y + "px; background-color:" + color + "; rotate:" + rot + "deg;'></div>");
    }

    // make depths coherent with overlap
    parallaxDepths.sort();

    // gather parallax elements
    parallaxElements = parallaxParent.children;
})

// background shape ids are used as depths
addEventListener("scroll", (event) => {
    let scroll = window.scrollY;
    for (let i = 0; i < parallaxElements.length; i++) {
        parallaxElements[i].style.top = (parallaxInitials[i] - scroll * parallaxDepths[i]) + "px";
    }
})