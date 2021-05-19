import { Box } from './Box';
import './MineBox.scss';

export interface Handlers {
    onclickdown: (box: MineBox) => unknown;
    onclickup: (box: MineBox) => unknown;
    onrclick: (box: MineBox) => unknown;
}

export class MineBox {
    private container: HTMLDivElement;
    private contents: HTMLDivElement;
    private btn: HTMLButtonElement;
    private disabled: boolean = false;
    private _isSwitched: boolean = false;

    constructor(private _box: Box, private readonly handlers: Handlers, public readonly parent: HTMLDivElement) {
        this.container = document.createElement('div');
        this.container.style.gridRow = `${_box.row + 1}`;
        this.container.style.gridColumn = `${_box.col + 1}`;

        this.container.classList.add('mine-box');

        // for now, we have our button!
        this.btn = document.createElement('button');
        this.btn.classList.add('mine-btn', 'unknown');
        const flag = document.createElement('icon');
        flag.classList.add('fad', 'fa-flag');
        this.btn.appendChild(flag);
        this.contents = document.createElement('div');
        if (this.box.mines === -1) {
            const icon = document.createElement('i');
            icon.classList.add('fad', 'fa-bomb');
            this.contents.appendChild(icon);
            this.contents.className = 'bomb';
        } else if (this.box.mines > 0) {
            this.contents.textContent = `${_box.mines}`;
            this.contents.className = `b${_box.mines}`;
        }
        this.btn.onmousedown = (e) => {
            if (this.disabled) {
                return;
            }
            handlers.onclickdown(this);
        }
        this.btn.onmouseup = (e) => {
            if (this.disabled) {
                return;
            }
            if ((e.shiftKey && !this._isSwitched) || (!e.shiftKey && this._isSwitched)) {
                handlers.onrclick(this);
            } else {
                handlers.onclickup(this);
            }
        }

        this.container.appendChild(this.contents);
        this.container.appendChild(this.btn);
        this.parent.appendChild(this.container);
    }

    public get box(): Box {
        return this._box;
    }

    public get isSwitched(): boolean {
        return this._isSwitched;
    }

    public set isSwitched(sw: boolean) {
        if (sw) {
            this.btn.classList.add('switched');
        } else {
            this.btn.classList.remove('switched');
        }
        this._isSwitched = sw;
    }

    public click(): void {
        this.handlers.onclickup(this);
    }

    public cover(): void {
        this.btn.classList.add('unknown');
        this._box.isShown = false;
    }
    public uncover(): void {
        this._box.isShown = true;
        this.btn.classList.remove('unknown');
    }

    public flag(): void {
        this._box.flagged = true;
        this.btn.classList.add('flagged');
    }
    public unflag(): void {
        this._box.flagged = false;
        this.btn.classList.remove('flagged');
    }

    public disable(): void {
        this.disabled = true;
        this.btn.disabled = true;
    }
    public enable(): void {
        this.disabled = false;
        this.btn.disabled = false;
    }

    public tooMany(tooMany: boolean = true): void {
        if (tooMany) {
            this.container.classList.add('too-many');
        } else {
            this.container.classList.remove('too-many');
        }
    }
}