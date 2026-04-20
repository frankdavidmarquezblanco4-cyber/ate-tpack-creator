import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak, Table, TableCell, TableRow, BorderStyle, VerticalAlign } from "docx";
import PptxGenJS from "pptxgenjs";

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

export const exportToPDF = (data: ATEData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header with professional styling
  doc.setFillColor(15, 58, 125); // Dark Blue
  doc.rect(0, 0, pageWidth, 50, "F");
  
  // Decorative line
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(3);
  doc.line(0, 50, pageWidth, 50);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont(undefined, "bold");
  doc.text("ATE-TPACK Creator", 20, 30);
  
  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.text("Diseñador de Actividades Tecnológicas Escolares", 20, 40);

  // Title
  yPosition = 65;
  doc.setTextColor(15, 58, 125);
  doc.setFontSize(20);
  doc.setFont(undefined, "bold");
  doc.text(data.projectName, 20, yPosition);
  
  // Underline
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(1);
  doc.line(20, yPosition + 2, 100, yPosition + 2);

  // General Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  yPosition += 15;
  doc.text(`Área Disciplinar: ${data.disciplinaryArea}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Grado: ${data.grade}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`, 20, yPosition);

  // Learning Objective
  yPosition += 15;
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175);
  doc.text("Objetivo de Aprendizaje", 20, yPosition);
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  yPosition += 8;
  const objectiveLines = doc.splitTextToSize(data.learningObjective, pageWidth - 40);
  doc.text(objectiveLines, 20, yPosition);
  yPosition += objectiveLines.length * 5 + 10;

  // Pedagogical Strategy
  doc.setFontSize(14);
  doc.setTextColor(22, 163, 74); // Green
  doc.text("Estrategia Pedagógica", 20, yPosition);
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  yPosition += 8;
  doc.text(`Estrategia: ${data.pedagogicalStrategy}`, 20, yPosition);
  yPosition += 8;
  const justificationLines = doc.splitTextToSize(data.strategyJustification, pageWidth - 40);
  doc.text(justificationLines, 20, yPosition);
  yPosition += justificationLines.length * 5 + 10;

  // Technology
  doc.setFontSize(14);
  doc.setTextColor(234, 88, 12); // Orange
  doc.text("Tecnología Seleccionada", 20, yPosition);
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  yPosition += 8;
  doc.text(`Tecnología: ${data.technology}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Tipo: ${data.technologyType} | Costo: ${data.technologyCost}`, 20, yPosition);

  // Add page break if needed
  if (yPosition > pageHeight - 50) {
    doc.addPage();
    yPosition = 20;
  }

  // Didactic Sequence
  yPosition += 15;
  doc.setFontSize(14);
  doc.setTextColor(124, 58, 237); // Purple
  doc.text("Secuencia Didáctica", 20, yPosition);

  yPosition += 12;
  doc.setFontSize(12);
  doc.setTextColor(30, 64, 175);
  doc.text("① Apertura / Enganche", 20, yPosition);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  yPosition += 6;
  doc.text(`Duración: ${data.openingDuration}`, 20, yPosition);
  yPosition += 5;
  doc.text("Docente:", 20, yPosition);
  yPosition += 4;
  const openingTeacherLines = doc.splitTextToSize(data.openingTeacherRole, pageWidth - 40);
  doc.text(openingTeacherLines, 20, yPosition);
  yPosition += openingTeacherLines.length * 4 + 2;

  doc.text("Estudiantes:", 20, yPosition);
  yPosition += 4;
  const openingStudentLines = doc.splitTextToSize(data.openingStudentRole, pageWidth - 40);
  doc.text(openingStudentLines, 20, yPosition);
  yPosition += openingStudentLines.length * 4 + 8;

  // Development
  doc.setFontSize(12);
  doc.setTextColor(22, 163, 74);
  doc.text("② Desarrollo / Construcción", 20, yPosition);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  yPosition += 6;
  doc.text(`Duración: ${data.developmentDuration}`, 20, yPosition);
  yPosition += 5;
  doc.text("Docente:", 20, yPosition);
  yPosition += 4;
  const devTeacherLines = doc.splitTextToSize(data.developmentTeacherRole, pageWidth - 40);
  doc.text(devTeacherLines, 20, yPosition);
  yPosition += devTeacherLines.length * 4 + 2;

  doc.text("Estudiantes:", 20, yPosition);
  yPosition += 4;
  const devStudentLines = doc.splitTextToSize(data.developmentStudentRole, pageWidth - 40);
  doc.text(devStudentLines, 20, yPosition);

  // Save
  doc.save(`${data.projectName}.pdf`);
};

