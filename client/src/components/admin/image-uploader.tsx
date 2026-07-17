'use client';

import { CldUploadButton, CldImage } from 'next-cloudinary';
import type { CloudinaryUploadWidgetInfo } from 'next-cloudinary';

interface ImageUploaderProps {
  Image: CloudinaryUploadWidgetInfo | null;
  onChange: (images: CloudinaryUploadWidgetInfo | null) => void;
}

export function ImageUploader({ Image, onChange }: ImageUploaderProps) {

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Upload an Image</h1>

      <div style={{
        backgroundColor: '#0070f3',
        color: 'white',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'inline-block'
      }}>
        <CldUploadButton
          uploadPreset="new-e-commerce"
          onSuccess={(result) => {
            if (result.info && typeof result.info !== 'string') {
              onChange(result.info);
              console.log('Upload successful:', result.info.url);
            }
          }}
          onQueuesEnd={(result, { widget }) => {
            widget.close();
          }}
        >
          Upload Image
        </CldUploadButton>
      </div>

      {Image && (
        <div style={{ marginTop: '2rem' }}>
          <p>Upload successful!</p>
          <p><strong>Public ID:</strong> {Image.public_id}</p>

          <h2 style={{ marginTop: '2rem' }}>Transformed Image:</h2>
          <CldImage
            src={Image.public_id}
            width="250"
            height="250"
            crop="fill"
            alt="Transformed uploaded image"
          />
        </div>
      )}
    </div>
  );
}