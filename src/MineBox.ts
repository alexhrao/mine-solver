import { Box } from './Box';
import './MineBox.scss';

export interface Handlers {
    onclick: () => unknown;
    onrclick: () => unknown;
}

export class MineBox {
    private container: HTMLDivElement;
    private contents: HTMLDivElement;
    private btn: HTMLButtonElement;

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
        this.btn.onclick = () => {
            if (_box.flagged) {
                return;
            }
            this.uncover();
            this.handlers.onclick();
        }

        this.btn.oncontextmenu = (e) => {
            // show the flag... oh boy, we get font awesome!
            e.preventDefault();
            if (this._box.flagged) {
                this._box.flagged = false;
                this.btn.classList.remove('flagged');
            } else {
                this._box.flagged = true;
                this.btn.classList.add('flagged');
            }
            this.handlers.onrclick();
        }

        this.container.appendChild(this.contents);
        this.container.appendChild(this.btn);
        this.parent.appendChild(this.container);
    }

    public get box(): Box {
        return this._box;
    }

    public cover(): void {
        this.btn.classList.add('unknown');
        this._box.isShown = false;
    }
    public uncover(): void {
        this._box.isShown = true;
        this.btn.classList.remove('unknown');
    }
    public tooMany(tooMany: boolean = true): void {
        if (tooMany) {
            this.container.classList.add('too-many');
        } else {
            this.container.classList.remove('too-many');
        }
    }
}