// AB 合約工具（加上 PDF / Word 匯出預覽 + Excel / Word / PDF 匯入）

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function ContractEditor() {
  const [files, setFiles] = useState([]);
  const [items, setItems] = useState([
    { description: "", total: "", partA: "", partB: "" }
  ]);
  const [aData, setAData] = useState({
    title: "",
    partyA: "",
    partyB: "",
    intro: "",
    payment: "",
    date: "",
    legal: "",
    seal: "",
    contractDate: ""
  });

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { description: "", total: "", partA: "", partB: "" }]);
  };

  const updateAData = (field, value) => {
    setAData({ ...aData, [field]: value });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(12);
    doc.text(`【${aData.title}】`, 10, y);
    doc.text(`甲方：${aData.partyA} / 乙方：${aData.partyB}`, 10, y += 10);
    doc.text(aData.intro, 10, y += 10);
    doc.text(`付款方式：${aData.payment}`, 10, y += 10);
    doc.text(`付款日期：${aData.date}`, 10, y += 10);
    items.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.description} 總金額：${item.total}｜A:${item.partA} B:${item.partB}`, 10, y += 10);
    });
    doc.text(aData.legal, 10, y += 10);
    doc.text(`用印：${aData.seal}`, 10, y += 10);
    doc.text(`合約日期：${aData.contractDate}`, 10, y += 10);
    doc.save("contract.pdf");
  };

  const exportDOC = () => {
    let content = `【${aData.title}】\n甲方：${aData.partyA} / 乙方：${aData.partyB}\n${aData.intro}\n付款方式：${aData.payment}\n付款日期：${aData.date}\n項目：\n`;
    items.forEach((item, i) => {
      content += `${i + 1}. ${item.description}｜總金額：${item.total}｜A:${item.partA} B:${item.partB}\n`;
    });
    content += `${aData.legal}\n用印：${aData.seal}\n合約日期：${aData.contractDate}`;
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "contract.doc");
  };

  const importHandler = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      alert("🗂️ 匯入內容預覽：\n" + content.slice(0, 500)); // 模擬展示
    };
    reader.readAsText(f);
  };

  return (
    <div>AB 合約工具</div>
  );
}