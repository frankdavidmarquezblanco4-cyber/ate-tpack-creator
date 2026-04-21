import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, BorderStyle, VerticalAlign, AlignmentType, HeadingLevel } from "docx";
import PptxGenJS from "pptxgenjs";
import jsPDF from "jspdf";

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
  technicalResources?: Array<{
    type: string;
    accessCost: string;
    technicalRequirement: string;
    urlReference: string;
  }>;
}

// Colores TPACK
const COLORS = {
  green: { rgb: "059669", hex: "#059669" },      // CK - Verde Emerald
  pink: { rgb: "ec4899", hex: "#ec4899" },        // PK - Rosado
  purple: { rgb: "a855f7", hex: "#a855f7" },      // TK - Púrpura
  lightGreen: { rgb: "d1fae5", hex: "#d1fae5" },
  lightPink: { rgb: "fce7f3", hex: "#fce7f3" },
  lightPurple: { rgb: "f3e8ff", hex: "#f3e8ff" },
};

export const exportToPDF = (data: ATEData) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 15;
  const margin = 12;
  const contentWidth = pageWidth - 2 * margin;

  // Helper function to add text with word wrapping
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("Helvetica", isBold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.5) + 3;
  };

  // Header
  doc.setFillColor(5, 150, 105);
  doc.rect(0, 0, pageWidth, 30, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("Helvetica", "bold");
  doc.text("ATE-TPACK Creator", margin, 12);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text("Diseñador de Actividades Tecnológicas Escolares", margin, 18);
  doc.text("Fundamentado en el Modelo TPACK", margin, 23);

  yPosition = 40;

  // Title
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(16);
  doc.setFont("Helvetica", "bold");
  yPosition = addWrappedText(data.projectName, margin, yPosition, contentWidth, 16, true);

  // Decorative line
  doc.setDrawColor(236, 72, 153);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
  yPosition += 5;

  // Project Info Box
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.3);
  doc.rect(margin, yPosition, contentWidth, 25);

  doc.setTextColor(5, 150, 105);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text("INFORMACIÓN DEL PROYECTO", margin + 2, yPosition + 3);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont("Helvetica", "normal");
  doc.text(`Área: ${data.disciplinaryArea} | Grado: ${data.grade} | Duración: ${data.totalDuration} min`, margin + 2, yPosition + 8);
  doc.text(`Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`, margin + 2, yPosition + 12);
  doc.text(`Tecnología: ${data.technology}`, margin + 2, yPosition + 16);
  doc.text(`Tipo: ${data.technologyType} | Acceso: ${data.technologyCost}`, margin + 2, yPosition + 20);

  yPosition += 32;

  // CK Section
  doc.setFillColor(209, 250, 229);
  doc.rect(margin, yPosition - 3, contentWidth, 4, "F");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text("1. OBJETIVO DE APRENDIZAJE (CK)", margin + 2, yPosition);
  yPosition += 6;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  yPosition = addWrappedText(data.learningObjective, margin + 2, yPosition, contentWidth - 4, 9);
  yPosition += 4;

  // PK Section
  doc.setFillColor(254, 231, 243);
  doc.rect(margin, yPosition - 3, contentWidth, 4, "F");
  doc.setTextColor(236, 72, 153);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text("2. ESTRATEGIA PEDAGÓGICA (PK)", margin + 2, yPosition);
  yPosition += 6;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text(`Estrategia: ${data.pedagogicalStrategy}`, margin + 2, yPosition);
  yPosition += 4;
  yPosition = addWrappedText(`Justificación: ${data.strategyJustification}`, margin + 2, yPosition, contentWidth - 4, 8);
  yPosition += 4;

  // TK Section
  doc.setFillColor(243, 232, 255);
  doc.rect(margin, yPosition - 3, contentWidth, 4, "F");
  doc.setTextColor(168, 85, 247);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text("3. TECNOLOGÍA (TK)", margin + 2, yPosition);
  yPosition += 6;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "normal");
  doc.text(`Tipo: ${data.technologyType} | Costo: ${data.technologyCost}`, margin + 2, yPosition);
  yPosition += 4;
  yPosition = addWrappedText(data.technology, margin + 2, yPosition, contentWidth - 4, 8);
  yPosition += 6;

  // Secuencia Didáctica
  doc.setFillColor(5, 150, 105);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("SECUENCIA DIDÁCTICA", margin + 2, yPosition);
  yPosition += 8;

  // Apertura
  doc.setFillColor(209, 250, 229);
  doc.rect(margin, yPosition - 2, contentWidth, 3, "F");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`APERTURA / ENGANCHE (${data.openingDuration} min)`, margin + 2, yPosition);
  yPosition += 4;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont("Helvetica", "normal");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition = addWrappedText(data.openingTeacherRole, margin + 4, yPosition + 2, contentWidth - 6, 8);
  yPosition += 2;
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition = addWrappedText(data.openingStudentRole, margin + 4, yPosition + 2, contentWidth - 6, 8);
  yPosition += 4;

  // Desarrollo
  doc.setFillColor(254, 231, 243);
  doc.rect(margin, yPosition - 2, contentWidth, 3, "F");
  doc.setTextColor(236, 72, 153);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} min)`, margin + 2, yPosition);
  yPosition += 4;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont("Helvetica", "normal");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition = addWrappedText(data.developmentTeacherRole, margin + 4, yPosition + 2, contentWidth - 6, 8);
  yPosition += 2;
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition = addWrappedText(data.developmentStudentRole, margin + 4, yPosition + 2, contentWidth - 6, 8);
  yPosition += 4;

  // Cierre
  doc.setFillColor(243, 232, 255);
  doc.rect(margin, yPosition - 2, contentWidth, 3, "F");
  doc.setTextColor(168, 85, 247);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`CIERRE / REFLEXIÓN (${data.closingDuration} min)`, margin + 2, yPosition);
  yPosition += 4;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(8);
  doc.setFont("Helvetica", "normal");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition = addWrappedText(data.closingTeacherRole, margin + 4, yPosition + 2, contentWidth - 6, 8);
  yPosition += 2;
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition = addWrappedText(data.closingStudentRole, margin + 4, yPosition + 2, contentWidth - 6, 8);
  yPosition += 6;

  // TCK Section
  if (data.contentRepresentation) {
    doc.setFillColor(209, 250, 229);
    doc.rect(margin, yPosition - 3, contentWidth, 4, "F");
    doc.setTextColor(5, 150, 105);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.text("REPRESENTACIÓN DEL CONTENIDO CON LA TECNOLOGÍA (TCK)", margin + 2, yPosition);
    yPosition += 6;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont("Helvetica", "normal");
    yPosition = addWrappedText(data.contentRepresentation, margin + 2, yPosition, contentWidth - 4, 8);
    yPosition += 4;
  }

  // TPK Section
  if (data.strategyPotentiation) {
    doc.setFillColor(254, 231, 243);
    doc.rect(margin, yPosition - 3, contentWidth, 4, "F");
    doc.setTextColor(236, 72, 153);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.text("POTENCIACIÓN DE LA ESTRATEGIA PEDAGÓGICA CON LA TECNOLOGÍA (TPK)", margin + 2, yPosition);
    yPosition += 6;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setFont("Helvetica", "normal");
    yPosition = addWrappedText(data.strategyPotentiation, margin + 2, yPosition, contentWidth - 4, 8);
  }

  doc.save(`${data.projectName}.pdf`);
};

export const exportToWord = (data: ATEData) => {
  const sections = [];

  // Header
  sections.push(
    new Paragraph({
      text: "ATE-TPACK Creator",
      heading: HeadingLevel.HEADING_1,
      thematicBreak: false,
      spacing: { after: 100 },
      alignment: AlignmentType.CENTER,
      style: "Heading1",
    })
  );

  sections.push(
    new Paragraph({
      text: "Diseñador de Actividades Tecnológicas Escolares",
      spacing: { after: 200 },
      alignment: AlignmentType.CENTER,
    })
  );

  // Project Title
  sections.push(
    new Paragraph({
      text: data.projectName,
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 200 },
    })
  );

  // Project Info
  sections.push(
    new Paragraph({
      text: "INFORMACIÓN DEL PROYECTO",
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Área Disciplinar: ${data.disciplinaryArea}`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Grado: ${data.grade}`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Duración Total: ${data.totalDuration} minutos`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`,
      spacing: { after: 200 },
    })
  );

  // CK Section
  sections.push(
    new Paragraph({
      text: "1. OBJETIVO DE APRENDIZAJE (CK)",
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: data.learningObjective,
      spacing: { after: 200 },
    })
  );

  // PK Section
  sections.push(
    new Paragraph({
      text: "2. ESTRATEGIA PEDAGÓGICA (PK)",
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Estrategia: ${data.pedagogicalStrategy}`,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Justificación: ${data.strategyJustification}`,
      spacing: { after: 200 },
    })
  );

  // TK Section
  sections.push(
    new Paragraph({
      text: "3. TECNOLOGÍA (TK)",
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Tecnología: ${data.technology}`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Tipo: ${data.technologyType}`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Acceso/Costo: ${data.technologyCost}`,
      spacing: { after: 200 },
    })
  );

  // Secuencia Didáctica
  sections.push(
    new Paragraph({
      text: "SECUENCIA DIDÁCTICA",
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 150 },
    })
  );

  // Apertura
  sections.push(
    new Paragraph({
      text: `APERTURA / ENGANCHE (${data.openingDuration} minutos)`,
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Rol del Docente: ${data.openingTeacherRole}`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Rol de Estudiantes: ${data.openingStudentRole}`,
      spacing: { after: 150 },
    })
  );

  // Desarrollo
  sections.push(
    new Paragraph({
      text: `DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} minutos)`,
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Rol del Docente: ${data.developmentTeacherRole}`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Rol de Estudiantes: ${data.developmentStudentRole}`,
      spacing: { after: 150 },
    })
  );

  // Cierre
  sections.push(
    new Paragraph({
      text: `CIERRE / REFLEXIÓN (${data.closingDuration} minutos)`,
      heading: HeadingLevel.HEADING_3,
      spacing: { after: 100 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Rol del Docente: ${data.closingTeacherRole}`,
      spacing: { after: 50 },
    })
  );

  sections.push(
    new Paragraph({
      text: `Rol de Estudiantes: ${data.closingStudentRole}`,
      spacing: { after: 200 },
    })
  );

  // TCK
  if (data.contentRepresentation) {
    sections.push(
      new Paragraph({
        text: "REPRESENTACIÓN DEL CONTENIDO CON LA TECNOLOGÍA (TCK)",
        heading: HeadingLevel.HEADING_3,
        spacing: { after: 100 },
      })
    );

    sections.push(
      new Paragraph({
        text: data.contentRepresentation,
        spacing: { after: 200 },
      })
    );
  }

  // TPK
  if (data.strategyPotentiation) {
    sections.push(
      new Paragraph({
        text: "POTENCIACIÓN DE LA ESTRATEGIA PEDAGÓGICA CON LA TECNOLOGÍA (TPK)",
        heading: HeadingLevel.HEADING_3,
        spacing: { after: 100 },
      })
    );

    sections.push(
      new Paragraph({
        text: data.strategyPotentiation,
        spacing: { after: 200 },
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        children: sections,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${data.projectName}.docx`;
    link.click();
  });
};

export const exportToPowerPoint = (data: ATEData) => {
  const prs = new PptxGenJS();

  // Slide 1: Title
  let slide = prs.addSlide();
  slide.background = { color: "059669" };
  slide.addText("ATE-TPACK Creator", {
    x: 0.5,
    y: 2,
    w: 9,
    h: 1,
    fontSize: 54,
    bold: true,
    color: "FFFFFF",
    align: "center",
  });
  slide.addText(data.projectName, {
    x: 0.5,
    y: 3.5,
    w: 9,
    h: 0.8,
    fontSize: 32,
    color: "FFFFFF",
    align: "center",
  });

  // Slide 2: Project Info
  slide = prs.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addText("Información del Proyecto", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 32,
    bold: true,
    color: "059669",
  });

  const infoText = `Área Disciplinar: ${data.disciplinaryArea}\nGrado: ${data.grade}\nDuración Total: ${data.totalDuration} minutos\nIntegrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`;

  slide.addText(infoText, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 4,
    fontSize: 18,
    color: "000000",
  });

  // Slide 3: CK
  slide = prs.addSlide();
  slide.background = { color: "d1fae5" };
  slide.addText("Objetivo de Aprendizaje (CK)", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "059669",
  });

  slide.addText(data.learningObjective, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 4,
    fontSize: 18,
    color: "000000",
  });

  // Slide 4: PK
  slide = prs.addSlide();
  slide.background = { color: "fce7f3" };
  slide.addText("Estrategia Pedagógica (PK)", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "ec4899",
  });

  slide.addText(`Estrategia: ${data.pedagogicalStrategy}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 1,
    fontSize: 16,
    bold: true,
    color: "000000",
  });

  slide.addText(`Justificación: ${data.strategyJustification}`, {
    x: 0.5,
    y: 2.7,
    w: 9,
    h: 3,
    fontSize: 14,
    color: "000000",
  });

  // Slide 5: TK
  slide = prs.addSlide();
  slide.background = { color: "f3e8ff" };
  slide.addText("Tecnología (TK)", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "a855f7",
  });

  slide.addText(`Tecnología: ${data.technology}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 0.8,
    fontSize: 16,
    bold: true,
    color: "000000",
  });

  slide.addText(`Tipo: ${data.technologyType} | Acceso: ${data.technologyCost}`, {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 3,
    fontSize: 14,
    color: "000000",
  });

  // Slide 6: Secuencia Didáctica - Apertura
  slide = prs.addSlide();
  slide.background = { color: "d1fae5" };
  slide.addText(`Apertura / Enganche (${data.openingDuration} min)`, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "059669",
  });

  slide.addText(`Docente: ${data.openingTeacherRole}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 1.5,
    fontSize: 14,
    color: "000000",
  });

  slide.addText(`Estudiantes: ${data.openingStudentRole}`, {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 2,
    fontSize: 14,
    color: "000000",
  });

  // Slide 7: Secuencia Didáctica - Desarrollo
  slide = prs.addSlide();
  slide.background = { color: "fce7f3" };
  slide.addText(`Desarrollo / Construcción (${data.developmentDuration} min)`, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "ec4899",
  });

  slide.addText(`Docente: ${data.developmentTeacherRole}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 1.5,
    fontSize: 14,
    color: "000000",
  });

  slide.addText(`Estudiantes: ${data.developmentStudentRole}`, {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 2,
    fontSize: 14,
    color: "000000",
  });

  // Slide 8: Secuencia Didáctica - Cierre
  slide = prs.addSlide();
  slide.background = { color: "f3e8ff" };
  slide.addText(`Cierre / Reflexión (${data.closingDuration} min)`, {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "a855f7",
  });

  slide.addText(`Docente: ${data.closingTeacherRole}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 1.5,
    fontSize: 14,
    color: "000000",
  });

  slide.addText(`Estudiantes: ${data.closingStudentRole}`, {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 2,
    fontSize: 14,
    color: "000000",
  });

  // Slide 9: TCK
  if (data.contentRepresentation) {
    slide = prs.addSlide();
    slide.background = { color: "d1fae5" };
    slide.addText("Representación del Contenido con la Tecnología (TCK)", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: "059669",
    });

    slide.addText(data.contentRepresentation, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fontSize: 14,
      color: "000000",
    });
  }

  // Slide 10: TPK
  if (data.strategyPotentiation) {
    slide = prs.addSlide();
    slide.background = { color: "fce7f3" };
    slide.addText("Potenciación de la Estrategia Pedagógica con la Tecnología (TPK)", {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.6,
      fontSize: 24,
      bold: true,
      color: "ec4899",
    });

    slide.addText(data.strategyPotentiation, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fontSize: 14,
      color: "000000",
    });
  }

  prs.writeFile({ fileName: `${data.projectName}.pptx` });
};
