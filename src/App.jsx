
import { useState } from "react";

function FileUploadStep({ onNext, fileContent, setFileContent }) {
  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.onload = (ev) => setFileContent(ev.target.result);
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">📂 上傳檔案</h1>
      <input type="file" onChange={handleUpload} />
      {fileContent && (
        <div className="border p-4 bg-white whitespace-pre-wrap max-h-96 overflow-auto">
          <h2 className="font-semibold mb-2">📄 預覽內容：</h2>
          <pre>{fileContent}</pre>
        </div>
      )}
      <button
        onClick={onNext}
        disabled={!fileContent}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        下一步 ➡
      </button>
    </div>
  );
}

function EditableStep({ fileContent, onBack }) {
  const [aText, setAText] = useState(fileContent);
  const [bText, setBText] = useState(fileContent);

  const download = (text, filename) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="font-semibold text-center">📄 原始檔案</h2>
          <div
            className="border p-2 h-[500px] overflow-auto bg-white"
            contentEditable
            suppressContentEditableWarning
          >
            {fileContent}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-center">🅰 A 合約</h2>
          <div
            className="border p-2 h-[500px] overflow-auto bg-white"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setAText(e.currentTarget.innerText)}
          >
            {aText}
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-center">🅱 B 合約</h2>
          <div
            className="border p-2 h-[500px] overflow-auto bg-white"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setBText(e.currentTarget.innerText)}
          >
            {bText}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="bg-gray-300 px-4 py-2 rounded">⬅ 上一步</button>
        <div className="space-x-2">
          <button onClick={() => download(aText, 'A-Contract.txt')} className="bg-blue-500 text-white px-4 py-2 rounded">匯出 A</button>
          <button onClick={() => download(bText, 'B-Contract.txt')} className="bg-green-500 text-white px-4 py-2 rounded">匯出 B</button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [fileContent, setFileContent] = useState("");

  return (
    <>
      {step === 1 && <FileUploadStep onNext={() => setStep(2)} fileContent={fileContent} setFileContent={setFileContent} />}
      {step === 2 && <EditableStep fileContent={fileContent} onBack={() => setStep(1)} />}
    </>
  );
}
