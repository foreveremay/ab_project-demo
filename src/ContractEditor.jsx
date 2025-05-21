import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

function generateDocumentNumber() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const quarter = ["Q", "R", "S", "T"][Math.floor(now.getMonth() / 3)];
  const serial = "01";
  return `A${year}${month}${day}${quarter}${serial}`;
}

// ...（其餘程式略）
// 為了節省篇幅，此處略去程式碼內容，但實際上會補上完整內容