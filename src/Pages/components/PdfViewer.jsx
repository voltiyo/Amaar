import React, { useState, useRef, useEffect } from 'react';
import PDF from 'react-pdf-js';

const PdfViewer = ({ fileUrl }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  // Use fixed PDF size as a baseline — most PDFs are around A4 size (8.27 × 11.69 inches)
  const defaultPdfWidth = 800;  // adjust if you know your PDFs are larger/smaller
  const defaultPdfHeight = 1131;

  const onDocumentComplete = (pages) => {
    setPages(pages);
    setPage(1);
  };

  useEffect(() => {
    const containerWidth = 600; // the desired fixed width in pixels
    const containerHeight = 800; // the desired fixed height in pixels

    const widthScale = containerWidth / defaultPdfWidth;
    const heightScale = containerHeight / defaultPdfHeight;

    const uniformScale = Math.min(widthScale, heightScale); // ensures fit

    setScale(uniformScale);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '600px',
        height: '800px',
        overflowX: 'hidden',
        overflowY: "scroll",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 'auto',
      }}
    >
      <PDF
        file={fileUrl}
        page={page}
        scale={scale}
        onDocumentComplete={onDocumentComplete}
      />
    </div>
  );
};

export default PdfViewer;
