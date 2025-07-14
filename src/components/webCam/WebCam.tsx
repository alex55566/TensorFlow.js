import Webcam from "react-webcam";
import styles from "./WebCam.module.scss";

interface WebcamComponentProps {
  webcamRef: React.RefObject<Webcam | null>;
}

export const WebCam = ({ webcamRef }: WebcamComponentProps) => {
  return <Webcam ref={webcamRef} className={styles.video} />;
};
