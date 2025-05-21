import { useState } from "react";

function StepOne({ onNext, files, setFiles }) {
  const handleUpload = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">上傳檔案或建立新檔案</h1>
      <input type="file" multiple onChange={handleUpload} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onNext}>下一步</button>
    </div>
  );
}

function StepTwo({ onNext, source, setSource, aText, setAText, bText, setBText }) {
  const syncFromSource = () => {
    setAText(source);
    setBText(source);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div>
        <h2 className="font-bold mb-2">📄 原始文件</h2>
        <textarea value={source} onChange={(e) => setSource(e.target.value)} className="w-full h-96 border p-2" />
      </div>
      <div>
        <h2 className="font-bold mb-2">🅰 A 合約</h2>
        <textarea value={aText} onChange={(e) => setAText(e.target.value)} className="w-full h-96 border p-2" />
      </div>
      <div>
        <h2 className="font-bold mb-2">🅱 B 合約</h2>
        <textarea value={bText} onChange={(e) => setBText(e.target.value)} className="w-full h-96 border p-2" />
      </div>
      <div className="col-span-3 flex justify-between mt-4">
        <button className="bg-gray-300 px-4 py-1 rounded" onClick={syncFromSource}>🔁 同步左欄內容至 A/B</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={onNext}>下一步</button>
      </div>
    </div>
  );
}

function StepThree({ aText, bText }) {
  const exportFile = (text, filename) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">📤 合約預覽與匯出</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">A 合約 預覽</h3>
          <pre className="border p-2 whitespace-pre-wrap">{aText}</pre>
          <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded" onClick={() => exportFile(aText, "A-Contract.txt")}>匯出 A</button>
        </div>
        <div>
          <h3 className="font-semibold">B 合約 預覽</h3>
          <pre className="border p-2 whitespace-pre-wrap">{bText}</pre>
          <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded" onClick={() => exportFile(bText, "B-Contract.txt")}>匯出 B</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [source, setSource] = useState("請貼上或輸入原始合約內容...");
  const [aText, setAText] = useState("");
  const [bText, setBText] = useState("");

  return (
    <>
      {step === 1 && <StepOne onNext={() => setStep(2)} files={files} setFiles={setFiles} />}
      {step === 2 && <StepTwo onNext={() => setStep(3)} source={source} setSource={setSource} aText={aText} setAText={setAText} bText={bText} setBText={setBText} />}
      {step === 3 && <StepThree aText={aText} bText={bText} />}
    </>
  );
}