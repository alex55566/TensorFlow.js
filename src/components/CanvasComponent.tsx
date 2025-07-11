interface CanvasComponentProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const CanvasComponent = ({ canvasRef }: CanvasComponentProps) => {
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
        width: 640,
        height: 480,
      }}
    />
  );
};
