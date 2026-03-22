// utils/cropImage.ts

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // Важливо для Cloudinary
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Повертає кропнуте зображення у форматі Base64.
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const rotRad = getRadianAngle(rotation);

  // Вираховуємо розмір canvas з урахуванням ротації
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // Встановлюємо розмір canvas
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Зміщуємо ctx до центру canvas, щоб зробити ротацію від центру
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Малюємо оригінальне зображення
  ctx.drawImage(image, 0, 0);

  // Створюємо другий canvas, який буде мати розміри кропу
  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) {
    throw new Error('No 2d context');
  }

  // Встановлюємо розміри кропу
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height; // Виправлено: було canvas.height

  // Заливаємо фон білим, щоб уникнути чорних країв
  croppedCtx.fillStyle = '#ffffff';
  croppedCtx.fillRect(0, 0, croppedCanvas.width, croppedCanvas.height);

  // Копіюємо частину з оригінального canvas
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  // Зберігаємо як PNG
  return croppedCanvas.toDataURL('image/png');
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}