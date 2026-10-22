import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-[#1A1B20] rounded-2xl p-4 shadow-2xl flex flex-col items-center border border-black/10 dark:border-white/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            <ZoomIn className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Pinch or tap to view high-resolution diagram</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors text-stone-600 dark:text-stone-300"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full flex-1 overflow-auto flex items-center justify-center py-4">
          <img 
            src={src} 
            alt={alt} 
            className="max-h-[75vh] w-auto object-contain rounded-lg shadow-sm"
          />
        </div>

        <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 text-center">
          Tap outside or press ESC to dismiss
        </p>
      </div>
    </div>
  );
};
