import { useState } from "react";

export default function ContractInterfacePreview() {
  const [filename, setFilename] = useState("沐美璀璨醫美診所廣告投放+企劃 合約書.pdf");
  const [syncedContent, setSyncedContent] = useState(`廣告投放服務契約書\n文件號碼：A250521Q01\n本契約由甲方與乙方共同簽訂，目的為提供Facebook與IG數位廣告投放及品牌策劃等服務。\n服務項目：\n1. Facebook 廣告投放 - 660,000 元\n2. 廣告服務費 - 99,000 元\n3. IG視覺與策略 - 240,000 元\n合計（未稅）：999,000 元\n營業稅（5%）：49,950 元\n含稅總金額：1,048,950 元`);
  const [contentA, setContentA] = useState("");
  const [contentB, setContentB] = useState("");

  const handleSync = () => {
    setContentA(syncedContent);
    setContentB(syncedContent);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="bg-gray-100 p-4 rounded-xl overflow-auto">
        <h2 className="font-bold text-lg mb-3">📂 導入文件 / 開啟範本</h2>
        <p className="text-sm mb-2">目前檔案：{filename}</p>
        <button className="mb-4 px-3 py-1 bg-blue-500 text-white rounded">重新上傳</button>
        <h3 className="font-semibold mt-4 mb-2">📄 範本內容預覽（可編輯）</h3>
        <textarea
          className="w-full p-2 border rounded h-[400px] text-sm"
          value={syncedContent}
          onChange={(e) => setSyncedContent(e.target.value)}
        />
        <button
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
          onClick={handleSync}
        >
          🔁 一鍵同步至 A / B 合約
        </button>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl">
        <h2 className="font-bold text-lg mb-3">🅰 A 合約（可編輯）</h2>
        <textarea
          className="w-full h-[450px] p-2 border rounded"
          value={contentA}
          onChange={(e) => setContentA(e.target.value)}
        />
      </div>

      <div className="bg-green-50 p-4 rounded-xl">
        <h2 className="font-bold text-lg mb-3">🅱 B 合約（可編輯）</h2>
        <textarea
          className="w-full h-[450px] p-2 border rounded"
          value={contentB}
          onChange={(e) => setContentB(e.target.value)}
        />
      </div>
    </div>
  );
}