export const exportToWord = async (data: ATEData) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: "ATE-TPACK Creator",
            heading: HeadingLevel.HEADING_1,
            thematicBreak: false,
          }),
          new Paragraph({
            text: data.projectName,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `Área Disciplinar: ${data.disciplinaryArea}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Grado: ${data.grade}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Objetivo de Aprendizaje",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: data.learningObjective,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Estrategia Pedagógica",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `Estrategia: ${data.pedagogicalStrategy}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: data.strategyJustification,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Tecnología Seleccionada",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `Tecnología: ${data.technology}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Tipo: ${data.technologyType} | Costo: ${data.technologyCost}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: data.contentRepresentation,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "Secuencia Didáctica",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: "① Apertura / Enganche",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            text: `Duración: ${data.openingDuration}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "Docente:",
            run: { bold: true },
          }),
          new Paragraph({
            text: data.openingTeacherRole,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "Estudiantes:",
            run: { bold: true },
          }),
          new Paragraph({
            text: data.openingStudentRole,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "② Desarrollo / Construcción",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            text: `Duración: ${data.developmentDuration}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "Docente:",
            run: { bold: true },
          }),
          new Paragraph({
            text: data.developmentTeacherRole,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "Estudiantes:",
            run: { bold: true },
          }),
          new Paragraph({
            text: data.developmentStudentRole,
            spacing: { after: 400 },
          }),
          new Paragraph({
            text: "③ Cierre / Evaluación",
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            text: `Duración: ${data.closingDuration}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "Docente:",
            run: { bold: true },
          }),
          new Paragraph({
            text: data.closingTeacherRole,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: "Estudiantes:",
            run: { bold: true },
          }),
          new Paragraph({
            text: data.closingStudentRole,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.projectName}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const exportToPowerPoint = (data: ATEData) => {
  const prs = new PptxGenJS();
  prs.defineLayout({ name: "LAYOUT1", width: 10, height: 7.5 });

  // Slide 1: Title with gradient effect
  let slide = prs.addSlide();
  slide.background = { color: "0F3A7D" };
  
  // Decorative shapes
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 1.5,
    fill: { color: "1E40AF" },
  });
  
  slide.addText(data.projectName, {
    x: 0.5,
    y: 2,
    w: 9,
    h: 1.2,
    fontSize: 48,
    bold: true,
    color: "FFFFFF",
    align: "center",
    fontFace: "Arial",
  });
  
  slide.addText("Actividad Tecnológica Escolar", {
    x: 0.5,
    y: 3.5,
    w: 9,
    h: 0.6,
    fontSize: 28,
    color: "E0E7FF",
    align: "center",
    fontFace: "Arial",
  });
  
  slide.addText(`Área: ${data.disciplinaryArea} | Grado: ${data.grade}`, {
    x: 0.5,
    y: 5,
    w: 9,
    h: 0.5,
    fontSize: 16,
    color: "B3D9FF",
    align: "center",
    italic: true,
  });

  // Slide 2: Problem with professional styling
  slide = prs.addSlide();
  slide.background = { color: "F8FAFC" };
  
  // Decorative header bar
  slide.addShape(prs.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 10,
    h: 0.8,
    fill: { color: "1E40AF" },
  });
  
  slide.addText("Situación Problema", {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.5,
    fontSize: 32,
    bold: true,
    color: "FFFFFF",
  });
  
  slide.addText(data.learningObjective, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 4.5,
    fontSize: 18,
    color: "1E293B",
    align: "left",
  });

  // Slide 3: Objectives
  slide = prs.addSlide();
  slide.addText("Objetivo de Aprendizaje", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.5,
    fontSize: 32,
    bold: true,
    color: "16A34A",
  });
  slide.addText(data.learningObjective, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 4,
    fontSize: 18,
    color: "000000",
  });

  // Slide 4: Technology
  slide = prs.addSlide();
  slide.addText("Tecnología Seleccionada", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.5,
    fontSize: 32,
    bold: true,
    color: "EA580C",
  });
  slide.addText(`Tecnología: ${data.technology}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: "000000",
  });
  slide.addText(`Tipo: ${data.technologyType}`, {
    x: 0.5,
    y: 2.2,
    w: 9,
    h: 0.5,
    fontSize: 16,
    color: "000000",
  });
  slide.addText(`Costo: ${data.technologyCost}`, {
    x: 0.5,
    y: 2.9,
    w: 9,
    h: 0.5,
    fontSize: 16,
    color: "000000",
  });

  // Slide 5: Didactic Sequence
  slide = prs.addSlide();
  slide.addText("Secuencia Didáctica", {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.5,
    fontSize: 32,
    bold: true,
    color: "7C3AED",
  });
  slide.addText("① Apertura", {
    x: 0.5,
    y: 1.3,
    w: 3,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "1E40AF",
  });
  slide.addText(`${data.openingDuration} min`, {
    x: 0.5,
    y: 1.8,
    w: 3,
    h: 2,
    fontSize: 12,
    color: "000000",
  });

  slide.addText("② Desarrollo", {
    x: 3.8,
    y: 1.3,
    w: 3,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "16A34A",
  });
  slide.addText(`${data.developmentDuration} min`, {
    x: 3.8,
    y: 1.8,
    w: 3,
    h: 2,
    fontSize: 12,
    color: "000000",
  });

  slide.addText("③ Cierre", {
    x: 7.1,
    y: 1.3,
    w: 2,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "EA580C",
  });
  slide.addText(`${data.closingDuration} min`, {
    x: 7.1,
    y: 1.8,
    w: 2,
    h: 2,
    fontSize: 12,
    color: "000000",
  });

  // Save
  prs.writeFile({ fileName: `${data.projectName}.pptx` });
};
