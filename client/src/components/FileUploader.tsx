import { useState } from "react";
import { Upload, X, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileReference {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  base64: string;
}

interface FileUploaderProps {
  onFilesChange: (files: FileReference[]) => void;
  initialFiles?: FileReference[];
}

export default function FileUploader({ onFilesChange, initialFiles = [] }: FileUploaderProps) {
  const [files, setFiles] = useState<FileReference[]>(initialFiles);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: FileReference[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Validar tipo de archivo
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpeg",
        "image/png",
        "image/gif",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} no es un tipo de archivo permitido`);
        continue;
      }

      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} es demasiado grande (máximo 10MB)`);
        continue;
      }

      // Convertir a base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        const fileRef: FileReference = {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toLocaleString(),
          base64,
        };

        const updatedFiles = [...files, fileRef];
        setFiles(updatedFiles);
        onFilesChange(updatedFiles);
        toast.success(`${file.name} subido correctamente`);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
    toast.success("Archivo eliminado");
  };

  const downloadFile = (file: FileReference) => {
    const link = document.createElement("a");
    link.href = file.base64;
    link.download = file.name;
    link.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-emerald-500 bg-emerald-50"
            : "border-emerald-300 bg-emerald-50/50 hover:border-emerald-400"
        }`}
      >
        <Upload className="w-12 h-12 mx-auto mb-3 text-emerald-600" />
        <p className="text-sm font-semibold text-gray-900 mb-1">
          Arrastra archivos aquí o haz clic para seleccionar
        </p>
        <p className="text-xs text-gray-600 mb-4">
          Tipos permitidos: PDF, Word, Excel, Imágenes, Texto (máximo 10MB)
        </p>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          id="file-input"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.txt"
        />
        <label htmlFor="file-input" className="inline-block">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            Seleccionar Archivos
          </Button>
        </label>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Archivos Subidos ({files.length})
          </h3>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-white border border-emerald-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.uploadedAt}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadFile(file)}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFile(file.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
