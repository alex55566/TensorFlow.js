import { Human } from "@vladmandic/human";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function DetectAgeEmoGen() {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const humanRef = useRef<Human | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [emotion, setEmotion] = useState<string>("Не определено");

  // Конфигурация Human с акцентом на эмоции
  const config = {
    backend: "webgl",
    modelBasePath: "https://cdn.jsdelivr.net/npm/@vladmandic/human/models",
    face: {
      enabled: true,
      detector: {
        maxDetected: 1,
        rotation: false,
        skipFrames: 2, // Меньше пропусков кадров
      },
      mesh: { enabled: true },
      description: { enabled: true },
      emotion: {
        enabled: true,
        minConfidence: 0.1, // Более чувствительное определение эмоций
      },
      iris: { enabled: false }, // Отключаем для производительности
    },
    filter: { enabled: true }, // Сглаживание результатов
  };

  useEffect(() => {
    // Инициализация
    humanRef.current = new Human(config);

    const loadModels = async () => {
      try {
        // Явно загружаем только нужные модели
        await humanRef.current?.load({
          face: {
            detector: { modelPath: "blazeface.json" },
            mesh: { modelPath: "facemesh.json" },
            description: { modelPath: "faceres.json" },
            emotion: { modelPath: "emotion.json" }, // Убедимся, что модель эмоций загружается
          },
        });

        setModelsLoaded(true);
        console.log("Все модели загружены, включая эмоции");
      } catch (err) {
        console.error("Ошибка загрузки моделей:", err);
      }
    };

    loadModels();

    return () => {
      humanRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!modelsLoaded) return;

    let animationFrameId: number;

    const detectEmotions = async () => {
      if (
        !webcamRef.current?.video ||
        !canvasRef.current ||
        !humanRef.current
      ) {
        animationFrameId = requestAnimationFrame(detectEmotions);
        return;
      }

      try {
        // Детекция с дополнительными параметрами для эмоций
        const result = await humanRef.current.detect(webcamRef.current.video, {
          face: {
            emotion: { enabled: true },
          },
        });

        const face = result.face[0];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx || !face) {
          animationFrameId = requestAnimationFrame(detectEmotions);
          return;
        }

        // Синхронизация размеров
        canvas.width = webcamRef.current.video.videoWidth;
        canvas.height = webcamRef.current.video.videoHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Отрисовка прямоугольника вокруг лица
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 2;
        ctx.strokeRect(
          face.box[0],
          face.box[1],
          face.box[2] - face.box[0],
          face.box[3] - face.box[1]
        );

        // Определение эмоции
        console.log(face);
        if (face.emotion && Object.keys(face.emotion).length > 0) {
          const [[currentEmotion, confidence]] = Object.entries(face.emotion)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 1);
          console.log(currentEmotion, confidence);

          setEmotion(
            `${confidence.emotion} (${Math.round(confidence * 100)}%)`
          );

          // Отображение информации
          ctx.font = "18px Arial";
          ctx.fillStyle = "#FF0000";
          ctx.fillText(
            `Возраст: ${Math.round(face.age)} лет`,
            face.box[0] + 5,
            face.box[1] - 45
          );
          ctx.fillText(
            `Пол: ${face.gender}`,
            face.box[0] + 5,
            face.box[1] - 25
          );
          ctx.fillStyle = "#0000FF";
          ctx.fillText(
            `Эмоция: ${currentEmotion}`,
            face.box[0] + 5,
            face.box[1] - 5
          );
        }
      } catch (err) {
        console.error("Ошибка детекции:", err);
      }

      animationFrameId = requestAnimationFrame(detectEmotions);
    };

    detectEmotions();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [modelsLoaded]);

  return (
    <div style={{ position: "relative", width: "640px", margin: "0 auto" }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        width={640}
        height={480}
        style={{ display: "block" }}
        videoConstraints={{
          facingMode: "user",
          width: 640,
          height: 480,
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      />

      {!modelsLoaded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          Загрузка моделей... Пожалуйста, подождите
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        Текущая эмоция: <strong>{emotion}</strong>
      </div>
    </div>
  );
}
