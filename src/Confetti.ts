import './Confetti.scss';

interface Particle {
    color: string;
    color2: string;
    x: number;
    y: number;
    diameter: number;
    tilt: number;
    tiltAngleIncrement: number;
    tiltAngle: number;
}

export class Confetti {
    public maxCount: number = 150;
    public speed: number = 2;
    public frameInterval: number = 15;
    public alpha: number = 1.0;
    public gradient: boolean = false;

    private readonly supportsAnimationFrame = (window.requestAnimationFrame ?? window.webkitRequestAnimationFrame) !== undefined;
    private readonly colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];

    private streamingConfetti: boolean = false;
    private hasPaused: boolean = false;
    private lastFrameTime: number = Date.now();
    private particles: Particle[] = [];
    private waveAngle: number = 0;
    private context: CanvasRenderingContext2D|null = null;
    private innerWidth: number;
    private innerHeight: number;

    constructor() {
        this.innerWidth = document.documentElement.scrollWidth*0.99;
        this.innerHeight = document.documentElement.scrollHeight;
    }

    private resetParticle = (particle: Particle, width: number, height: number): Particle => {
        particle.color = this.colors[(Math.random() * this.colors.length) | 0] + (this.alpha + ")");
        particle.color2 = this.colors[(Math.random() * this.colors.length) | 0] + (this.alpha + ")");
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = Math.random() * Math.PI;
        return particle;
    }

    public toggleConfettiPause = (): void => {
        if (this.hasPaused) {
            this.resumeConfetti();
        } else {
            this.pauseConfetti();
        }
    }

    public isConfettiPaused = (): boolean => {
        return this.hasPaused;
    }

    public pauseConfetti = (): void => {
        this.hasPaused = true;
    }

    public resumeConfetti = (): void => {
        this.hasPaused = false;
        this.runAnimation();
    }

    private runAnimation = (): void => {
        if (this.hasPaused) {
            return;
        } else if (this.particles.length === 0) {
            this.context?.clearRect(0, 0, this.innerWidth, this.innerHeight);
            window.requestAnimationFrame(this.runAnimation);
        } else {
            const now = Date.now();
            const delta = now - this.lastFrameTime;
            if ((!this.supportsAnimationFrame || delta > this.frameInterval) && this.context !== null) {
                this.context?.clearRect(0, 0, this.innerWidth, this.innerHeight);
                this.updateParticles();
                this.drawParticles(this.context);
                this.lastFrameTime = now - (delta % this.frameInterval);
            }
            window.requestAnimationFrame(this.runAnimation);
        }
    }
    
    public start = (): void => {
        this.startConfetti();
    }
    public stop = (): void => {
        this.stopConfetti();
    }

    private startConfetti = (timeout?: number, min?: number, max?: number): void => {
        const animator = () => {
            return window.requestAnimationFrame
                ?? window.webkitRequestAnimationFrame
                ?? (callback => window.setTimeout(callback, this.frameInterval));
        }
        this.innerWidth = document.documentElement.scrollWidth*0.99;
        this.innerHeight = document.documentElement.scrollHeight;
        window.requestAnimationFrame = animator();
        let canvas = document.querySelector<HTMLCanvasElement>('#confettiCanvas');
        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "confettiCanvas");
            document.body.prepend(canvas);
            canvas.width = this.innerWidth;
            canvas.height = this.innerHeight;
            const sizer = () => {
                this.innerWidth = document.documentElement.scrollWidth * 0.99;
                this.innerHeight = document.documentElement.scrollHeight;
                if (canvas !== null) {
                    canvas.width = this.innerWidth;
                    canvas.height = this.innerHeight;
                }
            };
            window.addEventListener('resize', sizer, true);
            window.setInterval(sizer, 1000);
            this.context = canvas.getContext("2d");
        } else if (this.context === null) {
            this.context = canvas.getContext("2d");
        }
        let count = this.maxCount;
        if (min) {
            if (max) {
                if (min === max) {
                    count = this.particles.length + max;
                } else {
                    if (min > max) {
                        const temp = min;
                        min = max;
                        max = temp;
                    }
                    count = this.particles.length + ((Math.random() * (max - min) + min) | 0);
                }
            } else {
                count = this.particles.length + min;
            }
        } else if (max) {
            count = this.particles.length + max;
        }
        while (this.particles.length < count) {
            this.particles.push(this.resetParticle({} as Particle, this.innerWidth, this.innerHeight));
        }
        this.streamingConfetti = true;
        this.hasPaused = false;
        this.runAnimation();
        if (timeout) {
            window.setTimeout(this.stopConfetti, timeout);
        }
    }

    private stopConfetti = (): void => {
        this.streamingConfetti = false;
    }

    public removeConfetti = (): void => {
        this.stopConfetti();
        this.hasPaused = false;
        this.particles = [];
    }

    public toggleConfetti = (): void => {
        if (this.streamingConfetti) {
            this.stopConfetti();
        } else {
            this.startConfetti();
        }
    }
    
    public isConfettiRunning = (): boolean => {
        return this.streamingConfetti;
    }

    private drawParticles = (context: CanvasRenderingContext2D): void => {
        this.particles.forEach(particle => {
            context.beginPath();
            context.lineWidth = particle.diameter;
            const x2 = particle.x + particle.tilt;
            const x = x2 + particle.diameter / 2;
            const y2 = particle.y + particle.tilt + particle.diameter / 2;
            if (this.gradient) {
                const gradient = context.createLinearGradient(x, particle.y, x2, y2);
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1.0, particle.color2);
                context.strokeStyle = gradient;
            } else {
                context.strokeStyle = particle.color;
            }
            context.moveTo(x, particle.y);
            context.lineTo(x2, y2);
            context.stroke();
        });
    }

    private updateParticles = (): void => {
        this.waveAngle += 0.01;
        this.particles.forEach((particle, i) => {
            if (!this.streamingConfetti && particle.y < -15) {
                particle.y = this.innerHeight + 100;
            } else {
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(this.waveAngle) - 0.5;
                particle.y += (Math.cos(this.waveAngle) + particle.diameter + this.speed) * 0.5;
                particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }
            if (particle.x > this.innerWidth || particle.x < -20 || particle.y > this.innerHeight) {
                if (this.streamingConfetti && this.particles.length <= this.maxCount) {
                    this.resetParticle(particle, this.innerWidth, this.innerHeight);
                } else {
                    this.particles.splice(i, 1);
                }
            }
        });
    }
}