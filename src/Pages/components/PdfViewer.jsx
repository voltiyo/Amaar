import React, { useState } from 'react';
import PDF from 'react-pdf-js';

const PdfViewer = ({ fileUrl }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);

  const onDocumentComplete = (pages) => {
    setPages(pages);
    setPage(1);
  };

  const onPageComplete = (page) => {
    setPage(page);
  };

  return (
    <div>
      <PDF
        file={fileUrl}
        page={page}
        onDocumentComplete={onDocumentComplete}
        onPageComplete={onPageComplete}
      />
    </div>
  );
};

export default PdfViewer;
