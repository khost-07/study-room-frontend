'use client';
import { forwardRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

const WhiteboardCanvas = forwardRef<any, any>((props, ref) => {
    return <CanvasDraw ref={ref} {...props} />;
});

WhiteboardCanvas.displayName = 'WhiteboardCanvas';

export default WhiteboardCanvas;
