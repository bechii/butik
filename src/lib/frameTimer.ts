export type timerCallback = (progress: number) => void;

export class FrameTimer {
	private _request: number;
	private _startTimestamp: number;
	private _duration: number;
	private _callback: timerCallback;

	public stop(): void {
		cancelAnimationFrame(this._request);
	}

	public start(duration: number, callback: timerCallback): void {
		this.stop();
		this._duration = duration;
		this._callback = callback;
		requestAnimationFrame((timestamp) => this._startTimestamp = timestamp);
		this._request = requestAnimationFrame((timestamp) => this.update(timestamp));
	}

	private update(timestamp: number): void {
		let progress = timestamp - this._startTimestamp;
		progress = Math.min(this._duration, progress);
		this._callback(progress);

		if (progress !== this._duration) {
			this._request = requestAnimationFrame((timestamp) => this.update(timestamp));
		}
	}
}
