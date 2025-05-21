
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

export default function ContractEditor() {
  const [files, setFiles] = useState([]);
  const [contractData, setContractData] = useState({
    logo: "AideaMed",
    documentNumber: "",
    title: "廣告投放服務契約書",
    partyA: "",
    partyB: "",
    intro: "",
    items: [{ service: "", detail: "", amount: "" }],
    cooperation: "",
    period: "",
    payment: "",
    legal: "",
    seal: "",
    contractDate: ""
  });

  useEffect(() => {
    setContractData(prev => ({ ...prev, documentNumber: generateDocumentNumber() }));
  }, []);

  const handleFileUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...uploaded]);
  };

  const updateField = (field, value) => {
    setContractData({ ...contractData, [field]: value });
  };

  const updateItem = (index, field, value) => {
    const updated = [...contractData.items];
    updated[index][field] = value;
    setContractData({ ...contractData, items: updated });
  };

  const addItem = () => {
    setContractData({ ...contractData, items: [...contractData.items, { service: "", detail: "", amount: "" }] });
  };

  const totalAmount = contractData.items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(12);
    doc.text(`${contractData.logo}`, 10, y);
    doc.text(`文件號碼：${contractData.documentNumber}`, 10, y += 10);
    doc.text(`【${contractData.title}】`, 10, y += 10);
    doc.text(`甲方：${contractData.partyA} / 乙方：${contractData.partyB}`, 10, y += 10);
    doc.text(contractData.intro, 10, y += 10);
    contractData.items.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.service}：${item.detail} - 金額：${item.amount}`, 10, y += 10);
    });
    doc.text(`總金額：${totalAmount.toLocaleString()} 元`, 10, y += 10);
    doc.text(`合作說明：${contractData.cooperation}`, 10, y += 10);
    doc.text(`合作期間：${contractData.period}`, 10, y += 10);
    doc.text(`款項支付：${contractData.payment}`, 10, y += 10);
    doc.text(`法律條款：${contractData.legal}`, 10, y += 10);
    doc.text(`用印：${contractData.seal}`, 10, y += 10);
    doc.text(`合約日期：${contractData.contractDate}`, 10, y += 10);
    doc.save("contract.pdf");
  };

  const exportWord = () => {
    let content = `${contractData.logo}\n文件號碼：${contractData.documentNumber}\n【${contractData.title}】\n甲方：${contractData.partyA} / 乙方：${contractData.partyB}\n${contractData.intro}\n`;
    contractData.items.forEach((item, idx) => {
      content += `${idx + 1}. ${item.service}：${item.detail} - 金額：${item.amount}\n`;
    });
    content += `總金額：${totalAmount.toLocaleString()} 元\n合作說明：${contractData.cooperation}\n合作期間：${contractData.period}\n款項支付：${contractData.payment}\n法律條款：${contractData.legal}\n用印：${contractData.seal}\n合約日期：${contractData.contractDate}`;
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "contract.doc");
  };

  const renderFields = (editable = true) => (
    <div className="space-y-2">
      <input placeholder="Logo" value={contractData.logo} onChange={(e) => updateField("logo", e.target.value)} disabled={!editable} /><br />
      <input placeholder="文件號碼" value={contractData.documentNumber} disabled /><br />
      <input placeholder="標題" value={contractData.title} onChange={(e) => updateField("title", e.target.value)} disabled={!editable} /><br />
      <input placeholder="甲方" value={contractData.partyA} onChange={(e) => updateField("partyA", e.target.value)} disabled={!editable} /><br />
      <input placeholder="乙方" value={contractData.partyB} onChange={(e) => updateField("partyB", e.target.value)} disabled={!editable} /><br />
      <textarea placeholder="引言" value={contractData.intro} onChange={(e) => updateField("intro", e.target.value)} disabled={!editable} /><br />
      {contractData.items.map((item, idx) => (
        <div key={idx}>
          <input
            placeholder="執行服務"
            value={item.service}
            onChange={(e) => updateItem(idx, "service", e.target.value)}
            disabled={!editable}
          />
          <textarea
            placeholder="服務內容"
            value={item.detail}
            onChange={(e) => updateItem(idx, "detail", e.target.value)}
            disabled={!editable}
          />
          <input
            placeholder="金額"
            value={item.amount}
            onChange={(e) => updateItem(idx, "amount", e.target.value)}
            disabled={!editable}
          />
        </div>
      ))}
      {editable && <button onClick={addItem}>新增服務項目</button>}<br />
      <div><strong>總金額：{totalAmount.toLocaleString()} 元</strong></div>
      <textarea placeholder="合作說明" value={contractData.cooperation} onChange={(e) => updateField("cooperation", e.target.value)} disabled={!editable} /><br />
      <input placeholder="合作期間" value={contractData.period} onChange={(e) => updateField("period", e.target.value)} disabled={!editable} /><br />
      <textarea placeholder="款項支付" value={contractData.payment} onChange={(e) => updateField("payment", e.target.value)} disabled={!editable} /><br />
      <textarea placeholder="法律條款" value={contractData.legal} onChange={(e) => updateField("legal", e.target.value)} disabled={!editable} /><br />
      <input placeholder="甲乙方用印" value={contractData.seal} onChange={(e) => updateField("seal", e.target.value)} disabled={!editable} /><br />
      <input type="date" value={contractData.contractDate} onChange={(e) => updateField("contractDate", e.target.value)} disabled={!editable} />
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-gray-100 p-4 rounded-xl">
        <h2 className="font-bold mb-2">📂 上傳檔案或建立新檔</h2>
        <input type="file" multiple onChange={handleFileUpload} /><br /><br />
        <div className="text-sm whitespace-pre-line">{renderFields(false)}</div>
        <div className="mt-4 space-x-2">
          <button onClick={exportPDF}>匯出 PDF</button>
          <button onClick={exportWord}>匯出 Word</button>
        </div>
      </div>
      <div className="bg-blue-50 p-4 rounded-xl">
        <h2 className="font-bold mb-2">🅰 A 合約（可編輯）</h2>
        {renderFields(true)}
      </div>
      <div className="bg-green-50 p-4 rounded-xl">
        <h2 className="font-bold mb-2">🅱 B 合約（同步顯示）</h2>
        {renderFields(false)}
      </div>
    </div>
  );
}
