import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";
import { Input } from "./components/ui/input";

function StepOne({ onNext, files, setFiles }) {
  const handleUpload = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <Card className="p-6 max-w-xl mx-auto mt-10">
      <CardHeader className="text-xl font-bold">📂 上傳檔案或建立新檔案</CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" multiple onChange={handleUpload} />
        <Button className="w-full" onClick={onNext}>下一步 ➡</Button>
      </CardContent>
    </Card>
  );
}

function StepTwo({ onNext, source, setSource, aText, setAText, bText, setBText }) {
  const syncFromSource = () => {
    setAText(source);
    setBText(source);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <Card>
        <CardHeader className="font-bold text-center">📄 原始文件</CardHeader>
        <CardContent>
          <Textarea value={source} onChange={(e) => setSource(e.target.value)} className="h-96" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="font-bold text-center">🅰 A 合約</CardHeader>
        <CardContent>
          <Textarea value={aText} onChange={(e) => setAText(e.target.value)} className="h-96" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="font-bold text-center">🅱 B 合約</CardHeader>
        <CardContent>
          <Textarea value={bText} onChange={(e) => setBText(e.target.value)} className="h-96" />
        </CardContent>
      </Card>
      <div className="col-span-3 flex justify-between mt-4">
        <Button variant="secondary" onClick={syncFromSource}>🔁 同步左欄內容至 A/B</Button>
        <Button onClick={onNext}>下一步 ➡</Button>
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
        <Card>
          <CardHeader className="font-semibold text-center">A 合約 預覽</CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap mb-2">{aText}</pre>
            <Button className="w-full" onClick={() => exportFile(aText, "A-Contract.txt")}>匯出 A 合約</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold text-center">B 合約 預覽</CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap mb-2">{bText}</pre>
            <Button className="w-full" onClick={() => exportFile(bText, "B-Contract.txt")}>匯出 B 合約</Button>
          </CardContent>
        </Card>
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
