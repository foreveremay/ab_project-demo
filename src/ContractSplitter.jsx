import { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function ContractSplitter() {
  const [contractTitle, setContractTitle] = useState("原始合約標題");
  const [intro, setIntro] = useState("甲方：___ 乙方：___");
  const [executionTime, setExecutionTime] = useState("2025-06-01 至 2025-12-31");
  const [paymentTerms, setPaymentTerms] = useState("簽約30%／完工70%");
  const [templateName, setTemplateName] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [items, setItems] = useState([
    { description: "網站設計", total: 100000, partA: 50000, partB: 50000, costA: 30000, costB: 25000 },
  ]);
  const [createdAt, setCreatedAt] = useState(new Date().toISOString().slice(0, 10));

  const taxRate = 0.05;
  const calcSummary = (amount, cost) => {
    const beforeTax = amount - cost;
    const tax = amount * taxRate;
    const afterTax = beforeTax - tax;
    return { beforeTax, tax, afterTax };
  };

  const totalA = items.reduce((sum, i) => sum + i.partA, 0);
  const totalB = items.reduce((sum, i) => sum + i.partB, 0);
  const costA = items.reduce((sum, i) => sum + i.costA, 0);
  const costB = items.reduce((sum, i) => sum + i.costB, 0);
  const summaryA = calcSummary(totalA, costA);
  const summaryB = calcSummary(totalB, costB);

  const handleSaveTemplate = () => {
    const data = { title: contractTitle, intro, executionTime, paymentTerms, items, created_at: createdAt };
    localStorage.setItem(`contract-template-${templateName}`, JSON.stringify(data));
    alert("範本已儲存");
    refreshTemplateList();
  };

  const refreshTemplateList = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith("contract-template-"));
    setTemplateList(keys.map(k => k.replace("contract-template-", "")));
  };

  const handleLoadTemplate = (name) => {
    const data = JSON.parse(localStorage.getItem(`contract-template-${name}`));
    setContractTitle(data.title);
    setIntro(data.intro);
    setExecutionTime(data.executionTime);
    setPaymentTerms(data.paymentTerms);
    setItems(data.items);
    if (data.created_at) setCreatedAt(data.created_at);
    alert(`範本「${name}」已載入`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    let y = 10;
    doc.text(`【${contractTitle}】`, 10, y);
    doc.text(intro, 10, y += 10);
    doc.text(`建立日期：${createdAt}`, 10, y += 10);
    doc.text(`執行時間：${executionTime}`, 10, y += 10);
    doc.text(`付款方式：${paymentTerms}`, 10, y += 10);
    y += 10;
    items.forEach((item, idx) => {
      doc.text(`(${idx + 1}) ${item.description}：原金額${item.total}｜A:${item.partA}, B:${item.partB}`, 10, y);
      y += 10;
    });
    doc.text(`A 稅後金額：${summaryA.afterTax}`, 10, y += 10);
    doc.text(`B 稅後金額：${summaryB.afterTax}`, 10, y += 10);
    const blobUrl = doc.output("bloburl");
    window.open(blobUrl, "_blank");
  };

  useEffect(() => {
    refreshTemplateList();
  }, []);

  return (
    <div>
      <h1>AB 合約工具</h1>
      <input value={contractTitle} onChange={e => setContractTitle(e.target.value)} />
      <button onClick={handleExportPDF}>匯出 PDF</button>
    </div>
  );
}