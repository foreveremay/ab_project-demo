import { useState } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

export default function ContractEditor() {
  const [files, setFiles] = useState([]);
  const [contractData, setContractData] = useState({
    title: "",
    partyA: "",
    partyB: "",
    intro: "",
    items: [{ description: "", amount: "" }],
    payment: "",
    date: "",
    legal: "",
    seal: "",
    contractDate: ""
  });

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
    setContractData({ ...contractData, items: [...contractData.items, { description: "", amount: "" }] });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.setFontSize(12);
    doc.text(`【${contractData.title}】`, 10, y);
    doc.text(`甲方：${contractData.partyA} / 乙方：${contractData.partyB}`, 10, y += 10);
    doc.text(contractData.intro, 10, y += 10);
    contractData.items.forEach((item, idx) => {
      doc.text(`${idx + 1}. ${item.description} - 金額：${item.amount}`, 10, y += 10);
    });
    doc.text(`付款方式：${contractData.payment}`, 10, y += 10);
    doc.text(`付款日期：${contractData.date}`, 10, y += 10);
    doc.text(`法律條款：${contractData.legal}`, 10, y += 10);
    doc.text(`用印：${contractData.seal}`, 10, y += 10);
    doc.text(`合約日期：${contractData.contractDate}`, 10, y += 10);
    doc.save("contract.pdf");
  };

  const exportWord = () => {
    let content = `【${contractData.title}】\n甲方：${contractData.partyA} / 乙方：${contractData.partyB}\n${contractData.intro}\n`;
    contractData.items.forEach((item, idx) => {
      content += `${idx + 1}. ${item.description} - 金額：${item.amount}\n`;
    });
    content += `付款方式：${contractData.payment}\n付款日期：${contractData.date}\n法律條款：${contractData.legal}\n用印：${contractData.seal}\n合約日期：${contractData.contractDate}`;
    const blob = new Blob([content], { type: "application/msword" });
    saveAs(blob, "contract.doc");
  };

  const renderFields = (editable = true) => (
    <div className="space-y-2">
      <input placeholder="標題" value={contractData.title} onChange={(e) => updateField("title", e.target.value)} disabled={!editable} /><br />
      <input placeholder="甲方" value={contractData.partyA} onChange={(e) => updateField("partyA", e.target.value)} disabled={!editable} /><br />
      <input placeholder="乙方" value={contractData.partyB} onChange={(e) => updateField("partyB", e.target.value)} disabled={!editable} /><br />
      <textarea placeholder="引言" value={contractData.intro} onChange={(e) => updateField("intro", e.target.value)} disabled={!editable} /><br />
      {contractData.items.map((item, idx) => (
        <div key={idx}>
          <textarea
            placeholder="項目說明"
            value={item.description}
            onChange={(e) => updateItem(idx, "description", e.target.value)}
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
      {editable && <button onClick={addItem}>新增項目</button>}<br />
      <input placeholder="付款方式" value={contractData.payment} onChange={(e) => updateField("payment", e.target.value)} disabled={!editable} /><br />
      <input type="date" value={contractData.date} onChange={(e) => updateField("date", e.target.value)} disabled={!editable} /><br />
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