let project_references;
let content_holder;
let content_header;

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

    constructor(title, image, image_alt, description, tags, date) {
        this.title = title;
        this.image = image;
        this.description = description;
        this.tags = tags;
        this.date = date;

        this.element = document.createElement("div");
        this.element.className = "content";

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
        description_ele.innerText = "\t" + description;
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
            new projectReference("Super Time Out", "Resources/SuperTimeOut.png", "Super Time Out - Title Screen",
                "WPI IGDA New Tech 2025 Submission. A small Super Punch Out clone that plays with latency restricting reaction time windows.",
                [new tag("Jam", "wine"), new tag("Ranked", "wine"), new tag("Solo", "wine"),
                    new tag("Pico-8", "redwood"), new tag("2D", "redwood"),
                    new tag("2025", "wine")],
                new Date(2025, 8)),

            new projectReference("In The Loop", "Resources/InTheLoop.png", "In The Loop - Title Screen",
                "GMTK2025 Submission. A light-hearted puzzle game testing adaptation to peculiar, golfing-inspired movement.",
                [new tag("Jam", "wine"), new tag("Ranked", "wine"), new tag("Team", "wine"),
                    new tag("Godot", "redwood"), new tag("3D", "redwood"),
                    new tag("2025", "wine")],
                new Date(2025, 7)),

            new projectReference("Parvescence", "Resources/Parvescence.png", "Parvescence - Title Screen",
                "DJam8 Submission. An atmospheric game of evolution and adaptation in a resource-scarce petri dish.",
                [new tag("Jam", "wine"), new tag("Ranked", "wine"), new tag("Solo", "wine"),
                    new tag("Unity", "redwood"), new tag("2D", "redwood"),
                    new tag("2024", "wine")],
                new Date(2024, 7)),

            new projectReference("It's All In The Delivery", "Resources/ItsAllInTheDelivery.png", "It's All In The Delivery - Title Screen",
                "Ludum Dare 53 Submission. Help a socially anxious stand-up comic through a card game rendition of joke delivery.",
                [new tag("Jam", "wine"), new tag("Ranked", "wine"), new tag("Solo", "wine"),
                    new tag("Unity", "redwood"), new tag("2D", "redwood"),
                    new tag("2023", "wine")],
                new Date(2023, 5))
        ];}

    content_holder = document.getElementById("contentHolder");
    content_header = content_holder.innerHTML;

    // default arrangement
    orderByDate();
}

function orderByDate(ascending = false) {
    content_holder.innerHTML = content_header;

    // sorts by criteria
    project_references.sort((a, b) => (b.date - a.date) * ascending ? -1 : 1);

    for (var i = 0; i < project_references.length; i++) {
        content_holder.appendChild(project_references[i].element);
    }
}