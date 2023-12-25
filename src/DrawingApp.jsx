import { useRef, useState } from 'react';
import Canvas from './Canvas';
import styles from './DrawingApp.module.css'

const DrawingApp = () => {
    const canvasRef = useRef(null);
    const [isErase, setIsErase] = useState(false);
    const [isDrawDefault, setIsDrawDefault] = useState(false);

    const handleDownload = () => {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'drawing.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.container}>
            <button 
                className={styles.ohmsButton}
                onClick={() => setIsDrawDefault(true)}
                style={{
                    color: isDrawDefault ? 'white' : '#b2b2b2'
                }}
            >
                _Ohms
            </button>
            <div className={styles.canvasContainer}>
                <Canvas/>
                <div className={styles.toolButtons}>
                <button 
                    onClick={() => setIsErase(false)}
                    style={{
                        color: isErase ? '#b2b2b2' : 'white'
                    }}
                >
                    _Draw
                </button>
                <button 
                    onClick={() => setIsErase(true)}
                    style={{
                        color: isErase ? 'white' : '#b2b2b2'
                    }}
                >
                    _Erase
                </button>
                <button onClick={handleDownload}>_Save</button>
            </div>
            </div>
        </div>

    );
}

export default DrawingApp;
