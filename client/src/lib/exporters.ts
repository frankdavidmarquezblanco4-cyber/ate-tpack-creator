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

const addWrappedText = (
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number = 10
) => {
  doc.setFontSize(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * 5;
};

export const exportToPDF = (data: ATEData) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 10;
  const margin = 10;
  const contentWidth = pageWidth - 2 * margin;

  const checkPageBreak = (spaceNeeded: number) => {
    if (yPosition + spaceNeeded > pageHeight - 10) {
      doc.addPage();
      yPosition = 10;
    }
  };

  // Header
  doc.setFillColor(5, 150, 105);
  doc.rect(0, 0, pageWidth, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("Helvetica", "bold");
  doc.text("ATE-TPACK Creator", margin, 8);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.text("Diseñador de Actividades Tecnológicas Escolares", margin, 14);
  doc.text("Fundamentado en el Modelo TPACK", margin, 19);

  yPosition = 30;

  // Title
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(18);
  doc.setFont("Helvetica", "bold");
  doc.text(data.projectName, margin, yPosition);
  yPosition += 10;

  // Decorative line
  doc.setDrawColor(236, 72, 153);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  // Project Info
  checkPageBreak(25);
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 20);

  doc.setTextColor(5, 150, 105);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text("INFORMACIÓN DEL PROYECTO", margin + 2, yPosition + 4);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.text(`Área: ${data.disciplinaryArea}`, margin + 2, yPosition + 9);
  doc.text(`Grado: ${data.grade}`, margin + 2, yPosition + 14);
  doc.text(`Integrantes: ${data.members.filter(m => m.trim()).join(", ") || "No especificados"}`, margin + 2, yPosition + 19);

  yPosition += 28;

  // CK Section
  checkPageBreak(20);
  doc.setFillColor(209, 250, 229);
  doc.rect(margin, yPosition, contentWidth, 7, "F");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("1. OBJETIVO DE APRENDIZAJE (CK)", margin + 2, yPosition + 5);
  yPosition += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  const ckLines = doc.splitTextToSize(data.learningObjective, contentWidth - 4);
  doc.text(ckLines, margin + 2, yPosition);
  yPosition += ckLines.length * 5 + 8;

  // PK Section
  checkPageBreak(20);
  doc.setFillColor(254, 231, 243);
  doc.rect(margin, yPosition, contentWidth, 7, "F");
  doc.setTextColor(236, 72, 153);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("2. ESTRATEGIA PEDAGÓGICA (PK)", margin + 2, yPosition + 5);
  yPosition += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`Estrategia: ${data.pedagogicalStrategy}`, margin + 2, yPosition);
  yPosition += 6;

  doc.setFont("Helvetica", "normal");
  const pkLines = doc.splitTextToSize(`Justificación: ${data.strategyJustification}`, contentWidth - 4);
  doc.text(pkLines, margin + 2, yPosition);
  yPosition += pkLines.length * 5 + 8;

  // TK Section
  checkPageBreak(20);
  doc.setFillColor(243, 232, 255);
  doc.rect(margin, yPosition, contentWidth, 7, "F");
  doc.setTextColor(168, 85, 247);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("3. TECNOLOGÍA (TK)", margin + 2, yPosition + 5);
  yPosition += 10;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`Tipo: ${data.technologyType} | Costo: ${data.technologyCost}`, margin + 2, yPosition);
  yPosition += 6;

  doc.setFont("Helvetica", "normal");
  const tkLines = doc.splitTextToSize(data.technology, contentWidth - 4);
  doc.text(tkLines, margin + 2, yPosition);
  yPosition += tkLines.length * 5 + 8;

  // Secuencia Didáctica
  checkPageBreak(25);
  doc.setFillColor(5, 150, 105);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("Helvetica", "bold");
  doc.rect(margin, yPosition, contentWidth, 7, "F");
  doc.text("SECUENCIA DIDÁCTICA", margin + 2, yPosition + 5);
  yPosition += 10;

  // Apertura
  checkPageBreak(20);
  doc.setFillColor(209, 250, 229);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`APERTURA / ENGANCHE (${data.openingDuration} min)`, margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition += 5;
  doc.setFont("Helvetica", "normal");
  const openingTeacherLines = doc.splitTextToSize(data.openingTeacherRole, contentWidth - 6);
  doc.text(openingTeacherLines, margin + 4, yPosition);
  yPosition += openingTeacherLines.length * 4 + 5;

  doc.setFont("Helvetica", "bold");
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition += 5;
  doc.setFont("Helvetica", "normal");
  const openingStudentLines = doc.splitTextToSize(data.openingStudentRole, contentWidth - 6);
  doc.text(openingStudentLines, margin + 4, yPosition);
  yPosition += openingStudentLines.length * 4 + 8;

  // Desarrollo
  checkPageBreak(20);
  doc.setFillColor(254, 231, 243);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(236, 72, 153);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} min)`, margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition += 5;
  doc.setFont("Helvetica", "normal");
  const devTeacherLines = doc.splitTextToSize(data.developmentTeacherRole, contentWidth - 6);
  doc.text(devTeacherLines, margin + 4, yPosition);
  yPosition += devTeacherLines.length * 4 + 5;

  doc.setFont("Helvetica", "bold");
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition += 5;
  doc.setFont("Helvetica", "normal");
  const devStudentLines = doc.splitTextToSize(data.developmentStudentRole, contentWidth - 6);
  doc.text(devStudentLines, margin + 4, yPosition);
  yPosition += devStudentLines.length * 4 + 8;

  // Cierre
  checkPageBreak(20);
  doc.setFillColor(243, 232, 255);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(168, 85, 247);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`CIERRE / REFLEXIÓN (${data.closingDuration} min)`, margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition += 5;
  doc.setFont("Helvetica", "normal");
  const closeTeacherLines = doc.splitTextToSize(data.closingTeacherRole, contentWidth - 6);
  doc.text(closeTeacherLines, margin + 4, yPosition);
  yPosition += closeTeacherLines.length * 4 + 5;

  doc.setFont("Helvetica", "bold");
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition += 5;
  doc.setFont("Helvetica", "normal");
  const closeStudentLines = doc.splitTextToSize(data.closingStudentRole, contentWidth - 6);
  doc.text(closeStudentLines, margin + 4, yPosition);
  yPosition += closeStudentLines.length * 4 + 8;

  // TCK Section
  if (data.contentRepresentation) {
    checkPageBreak(20);
    doc.setFillColor(209, 250, 229);
    doc.rect(margin, yPosition, contentWidth, 7, "F");
    doc.setTextColor(5, 150, 105);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("REPRESENTACIÓN DEL CONTENIDO CON LA TECNOLOGÍA (TCK)", margin + 2, yPosition + 5);
    yPosition += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    const tckLines = doc.splitTextToSize(data.contentRepresentation, contentWidth - 4);
    doc.text(tckLines, margin + 2, yPosition);
    yPosition += tckLines.length * 5 + 8;
  }

  // TPK Section
  if (data.strategyPotentiation) {
    checkPageBreak(20);
    doc.setFillColor(254, 231, 243);
    doc.rect(margin, yPosition, contentWidth, 7, "F");
    doc.setTextColor(236, 72, 153);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("POTENCIACIÓN DE LA ESTRATEGIA PEDAGÓGICA CON LA TECNOLOGÍA (TPK)", margin + 2, yPosition + 5);
    yPosition += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    const tpkLines = doc.splitTextToSize(data.strategyPotentiation, contentWidth - 4);
    doc.text(tpkLines, margin + 2, yPosition);
  }

  doc.save(`${data.projectName}.pdf`);
};

export const exportToWord = () => {
  // Función removida
};

export const exportToPowerPoint = () => {
  // Función removida
};
