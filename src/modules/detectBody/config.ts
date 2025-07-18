import * as poseDetection from "@tensorflow-models/pose-detection";

const detectorConfig: poseDetection.PosenetModelConfig = {
  architecture: "MobileNetV1",
  outputStride: 16,
  inputResolution: { width: 640, height: 480 },
  multiplier: 0.75,
};

const estimationConfig: poseDetection.PoseNetEstimationConfig = {
  maxPoses: 1,
  flipHorizontal: false,
  scoreThreshold: 0.5,
  nmsRadius: 20,
};

export { detectorConfig, estimationConfig };
