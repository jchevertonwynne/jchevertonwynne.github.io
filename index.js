class Circle {
    constructor(canvas, duration) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.duration = duration
        this.start = new Date()
    }

    drawCircle() {
        drawBackground(this.ctx, this.canvas.width, this.canvas.height)
        const diff = new Date() - this.start
        const percentage = diff / (this.duration * 10) % 100

        this.ctx.beginPath()
        this.ctx.strokeStyle = "red"
        this.ctx.lineWidth = this.canvas.width / 10
        this.ctx.arc(this.canvas.width / 2, this.canvas.width / 2, this.canvas.width / 2 * 0.8, -Math.PI / 2, (2 * Math.PI * percentage / 100) - (Math.PI / 2))
        this.ctx.stroke()

        this.ctx.fillStyle = "white"
        this.ctx.font = "48px sans-serif"
        this.ctx.textAlign = "left"
        this.ctx.fillText(this.duration, 20, 60)
        this.ctx.textAlign = "right"
        this.ctx.fillText(Math.floor(diff / (this.duration * 1000)), this.canvas.width - 20, 60)

        const seconds = Math.floor(diff / 1000)
        const milliseconds = Math.floor(100 * ((diff / 1000)  % 1)) / 100

        this.ctx.font = "10em sans-serif"
        const millisecondsText = ("" + milliseconds).slice(1) || ".00"
        const w = this.canvas.width / 2;
        const h = this.canvas.width / 2;
        if (!this.offset) {
            this.offset = this.ctx.measureText(millisecondsText).actualBoundingBoxAscent * 1.1
        }
        const h2 = h + this.offset;

        this.ctx.fillText(seconds % this.duration, w, h)
        this.ctx.textAlign = "left"
        this.ctx.fillText(millisecondsText, w, h)

        this.ctx.textAlign = "right"
        this.ctx.font = "5em sans-serif"
        this.ctx.fillText(seconds, w, h2)
        this.ctx.textAlign = "left"
        this.ctx.fillText(millisecondsText, w, h2)
    }
}

function drawBackground(ctx, width, height) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}

function parseAndStart() {
    const time = parseInt(timeSelect.value)
    if (time <= 0 || isNaN(time)) {
        return
    }
    startNewtimer(time)
}

function startNewtimer(time) {
    if (this.interval !== undefined) {
        clearInterval(this.interval)
    }
    const circle = new Circle(canvas, time)
    this.interval = setInterval(() => circle.drawCircle(), 10)
}

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
    for (const optDiv of options) {
        optDiv.style.height = (window.innerHeight - window.innerWidth) / 2
    }
    drawBackground(canvas.getContext("2d"))
}

const options = document.getElementsByClassName("options")
const timeSelect = document.getElementById("time-select")
const timeSubmit = document.getElementById("time-submit")
const time45 = document.getElementById("time-45")
const time60 = document.getElementById("time-60")
const canvas = document.getElementById("canvas");

window.onresize = setCanvasSize
setCanvasSize()
drawBackground(canvas.getContext("2d"))

timeSubmit.addEventListener("click", parseAndStart)

timeSelect.addEventListener("keyup", event => event.key === "Enter" && parseAndStart())

time45.addEventListener("click", () => startNewtimer(45))

time60.addEventListener("click", () => startNewtimer(60))
