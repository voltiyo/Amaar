import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({ fileUrl }) => {
    return (
        <div style={{ height: '500px', border: '1px solid #ccc', borderRadius: "5px" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={fileUrl} />
            </Worker>
        </div>
    );
};

export default PdfViewer;
