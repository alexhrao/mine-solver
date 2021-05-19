var MineBox = /** @class */ (function () {
    function MineBox(_box, onKill) {
        var _this = this;
        this._box = _box;
        this.onKill = onKill;
        this.container = document.createElement('div');
        this.container.classList.add('mine-box');
        // for now, we have our button!
        this.btn = document.createElement('button');
        this.btn.classList.add('mine-btn', 'unknown');
        this.contents = document.createElement('span');
        if (this.box.mines === -1) {
            this.contents.textContent = 'X';
        }
        else if (this.box.mines === 0) {
            this.contents.textContent = '';
        }
        else {
            this.contents.textContent = "" + _box.mines;
        }
        this.btn.onclick = function () {
            _box.isShown = true;
            if (_box.mines === -1) {
                // get killed
                _this.onKill();
                // show bomb
                return;
            }
            else {
                _this.btn.classList.remove('unknown');
                // show it...
            }
        };
        this.btn.oncontextmenu = function () {
            // show the flag... oh boy, we get font awesome!
        };
        this.parent = document.createElement('div');
        this.container.appendChild(this.contents);
        this.container.appendChild(this.btn);
        this.parent.appendChild(this.container);
    }
    Object.defineProperty(MineBox.prototype, "box", {
        get: function () {
            return this.box;
        },
        enumerable: false,
        configurable: true
    });
    MineBox.prototype.cover = function () {
        this.btn.classList.add('unknown');
        this.box.isShown = false;
    };
    MineBox.prototype.tooMany = function (tooMany) {
        if (tooMany === void 0) { tooMany = true; }
        if (tooMany) {
            this.container.classList.add('too-many');
        }
        else {
            this.container.classList.remove('too-many');
        }
    };
    return MineBox;
}());
export { MineBox };
