import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

/**
 * LMSExport Component
 * Permite exportar ATE a Moodle, Canvas o Blackboard
 */

interface LMSExportProps {
  ateId: number;
  onClose: () => void;
}

export default function LMSExport({ ateId, onClose }: LMSExportProps) {
  const [lmsType, setLmsType] = useState<"moodle" | "canvas" | "blackboard">("moodle");
  const [lmsUrl, setLmsUrl] = useState("");
  const [courseId, setCourseId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [exportStatus, setExportStatus] = useState<"idle" | "success" | "error">("idle");

  const exportMutation = trpc.lms.export.useMutation();

  const handleExport = async () => {
    // Validar campos
    if (!lmsUrl.trim()) {
      toast.error("Por favor ingresa la URL del LMS");
      return;
    }

    if (!courseId.trim()) {
      toast.error("Por favor ingresa el ID del curso");
      return;
    }

    try {
      setIsLoading(true);
      await exportMutation.mutateAsync({
        ateId,
        lmsType,
        lmsUrl,
        courseId,
      });

      setExportStatus("success");
      toast.success(`ATE exportado a ${lmsType.toUpperCase()} exitosamente`);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setExportStatus("error");
      toast.error("Error al exportar el ATE");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLMSInfo = () => {
    switch (lmsType) {
      case "moodle":
        return {
          name: "Moodle",
          urlPlaceholder: "https://tu-moodle.com",
          urlHint: "URL base de tu instancia de Moodle",
          courseIdHint: "ID del curso en Moodle (ej: 123)",
        };
      case "canvas":
        return {
          name: "Canvas",
          urlPlaceholder: "https://canvas.instructure.com",
          urlHint: "URL de tu instancia de Canvas",
          courseIdHint: "ID del curso en Canvas (ej: 456)",
        };
      case "blackboard":
        return {
          name: "Blackboard",
          urlPlaceholder: "https://tu-blackboard.com",
          urlHint: "URL de tu instancia de Blackboard",
          courseIdHint: "ID del curso en Blackboard (ej: 789)",
        };
      default:
        return {
          name: "LMS",
          urlPlaceholder: "",
          urlHint: "",
          courseIdHint: "",
        };
    }
  };

  const lmsInfo = getLMSInfo();

  if (exportStatus === "success") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Exportación Exitosa</h2>
          <p className="text-gray-600 mb-6">
            Tu ATE ha sido exportado a {lmsInfo.name} correctamente.
          </p>
          <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
            Cerrar
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Upload className="w-6 h-6" />
            <h2 className="text-xl font-bold">Exportar a LMS</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* LMS Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plataforma LMS
            </label>
            <Select value={lmsType} onValueChange={(value: any) => setLmsType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="moodle">Moodle</SelectItem>
                <SelectItem value="canvas">Canvas</SelectItem>
                <SelectItem value="blackboard">Blackboard</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">{lmsInfo.urlHint}</p>
          </div>

          {/* LMS URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL del LMS
            </label>
            <Input
              type="url"
              placeholder={lmsInfo.urlPlaceholder}
              value={lmsUrl}
              onChange={(e) => setLmsUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Course ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ID del Curso
            </label>
            <Input
              type="text"
              placeholder="Ej: 123"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">{lmsInfo.courseIdHint}</p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">
              El ATE se exportará como un archivo SCORM compatible con {lmsInfo.name}.
            </p>
          </div>

          {/* Error State */}
          {exportStatus === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">
                Error al exportar. Verifica los datos e intenta nuevamente.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleExport}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Exportando..." : "Exportar"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
