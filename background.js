var palette = [];
// palette["ecru"] = "#D8BD8A";
palette["redwood"] = "#AA5042";
palette["wine"] = "#753742";
palette["mortuum"] = "#4F3130";

const numSquares = 100;
const numBars = 0;
const horizontalMargin = 20;
const blurScale = 1;
const navHeight = 60;

var parallaxParent;
var parallaxElements;

let loaded = false;

function createParallax() {
    // establish connection to where
    parallaxParent = document.getElementById("parallax");
    parallaxParent.className = "parallax";
    if (parallaxParent === null) {
        loaded = false;
        return;
    }
    parallaxElements = []

    // build side bars
   parallaxParent.insertAdjacentHTML(
       "afterbegin",
       '<div class="pillar" style="left:0; top:0; background-color:var(--mortuum); z-index:0;"></div>\n' +
       '      <div class="pillar" style="left:0; top:0; width:7.5vw; background-color:var(--wine); z-index:-4;"></div>\n' +
       '      <div class="pillar" style="left:0; top:0; width:9vw;background-color:var(--redwood); z-index:-7;"></div>\n' +
       '      \n' +
       '      <div class="pillar" style="right:0; top:0; background-color:var(--mortuum); z-index:0;"></div>\n' +
       '      <div class="pillar" style="right:0; top:0; width:7.5vw; background-color:var(--wine); z-index:-4;"></div>\n' +
       '      <div class="pillar" style="right:0; top:0; width:9vw; background-color:var(--redwood); z-index:-7;"></div>'
   );


    for (let i = 0; i < parallaxElements.length; i++) {
        let depth = parallaxElements[i].style.zIndex;
        let blur = blurScale * (Math.pow(depth / -10, 2));
        parallaxElements[i].style.filter = "blur(" + blur + "px)";
    }

    let pageHeight = document.body.scrollHeight

    // populate parallax squares
    for (let i = 0; i < numSquares; i++) {
        let y = pageHeight * Math.random();

        let t = .5 - .9 * Math.cbrt(Math.random() / 4 - .125)
        let x = (visualViewport.width - horizontalMargin * 2) * t + horizontalMargin;
        let from = "left:";
        if (x > visualViewport.width / 2) {
            x = visualViewport.width - x;
            from = "right:";
        }

        let w = Math.random() * 12.5 + 12.5;
        // let w = 25;
        let h = Math.random() * 12.5 + 12.5;
        // let h = 25;
        // let rot = Math.random() * 360;
        let rot = 0;

        let keys = Object.keys(palette);
        let color = palette[keys[Math.floor(Math.random() * keys.length)]];

        let depth = Math.floor((1 - Math.random() * .9) * -9);
        let blur = blurScale * (Math.pow(depth / -10, 2));

        parallaxParent.insertAdjacentHTML("beforeend", "<div class='square' style='"
            + from + x + "px; top:" + y
            + "px; background-color:" + color
            + "; rotate:" + rot + "deg; filter:blur(" + blur
            + "px); width:" + w + "px; height:" + h
            + "px; z-index:" + depth + "; translate: transform(0);'></div>");
    }

    // populate parallax bars
    for (let i = 0; i < numBars; i++) {
        let y = pageHeight * Math.random();

        let selected = Math.floor((Math.random() * 3));
        let depths = [0, -4, -7];
        let depth = depths[selected];
        let blur = blurScale * (Math.pow(depth / -10, 2));
        let colors = ["claret", "crayola", "flax"]
        let color = palette[colors[selected]];

        let h = Math.random() * 25 + 25;
        let rot = 0;

        parallaxParent.insertAdjacentHTML("beforeend", "<div class='bar' style='top:"
            + y + "px; background-color:" + color
            + "; rotate:" + rot + "deg; filter:blur(" + blur
            + "px); z-index:" + depth + "; translate: transform(0);"
            + "height:" + h + "px;'></div>");

            console.log(depth);
    }

    // gather parallax elements
    parallaxElements = parallaxParent.children;

    loaded = true;
}

addEventListener("unload", (event) => {
    loaded = false;
})

// background shape ids are used as depths
addEventListener("scroll", (event) => {
    if (!loaded) { return; }

    let scroll = window.scrollY;
    for (let i = 0; i < parallaxElements.length; i++) {
        if (parallaxElements[i].className != "pillar") {
            parallaxElements[i].style.transform = "translate(0," + (-scroll * (1 - window.getComputedStyle(parallaxElements[i]).zIndex / -10.0)) + "px)";
        }
    }
})

function projectScatter() {
    parallaxParent = document.getElementById("scatter");
    parallaxParent.className = "parallax";
    if (parallaxParent === null) {
        loaded = false;
        return;
    }
    parallaxElements = []

    let pageHeight = document.body.scrollHeight

    // populate parallax squares
    for (let i = 0; i < numSquares; i++) {
        let canvas_width = (visualViewport.width - horizontalMargin * 2)
        let canvas_height = (visualViewport.height + 20 - navHeight);

        let x = Math.random() * canvas_width;
        let t = .5 - .9 * Math.cbrt(Math.random() / 4 - .125)
        let y = canvas_height * t + navHeight;

        let w = Math.random() * 12.5 + 12.5;
        // let w = 25;
        let h = Math.random() * 12.5 + 12.5;
        // let h = 25;
        // let rot = Math.random() * 360;
        let rot = 0;

        let keys = Object.keys(palette);
        let color = palette[keys[Math.floor(Math.random() * keys.length)]];

        let depth = Math.floor((1 - Math.random() * .9) * -9);
        let blur = blurScale * (Math.pow(depth / -10, 2));

        parallaxParent.insertAdjacentHTML("beforeend", "<div class='square' style='"
            + "left:" + x + "px; top:" + y
            + "px; background-color:" + color
            + "; rotate:" + rot + "deg; filter:blur(" + blur
            + "px); width:" + w + "px; height:" + h
            + "px; z-index:" + depth + "; translate: transform(0);'></div>");
    }
}