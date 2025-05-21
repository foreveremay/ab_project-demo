import { useState } from "react";
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

  return (
    <div style={{ padding: 20 }}>
      <h2>AB 合約工具</h2>
      <div>
        <input placeholder="合約標題" value={aData.title} onChange={(e) => updateAData("title", e.target.value)} /><br />
        <input placeholder="甲方名稱" value={aData.partyA} onChange={(e) => updateAData("partyA", e.target.value)} /><br />
        <input placeholder="乙方名稱" value={aData.partyB} onChange={(e) => updateAData("partyB", e.target.value)} /><br />
        <textarea placeholder="引言" value={aData.intro} onChange={(e) => updateAData("intro", e.target.value)} /><br />
        <input placeholder="付款方式" value={aData.payment} onChange={(e) => updateAData("payment", e.target.value)} /><br />
        <input type="date" value={aData.date} onChange={(e) => updateAData("date", e.target.value)} /><br />
        <textarea placeholder="法律條款" value={aData.legal} onChange={(e) => updateAData("legal", e.target.value)} /><br />
        <input placeholder="甲乙方用印" value={aData.seal} onChange={(e) => updateAData("seal", e.target.value)} /><br />
        <input type="date" value={aData.contractDate} onChange={(e) => updateAData("contractDate", e.target.value)} /><br />
        <br />
        <div>
          <h4>合約項目</h4>
          {items.map((item, i) => (
            <div key={i}>
              <textarea placeholder="項目內容" value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} />
              <input placeholder="總金額" value={item.total} onChange={(e) => updateItem(i, "total", e.target.value)} />
              <input placeholder="A 金額" value={item.partA} onChange={(e) => updateItem(i, "partA", e.target.value)} />
              <input placeholder="B 金額" value={item.partB} onChange={(e) => updateItem(i, "partB", e.target.value)} />
            </div>
          ))}
          <button onClick={addItem}>新增項目</button>
        </div>
        <br />
        <button onClick={exportPDF}>匯出 PDF</button>
        <button onClick={exportDOC}>匯出 Word</button>
      </div>
    </div>
  );
}