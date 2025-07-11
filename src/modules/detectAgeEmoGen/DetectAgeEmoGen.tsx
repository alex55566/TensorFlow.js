import { CanvasComponent } from "@/components/CanvasComponent";
import { WebcCamComponent } from "@/components/WebCamComponent";
import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";

export default function DetectAgeEmoGen() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
  };

  const detectFace = async () => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;

      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withAgeAndGender()
        .withFaceExpressions();

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const displaySize = {
          width: video.videoWidth,
          height: video.videoHeight,
        };

        faceapi.matchDimensions(canvas, displaySize);

        if (detections) {
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          faceapi.draw.drawDetections(canvas, resizedDetections);

          const { age, gender, genderProbability, expressions } = detections;

          const maxExpression = Object.entries(expressions).reduce(
            (max, entry) => (entry[1] > max[1] ? entry : max),
            ["neutral", 0]
          );

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.font = "20px Arial";
            ctx.fillStyle = "red";
            ctx.fillText(
              `${gender} (${Math.round(
                genderProbability * 100
              )}%) - ${Math.round(age)} y.o.`,
              10,
              30
            );
            ctx.fillStyle = "blue";
            ctx.fillText(`Emotion: ${maxExpression[0]}`, 10, 60);
          }
        } else {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      }
    }
  };

  useEffect(() => {
    loadModels().then(() => {
      const interval = setInterval(detectFace, 500);
      return () => clearInterval(interval); // очистка интервала при размонтировании
    });
  }, []);

  return (
    <div>
      <WebcCamComponent webcamRef={webcamRef} />
      <CanvasComponent canvasRef={canvasRef} />
    </div>
  );
}
