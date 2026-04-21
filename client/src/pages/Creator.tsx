import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Save, FileText, FileDown, Download, AlertCircle, Home } from "lucide-react";
import { toast } from "sonner";
import { exportToPDF, exportToWord, exportToPowerPoint } from "@/lib/exporters";
import FileUploader from "@/components/FileUploader";

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
  technicalResources: Array<{
    type: string;
    accessCost: string;
    technicalRequirement: string;
    urlReference: string;
  }>;
  referenceFiles: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: string;
    base64: string;
  }>;
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
  technicalResources: [],
  referenceFiles: [],
};

export default function Creator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ATEData>(initialData);
  const [showCustomPedagogy, setShowCustomPedagogy] = useState(false);
  const [showCustomTechType, setShowCustomTechType] = useState(false);
  const [showCustomTechCost, setShowCustomTechCost] = useState(false);
  const [showCustomDuration, setShowCustomDuration] = useState(false);

  // Validación completa de todos los campos obligatorios
  const validateAllFieldsForSave = (): boolean => {
    // Paso 1: Información del Grupo
    if (!formData.projectName.trim() || !formData.secretCode.trim() || 
        !formData.disciplinaryArea.trim() || !formData.grade.trim()) return false;
    
    // Paso 2: Problema Pedagógico
    if (!formData.learningObjective.trim() || !formData.pedagogicalStrategy.trim() || 
        !formData.strategyJustification.trim()) return false;
    
    // Paso 3: Tecnología
    if (!formData.technology.trim() || !formData.technologyType.trim() || 
        !formData.technologyCost.trim()) return false;
    
    // Paso 4: Secuencia Didáctica - TODOS los campos
    if (!formData.totalDuration.trim() || !formData.openingDuration.trim() || 
        !formData.developmentDuration.trim() || !formData.closingDuration.trim()) return false;
    
    if (!formData.openingTeacherRole.trim() || !formData.openingStudentRole.trim() ||
        !formData.developmentTeacherRole.trim() || !formData.developmentStudentRole.trim() ||
        !formData.closingTeacherRole.trim() || !formData.closingStudentRole.trim()) return false;
    
    return true;
  };

  // Cargar datos guardados cuando el usuario accede a su trabajo
  useEffect(() => {
    const isEditMode = localStorage.getItem("isEditMode");
    if (isEditMode === "true") {
      const saved = localStorage.getItem("ateFormData");
      if (saved) {
        try {
          const data = JSON.parse(saved);
          setFormData(data);
          localStorage.removeItem("isEditMode");
        } catch (error) {
          console.error("Error loading saved data", error);
        }
      }
    }
  }, []);

  // Autosave SOLO si todos los campos están completos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (validateAllFieldsForSave()) {
        localStorage.setItem("ateFormData", JSON.stringify(formData));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateAllFields = (): { valid: boolean; missingFields: string[] } => {
    const missing: string[] = [];
    
    // Paso 1
    if (!formData.projectName.trim()) missing.push("Nombre del proyecto");
    if (!formData.secretCode.trim()) missing.push("Código de acceso");
    if (!formData.disciplinaryArea.trim()) missing.push("Área disciplinar");
    if (!formData.grade.trim()) missing.push("Grado");
    
    // Paso 2
    if (!formData.learningObjective.trim()) missing.push("Objetivo de aprendizaje");
    if (!formData.pedagogicalStrategy.trim()) missing.push("Estrategia pedagógica");
    if (!formData.strategyJustification.trim()) missing.push("Justificación de estrategia");
    
    // Paso 3
    if (!formData.technology.trim()) missing.push("Tecnología");
    if (!formData.technologyType.trim()) missing.push("Tipo de tecnología");
    if (!formData.technologyCost.trim()) missing.push("Acceso/Costo");
    
    // Paso 4
    if (!formData.openingDuration.trim() || !formData.developmentDuration.trim() || !formData.closingDuration.trim()) missing.push("Duración total");
    if (!formData.openingDuration.trim()) missing.push("Duración de Apertura");
    if (!formData.developmentDuration.trim()) missing.push("Duración de Desarrollo");
    if (!formData.closingDuration.trim()) missing.push("Duración de Cierre");
    if (!formData.openingTeacherRole.trim()) missing.push("Rol del docente en Apertura");
    if (!formData.openingStudentRole.trim()) missing.push("Rol de estudiantes en Apertura");
    if (!formData.developmentTeacherRole.trim()) missing.push("Rol del docente en Desarrollo");
    if (!formData.developmentStudentRole.trim()) missing.push("Rol de estudiantes en Desarrollo");
    if (!formData.closingTeacherRole.trim()) missing.push("Rol del docente en Cierre");
    if (!formData.closingStudentRole.trim()) missing.push("Rol de estudiantes en Cierre");
    
    return { valid: missing.length === 0, missingFields: missing };
  };

  const handleExport = (format: "pdf" | "word" | "pptx") => {
    const validation = validateAllFields();
    
    if (!validation.valid) {
      toast.error(`No se puede exportar. Campos faltantes: ${validation.missingFields.slice(0, 3).join(", ")}${validation.missingFields.length > 3 ? ` y ${validation.missingFields.length - 3} más` : ""}`);
      return;
    }
    
    try {
      if (format === "pdf") {
        exportToPDF(formData);
        toast.success("PDF descargado exitosamente");
      } else if (format === "word") {
        exportToWord(formData);
        toast.success("Documento Word descargado exitosamente");
      } else if (format === "pptx") {
        exportToPowerPoint(formData);
        toast.success("Presentación PowerPoint descargada exitosamente");
      }
    } catch (error) {
      toast.error("Error al exportar. Intenta de nuevo.");
      console.error(error);
    }
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
      if (!formData.openingDuration.trim() || !formData.developmentDuration.trim() || !formData.closingDuration.trim()) missing.push("Duración total");
      if (!formData.openingDuration.trim()) missing.push("Duración de Apertura");
      if (!formData.developmentDuration.trim()) missing.push("Duración de Desarrollo");
      if (!formData.closingDuration.trim()) missing.push("Duración de Cierre");
      if (!formData.openingTeacherRole.trim()) missing.push("Rol del docente en Apertura");
      if (!formData.openingStudentRole.trim()) missing.push("Rol de estudiantes en Apertura");
      if (!formData.developmentTeacherRole.trim()) missing.push("Rol del docente en Desarrollo");
      if (!formData.developmentStudentRole.trim()) missing.push("Rol de estudiantes en Desarrollo");
      if (!formData.closingTeacherRole.trim()) missing.push("Rol del docente en Cierre");
      if (!formData.closingStudentRole.trim()) missing.push("Rol de estudiantes en Cierre");
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

  const handleSave = () => {
    const validation = validateAllFields();
    if (!validation.valid) {
      toast.error(`No se puede guardar. Campos faltantes: ${validation.missingFields.slice(0, 3).join(", ")}${validation.missingFields.length > 3 ? ` y ${validation.missingFields.length - 3} más` : ""}`);
      return;
    }
    localStorage.setItem("ateFormData", JSON.stringify(formData));
    toast.success("ATE guardada correctamente");
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
              Grado *
            </label>
            <Input
              placeholder="Ej: 8°, 9°, 10°, 11°"
              value={formData.grade}
              onChange={(e) => handleInputChange("grade", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Miembro 1 (Opcional)
            </label>
            <Input
              placeholder="Nombre del primer miembro del grupo"
              value={formData.member1}
              onChange={(e) => handleInputChange("member1", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Miembro 2 (Opcional)
            </label>
            <Input
              placeholder="Nombre del segundo miembro del grupo"
              value={formData.member2}
              onChange={(e) => handleInputChange("member2", e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Miembro 3 (Opcional)
            </label>
            <Input
              placeholder="Nombre del tercer miembro del grupo"
              value={formData.member3}
              onChange={(e) => handleInputChange("member3", e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Problema Pedagógico",
      description: "Define objetivos y estrategias de aprendizaje",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Objetivo de Aprendizaje *
            </label>
            <Textarea
              placeholder="¿Qué deben aprender los estudiantes? Sé específico y medible."
              value={formData.learningObjective}
              onChange={(e) => handleInputChange("learningObjective", e.target.value)}
              className="w-full min-h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Estrategia Pedagógica *
            </label>
            <div className="space-y-3">
              <Select value={showCustomPedagogy ? "otro" : formData.pedagogicalStrategy} onValueChange={(value) => {
                if (value === "otro") {
                  setShowCustomPedagogy(true);
                  handleInputChange("pedagogicalStrategy", "");
                } else {
                  setShowCustomPedagogy(false);
                  handleInputChange("pedagogicalStrategy", value);
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una estrategia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aprendizaje-basado-proyectos">Aprendizaje Basado en Proyectos</SelectItem>
                  <SelectItem value="aprendizaje-colaborativo">Aprendizaje Colaborativo</SelectItem>
                  <SelectItem value="aprendizaje-basado-problemas">Aprendizaje Basado en Problemas</SelectItem>
                  <SelectItem value="gamificacion">Gamificación</SelectItem>
                  <SelectItem value="flipped-classroom">Flipped Classroom</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              {showCustomPedagogy && (
                <div className="space-y-2">
                  <Input
                    placeholder="Describe tu estrategia pedagógica"
                    value={formData.pedagogicalStrategy}
                    onChange={(e) => handleInputChange("pedagogicalStrategy", e.target.value)}
                    className="w-full"
                  />
                  <Button
                    onClick={() => {
                      setShowCustomPedagogy(false);
                      handleInputChange("pedagogicalStrategy", "");
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
              Justificación de la Estrategia *
            </label>
            <Textarea
              placeholder="¿Por qué elegiste esta estrategia? ¿Cómo favorece el aprendizaje?"
              value={formData.strategyJustification}
              onChange={(e) => handleInputChange("strategyJustification", e.target.value)}
              className="w-full min-h-24"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Tecnología",
      description: "Selecciona la tecnología y especifica tipo y costo",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tecnología a Utilizar *
            </label>
            <Textarea
              placeholder="Ej: GeoGebra, Python, Arduino, Google Classroom, Canva, etc."
              value={formData.technology}
              onChange={(e) => handleInputChange("technology", e.target.value)}
              className="w-full min-h-20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tipo de Tecnología *
            </label>
            <div className="space-y-3">
              <Select value={showCustomTechType ? "otro" : formData.technologyType} onValueChange={(value) => {
                if (value === "otro") {
                  setShowCustomTechType(true);
                  handleInputChange("technologyType", "");
                } else {
                  setShowCustomTechType(false);
                  handleInputChange("technologyType", value);
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="plataforma-web">Plataforma Web</SelectItem>
                  <SelectItem value="aplicacion-movil">Aplicación Móvil</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              {showCustomTechType && (
                <div className="space-y-2">
                  <Input
                    placeholder="Especifica el tipo de tecnología"
                    value={formData.technologyType}
                    onChange={(e) => handleInputChange("technologyType", e.target.value)}
                    className="w-full"
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
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Acceso / Costo *
            </label>
            <div className="space-y-3">
              <Select value={showCustomTechCost ? "otro" : formData.technologyCost} onValueChange={(value) => {
                if (value === "otro") {
                  setShowCustomTechCost(true);
                  handleInputChange("technologyCost", "");
                } else {
                  setShowCustomTechCost(false);
                  handleInputChange("technologyCost", value);
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona acceso/costo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gratuito">Gratuito</SelectItem>
                  <SelectItem value="freemium">Freemium</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="licencia-educativa">Licencia Educativa</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
              {showCustomTechCost && (
                <div className="space-y-2">
                  <Input
                    placeholder="Describe el acceso/costo"
                    value={formData.technologyCost}
                    onChange={(e) => handleInputChange("technologyCost", e.target.value)}
                    className="w-full"
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
              Archivos de Referencia (Opcional)
            </label>
            <p className="text-xs text-gray-600 mb-3">
              Sube documentos, imágenes o referencias que apoyen tu ATE (PDF, Word, imágenes, etc.)
            </p>
            <FileUploader
              onFilesChange={(files) => {
                setFormData((prev) => ({
                  ...prev,
                  referenceFiles: files,
                }));
              }}
              initialFiles={formData.referenceFiles}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Secuencia Didáctica",
      description: "Define apertura, desarrollo y cierre de la lección",
      content: (
        <div className="space-y-8">
          {/* APERTURA */}
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="text-lg font-bold text-green-600 mb-4">Apertura / Enganche</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duración (minutos) *
                </label>
                <div className="flex gap-2">
                  {!showCustomDuration ? (
                    <Select value={formData.openingDuration} onValueChange={(value) => {
                      if (value === "otro") {
                        setShowCustomDuration(true);
                        handleInputChange("openingDuration", "");
                      } else {
                        handleInputChange("openingDuration", value);
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona duración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="20">20 minutos</SelectItem>
                        <SelectItem value="25">25 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="35">35 minutos</SelectItem>
                        <SelectItem value="40">40 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="50">50 minutos</SelectItem>
                        <SelectItem value="55">55 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="65">65 minutos</SelectItem>
                        <SelectItem value="70">70 minutos</SelectItem>
                        <SelectItem value="75">75 minutos</SelectItem>
                        <SelectItem value="80">80 minutos</SelectItem>
                        <SelectItem value="85">85 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                        <SelectItem value="otro">Otra duración</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Ingresa minutos"
                        value={formData.openingDuration}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleInputChange("openingDuration", value);
                        }}
                        className="flex-1"
                      />
                      <span className="flex items-center text-gray-600 font-semibold">minutos</span>
                      <Button
                        onClick={() => {
                          setShowCustomDuration(false);
                          handleInputChange("openingDuration", "");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Volver
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Rol del Docente *
                </label>
                <Textarea
                  placeholder="¿Qué hace el docente en esta fase?"
                  value={formData.openingTeacherRole}
                  onChange={(e) => handleInputChange("openingTeacherRole", e.target.value)}
                  className="w-full min-h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Rol de Estudiantes *
                </label>
                <Textarea
                  placeholder="¿Qué hacen los estudiantes en esta fase?"
                  value={formData.openingStudentRole}
                  onChange={(e) => handleInputChange("openingStudentRole", e.target.value)}
                  className="w-full min-h-20"
                />
              </div>
            </div>
          </div>

          {/* DESARROLLO */}
          <div className="border-l-4 border-pink-600 pl-4">
            <h3 className="text-lg font-bold text-pink-600 mb-4">Desarrollo / Construcción</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duración (minutos) *
                </label>
                <div className="flex gap-2">
                  {!showCustomDuration ? (
                    <Select value={formData.developmentDuration} onValueChange={(value) => {
                      if (value === "otro") {
                        setShowCustomDuration(true);
                        handleInputChange("developmentDuration", "");
                      } else {
                        handleInputChange("developmentDuration", value);
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona duración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="20">20 minutos</SelectItem>
                        <SelectItem value="25">25 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="35">35 minutos</SelectItem>
                        <SelectItem value="40">40 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="50">50 minutos</SelectItem>
                        <SelectItem value="55">55 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="65">65 minutos</SelectItem>
                        <SelectItem value="70">70 minutos</SelectItem>
                        <SelectItem value="75">75 minutos</SelectItem>
                        <SelectItem value="80">80 minutos</SelectItem>
                        <SelectItem value="85">85 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                        <SelectItem value="otro">Otra duración</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Ingresa minutos"
                        value={formData.developmentDuration}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleInputChange("developmentDuration", value);
                        }}
                        className="flex-1"
                      />
                      <span className="flex items-center text-gray-600 font-semibold">minutos</span>
                      <Button
                        onClick={() => {
                          setShowCustomDuration(false);
                          handleInputChange("developmentDuration", "");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Volver
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Rol del Docente *
                </label>
                <Textarea
                  placeholder="¿Qué hace el docente en esta fase?"
                  value={formData.developmentTeacherRole}
                  onChange={(e) => handleInputChange("developmentTeacherRole", e.target.value)}
                  className="w-full min-h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Rol de Estudiantes *
                </label>
                <Textarea
                  placeholder="¿Qué hacen los estudiantes en esta fase?"
                  value={formData.developmentStudentRole}
                  onChange={(e) => handleInputChange("developmentStudentRole", e.target.value)}
                  className="w-full min-h-20"
                />
              </div>
            </div>
          </div>

          {/* CIERRE */}
          <div className="border-l-4 border-purple-600 pl-4">
            <h3 className="text-lg font-bold text-purple-600 mb-4">Cierre / Consolidación</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Duración (minutos) *
                </label>
                <div className="flex gap-2">
                  {!showCustomDuration ? (
                    <Select value={formData.closingDuration} onValueChange={(value) => {
                      if (value === "otro") {
                        setShowCustomDuration(true);
                        handleInputChange("closingDuration", "");
                      } else {
                        handleInputChange("closingDuration", value);
                      }
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona duración" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="20">20 minutos</SelectItem>
                        <SelectItem value="25">25 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="35">35 minutos</SelectItem>
                        <SelectItem value="40">40 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="50">50 minutos</SelectItem>
                        <SelectItem value="55">55 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="65">65 minutos</SelectItem>
                        <SelectItem value="70">70 minutos</SelectItem>
                        <SelectItem value="75">75 minutos</SelectItem>
                        <SelectItem value="80">80 minutos</SelectItem>
                        <SelectItem value="85">85 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                        <SelectItem value="otro">Otra duración</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex gap-2 flex-1">
                      <Input
                        type="number"
                        placeholder="Ingresa minutos"
                        value={formData.closingDuration}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          handleInputChange("closingDuration", value);
                        }}
                        className="flex-1"
                      />
                      <span className="flex items-center text-gray-600 font-semibold">minutos</span>
                      <Button
                        onClick={() => {
                          setShowCustomDuration(false);
                          handleInputChange("closingDuration", "");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Volver
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Rol del Docente *
                </label>
                <Textarea
                  placeholder="¿Qué hace el docente en esta fase?"
                  value={formData.closingTeacherRole}
                  onChange={(e) => handleInputChange("closingTeacherRole", e.target.value)}
                  className="w-full min-h-20"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Rol de Estudiantes *
                </label>
                <Textarea
                  placeholder="¿Qué hacen los estudiantes en esta fase?"
                  value={formData.closingStudentRole}
                  onChange={(e) => handleInputChange("closingStudentRole", e.target.value)}
                  className="w-full min-h-20"
                />
              </div>
            </div>
          </div>

          {/* DURACIÓN TOTAL */}
          <div className="bg-purple-50 border-2 border-purple-200 p-4 rounded-lg">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Duración Total de la Lección (minutos) *
            </label>
            <div className="flex gap-2 items-center">
              <div className="flex-1 p-3 bg-white border-2 border-purple-300 rounded-md text-lg font-bold text-purple-600">
                {(() => {
                  const opening = parseInt(formData.openingDuration) || 0;
                  const development = parseInt(formData.developmentDuration) || 0;
                  const closing = parseInt(formData.closingDuration) || 0;
                  const total = opening + development + closing;
                  return total > 0 ? `${total} minutos` : "Completa los tiempos arriba";
                })()}
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">⚠️ La duración total se calcula automáticamente sumando: Apertura + Desarrollo + Cierre</p>
          </div>
        </div>
      ),
    },
  ];

  const isLastStep = currentStep === steps.length - 1;
  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-purple-50">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-purple-200 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <button className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors">
              <Home className="w-5 h-5" />
              Inicio
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">ATE-TPACK Creator</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className={`h-2 rounded-full transition-all ${index <= currentStep ? "bg-gradient-to-r from-green-600 to-pink-500" : "bg-gray-300"}`} />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Paso {currentStep + 1} de {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <Card className="p-8 border-2 border-purple-200 shadow-lg bg-white">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600 mb-8">{currentStepData.description}</p>
          
          <div className="mb-8">
            {currentStepData.content}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between pt-8 border-t-2 border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </button>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </div>

            <button
              onClick={handleNextStep}
              disabled={isLastStep}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Siguiente
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Card>

        {/* Export Section - Last Step */}
        {isLastStep && (
          <Card className="mt-8 p-8 border-2 border-pink-200 shadow-lg bg-pink-50">
            <h3 className="text-2xl font-bold text-pink-900 mb-6">Exportar tu ATE</h3>
            <p className="text-pink-800 mb-6">Descarga tu Actividad Tecnológica Escolar en el formato que prefieras:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => handleExport("pdf")}
                className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-red-300 hover:border-red-500 hover:shadow-lg rounded-lg transition-all"
              >
                <FileText className="w-8 h-8 text-red-600" />
                <span className="font-semibold text-gray-900">Descargar PDF</span>
              </button>
              
              <button
                onClick={() => handleExport("word")}
                className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-blue-300 hover:border-blue-500 hover:shadow-lg rounded-lg transition-all"
              >
                <FileDown className="w-8 h-8 text-blue-600" />
                <span className="font-semibold text-gray-900">Descargar Word</span>
              </button>
              
              <button
                onClick={() => handleExport("pptx")}
                className="flex flex-col items-center gap-3 p-6 bg-white border-2 border-orange-300 hover:border-orange-500 hover:shadow-lg rounded-lg transition-all"
              >
                <Download className="w-8 h-8 text-orange-600" />
                <span className="font-semibold text-gray-900">Generar PowerPoint</span>
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
