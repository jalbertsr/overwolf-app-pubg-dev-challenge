/*global overwolf*/

const SIGNIFICANT_MOUSE_MOVE_THRESHOLD = 1;

class DragService {
  constructor(currentWindow, element) {
    this.currentWindow = currentWindow;
    this.initialMousePosition = 0;
    this.isMouseDown = false;

    element.addEventListener('mousedown', this.onDragStart.bind(this));
    element.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  _isSignificantMouseMove(event) {
    if (!this.initialMousePosition) {
      return false;
    }

    const x = event.clientX;
    const y = event.clientY;
    const diffX = Math.abs(x - this.initialMousePosition.x);
    const diffY = Math.abs(y - this.initialMousePosition.y);
    const isSignificant =
      diffX > SIGNIFICANT_MOUSE_MOVE_THRESHOLD ||
      diffY > SIGNIFICANT_MOUSE_MOVE_THRESHOLD;

    return isSignificant;
  }

  onDragStart(event) {
    this.isMouseDown = true;
    this.initialMousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  onMouseMove(event) {
    if (!this.isMouseDown) {
      return;
    }

    const isSignificantMove = this._isSignificantMouseMove(event);
    if (!isSignificantMove) {
      return;
    }

    this.isMouseDown = false;

    if (this.currentWindow) {
      overwolf.windows.dragMove(this.currentWindow.id);
    }
  }
}

export default DragService;
