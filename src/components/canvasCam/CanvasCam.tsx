import styles from "./CanvasCam.module.scss";

interface CanvasComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const CanvasCam = ({ canvasRef }: CanvasComponentProps) => {
  return <canvas ref={canvasRef} className={styles.canvas} />;
};
