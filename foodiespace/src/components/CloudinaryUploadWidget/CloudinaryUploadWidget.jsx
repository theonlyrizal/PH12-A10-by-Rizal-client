import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt, FaImage, FaTimes } from 'react-icons/fa';

const CloudinaryUploadWidget = ({ onUploadSuccess, currentImage, onRemove, folder = 'foodiespace' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load Cloudinary Upload Widget script
    if (!window.cloudinary) {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openUploadWidget = () => {
    setError(null);
    
    if (!window.cloudinary) {
      setError('Cloudinary widget not loaded. Please refresh the page.');
      return;
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setError('Cloudinary configuration missing. Please check environment variables.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        folder: folder,
        sources: ['local', 'url', 'camera'],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        showPoweredBy: false,
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#FF6B35',
            tabIcon: '#FF6B35',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#FF6B35',
            action: '#FF6B35',
            inactiveTabIcon: '#8B6F47',
            error: '#F44336',
            inProgress: '#F7931E',
            complete: '#4CAF50',
            sourceBg: '#FFF8F0'
          },
          frame: {
            background: 'rgba(0, 0, 0, 0.5)' // Semi-transparent backdrop
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Poppins',
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (error) {
          console.error('Upload error:', error);
          setError('Upload failed. Please try again.');
          setUploading(false);
          return;
        }

        if (result.event === 'upload-added') {
          setUploading(true);
        }

        if (result.event === 'success') {
          setUploading(false);
          const imageUrl = result.info.secure_url;
          onUploadSuccess(imageUrl);
        }

        if (result.event === 'close') {
          setUploading(false);
        }
      }
    );

    widget.open();
  };

  return (
    <div className="w-full">
      {currentImage ? (
        <div className="relative">
          <div className="relative rounded-lg overflow-hidden border-2 border-base-300">
            <img
              src={currentImage}
              alt="Uploaded preview"
              className="w-full max-h-96 object-cover"
            />
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute top-2 right-2 btn btn-circle btn-error btn-sm"
                title="Remove image"
              >
                <FaTimes />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={openUploadWidget}
            className="btn btn-outline btn-primary w-full mt-4"
            disabled={uploading}
          >
            <FaCloudUploadAlt className="mr-2" />
            {uploading ? 'Uploading...' : 'Change Image'}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={openUploadWidget}
          className="btn btn-primary w-full"
          disabled={uploading}
        >
          <FaCloudUploadAlt className="mr-2" />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      )}

      {error && (
        <div className="alert alert-error mt-4">
          <FaTimes />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploadWidget;
