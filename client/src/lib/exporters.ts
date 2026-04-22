import jsPDF from "jspdf";

interface ATEData {
  projectName: string;
  secretCode: string;
  disciplinaryArea: string;
  grade: string;
  members: string[];
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
  technicalResources?: Array<{
    type: string;
    accessCost: string;
    technicalRequirement: string;
    urlReference: string;
  }>;
}

const COLORS = {
  primary: [30, 144, 255],      // Blue
  secondary: [50, 205, 50],     // Green
  accent: [255, 140, 0],        // Orange
  dark: [40, 40, 40],           // Dark gray
  light: [245, 245, 250],       // Light gray
  white: [255, 255, 255],
};

export const exportToPDF = (data: ATEData) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 10;
  const margin = 12;
  const contentWidth = pageWidth - 2 * margin;

  const checkPageBreak = (spaceNeeded: number) => {
    if (yPosition + spaceNeeded > pageHeight - 15) {
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Página ${doc.internal.pages.length - 1}`, pageWidth / 2, pageHeight - 8, { align: "center" });
      
      doc.addPage();
      yPosition = 15;
      
      // Header en nueva página
      doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
      doc.rect(0, 0, pageWidth, 12, "F");
      doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
      doc.setFontSize(9);
      doc.setFont("Helvetica", "bold");
      doc.text("ATE-TPACK Creator", margin, 7);
    }
  };

  // Portada
  doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.setFontSize(28);
  doc.setFont("Helvetica", "bold");
  doc.text("ATE-TPACK Creator", pageWidth / 2, 40, { align: "center" });

  doc.setFontSize(14);
  doc.setFont("Helvetica", "normal");
  doc.text("Actividad Tecnológica Escolar", pageWidth / 2, 55, { align: "center" });

  doc.setFontSize(20);
  doc.setFont("Helvetica", "bold");
  doc.text(data.projectName, pageWidth / 2, 85, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.text(`Código de Acceso: ${data.secretCode}`, pageWidth / 2, 100, { align: "center" });
  doc.text(`Grado: ${data.grade} | Área: ${data.disciplinaryArea}`, pageWidth / 2, 108, { align: "center" });
  doc.text(`Integrantes: ${data.members.filter(m => m.trim()).join(", ") || "No especificados"}`, pageWidth / 2, 116, { align: "center" });
  doc.text(`Duración Total: ${data.totalDuration} minutos`, pageWidth / 2, 124, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text("Diseñado con ATE-TPACK Creator", pageWidth / 2, pageHeight - 15, { align: "center" });

  doc.addPage();
  yPosition = 15;

  // Tabla de contenidos
  doc.setFillColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.rect(margin, yPosition, contentWidth, 8, "F");
  doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("TABLA DE CONTENIDOS", margin + 2, yPosition + 5);
  yPosition += 12;

  const sections = [
    "1. Información del Proyecto",
    "2. Objetivo de Aprendizaje (CK)",
    "3. Estrategia Pedagógica (PK)",
    "4. Tecnología (TK)",
    "5. Secuencia Didáctica",
    "6. Representación del Contenido (TCK)",
    "7. Potenciación de Estrategia (TPK)",
  ];

  doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  sections.forEach((section) => {
    doc.text(section, margin + 4, yPosition);
    yPosition += 6;
  });

  doc.addPage();
  yPosition = 15;

  // Información del Proyecto
  const addSectionHeader = (title: string, color: number[]) => {
    checkPageBreak(12);
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(margin, yPosition, contentWidth, 8, "F");
    doc.setTextColor(COLORS.white[0], COLORS.white[1], COLORS.white[2]);
    doc.setFontSize(11);
    doc.setFont("Helvetica", "bold");
    doc.text(title, margin + 2, yPosition + 5);
    yPosition += 10;
  };

  const addContent = (label: string, content: string, isBold = false) => {
    checkPageBreak(8);
    doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
    doc.setFontSize(9);
    doc.setFont("Helvetica", isBold ? "bold" : "normal");
    
    const lines = doc.splitTextToSize(`${label}${isBold ? "" : ": " + content}`, contentWidth - 4);
    doc.text(lines, margin + 2, yPosition);
    yPosition += lines.length * 4.5 + 2;
  };

  addSectionHeader("1. INFORMACIÓN DEL PROYECTO", COLORS.primary);
  addContent("Área Disciplinar", data.disciplinaryArea);
  addContent("Grado", data.grade);
  addContent("Tiempo Total", `${data.totalDuration} minutos`);
  addContent("Integrantes", data.members.filter(m => m.trim()).join(", ") || "No especificados");
  yPosition += 4;

  // CK Section
  addSectionHeader("2. OBJETIVO DE APRENDIZAJE (CK)", COLORS.primary);
  const ckLines = doc.splitTextToSize(data.learningObjective, contentWidth - 4);
  doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text(ckLines, margin + 2, yPosition);
  yPosition += ckLines.length * 4.5 + 6;

  // PK Section
  addSectionHeader("3. ESTRATEGIA PEDAGÓGICA (PK)", COLORS.secondary);
  addContent("Estrategia", data.pedagogicalStrategy);
  const pkLines = doc.splitTextToSize(`Justificación: ${data.strategyJustification}`, contentWidth - 4);
  doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text(pkLines, margin + 2, yPosition);
  yPosition += pkLines.length * 4.5 + 6;

  // TK Section
  addSectionHeader("4. TECNOLOGÍA (TK)", COLORS.accent);
  addContent("Tipo", data.technologyType);
  addContent("Costo", data.technologyCost);
  const tkLines = doc.splitTextToSize(data.technology, contentWidth - 4);
  doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text(tkLines, margin + 2, yPosition);
  yPosition += tkLines.length * 4.5 + 6;

  // Secuencia Didáctica
  addSectionHeader("5. SECUENCIA DIDÁCTICA", COLORS.primary);

  // Apertura
  checkPageBreak(20);
  doc.setFillColor(200, 240, 230);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(COLORS.primary[0], COLORS.primary[1], COLORS.primary[2]);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`APERTURA / ENGANCHE (${data.openingDuration} min)`, margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
  doc.setFontSize(8);
  doc.setFont("Helvetica", "bold");
  doc.text("Rol del Docente:", margin + 2, yPosition);
  yPosition += 4;
  const openingTeacherLines = doc.splitTextToSize(data.openingTeacherRole, contentWidth - 6);
  doc.setFont("Helvetica", "normal");
  doc.text(openingTeacherLines, margin + 4, yPosition);
  yPosition += openingTeacherLines.length * 3.5 + 3;

  doc.setFont("Helvetica", "bold");
  doc.text("Rol de los Estudiantes:", margin + 2, yPosition);
  yPosition += 4;
  const openingStudentLines = doc.splitTextToSize(data.openingStudentRole, contentWidth - 6);
  doc.setFont("Helvetica", "normal");
  doc.text(openingStudentLines, margin + 4, yPosition);
  yPosition += openingStudentLines.length * 3.5 + 6;

  // Desarrollo
  checkPageBreak(20);
  doc.setFillColor(255, 220, 200);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(COLORS.accent[0], COLORS.accent[1], COLORS.accent[2]);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} min)`, margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
  doc.setFontSize(8);
  doc.setFont("Helvetica", "bold");
  doc.text("Rol del Docente:", margin + 2, yPosition);
  yPosition += 4;
  const devTeacherLines = doc.splitTextToSize(data.developmentTeacherRole, contentWidth - 6);
  doc.setFont("Helvetica", "normal");
  doc.text(devTeacherLines, margin + 4, yPosition);
  yPosition += devTeacherLines.length * 3.5 + 3;

  doc.setFont("Helvetica", "bold");
  doc.text("Rol de los Estudiantes:", margin + 2, yPosition);
  yPosition += 4;
  const devStudentLines = doc.splitTextToSize(data.developmentStudentRole, contentWidth - 6);
  doc.setFont("Helvetica", "normal");
  doc.text(devStudentLines, margin + 4, yPosition);
  yPosition += devStudentLines.length * 3.5 + 6;

  // Cierre
  checkPageBreak(20);
  doc.setFillColor(230, 220, 250);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(150, 100, 200);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`CIERRE / REFLEXIÓN (${data.closingDuration} min)`, margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
  doc.setFontSize(8);
  doc.setFont("Helvetica", "bold");
  doc.text("Rol del Docente:", margin + 2, yPosition);
  yPosition += 4;
  const closeTeacherLines = doc.splitTextToSize(data.closingTeacherRole, contentWidth - 6);
  doc.setFont("Helvetica", "normal");
  doc.text(closeTeacherLines, margin + 4, yPosition);
  yPosition += closeTeacherLines.length * 3.5 + 3;

  doc.setFont("Helvetica", "bold");
  doc.text("Rol de los Estudiantes:", margin + 2, yPosition);
  yPosition += 4;
  const closeStudentLines = doc.splitTextToSize(data.closingStudentRole, contentWidth - 6);
  doc.setFont("Helvetica", "normal");
  doc.text(closeStudentLines, margin + 4, yPosition);
  yPosition += closeStudentLines.length * 3.5 + 8;

  // TCK Section
  if (data.contentRepresentation) {
    checkPageBreak(15);
    addSectionHeader("6. REPRESENTACIÓN DEL CONTENIDO (TCK)", COLORS.secondary);
    const tckLines = doc.splitTextToSize(data.contentRepresentation, contentWidth - 4);
    doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
    doc.setFontSize(9);
    doc.setFont("Helvetica", "normal");
    doc.text(tckLines, margin + 2, yPosition);
    yPosition += tckLines.length * 4.5 + 6;
  }

  // TPK Section
  if (data.strategyPotentiation) {
    checkPageBreak(15);
    addSectionHeader("7. POTENCIACIÓN DE LA ESTRATEGIA (TPK)", COLORS.accent);
    const tpkLines = doc.splitTextToSize(data.strategyPotentiation, contentWidth - 4);
    doc.setTextColor(COLORS.dark[0], COLORS.dark[1], COLORS.dark[2]);
    doc.setFontSize(9);
    doc.setFont("Helvetica", "normal");
    doc.text(tpkLines, margin + 2, yPosition);
  }

  // Final page with footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Página ${doc.internal.pages.length - 1}`, pageWidth / 2, pageHeight - 8, { align: "center" });

  doc.save(`${data.projectName}.pdf`);
};

export const exportToWord = () => {
  // Función removida
};

export const exportToPowerPoint = () => {
  // Función removida
};
