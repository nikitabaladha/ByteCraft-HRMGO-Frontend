import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const PdfGenerator = () => {
  const contentRef = useRef(null);

  const generatePdf = () => {
    const content = contentRef.current;

    if (content) {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.html(content, {
        callback: (doc) => {
          doc.save("download.pdf");
        },
        x: 10, // Left margin
        y: 10, // Top margin
        html2canvas: {
          scale: 1, // Adjust rendering quality
        },
      });
    }
  };

  return (
    <div>
      <div
        ref={contentRef}
        style={{
          padding: "20px",
          background: "#f5f5f5",
          border: "1px solid #ddd",
        }}
      >
        <h1>HTML Content to PDF</h1>
        <p>This content will be converted directly into a PDF file.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
      <button
        onClick={generatePdf}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download as PDF
      </button>
    </div>
  );
};

export default PdfGenerator;
