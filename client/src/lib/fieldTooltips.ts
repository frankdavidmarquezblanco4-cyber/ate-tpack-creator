/**
 * Tooltips contextuales para campos de ATE
 * Proporciona guía y validación para cada campo
 */

export const fieldTooltips: Record<string, string> = {
  // Paso 1: Información del Grupo
  projectName: "Nombre descriptivo de tu ATE. Ej: 'Drones para Monitoreo de Erosión Costera'",
  secretCode: "Código único de acceso (máx 50 caracteres). Ej: 'DRONES-CARIBE-001'. Otros pueden acceder con este código.",
  disciplinaryArea: "Área(s) disciplinaria(s) involucradas. Ej: 'Geografía, Tecnología, Sostenibilidad'",
  grade: "Grado(s) de estudiantes. Ej: '10-11' o 'Todos los grados'",
  members: "Nombres de los integrantes del equipo que diseña la ATE",

  // Paso 2: Problema Pedagógico (CK, PK)
  learningObjective: "Objetivo de aprendizaje basado en Taxonomía de Bloom. Ej: 'Los estudiantes analizarán datos de erosión...'",
  pedagogicalStrategy: "Estrategia pedagógica principal. Ej: 'Aprendizaje basado en proyectos', 'Aprendizaje colaborativo'",
  strategyJustification: "¿Por qué esta estrategia es efectiva para tu contexto? Conecta con el constructivismo.",

  // Paso 3: Tecnología (TK)
  technology: "Herramientas y tecnologías específicas. Ej: 'Drones DJI, Software de análisis de imágenes, Tablets'",
  technologyType: "Clasificación de la tecnología. Ej: 'Herramientas de captura y análisis de datos'",
  technologyCost: "Costo estimado de implementación: Bajo, Medio, Alto",
  contentRepresentation: "¿Cómo la tecnología representa el contenido? Ej: 'Visual y práctica'",
  strategyPotentiation: "¿Cómo la tecnología potencia la estrategia pedagógica? Ej: 'Alta - integra múltiples disciplinas'",

  // Paso 4: Secuencia Didáctica
  totalDuration: "Duración total de la ATE en minutos. Ej: '60', '90', '120'",
  openingDuration: "Duración de la fase de apertura/enganche en minutos",
  openingTeacherRole: "¿Qué hace el docente en la apertura? Ej: 'Presenta el problema, facilita la exploración inicial'",
  openingStudentRole: "¿Qué hacen los estudiantes en la apertura? Ej: 'Observan, reflexionan, formulan preguntas'",
  developmentDuration: "Duración de la fase de desarrollo/construcción en minutos",
  developmentTeacherRole: "¿Qué hace el docente en el desarrollo? Ej: 'Guía, facilita, resuelve dudas'",
  developmentStudentRole: "¿Qué hacen los estudiantes en el desarrollo? Ej: 'Construyen, experimentan, colaboran'",
  closingDuration: "Duración de la fase de cierre/reflexión en minutos",
  closingTeacherRole: "¿Qué hace el docente en el cierre? Ej: 'Facilita reflexión, evalúa aprendizajes'",
  closingStudentRole: "¿Qué hacen los estudiantes en el cierre? Ej: 'Presentan, reflexionan, autoevalúan'",
};

export const stepDescriptions: Record<number, string> = {
  0: "Información del Grupo - Define quiénes son los estudiantes y el contexto general de la ATE",
  1: "Problema Pedagógico - Establece el objetivo de aprendizaje y la estrategia pedagógica (CK, PK)",
  2: "Tecnología - Define qué tecnología se usará y cómo potencia el aprendizaje (TK)",
  3: "Secuencia Didáctica - Describe las tres fases: Apertura, Desarrollo y Cierre",
  4: "Complementos - Agrega recursos técnicos, archivos de referencia y evaluación",
};

export const getTooltip = (fieldName: string): string => {
  return fieldTooltips[fieldName] || "Completa este campo con información clara y específica";
};

export const getStepDescription = (stepIndex: number): string => {
  return stepDescriptions[stepIndex] || "Completa esta sección de la ATE";
};

export const validationRules: Record<string, { minLength?: number; maxLength?: number; pattern?: RegExp; message: string }> = {
  projectName: { minLength: 5, maxLength: 100, message: "El nombre debe tener entre 5 y 100 caracteres" },
  secretCode: { minLength: 3, maxLength: 50, message: "El código debe tener entre 3 y 50 caracteres" },
  disciplinaryArea: { minLength: 3, message: "Especifica al menos una área disciplinaria" },
  grade: { minLength: 1, message: "Especifica el grado o rango de grados" },
  learningObjective: { minLength: 20, message: "El objetivo debe ser detallado (mínimo 20 caracteres)" },
  pedagogicalStrategy: { minLength: 5, message: "Describe la estrategia pedagógica" },
  strategyJustification: { minLength: 20, message: "La justificación debe ser clara (mínimo 20 caracteres)" },
  technology: { minLength: 5, message: "Especifica las herramientas tecnológicas" },
  technologyType: { minLength: 5, message: "Clasifica el tipo de tecnología" },
  contentRepresentation: { minLength: 5, message: "Describe cómo se representa el contenido" },
  strategyPotentiation: { minLength: 5, message: "Explica cómo la tecnología potencia la estrategia" },
};

export const validateField = (fieldName: string, value: string): { isValid: boolean; message?: string } => {
  const rules = validationRules[fieldName];
  if (!rules) return { isValid: true };

  if (rules.minLength && value.length < rules.minLength) {
    return { isValid: false, message: rules.message };
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return { isValid: false, message: rules.message };
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return { isValid: false, message: rules.message };
  }

  return { isValid: true };
};
