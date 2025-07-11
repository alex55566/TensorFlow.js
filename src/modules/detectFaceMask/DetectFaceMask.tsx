import { CanvasComponent } from "@/components/CanvasComponent";
import { WebcCamComponent } from "@/components/WebCamComponent";
import { Camera } from "@mediapipe/camera_utils";
import { FaceMesh } from "@mediapipe/face_mesh";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";

export default function DetectFaceMask() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const faceMeshRef = useRef<FaceMesh | null>(null);

  useEffect(() => {
    const initializeFaceMesh = async () => {
      const faceMesh = new FaceMesh({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        },
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      console.log("FaceMesh initialized", faceMesh);
      faceMesh.onResults((results) => {
        console.log(results);
        const canvas = canvasRef.current;
        const video = webcamRef.current?.video;

        if (!canvas || !video) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        if (results.multiFaceLandmarks) {
          for (const landmarks of results.multiFaceLandmarks) {
            ctx.fillStyle = "red";
            for (const landmark of landmarks) {
              ctx.beginPath();
              ctx.arc(
                landmark.x * canvas.width,
                landmark.y * canvas.height,
                2,
                0,
                2 * Math.PI
              );
              ctx.fill();
            }
          }
        }
      });

      faceMeshRef.current = faceMesh;

      if (webcamRef.current?.video) {
        const camera = new Camera(webcamRef.current.video, {
          onFrame: async () => {
            if (faceMeshRef.current && webcamRef.current?.video) {
              await faceMeshRef.current.send({
                image: webcamRef.current.video,
              });
            }
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    };

    initializeFaceMesh();

    return () => {
      if (faceMeshRef.current) {
        faceMeshRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <WebcCamComponent webcamRef={webcamRef} />
      <CanvasComponent canvasRef={canvasRef} />
    </div>
  );
}
