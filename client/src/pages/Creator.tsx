import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Save, FileText, FileDown, Download, AlertCircle } from "lucide-react";
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
  const [showCustomPedagogy, setShowCustomPedagogy] = useState(false);
  const [showCustomTechType, setShowCustomTechType] = useState(false);
  const [showCustomTechCost, setShowCustomTechCost] = useState(false);
  const [showCustomDuration, setShowCustomDuration] = useState(false);

  // Comentado: No recuperar datos anteriores al entrar
  // useEffect(() => {
  //   const saved = localStorage.getItem("ateFormData");
  //   if (saved) {
  //     try {
  //       setFormData(JSON.parse(saved));
  //       toast.success("Datos recuperados del almacenamiento local");
  //     } catch (error) {
  //       console.error("Error loading saved data:", error);
  //     }
  //   }
  // }, []);

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

  const validateStep = (stepIndex: number): { valid: boolean; missingFields: string[] } => {
    const missing: string[] = [];
    
    if (stepIndex === 0) {
      if (!formData.projectName.trim()) missing.push("Nombre del proyecto");
      if (!formData.secretCode.trim()) missing.push("Código de acceso");
      if (!formData.disciplinaryArea.trim()) missing.push("Área disciplinar");
      if (!formData.grade.trim()) missing.push("Grado");
    } else if (stepIndex === 1) {
      if (!formData.learningObjective.trim()) missing.push("Objetivo de aprendizaje");
      if (!formData.pedagogicalStrategy.trim()) missing.push("Estrategia pedagógica");
      if (!formData.strategyJustification.trim()) missing.push("Justificación");
    } else if (stepIndex === 2) {
      if (!formData.technology.trim()) missing.push("Tecnología");
      if (!formData.technologyType.trim()) missing.push("Tipo de tecnología");
      if (!formData.technologyCost.trim()) missing.push("Acceso/Costo");
    } else if (stepIndex === 3) {
      if (!formData.totalDuration.trim()) missing.push("Duración total");
      if (!formData.openingDuration.trim()) missing.push("Duración de Apertura");
      if (!formData.developmentDuration.trim()) missing.push("Duración de Desarrollo");
      if (!formData.closingDuration.trim()) missing.push("Duración de Cierre");
    }
    
    return { valid: missing.length === 0, missingFields: missing };
  };

  const handleNextStep = () => {
    const validation = validateStep(currentStep);
    if (!validation.valid) {
      toast.error(`Campos obligatorios faltantes: ${validation.missingFields.join(", ")}`);
      return;
    }
    setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
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
            <p className="text-xs text-slate-600 mb-2">Describe qué deben aprender y ser capaces de hacer los estudiantes. Ejemplo: "Los estudiantes serán capaces de diseñar un circuito eléctrico funcional"</p>
            <Textarea
              placeholder="¿Qué deben lograr los estudiantes? Use un verbo observable de la Taxonomía de Bloom."
              value={formData.learningObjective}
              onChange={(e) => handleInputChange("learningObjective", e.target.value)}
              className="w-full min-h-24"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Estrategia Pedagógica (PK) *
            </label>
            <p className="text-xs text-slate-600 mb-2">¿Cómo enseñarás? Elige una estrategia que motive a los estudiantes. Ejemplo: ABP = los estudiantes resuelven un proyecto real</p>
            {!showCustomPedagogy ? (
              <Select 
                value={formData.pedagogicalStrategy}
                onValueChange={(value) => {
                  if (value === "other") {
                    setShowCustomPedagogy(true);
                    handleInputChange("pedagogicalStrategy", "");
                  } else {
                    handleInputChange("pedagogicalStrategy", value);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estrategia…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abp">Aprendizaje Basado en Proyectos (ABP)</SelectItem>
                  <SelectItem value="abpr">Aprendizaje Basado en Problemas</SelectItem>
                  <SelectItem value="flipped">Aula Invertida (Flipped Classroom)</SelectItem>
                  <SelectItem value="gamification">Gamificación</SelectItem>
                  <SelectItem value="other">Otro (especificar)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Escribe tu estrategia pedagógica personalizada"
                  value={formData.pedagogicalStrategy}
                  onChange={(e) => handleInputChange("pedagogicalStrategy", e.target.value)}
                  className="w-full"
                  autoFocus
                />
                <Button
                  onClick={() => {
                    setShowCustomPedagogy(false);
                    handleInputChange("pedagogicalStrategy", "");
                  }}
                  variant="outline"
                  size="sm"
                >
                  Volver a opciones predefinidas
                </Button>
              </div>
            )}
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
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tipo de Tecnología
              </label>
              {!showCustomTechType ? (
                <Select 
                  value={formData.technologyType}
                  onValueChange={(value) => {
                    if (value === "other") {
                      setShowCustomTechType(true);
                      handleInputChange("technologyType", "");
                    } else {
                      handleInputChange("technologyType", value);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">App móvil</SelectItem>
                    <SelectItem value="web">Plataforma web</SelectItem>
                    <SelectItem value="physical">Dispositivo físico</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Escribe el tipo de tecnología"
                    value={formData.technologyType}
                    onChange={(e) => handleInputChange("technologyType", e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  <Button
                    onClick={() => {
                      setShowCustomTechType(false);
                      handleInputChange("technologyType", "");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Volver a opciones
                  </Button>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Acceso / Costo
              </label>
              {!showCustomTechCost ? (
                <Select 
                  value={formData.technologyCost}
                  onValueChange={(value) => {
                    if (value === "other") {
                      setShowCustomTechCost(true);
                      handleInputChange("technologyCost", "");
                    } else {
                      handleInputChange("technologyCost", value);
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Gratuita</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="paid">Paga – licencia institucional</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="space-y-2">
                  <Input
                    placeholder="Escribe el tipo de acceso/costo"
                    value={formData.technologyCost}
                    onChange={(e) => handleInputChange("technologyCost", e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                  <Button
                    onClick={() => {
                      setShowCustomTechCost(false);
                      handleInputChange("technologyCost", "");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Volver a opciones
                  </Button>
                </div>
              )}
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
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Duración Total de la Lección *
            </label>
            {!showCustomDuration ? (
              <Select 
                value={formData.totalDuration}
                onValueChange={(value) => {
                  if (value === "other") {
                    setShowCustomDuration(true);
                    handleInputChange("totalDuration", "");
                  } else {
                    handleInputChange("totalDuration", value);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 minutos</SelectItem>
                  <SelectItem value="75">75 minutos</SelectItem>
                  <SelectItem value="90">90 minutos</SelectItem>
                  <SelectItem value="other">Otra duración</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Ingresa la duración"
                    value={formData.totalDuration}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d+$/.test(value)) {
                        handleInputChange("totalDuration", value);
                      }
                    }}
                    className="w-full"
                    min="1"
                    autoFocus
                  />
                  {formData.totalDuration && <span className="text-slate-700 font-semibold whitespace-nowrap">minutos</span>}
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Solo se aceptan valores numéricos. Ejemplo: 45, 120, 180
                </p>
                <Button
                  onClick={() => {
                    setShowCustomDuration(false);
                    handleInputChange("totalDuration", "");
                  }}
                  variant="outline"
                  size="sm"
                >
                  Volver a opciones predefinidas
                </Button>
              </div>
            )}
          </div>

          <div className="border-t-4 border-blue-600 pt-6 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">①</div>
              <h3 className="text-2xl font-bold text-blue-900">Apertura / Enganche</h3>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Input
                type="number"
                placeholder="Duración *"
                value={formData.openingDuration}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    handleInputChange("openingDuration", value);
                  }
                }}
                className="w-full"
                min="1"
              />
              {formData.openingDuration && <span className="text-slate-700 font-semibold whitespace-nowrap">minutos</span>}
            </div>
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
            <div className="flex items-center gap-2 mb-4">
              <Input
                type="number"
                placeholder="Duración *"
                value={formData.developmentDuration}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    handleInputChange("developmentDuration", value);
                  }
                }}
                className="w-full"
                min="1"
              />
              {formData.developmentDuration && <span className="text-slate-700 font-semibold whitespace-nowrap">minutos</span>}
            </div>
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
            <div className="flex items-center gap-2 mb-4">
              <Input
                type="number"
                placeholder="Duración *"
                value={formData.closingDuration}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^\d+$/.test(value)) {
                    handleInputChange("closingDuration", value);
                  }
                }}
                className="w-full"
                min="1"
              />
              {formData.closingDuration && <span className="text-slate-700 font-semibold whitespace-nowrap">minutos</span>}
            </div>
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="gap-2 border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 px-4 py-2">
                ← Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Crear ATE</h1>
              <p className="text-slate-600 text-sm">Diseña tu Actividad Tecnológica Escolar</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between gap-2 mb-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex-1">
                <div
                  className={`h-3 rounded-full transition-all ${
                    idx <= currentStep 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700" 
                      : "bg-slate-200"
                  }`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-slate-700">
              Paso {currentStep + 1} de {steps.length}
            </p>
            <p className="text-sm text-slate-600">
              {currentStepData.title}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
          <p className="text-sm text-slate-700">
            <span className="font-semibold">Nota:</span> Los campos marcados con <span className="text-red-600 font-bold">*</span> son obligatorios.
          </p>
        </div>

        <Card className="p-10 mb-10 border-2 border-slate-200 shadow-lg bg-white">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-slate-600 text-base font-medium">{currentStepData.description}</p>
          </div>
          <div className="border-t border-slate-200 pt-8">
            {currentStepData.content}
          </div>
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
