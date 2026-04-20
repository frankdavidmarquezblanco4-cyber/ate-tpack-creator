import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Save, FileText, FileDown, Download } from "lucide-react";
import { toast } from "sonner";
import { exportToPDF, exportToWord, exportToPowerPoint } from "@/lib/exporters";

interface ATEData {
  projectName: string;
  secretCode: string;
  disciplinaryArea: string;
  grade: string;
  member1: string;
  member2: string;
  member3: string;
  learningObjective: string;
  pedagogicalStrategy: string;
  strategyJustification: string;
  technology: string;
  technologyType: string;
  technologyCost: string;
  contentRepresentation: string;
  strategyPotentiation: string;
  totalDuration: string;
  openingDuration: string;
  openingTeacherRole: string;
  openingStudentRole: string;
  developmentDuration: string;
  developmentTeacherRole: string;
  developmentStudentRole: string;
  closingDuration: string;
  closingTeacherRole: string;
  closingStudentRole: string;
}

const initialData: ATEData = {
  projectName: "",
  secretCode: "",
  disciplinaryArea: "",
  grade: "",
  member1: "",
  member2: "",
  member3: "",
  learningObjective: "",
  pedagogicalStrategy: "",
  strategyJustification: "",
  technology: "",
  technologyType: "",
  technologyCost: "",
  contentRepresentation: "",
  strategyPotentiation: "",
  totalDuration: "",
  openingDuration: "",
  openingTeacherRole: "",
  openingStudentRole: "",
  developmentDuration: "",
  developmentTeacherRole: "",
  developmentStudentRole: "",
  closingDuration: "",
  closingTeacherRole: "",
  closingStudentRole: "",
};

