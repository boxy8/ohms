import { useRef, useEffect } from 'react'

const Canvas = () => {
    const canvasSize = 1420;
    const borderSize = 83;
    const blockSize = 11;
    const dotDiam = 7;

    const canvasRef = useRef(null);

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

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
            />
        </div>
    );

};

export default Canvas;