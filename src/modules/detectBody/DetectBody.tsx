import { CanvasCam } from "@/components/canvasCam/CanvasCam";
import QuantityCounter from "@/components/quantityCounter/QuantityCounter";
import { WebCam } from "@/components/webCam/WebCam";
import { checkArmsPosition } from "@/exercises/handsUp";
import { mainStore } from "@/stores/MainStore";
import { drawKeypoints, drawSkeleton } from "@/utils/draw";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import * as tf from "@tensorflow/tfjs-core";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { detectorConfig, estimationConfig } from "./config";

export default function DetectBody() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout>(null);

  const runPosenet = async () => {
    try {
      mainStore.setIsLoading(true);
      await tf.ready();
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.PoseNet,
        detectorConfig
      );

      detectionIntervalRef.current = setInterval(() => {
        if (detector) {
          detect(detector);
        }
      }, 50);
    } catch {
      mainStore.setIsError(true);
    } finally {
      mainStore.setIsLoading(false);
    }
  };

  const detect = async (detector: poseDetection.PoseDetector) => {
    if (
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      video.width = videoWidth;
      video.height = videoHeight;

      const poses = await detector.estimatePoses(video, estimationConfig);
      const pose = poses[0];

      if (pose && canvasRef.current) {
        checkArmsPosition(pose.keypoints, videoHeight);
        drawCanvas(pose, videoWidth, videoHeight);
      }
    }
  };

  const drawCanvas = (
    pose: poseDetection.Pose,
    videoWidth: number,
    videoHeight: number
  ) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    drawKeypoints(pose.keypoints, 0.5, ctx);
    drawSkeleton(pose.keypoints, 0.5, ctx);
  };

  useEffect(() => {
    runPosenet();

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <QuantityCounter />
      <WebCam webcamRef={webcamRef} />
      <CanvasCam canvasRef={canvasRef} />
    </div>
  );
}
