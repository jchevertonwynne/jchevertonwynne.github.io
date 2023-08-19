const body = document.getElementById("body")
const options = document.getElementsByClassName("options")
const timeSelect = document.getElementById("time-select")
const timeSubmit = document.getElementById("time-submit")
const time45 = document.getElementById("time-45")
const time60 = document.getElementById("time-60")
const canvas = document.getElementById("canvas");

function drawBackground(canvas) {
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

class Circle {
    constructor(canvas, duration) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.duration = duration
        this.start = new Date()
    }

    drawCircle() {
        const diff = new Date() - this.start
        const percentage = diff / (this.duration * 10) % 100
        drawBackground(this.canvas)
        this.ctx.beginPath()
        this.ctx.strokeStyle = "red"
        this.ctx.lineWidth = this.canvas.width / 10
        this.ctx.arc(this.canvas.width / 2, this.canvas.width / 2, this.canvas.width / 2 * 0.8, -Math.PI / 2, (2 * Math.PI * percentage / 100) - (Math.PI / 2))
        this.ctx.stroke()
        this.ctx.fillStyle = "white"
        this.ctx.font = "48px serif"
        this.ctx.textAlign = "left"
        this.ctx.fillText(this.duration, 20, 60)
        this.ctx.font = "10em serif"
        this.ctx.textAlign = "center"
        const seconds = Math.round(diff / 1000)
        const milliseconds = Math.round(100 * ((diff / 1000)  % 1)) / 100
        this.ctx.textAlign = "right"
        this.ctx.fillText(seconds, this.canvas.width / 2, this.canvas.width / 2)
        this.ctx.textAlign = "left"
        this.ctx.fillText(("" + milliseconds).slice(1) || ".00", this.canvas.width / 2, this.canvas.width / 2)
    }
}

let interval = undefined;

window.onresize = setCanvasSize
setCanvasSize()
drawBackground(canvas)

function parseAndStart() {
    const time = parseInt(timeSelect.value)
    if (time == 0 || isNaN(time)) {
        return
    }
    startNewtimer(time)
}

function startNewtimer(time) {
    if (interval !== undefined) {
        clearInterval(interval)
    }
    const circle = new Circle(canvas, time)
    interval = setInterval(() => circle.drawCircle(), 10)
}

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    for (const optDiv of options) {
        optDiv.style.height = (window.innerHeight - window.innerWidth) / 2
    }
    drawBackground(canvas)
}

timeSubmit.addEventListener("click", parseAndStart)

timeSelect.addEventListener("keyup", event => {
    console.log(event)
    if (event.key != "Enter") {
        return;
    }
    parseAndStart()
})

time45.addEventListener("click", () => {
    startNewtimer(45)
})

time60.addEventListener("click", () => {
    startNewtimer(60)
})
