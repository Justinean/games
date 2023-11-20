peggingBoard.style.display = "flex";
const peggingBoardWidth = peggingBoard.offsetWidth;
peggingBoard.style.display = "none";

for (let i = 1; i < 6; i++) {
    const pegHoleContainer = document.createElement("div");
    pegHoleContainer.style.display = "flex";
    pegHoleContainer.style.justifyContent = "space-around"
    pegHoleContainer.style.width = `${(peggingBoardWidth + 100) / (6 - i)}px`;
    pegHoleContainer.style.maxWidth = "500px";
    for (let j = 0; j < i; j++) {
        const pegHole = document.createElement("div");
        pegHole.style.backgroundColor = "#00000025";
        pegHole.style.width = "10px";
        pegHole.style.height = "10px";
        pegHole.style.borderRadius = "50%";
        pegHole.style.display = "flex";
        pegHole.style.justifyContent = "center";
        pegHole.style.alignItems = "center";
        // if (i === 1) pegHole.style.margin = `55px ${(.5 * peggingBoardWidth) - 5}px`;
        // if (i === 2) pegHole.style.margin = `45px ${(.25 * peggingBoardWidth) - 5}px`;
        // if (i === 3) pegHole.style.margin = `45px ${(.125 * peggingBoardWidth) - 5}px`;
        // if (i === 4) pegHole.style.margin = `45px ${(.06125 * peggingBoardWidth) - 5}px`;
        // if (i === 5) pegHole.style.margin = `45px ${(.0306125 * peggingBoardWidth) - 5}px`;
        pegHoleContainer.appendChild(pegHole)
    }
    pegHoles.style.width = "100%";
    pegHoles.appendChild(pegHoleContainer);
}


const findClosestOpenPeg = (element: HTMLElement) => {
    let closestDistance = {x: 0, y: 0};
    let closestElement;
    for (let i = 0; i < pegHoles.children.length; i++) {
        const parentElement = pegHoles.children[i] as HTMLDivElement
        for (let j = 0; j < i + 1; j++) {
            const rect = pegHoles.children[i].children[j].getBoundingClientRect();
            if (!closestElement) {
                closestDistance = {
                    x: Math.abs(mousePos.x - rect.left),
                    y: Math.abs(mousePos.y - rect.top)
                }
                closestElement = pegHoles.children[i].children[j] as HTMLDivElement;
            } else {
                const distance = {
                    x: Math.abs(mousePos.x - rect.left),
                    y: Math.abs(mousePos.y - rect.top)
                }
                console.log(parentElement.children[j])
                if (Math.sqrt(Math.pow(closestDistance.x, 2) + Math.pow(closestDistance.y, 2)) > Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2))) {
                    closestDistance = distance;
                    closestElement = pegHoles.children[i].children[j] as HTMLDivElement;
                }
            }
        }
    }
    console.log(closestElement)
    
    if (closestElement) {
        element.parentElement?.removeChild(element);
        closestElement.appendChild(element);
    }
    return null;
}

const colors = ["blue", "red", "yellow", "white"]

for (let i = 1; i < pegHoles.children.length; i++) {
    const parentElement = pegHoles.children[i] as HTMLDivElement
    for (let j = 0; j < parentElement.children.length; j++) {
        const peg = document.createElement("p");
        peg.setAttribute("class", "peggingPeg")
        peg.draggable = true;
        peg.ondragend = () => followMouseLoop = false;
        peg.style.backgroundColor = colors[i - 1];
        peg.style.minWidth = "40px";
        peg.style.height = "40px";
        peg.style.borderRadius = "50%";
        peg.style.margin = "0";
        parentElement.children[j].appendChild(peg)
    }
}

document.addEventListener("mousedown", (e: MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains("peggingPeg")) {
        const target = e.target as HTMLDivElement
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        followMouseLoop = true;
        target.style.position = "absolute";
        const followMouseInterval = setInterval(() => {
            console.log(followMouseLoop)
            if (!followMouseLoop) {
                console.log("boo")
                const closestOpenPeg: HTMLElement | null = findClosestOpenPeg(target) || null;
                if (closestOpenPeg) {
                    console.log(closestOpenPeg);
                }
                target.style.position = "static";
                target.style.top = "";
                target.style.left = "";
                clearInterval(followMouseInterval);
            }
            target.style.top = `${mousePos.y}`;
            target.style.left = `${mousePos.x}`;
        }, 10)
    }
})

document.addEventListener("mousemove", (e: MouseEvent) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
})