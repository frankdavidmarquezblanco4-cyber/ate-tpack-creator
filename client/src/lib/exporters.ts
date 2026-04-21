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

export const exportToPDF = (data: ATEData) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 10;
  const margin = 10;
  const contentWidth = pageWidth - 2 * margin;

  // Función para agregar página nueva si es necesario
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
  yPosition += 8;

  // Decorative line
  doc.setDrawColor(236, 72, 153);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 6;

  // Project Info
  checkPageBreak(20);
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPosition, contentWidth, 18);

  doc.setTextColor(5, 150, 105);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text("INFORMACIÓN DEL PROYECTO", margin + 2, yPosition + 3);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.text(`Área: ${data.disciplinaryArea}`, margin + 2, yPosition + 8);
  doc.text(`Grado: ${data.grade}`, margin + 2, yPosition + 12);
  doc.text(`Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`, margin + 2, yPosition + 16);

  yPosition += 24;

  // CK Section
  checkPageBreak(15);
  doc.setFillColor(209, 250, 229);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("1. OBJETIVO DE APRENDIZAJE (CK)", margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  const ckLines = doc.splitTextToSize(data.learningObjective, contentWidth - 4);
  doc.text(ckLines, margin + 2, yPosition);
  yPosition += ckLines.length * 5 + 4;

  // PK Section
  checkPageBreak(15);
  doc.setFillColor(254, 231, 243);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(236, 72, 153);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("2. ESTRATEGIA PEDAGÓGICA (PK)", margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`Estrategia: ${data.pedagogicalStrategy}`, margin + 2, yPosition);
  yPosition += 5;

  doc.setFont("Helvetica", "normal");
  const pkLines = doc.splitTextToSize(`Justificación: ${data.strategyJustification}`, contentWidth - 4);
  doc.text(pkLines, margin + 2, yPosition);
  yPosition += pkLines.length * 5 + 4;

  // TK Section
  checkPageBreak(15);
  doc.setFillColor(243, 232, 255);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  doc.setTextColor(168, 85, 247);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("3. TECNOLOGÍA (TK)", margin + 2, yPosition + 4);
  yPosition += 8;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("Helvetica", "bold");
  doc.text(`Tipo: ${data.technologyType} | Costo: ${data.technologyCost}`, margin + 2, yPosition);
  yPosition += 5;

  doc.setFont("Helvetica", "normal");
  const tkLines = doc.splitTextToSize(data.technology, contentWidth - 4);
  doc.text(tkLines, margin + 2, yPosition);
  yPosition += tkLines.length * 5 + 6;

  // Secuencia Didáctica
  checkPageBreak(20);
  doc.setFillColor(5, 150, 105);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("Helvetica", "bold");
  doc.text("SECUENCIA DIDÁCTICA", margin + 2, yPosition + 4);
  doc.rect(margin, yPosition, contentWidth, 6, "F");
  yPosition += 8;

  // Apertura
  doc.setFillColor(209, 250, 229);
  doc.rect(margin, yPosition, contentWidth, 5, "F");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`APERTURA / ENGANCHE (${data.openingDuration} min)`, margin + 2, yPosition + 3);
  yPosition += 6;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const openingTeacherLines = doc.splitTextToSize(data.openingTeacherRole, contentWidth - 6);
  doc.text(openingTeacherLines, margin + 4, yPosition);
  yPosition += openingTeacherLines.length * 4 + 3;

  doc.setFont("Helvetica", "bold");
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const openingStudentLines = doc.splitTextToSize(data.openingStudentRole, contentWidth - 6);
  doc.text(openingStudentLines, margin + 4, yPosition);
  yPosition += openingStudentLines.length * 4 + 5;

  // Desarrollo
  checkPageBreak(20);
  doc.setFillColor(254, 231, 243);
  doc.rect(margin, yPosition, contentWidth, 5, "F");
  doc.setTextColor(236, 72, 153);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} min)`, margin + 2, yPosition + 3);
  yPosition += 6;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const devTeacherLines = doc.splitTextToSize(data.developmentTeacherRole, contentWidth - 6);
  doc.text(devTeacherLines, margin + 4, yPosition);
  yPosition += devTeacherLines.length * 4 + 3;

  doc.setFont("Helvetica", "bold");
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const devStudentLines = doc.splitTextToSize(data.developmentStudentRole, contentWidth - 6);
  doc.text(devStudentLines, margin + 4, yPosition);
  yPosition += devStudentLines.length * 4 + 5;

  // Cierre
  checkPageBreak(20);
  doc.setFillColor(243, 232, 255);
  doc.rect(margin, yPosition, contentWidth, 5, "F");
  doc.setTextColor(168, 85, 247);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`CIERRE / REFLEXIÓN (${data.closingDuration} min)`, margin + 2, yPosition + 3);
  yPosition += 6;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Docente:", margin + 2, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const closeTeacherLines = doc.splitTextToSize(data.closingTeacherRole, contentWidth - 6);
  doc.text(closeTeacherLines, margin + 4, yPosition);
  yPosition += closeTeacherLines.length * 4 + 3;

  doc.setFont("Helvetica", "bold");
  doc.text("Estudiantes:", margin + 2, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const closeStudentLines = doc.splitTextToSize(data.closingStudentRole, contentWidth - 6);
  doc.text(closeStudentLines, margin + 4, yPosition);
  yPosition += closeStudentLines.length * 4 + 6;

  // TCK Section
  if (data.contentRepresentation) {
    checkPageBreak(15);
    doc.setFillColor(209, 250, 229);
    doc.rect(margin, yPosition, contentWidth, 6, "F");
    doc.setTextColor(5, 150, 105);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("REPRESENTACIÓN DEL CONTENIDO CON LA TECNOLOGÍA (TCK)", margin + 2, yPosition + 4);
    yPosition += 8;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    const tckLines = doc.splitTextToSize(data.contentRepresentation, contentWidth - 4);
    doc.text(tckLines, margin + 2, yPosition);
    yPosition += tckLines.length * 5 + 4;
  }

  // TPK Section
  if (data.strategyPotentiation) {
    checkPageBreak(15);
    doc.setFillColor(254, 231, 243);
    doc.rect(margin, yPosition, contentWidth, 6, "F");
    doc.setTextColor(236, 72, 153);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("POTENCIACIÓN DE LA ESTRATEGIA PEDAGÓGICA CON LA TECNOLOGÍA (TPK)", margin + 2, yPosition + 4);
    yPosition += 8;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("Helvetica", "normal");
    const tpkLines = doc.splitTextToSize(data.strategyPotentiation, contentWidth - 4);
    doc.text(tpkLines, margin + 2, yPosition);
  }

  doc.save(`${data.projectName}.pdf`);
};

export const exportToWord = (data: ATEData) => {
  const sections = [];

  sections.push(
    new Paragraph({
      text: "ATE-TPACK Creator",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 100 },
      alignment: AlignmentType.CENTER,
    })
  );

  sections.push(
    new Paragraph({
      text: "Diseñador de Actividades Tecnológicas Escolares",
      spacing: { after: 200 },
      alignment: AlignmentType.CENTER,
    })
  );

  sections.push(
    new Paragraph({
      text: data.projectName,
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 200 },
    })
  );

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
      text: `Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`,
      spacing: { after: 200 },
    })
  );

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

  sections.push(
    new Paragraph({
      text: "SECUENCIA DIDÁCTICA",
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 150 },
    })
  );

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
    y: 1.5,
    w: 9,
    h: 1,
    fontSize: 48,
    bold: true,
    color: "FFFFFF",
    align: "center",
  });
  slide.addText(data.projectName, {
    x: 0.5,
    y: 3,
    w: 9,
    h: 1.5,
    fontSize: 36,
    color: "FFFFFF",
    align: "center",
  });
  slide.addText("Diseñador de Actividades Tecnológicas Escolares", {
    x: 0.5,
    y: 4.8,
    w: 9,
    h: 0.8,
    fontSize: 16,
    color: "d1fae5",
    align: "center",
  });

  // Slide 2: Project Info
  slide = prs.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "059669" },
  });
  slide.addText("Información del Proyecto", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });

  const infoY = 1.2;
  slide.addText(`Área Disciplinar: ${data.disciplinaryArea}`, {
    x: 0.5,
    y: infoY,
    w: 9,
    h: 0.5,
    fontSize: 14,
    color: "000000",
  });
  slide.addText(`Grado: ${data.grade}`, {
    x: 0.5,
    y: infoY + 0.6,
    w: 9,
    h: 0.5,
    fontSize: 14,
    color: "000000",
  });
  slide.addText(`Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`, {
    x: 0.5,
    y: infoY + 1.2,
    w: 9,
    h: 0.5,
    fontSize: 14,
    color: "000000",
  });
  slide.addText(`Duración Total: ${data.openingDuration} + ${data.developmentDuration} + ${data.closingDuration} minutos`, {
    x: 0.5,
    y: infoY + 1.8,
    w: 9,
    h: 0.5,
    fontSize: 14,
    color: "000000",
  });

  // Slide 3: CK
  slide = prs.addSlide();
  slide.background = { color: "d1fae5" };
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "059669" },
  });
  slide.addText("Objetivo de Aprendizaje (CK)", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(data.learningObjective, {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 4,
    fontSize: 16,
    color: "000000",
  });

  // Slide 4: PK
  slide = prs.addSlide();
  slide.background = { color: "fce7f3" };
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "ec4899" },
  });
  slide.addText("Estrategia Pedagógica (PK)", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(`Estrategia: ${data.pedagogicalStrategy}`, {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.6,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(`Justificación: ${data.strategyJustification}`, {
    x: 0.5,
    y: 2.1,
    w: 9,
    h: 3,
    fontSize: 14,
    color: "000000",
  });

  // Slide 5: TK
  slide = prs.addSlide();
  slide.background = { color: "f3e8ff" };
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "a855f7" },
  });
  slide.addText("Tecnología (TK)", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(`Tecnología: ${data.technology}`, {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.6,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(`Tipo: ${data.technologyType} | Costo: ${data.technologyCost}`, {
    x: 0.5,
    y: 2.1,
    w: 9,
    h: 3,
    fontSize: 14,
    color: "000000",
  });

  // Slide 6: Apertura
  slide = prs.addSlide();
  slide.background = { color: "d1fae5" };
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "059669" },
  });
  slide.addText(`Apertura / Enganche (${data.openingDuration} min)`, {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(`Docente: ${data.openingTeacherRole}`, {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 1.8,
    fontSize: 14,
    color: "000000",
  });
  slide.addText(`Estudiantes: ${data.openingStudentRole}`, {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 1.8,
    fontSize: 14,
    color: "000000",
  });

  // Slide 7: Desarrollo
  slide = prs.addSlide();
  slide.background = { color: "fce7f3" };
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "ec4899" },
  });
  slide.addText(`Desarrollo / Construcción (${data.developmentDuration} min)`, {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(`Docente: ${data.developmentTeacherRole}`, {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 1.8,
    fontSize: 14,
    color: "000000",
  });
  slide.addText(`Estudiantes: ${data.developmentStudentRole}`, {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 1.8,
    fontSize: 14,
    color: "000000",
  });

  // Slide 8: Cierre
  slide = prs.addSlide();
  slide.background = { color: "f3e8ff" };
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "a855f7" },
  });
  slide.addText(`Cierre / Reflexión (${data.closingDuration} min)`, {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(`Docente: ${data.closingTeacherRole}`, {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 1.8,
    fontSize: 14,
    color: "000000",
  });
  slide.addText(`Estudiantes: ${data.closingStudentRole}`, {
    x: 0.5,
    y: 3.2,
    w: 9,
    h: 1.8,
    fontSize: 14,
    color: "000000",
  });

  // Slide 9: TCK
  if (data.contentRepresentation) {
    slide = prs.addSlide();
    slide.background = { color: "d1fae5" };
    slide.addShape(prs.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.8,
      fill: { color: "059669" },
    });
    slide.addText("Representación del Contenido con la Tecnología (TCK)", {
      x: 0.5,
      y: 0.15,
      w: 9,
      h: 0.5,
      fontSize: 24,
      bold: true,
      color: "FFFFFF",
    });
    slide.addText(data.contentRepresentation, {
      x: 0.5,
      y: 1.2,
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
    slide.addShape(prs.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.8,
      fill: { color: "ec4899" },
    });
    slide.addText("Potenciación de la Estrategia Pedagógica con la Tecnología (TPK)", {
      x: 0.5,
      y: 0.15,
      w: 9,
      h: 0.5,
      fontSize: 24,
      bold: true,
      color: "FFFFFF",
    });
    slide.addText(data.strategyPotentiation, {
      x: 0.5,
      y: 1.2,
      w: 9,
      h: 4,
      fontSize: 14,
      color: "000000",
    });
  }

  prs.writeFile({ fileName: `${data.projectName}.pptx` });
};
