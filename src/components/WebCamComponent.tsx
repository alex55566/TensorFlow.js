import Webcam from "react-webcam";

interface WebcamComponentProps {
  webcamRef: React.RefObject<Webcam | null>;
}

export const WebcCamComponent = ({ webcamRef }: WebcamComponentProps) => {
  return (
    <Webcam
      ref={webcamRef}
      style={{
        position: "absolute",
        width: 640,
        height: 480,
        left: 0,
        right: 0,
        margin: "auto",
        zIndex: 1,
      }}
    />
  );
};
