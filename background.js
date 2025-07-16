var palette = [];
// palette["celadon"] = "#BCD8C1";
palette["vanilla"] = "#F3E5AB";
// palette["flax"] = "#E3D985";
palette["crayola"] = "#E57A44";
palette["claret"] = "#740F35";

const numElements = 50;
const horizontalMargin = 50;

var parallaxParent;
var parallaxElements;
var parallaxInitials;
var parallaxDepths;

addEventListener("load", (event) => {
    // recollect on load
    parallaxParent = document.getElementsByClassName("parallax")[0];
    parallaxElements = [];
    parallaxInitials = [];
    parallaxDepths = [];

    let pageHeight = document.documentElement.scrollHeight

    // make depths coherent with overlap
    for (let i = 0; i < numElements; i++) {
        parallaxDepths.push(1 - Math.random() * .9);
    }
    parallaxDepths.sort();

    // populate parallax elements
    for (let i = 0; i < numElements; i++) {
        let y = pageHeight * Math.random();
        parallaxInitials.push(y);

        let x = (visualViewport.width - horizontalMargin * 2) * Math.random() + horizontalMargin;
        let from = "left:";
        if (x > visualViewport.width / 2) {
            x = visualViewport.width - x;
            from = "right:";
        }

        // let rot = Math.random() * 360;
        let rot = 0;

        let keys = Object.keys(palette);
        let color = palette[keys[Math.floor(Math.random() * keys.length)]];

        let blur = 4 * (Math.pow(1 - parallaxDepths[i], 2));

        parallaxParent.insertAdjacentHTML("beforeend", "<div class='square' style='"
            + from + x + "px; top:" + y
            + "px; background-color:" + color
            + "; rotate:" + rot + "deg; filter: blur(" + blur
            + "px);'></div>");
    }

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