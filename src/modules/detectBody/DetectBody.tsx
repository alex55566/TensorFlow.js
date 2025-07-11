import { CanvasComponent } from "@/components/CanvasComponent";
import { WebcCamComponent } from "@/components/WebCamComponent";
import { drawKeypoints, drawSkeleton } from "@/utils/draw";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";

export default function DetectBody() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detectorConfig: poseDetection.PosenetModelConfig = {
    architecture: "MobileNetV1",
    outputStride: 16,
    inputResolution: { width: 640, height: 480 },
    multiplier: 0.75,
  };

  const estimationConfig = {
    maxPoses: 1,
    flipHorizontal: false,
    scoreThreshold: 0.5,
    nmsRadius: 20,
  };

  const runPosenet = async () => {
    try {
      // Ждем инициализации TensorFlow.js и установки бэкенда
      await tf.ready();

      const net = await poseDetection.createDetector(
        poseDetection.SupportedModels.PoseNet,
        detectorConfig
      );

      setInterval(() => {
        detect(net);
      }, 100);
    } catch (error) {
      console.error("Error initializing pose detection:", error);
    }
  };

  const detect = async (net: any) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video!.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video?.videoWidth;
      const videoHeight = webcamRef.current.video?.videoHeight;
      if (videoWidth) webcamRef.current.video!.width = videoWidth;
      if (videoHeight) webcamRef.current.video!.height = videoHeight;

      const poses = await net.estimatePoses(video, estimationConfig);
      const pose = poses[0];
      console.log(pose["keypoints"]);
      drawCanvas(pose, videoWidth!, videoHeight!, canvasRef);
    }
  };

  const drawCanvas = (
    pose: any,
    videoWidth: number,
    videoHeight: number,
    canvas: any
  ) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  };

  useEffect(() => {
    runPosenet();

    // Очистка при размонтировании компонента
    return () => {
      // Здесь можно добавить очистку ресурсов, если нужно
    };
  }, []);

  return (
    <div>
      <WebcCamComponent webcamRef={webcamRef} />
      <CanvasComponent canvasRef={canvasRef} />
    </div>
  );
}
