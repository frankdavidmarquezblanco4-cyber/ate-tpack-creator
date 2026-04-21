import { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak, Table, TableCell, TableRow, BorderStyle, VerticalAlign } from "docx";
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
}

export const exportToPDF = (data: ATEData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header with professional styling - Green gradient effect
  doc.setFillColor(5, 150, 105); // Emerald Green
  doc.rect(0, 0, pageWidth, 55, "F");
  
  // Decorative line
  doc.setDrawColor(236, 72, 153); // Pink
  doc.setLineWidth(3);
  doc.line(0, 55, pageWidth, 55);
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("Helvetica", "bold");
  doc.text("ATE-TPACK Creator", 20, 30);
  
  doc.setFontSize(11);
  doc.setFont("Helvetica", "normal");
  doc.text("Diseñador de Actividades Tecnológicas Escolares", 20, 42);
  doc.text("Fundamentado en el Modelo TPACK", 20, 50);

  // Title
  yPosition = 75;
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(22);
  doc.setFont("Helvetica", "bold");
  doc.text(data.projectName, 20, yPosition);
  
  // Underline
  doc.setDrawColor(236, 72, 153);
  doc.setLineWidth(2);
  doc.line(20, yPosition + 3, 190, yPosition + 3);

  // General Info Box
  yPosition += 20;
  doc.setFillColor(240, 253, 244); // Light Green
  doc.rect(15, yPosition, pageWidth - 30, 35, "F");
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(1);
  doc.rect(15, yPosition, pageWidth - 30, 35);
  
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Helvetica", "bold");
  doc.text("INFORMACIÓN DEL PROYECTO", 20, yPosition + 5);
  
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Área Disciplinar: ${data.disciplinaryArea}`, 20, yPosition + 12);
  doc.text(`Grado: ${data.grade}`, 20, yPosition + 18);
  doc.text(`Duración Total: ${data.totalDuration} minutos`, 20, yPosition + 24);
  doc.text(`Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`, 20, yPosition + 30);

  // Learning Objective - Green section
  yPosition += 45;
  doc.setFillColor(209, 250, 229); // Light Green background
  doc.rect(15, yPosition - 5, pageWidth - 30, 5, "F");
  
  doc.setFontSize(13);
  doc.setTextColor(5, 150, 105);
  doc.setFont("Helvetica", "bold");
  doc.text("1. OBJETIVO DE APRENDIZAJE (CK)", 20, yPosition);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Helvetica", "normal");
  yPosition += 7;
  const objectiveLines = doc.splitTextToSize(data.learningObjective, pageWidth - 40);
  doc.text(objectiveLines, 20, yPosition);
  yPosition += objectiveLines.length * 5 + 8;

  // Pedagogical Strategy - Pink section
  doc.setFillColor(252, 231, 243); // Light Pink background
  doc.rect(15, yPosition - 5, pageWidth - 30, 5, "F");
  
  doc.setFontSize(13);
  doc.setTextColor(236, 72, 153);
  doc.setFont("Helvetica", "bold");
  doc.text("2. ESTRATEGIA PEDAGÓGICA (PK)", 20, yPosition);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Helvetica", "normal");
  yPosition += 7;
  doc.text(`Estrategia: ${data.pedagogicalStrategy}`, 20, yPosition);
  yPosition += 6;
  const justificationLines = doc.splitTextToSize(`Justificación: ${data.strategyJustification}`, pageWidth - 40);
  doc.text(justificationLines, 20, yPosition);
  yPosition += justificationLines.length * 5 + 8;

  // Technology - Purple section
  doc.setFillColor(243, 232, 255); // Light Purple background
  doc.rect(15, yPosition - 5, pageWidth - 30, 5, "F");
  
  doc.setFontSize(13);
  doc.setTextColor(167, 139, 250);
  doc.setFont("Helvetica", "bold");
  doc.text("3. TECNOLOGÍA (TK)", 20, yPosition);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Helvetica", "normal");
  yPosition += 7;
  doc.text(`Tecnología: ${data.technology}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Tipo: ${data.technologyType}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Acceso/Costo: ${data.technologyCost}`, 20, yPosition);
  yPosition += 10;

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = 20;
  }

  // Didactic Sequence - Multi-color sections
  doc.setFontSize(13);
  doc.setTextColor(0, 0, 0);
  doc.setFont("Helvetica", "bold");
  doc.text("4. SECUENCIA DIDÁCTICA (TPACK)", 20, yPosition);
  yPosition += 12;

  // Opening - Green
  doc.setFillColor(209, 250, 229);
  doc.rect(15, yPosition - 4, pageWidth - 30, 4, "F");
  doc.setTextColor(5, 150, 105);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`APERTURA / ENGANCHE (${data.openingDuration} minutos)`, 20, yPosition);
  yPosition += 7;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Rol del Docente:", 20, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const openingTeacherLines = doc.splitTextToSize(data.openingTeacherRole, pageWidth - 40);
  doc.text(openingTeacherLines, 20, yPosition);
  yPosition += openingTeacherLines.length * 4 + 3;
  
  doc.setFont("Helvetica", "bold");
  doc.text("Rol de Estudiantes:", 20, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const openingStudentLines = doc.splitTextToSize(data.openingStudentRole, pageWidth - 40);
  doc.text(openingStudentLines, 20, yPosition);
  yPosition += openingStudentLines.length * 4 + 8;

  // Development - Pink
  doc.setFillColor(252, 231, 243);
  doc.rect(15, yPosition - 4, pageWidth - 30, 4, "F");
  doc.setTextColor(236, 72, 153);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} minutos)`, 20, yPosition);
  yPosition += 7;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Rol del Docente:", 20, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const devTeacherLines = doc.splitTextToSize(data.developmentTeacherRole, pageWidth - 40);
  doc.text(devTeacherLines, 20, yPosition);
  yPosition += devTeacherLines.length * 4 + 3;
  
  doc.setFont("Helvetica", "bold");
  doc.text("Rol de Estudiantes:", 20, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const devStudentLines = doc.splitTextToSize(data.developmentStudentRole, pageWidth - 40);
  doc.text(devStudentLines, 20, yPosition);
  yPosition += devStudentLines.length * 4 + 8;

  // Check if we need a new page
  if (yPosition > pageHeight - 60) {
    doc.addPage();
    yPosition = 20;
  }

  // Closing - Purple
  doc.setFillColor(243, 232, 255);
  doc.rect(15, yPosition - 4, pageWidth - 30, 4, "F");
  doc.setTextColor(167, 139, 250);
  doc.setFontSize(11);
  doc.setFont("Helvetica", "bold");
  doc.text(`CIERRE / CONSOLIDACIÓN (${data.closingDuration} minutos)`, 20, yPosition);
  yPosition += 7;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("Helvetica", "bold");
  doc.text("Rol del Docente:", 20, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const closingTeacherLines = doc.splitTextToSize(data.closingTeacherRole, pageWidth - 40);
  doc.text(closingTeacherLines, 20, yPosition);
  yPosition += closingTeacherLines.length * 4 + 3;
  
  doc.setFont("Helvetica", "bold");
  doc.text("Rol de Estudiantes:", 20, yPosition);
  yPosition += 4;
  doc.setFont("Helvetica", "normal");
  const closingStudentLines = doc.splitTextToSize(data.closingStudentRole, pageWidth - 40);
  doc.text(closingStudentLines, 20, yPosition);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text("ATE-TPACK Creator | Diseñador de Actividades Tecnológicas Escolares", 20, pageHeight - 10);

  doc.save("ATE-TPACK.pdf");
};

export const exportToWord = (data: ATEData) => {
  const doc = new Document({
    sections: [
      {
        children: [
          // Header
          new Paragraph({
            text: "ATE-TPACK Creator",
            heading: HeadingLevel.HEADING_1,
            alignment: "center",
            spacing: { after: 100 },
            style: "Heading1",
          }),
          new Paragraph({
            text: "Diseñador de Actividades Tecnológicas Escolares",
            alignment: "center",
            spacing: { after: 200 },
          }),

          // Title
          new Paragraph({
            text: data.projectName,
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 200 },
          }),

          // General Info
          new Paragraph({
            text: "INFORMACIÓN DEL PROYECTO",
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: `Área Disciplinar: ${data.disciplinaryArea}`,
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: `Grado: ${data.grade}`,
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: `Duración Total: ${data.totalDuration} minutos`,
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: `Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`,
            spacing: { after: 200 },
          }),

          // Learning Objective
          new Paragraph({
            text: "1. OBJETIVO DE APRENDIZAJE (CK)",
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: data.learningObjective,
            spacing: { after: 200 },
          }),

          // Pedagogical Strategy
          new Paragraph({
            text: "2. ESTRATEGIA PEDAGÓGICA (PK)",
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: `Estrategia: ${data.pedagogicalStrategy}`,
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: `Justificación: ${data.strategyJustification}`,
            spacing: { after: 200 },
          }),

          // Technology
          new Paragraph({
            text: "3. TECNOLOGÍA (TK)",
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: `Tecnología: ${data.technology}`,
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: `Tipo: ${data.technologyType}`,
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: `Acceso/Costo: ${data.technologyCost}`,
            spacing: { after: 200 },
          }),

          // Didactic Sequence
          new Paragraph({
            text: "4. SECUENCIA DIDÁCTICA (TPACK)",
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          }),

          // Opening
          new Paragraph({
            text: `APERTURA / ENGANCHE (${data.openingDuration} minutos)`,
            heading: HeadingLevel.HEADING_4,
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Rol del Docente:", bold: true })],
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: data.openingTeacherRole,
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Rol de Estudiantes:", bold: true })],
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: data.openingStudentRole,
            spacing: { after: 200 },
          }),

          // Development
          new Paragraph({
            text: `DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} minutos)`,
            heading: HeadingLevel.HEADING_4,
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Rol del Docente:", bold: true })],
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: data.developmentTeacherRole,
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Rol de Estudiantes:", bold: true })],
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: data.developmentStudentRole,
            spacing: { after: 200 },
          }),

          // Closing
          new Paragraph({
            text: `CIERRE / CONSOLIDACIÓN (${data.closingDuration} minutos)`,
            heading: HeadingLevel.HEADING_4,
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Rol del Docente:", bold: true })],
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: data.closingTeacherRole,
            spacing: { after: 50 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "Rol de Estudiantes:", bold: true })],
            spacing: { after: 50 },
          }),
          new Paragraph({
            text: data.closingStudentRole,
            spacing: { after: 200 },
          }),

          // Footer
          new Paragraph({
            text: "ATE-TPACK Creator | Diseñador de Actividades Tecnológicas Escolares",
            alignment: "center",
            spacing: { before: 200 },
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ATE-TPACK.docx";
    link.click();
  });
};

export const exportToPowerPoint = (data: ATEData) => {
  const prs = new PptxGenJS();
  prs.defineLayout({ name: "LAYOUT1", width: 10, height: 7.5 });
  prs.defineLayout({ name: "LAYOUT2", width: 10, height: 7.5 });

  // Color scheme
  const colors = {
    green: "059669",
    pink: "ec4899",
    purple: "a78bfa",
    lightGreen: "d1fae5",
    lightPink: "fbcfe8",
    lightPurple: "f3e8ff",
  };

  // Slide 1: Title
  let slide = prs.addSlide();
  slide.background = { color: colors.green };
  slide.addText("ATE-TPACK Creator", {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 1,
    fontSize: 54,
    bold: true,
    color: "FFFFFF",
    align: "center",
  });
  slide.addText("Diseñador de Actividades Tecnológicas Escolares", {
    x: 0.5,
    y: 3.7,
    w: 9,
    h: 0.8,
    fontSize: 28,
    color: "FFFFFF",
    align: "center",
  });
  slide.addText(data.projectName, {
    x: 0.5,
    y: 5.2,
    w: 9,
    h: 1,
    fontSize: 32,
    bold: true,
    color: colors.lightGreen,
    align: "center",
  });

  // Slide 2: Project Info
  slide = prs.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 1.2,
    fill: { color: colors.green },
  });
  slide.addText("INFORMACIÓN DEL PROYECTO", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: "FFFFFF",
  });

  let yPos = 1.5;
  const infoItems = [
    `Área Disciplinar: ${data.disciplinaryArea}`,
    `Grado: ${data.grade}`,
    `Duración Total: ${data.totalDuration} minutos`,
    `Integrantes: ${data.member1}${data.member2 ? ", " + data.member2 : ""}${data.member3 ? ", " + data.member3 : ""}`,
  ];

  infoItems.forEach((item) => {
    slide.addText(item, {
      x: 0.5,
      y: yPos,
      w: 9,
      h: 0.5,
      fontSize: 18,
      color: "000000",
    });
    yPos += 0.7;
  });

  // Slide 3: Learning Objective
  slide = prs.addSlide();
  slide.background = { color: colors.lightGreen };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 1.2,
    fill: { color: colors.green },
  });
  slide.addText("OBJETIVO DE APRENDIZAJE (CK)", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(data.learningObjective, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 5.5,
    fontSize: 18,
    color: "000000",
  });

  // Slide 4: Pedagogical Strategy
  slide = prs.addSlide();
  slide.background = { color: colors.lightPink };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 1.2,
    fill: { color: colors.pink },
  });
  slide.addText("ESTRATEGIA PEDAGÓGICA (PK)", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(`Estrategia: ${data.pedagogicalStrategy}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 1,
    fontSize: 18,
    bold: true,
    color: "000000",
  });
  slide.addText(`Justificación:\n${data.strategyJustification}`, {
    x: 0.5,
    y: 2.7,
    w: 9,
    h: 4,
    fontSize: 16,
    color: "000000",
  });

  // Slide 5: Technology
  slide = prs.addSlide();
  slide.background = { color: colors.lightPurple };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 1.2,
    fill: { color: colors.purple },
  });
  slide.addText("TECNOLOGÍA (TK)", {
    x: 0.5,
    y: 0.2,
    w: 9,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText(`Tecnología: ${data.technology}`, {
    x: 0.5,
    y: 1.5,
    w: 9,
    h: 0.8,
    fontSize: 18,
    color: "000000",
  });
  slide.addText(`Tipo: ${data.technologyType}`, {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 0.8,
    fontSize: 18,
    color: "000000",
  });
  slide.addText(`Acceso/Costo: ${data.technologyCost}`, {
    x: 0.5,
    y: 3.5,
    w: 9,
    h: 0.8,
    fontSize: 18,
    color: "000000",
  });

  // Slide 6: Opening
  slide = prs.addSlide();
  slide.background = { color: colors.lightGreen };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 1,
    fill: { color: colors.green },
  });
  slide.addText(`APERTURA / ENGANCHE (${data.openingDuration} min)`, {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.7,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText("Rol del Docente:", {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(data.openingTeacherRole, {
    x: 0.5,
    y: 1.7,
    w: 9,
    h: 1.5,
    fontSize: 14,
    color: "000000",
  });
  slide.addText("Rol de Estudiantes:", {
    x: 0.5,
    y: 3.4,
    w: 9,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(data.openingStudentRole, {
    x: 0.5,
    y: 3.9,
    w: 9,
    h: 2.8,
    fontSize: 14,
    color: "000000",
  });

  // Slide 7: Development
  slide = prs.addSlide();
  slide.background = { color: colors.lightPink };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 1,
    fill: { color: colors.pink },
  });
  slide.addText(`DESARROLLO / CONSTRUCCIÓN (${data.developmentDuration} min)`, {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.7,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText("Rol del Docente:", {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(data.developmentTeacherRole, {
    x: 0.5,
    y: 1.7,
    w: 9,
    h: 1.5,
    fontSize: 14,
    color: "000000",
  });
  slide.addText("Rol de Estudiantes:", {
    x: 0.5,
    y: 3.4,
    w: 9,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(data.developmentStudentRole, {
    x: 0.5,
    y: 3.9,
    w: 9,
    h: 2.8,
    fontSize: 14,
    color: "000000",
  });

  // Slide 8: Closing
  slide = prs.addSlide();
  slide.background = { color: colors.lightPurple };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 1,
    fill: { color: colors.purple },
  });
  slide.addText(`CIERRE / CONSOLIDACIÓN (${data.closingDuration} min)`, {
    x: 0.5,
    y: 0.15,
    w: 9,
    h: 0.7,
    fontSize: 28,
    bold: true,
    color: "FFFFFF",
  });
  slide.addText("Rol del Docente:", {
    x: 0.5,
    y: 1.2,
    w: 9,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(data.closingTeacherRole, {
    x: 0.5,
    y: 1.7,
    w: 9,
    h: 1.5,
    fontSize: 14,
    color: "000000",
  });
  slide.addText("Rol de Estudiantes:", {
    x: 0.5,
    y: 3.4,
    w: 9,
    h: 0.4,
    fontSize: 16,
    bold: true,
    color: "000000",
  });
  slide.addText(data.closingStudentRole, {
    x: 0.5,
    y: 3.9,
    w: 9,
    h: 2.8,
    fontSize: 14,
    color: "000000",
  });

  // Slide 9: Summary
  slide = prs.addSlide();
  slide.background = { color: "FFFFFF" };
  slide.addShape("rect", {
    x: 0,
    y: 0,
    w: 10,
    h: 7.5,
    fill: { color: colors.green },
  });
  slide.addText("¡Actividad Completada!", {
    x: 0.5,
    y: 2.5,
    w: 9,
    h: 1,
    fontSize: 48,
    bold: true,
    color: "FFFFFF",
    align: "center",
  });
  slide.addText("Diseñada con el Modelo TPACK", {
    x: 0.5,
    y: 3.8,
    w: 9,
    h: 0.8,
    fontSize: 28,
    color: colors.lightGreen,
    align: "center",
  });

  prs.writeFile({ fileName: "ATE-TPACK.pptx" });
};
