import { useState } from "react";

export default function ContractTemplateLayout() {
  const [contractData, setContractData] = useState({
    logo: "Aidea: Med",
    title: "廣告投放服務契約書",
    number: "A250521Q01",
    services: [
      { service: "Facebook 廣告投放服務", content: "依據診所需求制定策略與廣告操作", price: "660000" },
      { service: "廣告投放服務費", content: "每月按15%計費（如未達2萬，另計）", price: "99000" },
      { service: "IG整體視覺 + 企劃策略", content: "主題規劃、製圖、創意腳本等", price: "240000" }
    ],
    tax: "49950",
    total: "1048950",
    description: "協助甲方於Facebook與Instagram等平台進行廣告投放等…"
  });

  const totalWithoutTax = contractData.services.reduce((sum, item) => sum + parseInt(item.price || 0), 0);

  const updateService = (index, key, value) => {
    const updated = [...contractData.services];
    updated[index][key] = value;
    setContractData({ ...contractData, services: updated });
  };

  const addService = () => {
    setContractData({ ...contractData, services: [...contractData.services, { service: "", content: "", price: "" }] });
  };

  return (
    <div className="p-6 bg-white space-y-4 text-sm">
      <h1 className="text-3xl font-bold">{contractData.logo}</h1>
      <h2 className="text-xl font-semibold">{contractData.title}</h2>
      <p className="text-right font-mono">文件號碼：{contractData.number}</p>

      <table className="w-full border text-xs">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-1 w-8">#</th>
            <th className="border p-1">執行服務</th>
            <th className="border p-1">服務內容</th>
            <th className="border p-1 w-24">費用 (TWD)</th>
          </tr>
        </thead>
        <tbody>
          {contractData.services.map((item, idx) => (
            <tr key={idx}>
              <td className="border p-1 text-center">{idx + 1}</td>
              <td className="border p-1">
                <input value={item.service} onChange={e => updateService(idx, "service", e.target.value)} className="w-full" />
              </td>
              <td className="border p-1">
                <textarea value={item.content} onChange={e => updateService(idx, "content", e.target.value)} className="w-full" />
              </td>
              <td className="border p-1">
                <input type="number" value={item.price} onChange={e => updateService(idx, "price", e.target.value)} className="w-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addService} className="bg-blue-500 text-white px-2 py-1 text-xs rounded mt-2">新增項目</button>

      <div className="text-right space-y-1">
        <div>合計（未稅）：{totalWithoutTax.toLocaleString()}</div>
        <div>營業稅：{contractData.tax}</div>
        <div className="font-bold">總計（含稅）：{contractData.total}</div>
      </div>

      <h3 className="font-semibold mt-4">合作說明：</h3>
      <textarea value={contractData.description} onChange={e => setContractData({ ...contractData, description: e.target.value })} className="w-full h-40 border p-2" />
    </div>
  );
}