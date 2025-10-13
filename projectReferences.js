let project_references;
let content_holder;
let content_header;

let sort;
let ascending = false;

class tag {
    name;
    color;
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

class projectReference {
    element;

    constructor(title, image, image_alt, description, tags, date, recognition, featured, url) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.tags = tags;
        this.date = date;
        this.recognition = recognition;
        this.featured = featured;
        this.url = url;

        this.element = document.createElement("a");
        this.element.className = "content";
        this.element.href = url;
        this.element.target = "_blank";

        var image_ele = document.createElement("img");
        image_ele.src = image;
        image_ele.alt = image_alt;
        this.element.appendChild(image_ele);

        var text_holder = document.createElement("div");

        var title_ele = document.createElement("h2");
        title_ele.style = "text-align: center;";
        title_ele.innerText = "-= " + title + " =-";
        text_holder.appendChild(title_ele);

        var description_ele = document.createElement("p");
        description_ele.innerHTML = "&emsp;" + description;
        text_holder.appendChild(description_ele);

        var tag_container = document.createElement("div");
        tag_container.className = "tag_container";

        for (var i = 0; i < tags.length; i++) {
            var tag_ele = document.createElement("div");
            tag_ele.innerText = tags[i].name;
            tag_ele.style = "background-color: var(--" + tags[i].color + ");";
            tag_container.appendChild(tag_ele);
        }

        text_holder.appendChild(tag_container);

        this.element.appendChild(text_holder);
    }
}

function initializeReferences() {
    if (!project_references || project_references.length === 0) {
        project_references = [
            // Super Time Out!!
            new projectReference("Super Time Out!!", "Resources/SuperTimeOut.png", "Super Time Out - Title Screen",
                "WPI IGDA New Tech 2025 Submission. A small Super Punch Out clone that plays with latency restricting reaction time windows.",
                [new tag("Jam", "wine"), new tag("Solo", "wine"),
                    new tag("Pico-8", "redwood"), new tag("2D", "redwood"),
                    new tag("2025", "wine")],
                new Date(2025, 8), 7, 6,
                "https://thetwofingeredglove.itch.io/super-time-out"),

            // In The Loop
            new projectReference("In The Loop", "Resources/InTheLoop.png", "In The Loop - Title Screen",
                "GMTK2025 Submission. A light-hearted puzzle game testing adaptation to peculiar, golfing-inspired movement.",
                [new tag("Jam", "wine"), new tag("Ranked", "wine"), new tag("Team", "wine"),
                    new tag("Godot", "redwood"), new tag("3D", "redwood"),
                    new tag("2025", "wine")],
                new Date(2025, 7), 2, 3,
                "https://thetwofingeredglove.itch.io/in-the-loop"),

            // It's All In The Delivery
            new projectReference("It's All In The Delivery", "Resources/ItsAllInTheDelivery.png", "It's All In The Delivery - Title Screen",
                "Ludum Dare 53 COMPO Submission. Help a socially anxious stand-up comic through a card game rendition of joke delivery.",
                [new tag("Jam", "wine"), new tag("COMPO", "wine"),
                    new tag("Unity", "redwood"), new tag("2D", "redwood"),
                    new tag("2023", "wine")],
                new Date(2023, 5), 3, 4,
                "https://thetwofingeredglove.itch.io/its-all-in-the-delivery"),

            // Parvescence
            new projectReference("Parvescence", "Resources/Parvescence.png", "Parvescence - Promotional Title",
                "DJam8 Submission. An atmospheric game of evolution and adaptation in a resource-scarce petri dish. 2nd place in audio out of ~200 submissions!",
                [new tag("Jam", "wine"), new tag("Ranked", "wine"), new tag("Solo", "wine"),
                    new tag("Unity", "redwood"), new tag("2D", "redwood"),
                    new tag("2024", "wine")],
                new Date(2024, 7), 0, 5,
                "https://thetwofingeredglove.itch.io/parvescence"),

            // Bullet Spell
            new projectReference("Bullet Spell", "Resources/BulletSpell.png", "Bullet Spell - Promotional Title",
                "Ludum Dare 54 COMPO submission and developed further. React swiftly as various enemy types bombard you according to a dynamic spawning directory.",
                [new tag("+Jam+", "wine"), new tag("COMPO", "wine"),
                    new tag("Unity", "redwood"), new tag("2D", "redwood"),
                    new tag("2023", "wine")],
                new Date(2023, 9), 5, 2,
                "https://thetwofingeredglove.itch.io/bullet-spell"),

            // Spider Shoot
            new projectReference("Spider Shoot", "Resources/SpiderShoot.png", "Spider Shoot - Promotional Title",
                "A small arcady final project of a college course made in a custom game engine of my own creation!",
                [new tag("Team", "wine"),
                    new tag("Dragonfly", "redwood"), new tag("2D", "redwood"),
                    new tag("2025", "wine")],
                new Date(2025, 9), 6, 0,
                "https://thetwofingeredglove.itch.io/spider-shoot"),

            // Gumdrop Grove
            new projectReference("Gumdrop Grove", "Resources/GumdropGrove.png", "Grumdrop Grove - Screenshot",
                "A dungeon crawler with a charming aesthetic that tasks the player with memorizing their way back through progressively more complicated mazes.",
                [new tag("+Jam+", "wine"), new tag("Solo", "wine"),
                    new tag("Godot", "redwood"), new tag("2D", "redwood"),
                    new tag("2024", "wine")],
                new Date(2024, 7), 4, 1,
                "https://thetwofingeredglove.itch.io/gumdrop-grove-arcade")
        ];}

    content_holder = document.getElementById("contentHolder");
    content_header = content_holder.innerHTML;

    // default arrangement
    orderByFeatured();
}

function setAscending(setTo = false) {
    console.log(setTo);
    if (ascending === setTo) return; // don't need to do anything

    ascending = setTo;
    order();

    if (ascending) {
        document.getElementById("sortUp").data = "Resources/upFilled.svg";
        document.getElementById("sortDown").data = "Resources/downEmpty.svg";
    } else {
        document.getElementById("sortUp").data = "Resources/upEmpty.svg";
        document.getElementById("sortDown").data = "Resources/downFilled.svg";
    }
}

function setSelectedVisual(id) {
    document.getElementsByClassName("sortSelected")[0].className = "sortOption"; // deselect current
    document.getElementById(id).className = "sortOption sortSelected"; // select specified
}

function orderByFeatured() {
    sort = (a, b) => a.featured - b.featured;
    setSelectedVisual("FeaturedSort");
    order();
}

function orderByDate() {
    sort = (a, b) => b.date - a.date;
    setSelectedVisual("DateSort");
    order();
}

function orderByRecognition() {
    sort = (a, b) => a.recognition - b.recognition;
    setSelectedVisual("RecognitionSort");
    order();
}

function order() {
    while (content_holder.children.length > 2) {
        content_holder.removeChild(content_holder.lastChild);
      }

    // sorts by criteria
    project_references.sort((a, b) => (sort(a, b) * (ascending ? -1 : 1)));

    content_holder.re

    for (var i = 0; i < project_references.length; i++) {
        content_holder.appendChild(project_references[i].element);
    }
}