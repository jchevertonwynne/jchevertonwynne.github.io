const body = document.getElementById("body")
const timeSelect = document.getElementById("time-select")
const timeSubmit = document.getElementById("time-submit")
const time45 = document.getElementById("time-45")
const time60 = document.getElementById("time-60")
const canvas = document.getElementById("canvas");

function drawBackground(canvas) {
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
}

class Circle {
    constructor(canvas, duration) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.duration = duration
        this.start = new Date()
        this.active = true
        this.interval = setInterval(() => this.drawCircle(), 10)
    }

    drawCircle() {
        if (!this.active) {
            clearInterval(this.interval)
        }
        const diff = new Date() - this.start
        const percentage = diff / (this.duration * 10) % 100
        drawBackground(this.canvas)
        this.ctx.beginPath()
        this.ctx.strokeStyle = "blue"
        this.ctx.lineWidth = this.canvas.width / 10
        this.ctx.arc(this.canvas.width / 2, this.canvas.width / 2, this.canvas.width / 2 * 0.8, -Math.PI / 2, (2 * Math.PI * percentage / 100) - (Math.PI / 2))
        this.ctx.stroke()
        this.ctx.fillStyle = "black";
        this.ctx.font = "48px serif";
        this.ctx.textAlign = "left"
        this.ctx.fillText(Math.round(diff / 10) / 100, this.canvas.width / 2, this.canvas.width / 2)
        this.ctx.fillText(this.duration, 20, 60)
    }
}

let circle = undefined;

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
    if (circle !== undefined) {
        circle.active = false
    }
    circle = new Circle(canvas, time)
}

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
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
