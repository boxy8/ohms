import { useRef, useState, useEffect } from 'react'
import styles from './Canvas.module.css';

const Canvas = () => {
    // 114 x 114 dots
    const canvasSize = 1420;
    const borderSize = 83;
    const blockSize = 11;
    const dotDiam = 7;

    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // draw black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw dots
        ctx.fillStyle = 'white';
        for (let x = borderSize; x < canvas.width - borderSize; x += blockSize) {
            for (let y = borderSize; y < canvas.width - borderSize; y += blockSize) {
                ctx.beginPath();
                ctx.arc(x + blockSize / 2, y + blockSize / 2, dotDiam / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

    },[]);

    const fillNearestDot = (x, y) => {
        const ctx = canvasRef.current.getContext('2d');

        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;
    
        // for some reason the x doesn't need offsetting
        const scaledX = x * scaleX;
        const scaledY = (y - rect.top) * scaleY;

        // off by 5 pixels for some reason
        const roundedX = Math.round(scaledX / blockSize) * blockSize-5;
        const roundedY = Math.round(scaledY / blockSize) * blockSize-5;

        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(roundedX + blockSize / 2, roundedY + blockSize / 2, dotDiam / 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgb(32, 32, 32)';
        ctx.stroke();
        ctx.fill();
    };

    const startDrawing = (e) => {
        fillNearestDot(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        fillNearestDot(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <canvas
            className={styles.canvas}
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
        />
    );

};

export default Canvas;