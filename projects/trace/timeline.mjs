import { prediction } from './engine.mjs';

// One teaching clock; each comparison lane keeps its own operation history.
export class Timeline {
  constructor(traces) {
    if (!Array.isArray(traces) || !traces.length || traces.some(t => !t.length)) throw new Error('A timeline needs nonempty traces.');
    this.traces = Object.freeze([...traces]);
    this.index = 0;
    this.predictedAt = -1;
  }
  get last() { return Math.max(...this.traces.map(t => t.length)) - 1; }
  get done() { return this.index === this.last; }
  get frames() { return this.traces.map(t => t[Math.min(this.index, t.length - 1)]); }
  get nextPrediction() { return prediction(this.traces[0][this.index + 1]); }
  seek(index) {
    if (!Number.isInteger(index)) throw new Error('Frame index must be an integer.');
    this.index = Math.max(0, Math.min(index, this.last)); this.predictedAt = -1;
    return this.frames;
  }
  advance(predict = false) {
    if (this.done) return 'done';
    // A finished left lane cannot ask a question; the other lane may continue.
    if (predict && this.nextPrediction && this.predictedAt !== this.index) return 'predict';
    this.seek(this.index + 1); return 'advanced';
  }
  answer(value) {
    const expected = this.nextPrediction;
    if (!expected) return null;
    const correct = String(value).trim().toLowerCase() === expected.answer.toLowerCase();
    this.predictedAt = this.index;
    return { correct, expected: expected.answer };
  }
}
