﻿export class GameCanvas implements IGameCanvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    public onMoveEnd: (ev: PositionEvent) => any;
    public onMoveStart: (ev: PositionEvent) => any;
    public onMove: (ev: PositionEvent) => any;
    public onRender: () => void;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        
        this.canvas.onmousedown = this.onmousedown;
        this.canvas.onmouseup = this.onmouseup;
        this.canvas.onmousemove = this.onmousemove;
    }

    public resize(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx.imageSmoothingEnabled = false;
        this.onRender();
    }

    private onmousedown = (ev: MouseEvent): void => {
        this.onMoveStart(new PositionEvent(ev.offsetX, ev.offsetY));
    }

    private onmouseup = (ev: MouseEvent): void => {
        this.onMoveEnd(new PositionEvent(ev.offsetX, ev.offsetY));
    }

    private onmousemove = (ev: MouseEvent): void => {
        this.onMove(new PositionEvent(ev.offsetX, ev.offsetY));
    }
}

export interface IGameCanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    onMoveEnd: (ev: PositionEvent) => any;
    onMoveStart: (ev: PositionEvent) => any;
    onMove: (ev: PositionEvent) => any;

    onRender: () => void;

    resize(width: number, height: number): void;
}

export class PositionEvent {
    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    readonly x: number;
    readonly y: number;
}