export default function Creator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ATEData>(initialData);

  useEffect(() => {
    const saved = localStorage.getItem("ateFormData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        toast.success("Datos recuperados del almacenamiento local");
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("ateFormData", JSON.stringify(formData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const steps = [
    {
      title: "Información del Grupo",
      description: "Datos de identificación del equipo de trabajo",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nombre del Proyecto *
            </label>
            <Input
              placeholder="Ej: Aprendiendo álgebra con GeoGebra"
              value={formData.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Código de Acceso *
            </label>
            <Input
              placeholder="Cree una clave secreta para su grupo"
              value={formData.secretCode}
              onChange={(e) => handleInputChange("secretCode", e.target.value)}
              className="w-full"
              type="password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Área Disciplinar *
            </label>
            <Input
              placeholder="Ej: Tecnología e Informática, Matemáticas…"
              value={formData.disciplinaryArea}
              onChange={(e) => handleInputChange("disciplinaryArea", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Grado / Nivel Escolar *
            </label>
            <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar grado…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Grado 1°</SelectItem>
                <SelectItem value="2">Grado 2°</SelectItem>
                <SelectItem value="3">Grado 3°</SelectItem>
                <SelectItem value="4">Grado 4°</SelectItem>
                <SelectItem value="5">Grado 5°</SelectItem>
                <SelectItem value="6">Grado 6°</SelectItem>
                <SelectItem value="7">Grado 7°</SelectItem>
                <SelectItem value="8">Grado 8°</SelectItem>
                <SelectItem value="9">Grado 9°</SelectItem>
                <SelectItem value="10">Grado 10°</SelectItem>
                <SelectItem value="11">Grado 11°</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
              Integrantes del Equipo
            </label>
            <Input
              placeholder="Integrante 1 (Nombre completo) *"
              value={formData.member1}
              onChange={(e) => handleInputChange("member1", e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="Integrante 2 (Nombre completo)"
              value={formData.member2}
              onChange={(e) => handleInputChange("member2", e.target.value)}
              className="w-full"
            />
            <Input
              placeholder="Integrante 3 (Nombre completo)"
              value={formData.member3}
              onChange={(e) => handleInputChange("member3", e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Definición del Problema Pedagógico",
      description: "Conocimiento del Contenido (CK) + Conocimiento Pedagógico (PK)",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Objetivo de Aprendizaje (CK) *
            </label>
            <Textarea
              placeholder="¿Qué deben lograr los estudiantes? Use un verbo observable de la Taxonomía de Bloom."
              value={formData.learningObjective}
              onChange={(e) => handleInputChange("learningObjective", e.target.value)}
              className="w-full min-h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Estrategia Pedagógica (PK) *
            </label>
            <Select value={formData.pedagogicalStrategy} onValueChange={(value) => handleInputChange("pedagogicalStrategy", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar estrategia…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abp">Aprendizaje Basado en Proyectos (ABP)</SelectItem>
                <SelectItem value="abpr">Aprendizaje Basado en Problemas</SelectItem>
                <SelectItem value="flipped">Aula Invertida (Flipped Classroom)</SelectItem>
                <SelectItem value="gamification">Gamificación</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Justificación de la Estrategia (PK) *
            </label>
            <Textarea
              placeholder="¿Por qué esta estrategia es la más adecuada para este contenido y este grupo de estudiantes?"
              value={formData.strategyJustification}
              onChange={(e) => handleInputChange("strategyJustification", e.target.value)}
              className="w-full min-h-24"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Selección de Tecnología",
      description: "TK · TCK · TPK",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tecnología Emergente Seleccionada (TK) *
            </label>
            <Input
              placeholder="Ej: Realidad Aumentada con Merge Cube, Scratch, IA generativa, GeoGebra…"
              value={formData.technology}
              onChange={(e) => handleInputChange("technology", e.target.value)}
              className="w-full"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tipo de Tecnología
              </label>
              <Select value={formData.technologyType} onValueChange={(value) => handleInputChange("technologyType", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">App móvil</SelectItem>
                  <SelectItem value="web">Plataforma web</SelectItem>
                  <SelectItem value="physical">Dispositivo físico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Acceso / Costo
              </label>
              <Select value={formData.technologyCost} onValueChange={(value) => handleInputChange("technologyCost", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Gratuita</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="paid">Paga – licencia institucional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Representación del Contenido (TCK) *
            </label>
            <Textarea
              placeholder="¿Qué hace visible esta tecnología que de otra forma sería abstracto o invisible?"
              value={formData.contentRepresentation}
              onChange={(e) => handleInputChange("contentRepresentation", e.target.value)}
              className="w-full min-h-20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Potenciación de la Estrategia (TPK) *
            </label>
            <Textarea
              placeholder="¿Cómo amplifica, modifica o redefine esta tecnología la estrategia pedagógica seleccionada?"
              value={formData.strategyPotentiation}
              onChange={(e) => handleInputChange("strategyPotentiation", e.target.value)}
              className="w-full min-h-20"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Secuencia Didáctica",
      description: "Apertura, Desarrollo y Cierre",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Duración Total de la Lección *
            </label>
            <Select value={formData.totalDuration} onValueChange={(value) => handleInputChange("totalDuration", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">60 minutos</SelectItem>
                <SelectItem value="75">75 minutos</SelectItem>
                <SelectItem value="90">90 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border-t-2 border-blue-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">① Apertura / Enganche</h3>
            <Input
              placeholder="Duración (Ej: 10–15 min)"
              value={formData.openingDuration}
              onChange={(e) => handleInputChange("openingDuration", e.target.value)}
              className="w-full mb-4"
            />
            <Textarea
              placeholder="¿Qué hace el docente?"
              value={formData.openingTeacherRole}
              onChange={(e) => handleInputChange("openingTeacherRole", e.target.value)}
              className="w-full min-h-16 mb-4"
            />
            <Textarea
              placeholder="¿Qué hacen los estudiantes?"
              value={formData.openingStudentRole}
              onChange={(e) => handleInputChange("openingStudentRole", e.target.value)}
              className="w-full min-h-16"
            />
          </div>
          <div className="border-t-2 border-green-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">② Desarrollo / Construcción</h3>
            <Input
              placeholder="Duración (Ej: 35–50 min)"
              value={formData.developmentDuration}
              onChange={(e) => handleInputChange("developmentDuration", e.target.value)}
              className="w-full mb-4"
            />
            <Textarea
              placeholder="¿Qué hace el docente?"
              value={formData.developmentTeacherRole}
              onChange={(e) => handleInputChange("developmentTeacherRole", e.target.value)}
              className="w-full min-h-16 mb-4"
            />
            <Textarea
              placeholder="¿Qué hacen los estudiantes?"
              value={formData.developmentStudentRole}
              onChange={(e) => handleInputChange("developmentStudentRole", e.target.value)}
              className="w-full min-h-16"
            />
          </div>
          <div className="border-t-2 border-orange-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">③ Cierre / Evaluación</h3>
            <Input
              placeholder="Duración (Ej: 10–15 min)"
              value={formData.closingDuration}
              onChange={(e) => handleInputChange("closingDuration", e.target.value)}
              className="w-full mb-4"
            />
            <Textarea
              placeholder="¿Qué hace el docente?"
              value={formData.closingTeacherRole}
              onChange={(e) => handleInputChange("closingTeacherRole", e.target.value)}
              className="w-full min-h-16 mb-4"
            />
            <Textarea
              placeholder="¿Qué hacen los estudiantes?"
              value={formData.closingStudentRole}
              onChange={(e) => handleInputChange("closingStudentRole", e.target.value)}
              className="w-full min-h-16"
            />
          </div>
        </div>
      ),
    },
  ];

  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1 mr-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    idx <= currentStep ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Paso {currentStep + 1} de {steps.length}
          </p>
        </div>

        <Card className="p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {currentStepData.title}
          </h2>
          <p className="text-gray-600 mb-8">{currentStepData.description}</p>
          {currentStepData.content}
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={isFirstStep}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          <Button
            onClick={() => {
              localStorage.setItem("ateFormData", JSON.stringify(formData));
              toast.success("ATE guardada correctamente");
            }}
            variant="outline"
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar
          </Button>

          <Button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={isLastStep}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {isLastStep && (
          <div className="mt-8 p-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Exportar tu ATE</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                onClick={() => {
                  exportToPDF(formData);
                  toast.success("PDF descargado correctamente");
                }}
                className="bg-red-600 hover:bg-red-700 gap-2 h-auto py-4"
              >
                <FileText className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Descargar PDF</div>
                  <div className="text-xs opacity-90">Documento maquetado</div>
                </div>
              </Button>
              <Button 
                onClick={() => {
                  exportToWord(formData);
                  toast.success("Word descargado correctamente");
                }}
                className="bg-blue-600 hover:bg-blue-700 gap-2 h-auto py-4"
              >
                <FileDown className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Descargar Word</div>
                  <div className="text-xs opacity-90">Documento editable</div>
                </div>
              </Button>
              <Button 
                onClick={() => {
                  exportToPowerPoint(formData);
                  toast.success("Presentación descargada correctamente");
                }}
                className="bg-orange-600 hover:bg-orange-700 gap-2 h-auto py-4"
              >
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">Generar Presentación</div>
                  <div className="text-xs opacity-90">PowerPoint (PPTX)</div>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
