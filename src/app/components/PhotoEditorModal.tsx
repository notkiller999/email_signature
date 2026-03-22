import React, { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { ZoomIn, ZoomOut, Save, X } from 'lucide-react';
import { getCroppedImg } from '@/app/utils/cropImage';

interface PhotoEditorModalProps {
  imageSrc: string;
  onSave: (croppedImageBase64: string) => void;
  onClose: () => void;
}

const PhotoEditorModal: React.FC<PhotoEditorModalProps> = ({
  imageSrc,
  onSave,
  onClose,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onSave(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, onSave, onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit avatar</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="relative w-full h-[400px] bg-slate-950 rounded-lg overflow-hidden border border-slate-700 mb-6">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            showGrid={false}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700">
            <ZoomOut className="text-slate-400" />
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <ZoomIn className="text-slate-400" />
            <span className="text-white w-12 text-center text-sm">{zoom.toFixed(1)}x</span>
          </div>

          <div className="flex items-center gap-3">
             <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md shadow-blue-500/20"
            >
              <Save size={20} />
              Save and upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditorModal;