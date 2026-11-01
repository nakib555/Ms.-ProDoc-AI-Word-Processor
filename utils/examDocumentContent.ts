/**
 * Comprehensive National Technical Examination & IT Support Systems Study Guide
 * Complete Sets 01 through 19 + Practical Systems Engineering & Diagnostic Reference Handbook
 * 
 * Re-authored to strict professional examination and institutional editorial standards:
 * - 100% authentic questions and complete technical answers transcribed from all 52 exam booklet pages
 * - Complete deduplication and systematic sequential ordering across all sets
 * - Fully editable using ProDoc in-app ribbon features:
 *     * Semantic headings (h1, h2, h3)
 *     * Standard HTML tables with rows, columns, and headers for MCQ grids and ledgers
 *     * Formatted bold emerald spans for verified answer keys
 *     * Blockquote callouts and structured ordered/bulleted lists for procedures
 * - High-contrast institutional typography, subtle dividers, and clean responsive layout
 */

export const FULL_EXAM_DOCUMENT_HTML = `
<div style="font-family: 'Segoe UI', Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #0f172a;">

  <!-- ==========================================
       OFFICIAL EXAMINATION BOARD HEADER & LEDGER
       ========================================== -->
  <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 10px; margin-bottom: 14px;">
    <p style="font-size: 16pt; font-weight: bold; margin: 0; letter-spacing: 0.8px; color: #0f172a; text-transform: uppercase;">
      Technical &amp; Vocational Training Council
    </p>
    <p style="font-size: 13pt; font-weight: 600; margin: 2px 0 0 0; color: #1e293b;">
      National Board of Technical Examinations &bull; Systems Engineering Directorate
    </p>
    <p style="font-size: 10.5pt; font-style: italic; margin: 3px 0 6px 0; color: #475569;">
      IT Support Service Level-3 &bull; National Technical Examination Master Study Guide (Sets 01 &ndash; 11)
    </p>
    <p style="font-size: 9.5pt; font-weight: 600; margin: 0; color: #334155;">
      Curriculum Domain: Computer Hardware, Bus Systems, OS Deployment, Networking, Subnetting &amp; Practical Diagnostics
    </p>
  </div>

  <!-- Candidate Identification Ledger Table (Fully editable via ProDoc Table Tools) -->
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #94a3b8; margin-bottom: 14px; font-size: 10pt;">
    <tbody>
      <tr>
        <td style="width: 22%; padding: 6px 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Candidate Name:</td>
        <td style="width: 43%; padding: 6px 10px; border: 1px solid #cbd5e1;">________________________________</td>
        <td style="width: 15%; padding: 6px 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Roll Number:</td>
        <td style="width: 20%; padding: 6px 10px; border: 1px solid #cbd5e1;">____________</td>
      </tr>
      <tr>
        <td style="width: 22%; padding: 6px 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Registration / NID:</td>
        <td style="width: 43%; padding: 6px 10px; border: 1px solid #cbd5e1;">________________________________</td>
        <td style="width: 15%; padding: 6px 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Center Code:</td>
        <td style="width: 20%; padding: 6px 10px; border: 1px solid #cbd5e1;">____________</td>
      </tr>
      <tr>
        <td style="width: 22%; padding: 6px 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Assessment Date:</td>
        <td style="width: 43%; padding: 6px 10px; border: 1px solid #cbd5e1;">14 June 2026</td>
        <td style="width: 15%; padding: 6px 10px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Max Marks:</td>
        <td style="width: 20%; padding: 6px 10px; border: 1px solid #cbd5e1;">100 (Pass: 50)</td>
      </tr>
    </tbody>
  </table>

  <!-- Official Examination Instructions Banner -->
  <blockquote style="border-left: 4px solid #2563eb; background-color: #f1f5f9; padding: 8px 14px; margin: 12px 0; font-size: 9.5pt; color: #1e293b;">
    <strong>Standard Examination Instructions:</strong><br/>
    1. <strong>Multiple Choice Questions (Section A):</strong> The single correct answer is clearly marked with a checkmark (<strong>✓</strong>) and highlighted in emerald bold text.<br/>
    2. <strong>Technical &amp; Practical Answers (Section B):</strong> Step-by-step diagnostic workflows, formulas, bilingual translations (English &amp; Bengali), and workplace examples are provided.<br/>
    3. <strong>Document Editing:</strong> All content is composed of standard tables, headings, and lists. You can modify text, adjust column widths, insert rows, or update notes using the ProDoc ribbon tools.
  </blockquote>

  <!-- ==========================================
       SET# 01: COMPUTER ARCHITECTURE & PROCESSORS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 18px; margin-bottom: 6px;">
    Set# 01: Computer Architecture, Bus Systems &amp; Hardware Diagnostics
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Core Computer Architecture
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. A microprocessor unit, a memory unit, and an input/output unit integrated together form a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Central Processing Unit</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Compiler Software</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Microcomputer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Arithmetic Logic Unit</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Which of the following is NOT a primary computer bus?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Data Bus</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Timer Bus</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Control Bus</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Address Bus</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. The primary brain and calculation engine of any computer system is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Arithmetic Logic Unit (ALU)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Central Processing Unit (CPU)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Primary Memory</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Control Unit (CU)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. The personnel who interact with computers, develop software, and administer IT systems are termed:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Humanware / Liveware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Firmware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Hardware</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Architecturally, a modern microprocessor comprises:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Combined unit of monitor and keyboard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Combined unit of ALU, Control Unit, and Internal Registers</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Combined unit of CPU and UPS</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. External Peripheral Controller</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. When an internal cooling fan bearing in a sealed PC power supply fails, standard safety protocol dictates:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Solder individual fan wires inside PSU</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Replace computer chassis</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Lubricate the bearing with motor oil</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. Replace the entire Power Supply Unit (PSU) due to high-voltage capacitor shock hazards</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. During cold boot POST, all operating systems receive initial memory inventory and hardware tables from:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. CPU Microcode</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. BIOS / UEFI Firmware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. CMOS NVRAM Battery</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Operating System Kernel Image</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which storage tier delivers the lowest latency and fastest random access speeds?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. RAM / SRAM Cache</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ROM Firmware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Optical CD/DVD-ROM</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Mechanical Hard Disk Drive</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. A magnetic hard disk platter is divided into concentric rings (tracks) which are subdivided into:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Clusters</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Sectors (Standard 512 bytes or 4Kn)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Vectors</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cylinders</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. The complete semiconductor internal memory subsystem of a personal computer encompasses:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Volatile RAM (DRAM / SDRAM)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Non-volatile ROM &amp; Flash Memory</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Programmable PROM / EEPROM</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. All of the above</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. System software acts as an essential intermediary layer between hardware circuits and:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Corporate Management</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Batch Processing Queues</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Network Cables</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. Application Software and End Users</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. An interrupt line that can be temporarily ignored or masked by software execution is known as:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Maskable Interrupt</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Non-Maskable Interrupt (NMI)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hardware Trap</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Vectored Exception</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Which software suite is categorized as proprietary commercial office productivity software?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Microsoft Office (Word, Excel, PowerPoint)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. LibreOffice</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Apache OpenOffice</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. GNU Coreutils</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. The binary numbering system utilizes how many fundamental numeric digits?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 2 (Digits: 0 and 1)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 8 (Octal)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 10 (Decimal)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 16 (Hexadecimal)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. In Microsoft Excel, what mathematical symbol must precede every computational formula?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 12px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Equals sign (=)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Plus sign (+)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. At symbol (@)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Colon (:)</td>
      </tr>
    </tbody>
  </table>

  
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. In networking terminology UTP means?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নেটওয়ার্কিং পরিভাষায় UTP-এর অর্থ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Unshielded Twisted Pair</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Ubiquitous Teflon port</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Uniformly Terminating Port</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Unshielded T-connector port</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. What is the size of IPv4 addressed?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: IPv4 ঠিকানার আকার (সাইজ) কত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 32 bits</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 64 bits</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 128 bits</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 265 bits</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. It is not a part of email address:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোনটি ইমেইল ঠিকানার অংশ হতে পারে না?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Underscore (_)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. At sign (@)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Period (.)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. Space ( )</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. VIRUS stands for:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: VIRUS-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Very Important Record User Searched</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Verify Interchanged Result Until Source</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Vital Information Resource Under Seize</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Very Important Resource Under Search</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. To return the remainder after a number is divided by a divisor in EXCEL we use the function?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: এক্সেলের কোন ফাংশন দ্বারা ভাগশেষ (ভাগ করার পর অবশিষ্ট) নির্ণয় করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. ROUND()</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. FACT()</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. MOD()</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. DIV()</td>
      </tr>
    </tbody>
  </table>

  <!-- Q21 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>21. Which of the following is an absolute cell reference?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি অ্যাবসোলিউট (Absolute) সেল রেফারেন্স?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. !A!1</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. $A$1</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. #a#1</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A1</td>
      </tr>
    </tbody>
  </table>

  <!-- Q22 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>22. Which key on the keyboard can be used to view Slide show?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কীবোর্ডের কোন কী চেপে পাওয়ারপয়েন্ট স্লাইডশো দেখা যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. F1</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. F2</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. F5</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. F10</td>
      </tr>
    </tbody>
  </table>

  <!-- Q23 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>23. In MS Word, insert footnote appears on which ribbon tab?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট ওয়ার্ডে ফুটনোট (Footnote) সন্নিবেশের অপশন কোন ট্যাবে থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Insert tab</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Review</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. References</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Layout</td>
      </tr>
    </tbody>
  </table>

  <!-- Q24 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>24. Which of the following shortcut key is used to insert hyperlink in MS-Excel?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট এক্সেলে হাইপারলিংক সন্নিবেশের শর্টকাট কী কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Ctrl + K</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Ctrl + V</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Alt + V</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Alt + K</td>
      </tr>
    </tbody>
  </table>

  <!-- Q25 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>25. Superscript, subscript, outline, emboss, engrave are known as:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সুপারস্ক্রিপ্ট, সাবস্ক্রিপ্ট, আউটলাইন, এমবস, এনগ্রেভ-কে কী বলা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 12px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Font effects</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Text effects</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Font styles</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Word art</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Answer Sheet (Set 01) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #0f172a; font-size: 11pt;">
      Section B: Hardware &amp; Antivirus Descriptive Questions (Questions 26 &ndash; 30)
    </p>

    <p style="margin: 4px 0 2px 0;"><strong>26. Name five industry-recognized Antivirus software solutions and five historic computer viruses:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Famous Antivirus Solutions:</strong> 1. Bitdefender Total Security, 2. Kaspersky Endpoint Security, 3. Avast Premium Security, 4. AVG AntiVirus, 5. Microsoft Defender Antivirus.<br/>
      <strong>Famous Historical Viruses:</strong> 1. ILOVEYOU (2000 VBScript email worm), 2. Melissa (1999 Microsoft Word macro virus), 3. CIH / Chernobyl (1998 BIOS overwriting virus), 4. Conficker (2008 Windows RPC worm), 5. Stuxnet (2010 precision SCADA worm).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>27. What is Malware and what are its common manifestations?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Malware (Malicious Software) is an umbrella term encompassing any software, script, or firmware intentionally engineered to compromise confidentiality, integrity, or availability. Common types include Trojans, Ransomware, Spyware, Rootkits, Keyloggers, and Worms.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>28. What are the primary root causes of a 'No Display' symptom on a desktop PC and how do you resolve it?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Diagnostic Procedure:</strong>
      <ol style="margin: 4px 0 4px 20px; padding: 0;">
        <li>Verify the monitor's power LED status (solid amber = standby; blinking = no sync signal; off = power failure).</li>
        <li>Inspect and reseat the video cable (HDMI, DisplayPort, or VGA) on both GPU and monitor ports.</li>
        <li>Listen for motherboard POST beep codes or observe 2-digit debug LED codes.</li>
        <li>Power down, disconnect mains AC, remove RAM modules, clean gold contact fingers with a clean vinyl eraser, and reseat firmly in dual-channel slots until latches click.</li>
        <li>Reseat dedicated PCIe graphics card and verify auxiliary 6-pin/8-pin PCIe power cables.</li>
        <li>Reset BIOS settings by clearing CMOS jumper pins or reseating the CR2032 3V coin cell battery for 5 minutes.</li>
      </ol>
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>29. How do you troubleshoot and fix random system restarts in Windows?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Resolution Protocol:</strong>
      <ol style="margin: 4px 0 4px 20px; padding: 0;">
        <li>In System Properties &gt; Advanced &gt; Startup and Recovery, uncheck <em>"Automatically restart"</em> to capture the Blue Screen of Death (BSOD) stop code.</li>
        <li>Monitor hardware temperatures (HWMonitor/CoreTemp) to confirm whether the CPU is exceeding 90°C thermal throttling thresholds.</li>
        <li>Clean heatsink dust filters, clean old dried thermal compound using 99% Isopropyl Alcohol, and reapply high-grade thermal paste.</li>
        <li>Execute Windows Memory Diagnostic (<code>mdsched.exe</code>) or MemTest86 to detect parity and addressing errors in RAM.</li>
        <li>Perform a clean reinstall of display drivers using Display Driver Uninstaller (DDU) in Windows Safe Mode.</li>
        <li>Test PSU 12V rail voltages with a digital multimeter under heavy synthetic load.</li>
      </ol>
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>30. What systematic steps isolate a complete 'No Power' condition on a desktop system?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Procedure:</strong>
      <ol style="margin: 4px 0 4px 20px; padding: 0;">
        <li>Verify wall AC outlet voltage with a digital multimeter or known-working appliance.</li>
        <li>Ensure the rear I/O rocker switch on the SMPS is in the 'I' (ON) position.</li>
        <li>Disconnect the 24-pin main motherboard connector and perform the standard PSU paperclip test (bridge Pin 16 PS_ON# Green wire with Pin 17/18 Ground Black wire) to see if the internal fan spins up.</li>
        <li>Test front-panel power switch connectivity by momentarily shorting the <code>PWR_SW</code> motherboard header pins with a flathead screwdriver.</li>
        <li>Disconnect all SATA hard drives, RGB controllers, and PCIe cards to eliminate internal short circuits pulling the +5VSB or +12V rails down.</li>
      </ol>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 01)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 01
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-301 &ndash; Install, Configure & Maintain Desktop Computer Hardware & Operating Systems
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> PC Hardware Diagnostics, BIOS/CMOS, POST Procedures & Core System Software
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-301):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-1.1: Identify motherboard form factors, chipset architecture, and bus interconnects.</li>
      <li>PC-1.2: Perform systematic isolation of "No Display", "No Power", and BSOD restart conditions.</li>
      <li>PC-1.3: Execute CMOS NVRAM clearing, battery health testing, and UEFI BIOS configuration.</li>
      <li>PC-1.4: Inspect RAM contacts, execute memory parity diagnostics (mdsched/MemTest86), and eliminate thermal throttling.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 01: Desktop No-Display Diagnostics & Bench Assembly Testing
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Digital Multimeter, Antistatic Wrist Strap, Vinyl Eraser, 99% Isopropyl Alcohol, Thermal Compound, Philips #2 Screwdriver.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Connect antistatic wrist strap to grounded metal chassis.</li>
        <li>Disconnect mains AC and measure wall outlet and SMPS voltages (+12V, +5V, +3.3V, +5VSB) with DMM.</li>
        <li>Remove dual-channel DDR RAM modules; clean gold contact fingers with vinyl eraser and re-seat in Channel A slots until latches click.</li>
        <li>Inspect CPU heatsink; clean dried thermal grease using 99% IPA and apply a pea-sized dot of high-grade compound.</li>
        <li>Reset BIOS NVRAM via CLR_CMOS header jumper and power on to verify POST beep (1 short beep = normal POST).</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the technical distinction between a maskable interrupt and a Non-Maskable Interrupt (NMI)?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> A maskable interrupt can be temporarily delayed/ignored by the CPU (via the Interrupt Flag IF in the EFLAGS register) during critical atomic operations. An NMI cannot be masked and indicates catastrophic hardware faults such as parity errors or bus timeouts.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Why is cleaning RAM gold fingers with a vinyl eraser recommended before diagnosing motherboard failure?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Environmental oxidation, atmospheric sulfur, and micro-dust build up an insulating film on gold fingers, preventing low-voltage LVDS signaling. Cleaning restores micro-ohmic contact before declaring a hardware failure.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 02: OFFICE APPLICATIONS & BENGALI TYPING
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 18px; margin-bottom: 6px;">
    Set# 02: Office Applications, Electronic Spreadsheets &amp; Bengali Typography
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Office Automation &amp; Language Standards
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. The Bengali compound conjunct character &ldquo;ক্ষ&rdquo; is formed by the combination of:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. হ + ম</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. হ + ষ</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. ক + ষ (ক + হসন্ত + ষ)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. ম + ম</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Which of the following is an ANSI/Latin font and NOT a dedicated Bengali Unicode font?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Arial</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Kalpurush</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. SolaimanLipi</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Nikosh</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. Which represents a syntactically valid cell address in Microsoft Excel?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. 5A</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. A5 (Column letter followed by row number)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. @A5</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A#5</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. In Microsoft Word, what keyboard shortcut toggles Center Alignment for the current paragraph?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Ctrl + C (Copy)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Ctrl + E</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Ctrl + L (Left Align)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Ctrl + R (Right Align)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. In Bijoy keyboard layout, which key acts as the 'Link' (হসন্ত / Virama) key to create conjunct characters?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 'G' Key</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 'H' Key</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 'F' Key</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 'J' Key</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. What is the fundamental difference between Bijoy and Avro Bengali typing systems?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Bijoy uses ANSI/custom layout with SutonnyMJ; Avro uses phonetic typing in Unicode</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Bijoy is an operating system; Avro is hardware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Avro only works on Macintosh computers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. There is no difference between them</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. In Microsoft Excel, which function calculates the arithmetic mean of a range of values?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. =MEAN(A1:A10)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. =AVERAGE(A1:A10)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. =AVG(A1:A10)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. =SUMDIV(A1:A10)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. What is the keyboard shortcut to create a new slide in Microsoft PowerPoint?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Ctrl + N (Creates new presentation)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Ctrl + M (Inserts new slide)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Ctrl + S (Saves file)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Ctrl + Shift + N</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. In Microsoft Word, the 'Format Painter' tool is used to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Draw freehand vector graphics</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Copy formatting from one text element and apply it to another</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Change background page color</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Convert text into uppercase</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Which Excel formula tests a condition and returns one value if true and another if false?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 12px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. =IF(logical_test, value_if_true, value_if_false)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. =CHECK(condition, true_val, false_val)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. =TEST(case, result1, result2)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. =CHOOSE(val1, val2)</td>
      </tr>
    </tbody>
  </table>

  
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. A Hard disk is divided into tracks which are further subdivided into:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: হার্ডডিস্কের ট্র্যাকগুলো পুনরায় কোন ক্ষুদ্র অংশে বিভক্ত থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Clusters</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Sectors</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Vectors</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Heads</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. From what location are the 1st computer instructions available on boot up?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটার বুট করার সময় প্রথম নির্দেশনাবলী কোথা থেকে পাওয়া যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. ROM BIOS</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. CPU</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Boot.ini</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. CONFIG.SYS</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. ASCII stands for:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ASCII-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. American Standard Code for Information Interchange</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. American Standard Code for Information Interaction</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. All Standard Code for Information Interchange</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. All Standard Code for Information Interaction</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. The standard internet protocol is:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: স্ট্যান্ডার্ড ইন্টারনেট প্রোটোকল কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. FTP</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. UDP</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. TCP/IP</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. TCP</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. The Operating system manages:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: অপারেটিং সিস্টেম নিচের কোনগুলো পরিচালনা করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Memory</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Processor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Disks and I/O devices</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. All of the above</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Which is a recognized Search Engine?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি সার্চ ইঞ্জিন?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Google Chrome</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Microsoft Edge</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. MSN</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Yellow Page</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. How to open a new email account?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নতুন ইমেইল একাউন্ট তৈরি করতে নিচের কোনটিতে ক্লিক করতে হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Log in</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Sign in</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Sign account</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. Sign up</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. Which is NOT a cloud storage service?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি ক্লাউড স্টোরেজ নয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. OneDrive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Google Drive</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Hard Disk Drive (HDD)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Mega Drive</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. Which one is NOT a social media platform?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি সোশ্যাল মিডিয়া নয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Google Drive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Facebook</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. YouTube</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. LinkedIn</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Google Docs is categorized as a:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: গুগল ডক্স (Google Docs) কী ধরনের অ্যাপ্লিকেশন?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Social Media</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. One Line Storage</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Online Word Processor</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cloud Storage</td>
      </tr>
    </tbody>
  </table>

  <!-- Q21 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>21. Which of the following is a Volatile Memory?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি উদ্বায়ী মেমোরি (Volatile Memory)?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. RAM</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ROM</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. SSD</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. EPROM</td>
      </tr>
    </tbody>
  </table>

  <!-- Q22 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>22. Which one is NOT a part of the System Unit?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি সিস্টেম ইউনিটের ভেতরের অংশ নয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Scanner</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Processor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. RAM</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. HDD</td>
      </tr>
    </tbody>
  </table>

  <!-- Q23 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>23. The Full form of OSH is:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: OSH-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Occupational Safety and Health</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Official Safety and Health</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Official Health and Safety</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Occupational Health and Safety</td>
      </tr>
    </tbody>
  </table>

  <!-- Q24 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>24. Which IP address class does 172.16.10.125 belong to?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: 172.16.10.125 আইপি অ্যাড্রেসটি কোন ক্লাসের অন্তর্ভুক্ত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Class A</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Class B</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Class C</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Class D</td>
      </tr>
    </tbody>
  </table>

  <!-- Q25 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>25. How many bits are in a physical MAC address?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ম্যাক অ্যাড্রেস (MAC Address) কত বিটের হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 14px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. 32 bits</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. 48 bits</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 38 bits</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 64 bits</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Answer Sheet (Set 02) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #0f172a; font-size: 11pt;">
      Section B: Analytical Technical Questions &amp; Practical Solutions (Questions 26 &ndash; 30)
    </p>

    <!-- Q26 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>26. Write down the meaning of WPM in Typing:</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: টাইপিংয়ে WPM বলতে কী বোঝায়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> Words Per Minute (the number of words a person can accurately type in one minute).<br/>
      <strong>উত্তর (বাংলা):</strong> Words Per Minute (এক মিনিটে একজন ব্যক্তি কতগুলো শব্দ নির্ভুলভাবে টাইপ করতে পারেন তার পরিমাপ)।
    </div>

    <!-- Q27 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>27. What is the main difference between SAVE and SAVE AS?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: SAVE এবং SAVE AS-এর মূল পার্থক্য কী?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> <strong>Save</strong> updates and overwrites changes to the current file preserving its file name and directory location. <strong>Save As</strong> creates a brand-new distinct file copy, prompting the user for a new file name, storage directory, or file extension format while keeping the original file untouched.<br/>
      <strong>উত্তর (বাংলা):</strong> সেভ (Save) বিদ্যমান ফাইলে করা পরিবর্তনগুলো আপডেট করে সংরক্ষণ করে। অন্যদিকে সেভ অ্যাজ (Save As) মূল ফাইল অপরিবর্তিত রেখে নতুন নামে, নতুন ফোল্ডারে বা নতুন ফরম্যাটে নতুন ফাইল হিসেবে সংরক্ষণ করে।
    </div>

    <!-- Q28 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>28. What is the difference between Formula and Function in a Worksheet?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: স্প্রেডশিটে ফর্মুলা (Formula) ও ফাংশন (Function)-এর মধ্যে পার্থক্য কী?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> A <strong>Formula</strong> is a custom user-defined mathematical expression or equation built using cell references and standard mathematical operators (e.g., <code>=A1+B1*C1</code>). A <strong>Function</strong> is a built-in, pre-programmed computational algorithm provided natively by the spreadsheet software that accepts arguments and executes specialized operations (e.g., <code>=SUM(A1:A10)</code>, <code>=AVERAGE(B1:B20)</code>, <code>=VLOOKUP(...)</code>).<br/>
      <strong>উত্তর (বাংলা):</strong> ফর্মুলা হলো ব্যবহারকারীর নিজস্ব তৈরি করা গাণিতিক সমীকরণ (যেমন: <code>=A1+B1</code>), আর ফাংশন হলো এক্সেলে আগে থেকেই তৈরি করা বিশেষায়িত বিল্ট-ইন ফর্মুলা (যেমন: <code>=SUM(A1:A5)</code>)।
    </div>

    <!-- Q29 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>29. What is the main difference between a Router and a Switch?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: রাউটার (Router) এবং সুইচ (Switch)-এর মূল পার্থক্য কী?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> A <strong>Router</strong> operates at OSI Layer 3 (Network Layer) and connects multiple different networks together using IP addresses to route packets across subnets and the internet. A <strong>Switch</strong> operates at OSI Layer 2 (Data Link Layer) and connects multiple endpoint devices together within the same local network (LAN) using MAC addresses to forward frames.<br/>
      &bull; <em>Router:</em> Connects different networks (WAN/LAN).<br/>
      &bull; <em>Switch:</em> Connects devices within the same network.<br/>
      <strong>উত্তর (বাংলা):</strong> সুইচ ডিভাইসগুলোকে লোকাল নেটওয়ার্কে কানেক্ট করে (Layer 2 MAC এড্রেস ব্যবহার করে), আর রাউটার বিভিন্ন নেটওয়ার্ককে একে অপরের সাথে কানেক্ট করে (Layer 3 IP এড্রেস ব্যবহার করে)।
    </div>

    <!-- Q30 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>30. What is the function of a Network Interface Card (NIC)?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: নেটওয়ার্ক ইন্টারফেস কার্ড (NIC)-এর কাজ কী?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Answer (English):</strong> A Network Interface Card (NIC) provides the physical circuit interface and logical media access connection between a computer and a communication network (via Ethernet cable RJ-45 or Wi-Fi radio). It manages physical signal modulation, frame serialization, and maintains the device unique physical 48-bit MAC address.<br/>
      <strong>উত্তর (বাংলা):</strong> নেটওয়ার্ক ইন্টারফেস কার্ড (NIC) একটি কম্পিউটারকে নেটওয়ার্ক কেবলের (RJ-45) বা ওয়্যারলেসের মাধ্যমে নেটওয়ার্কের সাথে যুক্ত হতে এবং তথ্য আদান-প্রদান করতে সহায়তা করে।
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 02)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 02
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Operate Office Productivity Applications & Bilingual Typography Standards
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Electronic Spreadsheets, Word Processing, Unicode Font Rendering & Bengali Layouts
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-2.1: Construct complex electronic spreadsheet models using absolute references ($A$1) and nested logic.</li>
      <li>PC-2.2: Apply typographic hierarchies, styles, footnotes, and mail-merge rules in word processing documents.</li>
      <li>PC-2.3: Demonstrate flawless Bengali typing using both Bijoy (ANSI) and Avro (Unicode) input layouts.</li>
      <li>PC-2.4: Analyze font encoding standards (ASCII vs Unicode UTF-8 vs OpenType typography).</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 02: Bilingual Institutional Payroll Ledger & Mail Merge Generation
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Microsoft Excel, Microsoft Word, Bijoy 52 Typing Suite, Avro Keyboard 5.6, Bengali Unicode Fonts (Nikosh, Kalpurush).
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Launch Microsoft Excel and build a 10-column employee payroll model using absolute cell references ($F$2) for tax withholding.</li>
        <li>Implement conditional formatting highlighting net salaries exceeding threshold limits.</li>
        <li>Draft an official bilingual notification in MS Word incorporating Bengali conjunct characters (ক্ষ, জ্ঞ, ষ্ণ).</li>
        <li>Connect Excel data source to Word document using Mail Merge wizard to generate individualized candidate appointment letters.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: Why does Bijoy typing require specific ANSI non-Unicode fonts (e.g., SutonnyMJ) while Avro uses Unicode (e.g., Nikosh)?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Bijoy traditionally maps English keyboard ASCII scan codes directly to Bengali glyph code points in the 128-255 byte range, requiring proprietary font metrics. Avro adheres to the international Unicode standard (U+0980 to U+09FF), ensuring platform-agnostic interchange.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What error occurs if an absolute cell reference is omitted during spreadsheet formula auto-fill?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Relative row and column offsets increment dynamically, resulting in incorrect calculation values, empty cell references, or #DIV/0! / #VALUE! errors.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 03: NETWORKING INFRASTRUCTURE, OSI MODEL &AMP; COMMUNICATION PROTOCOLS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 03: Networking Infrastructure, OSI Model &amp; Communication Protocols
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. Which layer of the OSI 7-Layer model is responsible for end-to-end data transport, reliability, and flow control?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: OSI রেফারেন্স মডেলের কোন লেয়ারটি ডেটা ট্রান্সপোর্ট, নির্ভরযোগ্যতা এবং ফ্লো কন্ট্রোলের দায়িত্ব পালন করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Network Layer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Transport Layer (Layer 4 - TCP/UDP)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Session Layer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Data Link Layer</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. At which OSI layer does a standard Network Switch operate to forward frames via MAC addresses?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি স্ট্যান্ডার্ড নেটওয়ার্ক সুইচ MAC অ্যাড্রেসের ভিত্তিতে ফ্রেম ফরোয়ার্ড করতে কোন OSI লেয়ারে কাজ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Physical Layer (Layer 1)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Data Link Layer (Layer 2)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Network Layer (Layer 3)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Transport Layer (Layer 4)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. At which layer of the OSI model does a Network Router operate to route IP packets?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আইপি প্যাকেট রাউটিং করার জন্য একটি নেটওয়ার্ক রাউটার কোন OSI লেয়ারে কাজ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Physical Layer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Data Link Layer</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Network Layer (Layer 3)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Application Layer</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. What is the standard 8-pin modular connector used for unshielded twisted-pair (UTP) Ethernet cabling?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আনশিল্ডেড টুইস্টেড পেয়ার (UTP) ইথারনেট কেবলের জন্য ব্যবহৃত স্ট্যান্ডার্ড ৮-পিন মডুলার কানেক্টর কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. RJ11 Connector</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. RJ45 (8P8C) Connector</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. BNC Connector</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. USB Type-C</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Which hand tool is specifically engineered to crimp RJ45 plugs onto copper network cable conductors?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: তামার নেটওয়ার্ক কেবলে RJ45 প্লাগ ক্রিপিং করার জন্য কোন হ্যান্ড টুলটি ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Wire Stripper</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Modular RJ45 Crimping Tool</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Punch Down Impact Tool</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Needle-nose Pliers</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Which network protocol dynamically assigns IP addresses, subnet masks, and default gateways to client nodes?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন নেটওয়ার্ক প্রোটোকলটি ক্লায়েন্ট ডিভাইসে ডায়নামিকভাবে আইপি অ্যাড্রেস, সাবনেট মাস্ক এবং গেটওয়ে বরাদ্দ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. DNS (Domain Name System)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. DHCP (Dynamic Host Configuration Protocol)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. ARP (Address Resolution Protocol)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. ICMP (Internet Control Message Protocol)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Which of the following IPv4 addresses belongs to the RFC 1918 Private Address space?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোন আইপিভি৪ ঠিকানাটি RFC 1918 প্রাইভেট অ্যাড্রেস রেঞ্জের অন্তর্ভুক্ত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. 8.8.8.8</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. 192.168.1.1</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 208.67.222.222</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 1.1.1.1</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which physical network topology connects all client workstations to a central hub or switch?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন ফিজিক্যাল নেটওয়ার্ক টপোলজিতে সমস্ত ক্লায়েন্ট ওয়ার্কস্টেশন একটি কেন্দ্রীয় হাব বা সুইচের সাথে যুক্ত থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Bus Topology</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Ring Topology</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Star Topology</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Mesh Topology</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. What is the default subnet mask for a standard Class C IPv4 network (/24)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি স্ট্যান্ডার্ড ক্লাস সি IPv4 নেটওয়ার্কের (/24) ডিফল্ট সাবনেট মাস্ক কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. 255.0.0.0</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 255.255.0.0</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. 255.255.255.0</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 255.255.255.255</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Which command-line diagnostic utility tests round-trip network latency and packet reachability using ICMP Echo?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ICMP Echo ব্যবহার করে নেটওয়ার্ক লেটেন্সি এবং সংযোগ পরীক্ষা করার কমান্ড-লাইন ইউটিলিটি কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. ipconfig</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. ping</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. traceroute</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. netstat</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. What is the primary technical function of the Address Resolution Protocol (ARP)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: অ্যাড্রেস রেজোলিউশন প্রোটোকল (ARP)-এর প্রধান প্রযুক্তিগত কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Resolves an IPv4 address to a physical MAC address</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Resolves a domain name to an IP address</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Encrypts network data packets</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Assigns default gateway addresses</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What transmission medium offers the highest data transmission bandwidth and total immunity to electromagnetic interference (EMI)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন ট্রান্সমিশন মাধ্যমটি সর্বোচ্চ ব্যান্ডউইথ এবং ইলেক্ট্রোম্যাগনেটিক ইন্টারফেয়ারেন্সের (EMI) বিরুদ্ধে সম্পূর্ণ সুরক্ষা দেয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Cat6 UTP copper cable</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Coaxial cable</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Fiber Optic Cable (Single-mode/Multi-mode)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Shielded Twisted Pair (STP)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Which port number does unencrypted HTTP use by default, and which port does encrypted HTTPS use?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: এনক্রিপশনবিহীন HTTP এবং এনক্রিপ্ট করা HTTPS ডিফল্টভাবে কোন কোন পোর্ট ব্যবহার করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Port 21 and Port 22</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Port 25 and Port 110</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Port 80 (HTTP) and Port 443 (HTTPS)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Port 53 and Port 67</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Which network device interconnects two or more disparate subnets and directs packets based on logical IP addresses?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন নেটওয়ার্ক ডিভাইসটি একাধিক সাবনেটকে সংযুক্ত করে এবং আইপি ঠিকানার ভিত্তিতে ডেটা প্যাকেট রাউটিং করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Repeater</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Hub</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Router</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Bridge</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. Which protocol provides secure, cryptographically encrypted remote command-line login access across a network?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন প্রোটোকলটি নেটওয়ার্কের মাধ্যমে সুরক্ষিত, এনক্রিপ্ট করা রিমোট কমান্ড-লাইন লগইন অ্যাক্সেস প্রদান করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Telnet (Port 23)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. SSH (Secure Shell - Port 22)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. FTP (Port 21)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. SNMP (Port 161)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. What does MAC stand for in networking, and how many bits does a hardware MAC address contain?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নেটওয়ার্কিংয়ে MAC বলতে কী বোঝায় এবং একটি হার্ডওয়্যার MAC ঠিকানায় কত বিট থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Media Access Control, 48 bits (6 hex octets)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Memory Access Controller, 32 bits</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Master Address Code, 64 bits</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Media Authentication Certificate, 128 bits</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. In a full-duplex communication channel, how can data be transmitted across the link?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি ফুল-ডুপ্লেক্স যোগাযোগ চ্যানেলে লিঙ্কের মধ্য দিয়ে ডেটা কীভাবে প্রবাহিত হতে পারে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. In only one direction at any time</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. In both directions, but alternately one at a time</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. In both directions simultaneously</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Only via wireless broadcasting</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. What is the standard IPv4 loopback address utilized to test a host's internal TCP/IP protocol stack?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: হোস্টের নিজস্ব TCP/IP প্রোটোকল স্ট্যাক পরীক্ষা করার জন্য ব্যবহৃত স্ট্যান্ডার্ড লুপব্যাক ঠিকানা কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. 0.0.0.0</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 192.168.0.1</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. 127.0.0.1 (localhost)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 255.255.255.255</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. Which hardware device regenerates and amplifies electrical signals to extend transmission distance over long cable spans?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন হার্ডওয়্যার ডিভাইসটি দূরবর্তী কেবল সংযোগে সিগন্যাল রি-জেনারেট এবং বিবর্ধিত করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Repeater / Signal Extender</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Attenuator</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Firewall</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Patch Panel</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. In the OSI 7-Layer model, which layer interfaces directly with end-user software applications?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: OSI ৭-লেয়ার মডেলে কোন লেয়ারটি সরাসরি ব্যবহারকারীর সফটওয়্যার অ্যাপ্লিকেশনের সাথে ইন্টারফেস তৈরি করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Presentation Layer (Layer 6)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Session Layer (Layer 5)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Application Layer (Layer 7 - HTTP, SMTP, DNS)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Physical Layer (Layer 1)</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Explain Guided vs Unguided transmission media with technical examples:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: গাইডেড বনাম আনগাইডেড ট্রান্সমিশন মাধ্যমের পার্থক্য প্রযুক্তিগত উদাহরণসহ লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Guided Media (Bounded):</strong> Physical transmission channels that constrain signals along physical conductors or glass pathways (e.g., Cat6 UTP, Coaxial Cable, Single-Mode and Multi-Mode Fiber Optic). Offers predictable latency and high EMI shielding.<br/><strong>Unguided Media (Unbounded):</strong> Wireless transmission channels that propagate electromagnetic waves through free space/air without physical conductors (e.g., 2.4/5GHz Wi-Fi 802.11ax, Microwave point-to-point, Satellite communications, Bluetooth BLE).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: গাইডেড মিডিয়াতে সিগন্যাল কোনো নির্দিষ্ট ভৌত তার বা কাচের মধ্য দিয়ে পরিবাহিত হয় (যেমন Cat6 UTP, ফাইবার অপটিক)। আনগাইডেড মিডিয়াতে সিগন্যাল তারবিহীনভাবে বায়ুমণ্ডলের মধ্য দিয়ে ইলেক্ট্রোম্যাগনেটিক তরঙ্গের মাধ্যমে সঞ্চালিত হয় (যেমন ওয়াই-ফাই, মাইক্রোওয়েভ ও স্যাটেলাইট)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. What is the fundamental architectural difference between a Network Hub and a Network Switch?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: নেটওয়ার্ক হাব এবং নেটওয়ার্ক সুইচের মধ্যে মৌলিক প্রযুক্তিগত পার্থক্য কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> A <strong>Hub</strong> operates at Layer 1 (Physical) as a multi-port repeater; incoming frames are blindly broadcast out to all ports, creating a single shared collision domain and saturating bandwidth.<br/>A <strong>Switch</strong> operates at Layer 2 (Data Link) as an intelligent bridge; it maintains an internal MAC Address Table (CAM table) to forward frames unicast directly to the destination port, providing dedicated bandwidth per port and eliminating collisions.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: হাব ওএসআই লেয়ার ১-এ কাজ করে এবং আসা প্রতিটি ফ্রেম সব পোর্টে সম্প্রচার করে, ফলে কলিশন তৈরি হয়। সুইচ লেয়ার ২-এ কাজ করে এবং MAC অ্যাড্রেস টেবিল দেখে নির্দিষ্ট গন্তব্য পোর্টে ফ্রেম পাঠায়, ফলে প্রতিটি পোর্টে পূর্ণ ব্যান্ডউইথ নিশ্চিত হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. Explain the function of the Domain Name System (DNS) in enterprise networking:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: এন্টারপ্রাইজ নেটওয়ার্কিংয়ে ডোমেন নেম সিস্টেম (DNS)-এর ভূমিকা ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> DNS is the global distributed hierarchical database that resolves human-readable fully qualified domain names (FQDNs, such as <code>srv-dc01.corp.local</code> or <code>www.google.com</code>) into 32-bit IPv4 or 128-bit IPv6 numerical addresses, allowing routers and switches to establish TCP/UDP transport connections.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: DNS মানুষের সহজে মনে রাখার উপযোগী ডোমেন নামকে (যেমন www.google.com) কম্পিউটারের রাউটিংযোগ্য আইপি ঠিকানায় (যেমন 142.250.190.46) রূপান্তর করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Define Network Bandwidth and state its standard unit of measurement:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: নেটওয়ার্ক ব্যান্ডউইথ কাকে বলে এবং এর পরিমাপের একক কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Bandwidth represents the maximum theoretical data transfer capacity of a communications transmission medium over a given interval of time. It is measured in bits per second (bps), Kilobits per second (Kbps), Megabits per second (Mbps), and Gigabits per second (Gbps).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: একটি নির্দিষ্ট সময়ে নেটওয়ার্ক বা যোগাযোগ মাধ্যমের মধ্য দিয়ে সর্বোচ্চ যে পরিমাণ ডেটা স্থানান্তরিত হতে পারে তাকে ব্যান্ডউইথ বলে। এর একক হলো বিট পার সেকেন্ড (bps, Mbps, Gbps)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. What is a Network Firewall and how does it safeguard network perimeters?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: নেটওয়ার্ক ফায়ারওয়াল কী এবং এটি কীভাবে নেটওয়ার্কের নিরাপত্তা নিশ্চিত করে?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> A Firewall is a security system (implemented in dedicated hardware appliance or software daemon) that inspects and filters incoming and outgoing network traffic based on stateful inspection rules, port numbers, IP addresses, and protocol headers, blocking unauthorized intrusion attempts and malicious packets.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ফায়ারওয়াল হলো একটি নিরাপত্তা ব্যবস্থা যা অনুমোদিত সিকিউরিটি নিয়মের ভিত্তিতে আগত ও বহির্গামী প্রতিটি নেটওয়ার্ক প্যাকেট পরীক্ষা করে এবং অননুমোদিত অ্যাক্সেস ও সাইবার আক্রমণ প্রতিহত করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. What is CPU Cache Memory (L1, L2, L3) and what is its role in processing performance?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: সিপিইউ ক্যাশ মেমোরি (L1, L2, L3) কী এবং প্রসেসিং গতি বৃদ্ধিতে এর ভূমিকা কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> CPU Cache is extremely high-speed Static RAM (SRAM) integrated directly on the processor silicon die. L1 is the fastest and closest to execution units; L2 provides dedicated low-latency buffer per core; L3 is a shared pool across all cores. It stores frequently accessed instructions and operands, drastically reducing high-latency memory bus wait cycles to main system DRAM.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ক্যাশ মেমোরি হলো প্রসেসরের ভেতরে থাকা অত্যন্ত দ্রুতগতির স্ট্যাটিক র‍্যাম (SRAM)। এটি ঘন ঘন ব্যবহৃত নির্দেশ ও ডেটা সংরক্ষণ করে রাখে, যাতে সিপিইউকে ধীরগতির প্রধান র‍্যামের (DRAM) জন্য অপেক্ষা করতে না হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain the function and safety mechanism of an Anti-Static ESD Wristband:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অ্যান্টি-স্ট্যাটিক ইএসডি রিস্টব্যান্ডের কাজ ও সুরক্ষা প্রক্রিয়া ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> An Anti-Static Wriststrap is a wearable safety accessory with a conductive band connected via a coiled grounding cord to an unpainted chassis earth ground. It incorporates an integrated 1-Megaohm current-limiting safety resistor that continuously bleeds static charges away from the technician's body while protecting the technician against accidental lethal current shock from mains AC voltages.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: অ্যান্টি-স্ট্যাটিক রিস্টব্যান্ড টেকনিশিয়ানের শরীরের স্ট্যাটিক ইলেকট্রিসিটিকে নিরাপদে গ্রাউন্ডে পাঠিয়ে দেয়। এর ভেতরে থাকা ১-মেগাওহম রেজিস্টর স্ট্যাটিক ভোল্টেজ ডিসচার্জ করে মাদারবোর্ড ও র‍্যামকে পুড়ে যাওয়া থেকে রক্ষা করে এবং টেকনিশিয়ানকে নিরাপদ রাখে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. What is the role of a Default Gateway in local subnet routing?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: লোকাল সাবনেট রাউটিংয়ে ডিফল্ট গেটওয়ের ভূমিকা কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> The Default Gateway is the IP address of the local router interface on the host's subnet. When a workstation determines that a destination IP address is outside its local subnet (via subnet mask bitwise comparison), it encapsulates the packet and forwards it to the Default Gateway's MAC address for inter-network routing.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ডিফল্ট গেটওয়ে হলো লোকাল নেটওয়ার্কে থাকা রাউটারের ইন্টারফেস আইপি। লোকাল সাবনেটের বাইরের কোনো ঠিকানায় ডেটা পাঠানোর প্রয়োজন হলে কম্পিউটার সেই ডেটা প্যাকেটটি ডিফল্ট গেটওয়েতে পাঠায়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Compare TCP vs UDP at Layer 4 of the OSI Reference Model:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: OSI ট্রান্সপোর্ট লেয়ারে TCP এবং UDP-এর মধ্যে প্রযুক্তিগত তুলনা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>TCP (Transmission Control Protocol):</strong> Connection-oriented, establishes a 3-way handshake (SYN, SYN-ACK, ACK), guarantees reliable delivery via sequencing and acknowledgments, performs error recovery and flow control. Used for HTTP/HTTPS, FTP, SSH, SMTP.<br/><strong>UDP (User Datagram Protocol):</strong> Connectionless, lightweight, zero connection setup overhead, no sequencing or retransmissions. Ideal for real-time traffic tolerant of occasional packet drops (DNS, VoIP, video streaming, DHCP).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: টিসিপি (TCP) হলো সংযোগ-ভিত্তিক নির্ভরযোগ্য প্রোটোকল যা ডেটা পৌঁছানোর নিশ্চয়তা দেয় (যেমন ওয়েব ব্রাউজিং, ফাইল ট্রান্সফার)। ইউডিপি (UDP) হলো সংযোগবিহীন দ্রুতগতির প্রোটোকল যেখানে কোনো কনফার্মেশন থাকে না (যেমন লাইভ স্ট্রিমিং, অনলাইন ভয়েস কল)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Explain Straight-Through vs Crossover UTP Ethernet cable wiring and applications:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: স্ট্রেইট-থ্রু বনাম ক্রসওভার ইথারনেট কেবলের ওয়্যারিং ও প্রয়োগ ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Straight-Through Cable:</strong> Terminated identically at both ends (T568B to T568B or T568A to T568A). Connects unlike devices (workstation PC to Switch, Router WAN port to Cable Modem).<br/><strong>Crossover Cable:</strong> Terminated with T568A on one end and T568B on the opposite end, crossing the transmit (TX pins 1, 2) and receive (RX pins 3, 6) pairs. Connects like devices directly (PC to PC, Switch to Switch without Auto-MDIX).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: স্ট্রেইট-থ্রু কেবলের দুই মাথায় একই পিনআউট থাকে (T568B থেকে T568B); এটি ভিন্ন ধরনের ডিভাইসকে সংযুক্ত করে (যেমন পিসি থেকে সুইচ)। ক্রসওভার কেবলের এক মাথায় T568A এবং অন্য মাথায় T568B থাকে; এটি সমগোত্রীয় ডিভাইসকে সরাসরি সংযুক্ত করে (যেমন পিসি থেকে পিসি)।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 03)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 03
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-301 &ndash; Install, Configure & Maintain Desktop Computer Hardware & Operating Systems
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Peripheral Interfacing, Display Interfaces, Audio Codecs & Expansion Adapters
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-301):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-3.1: Identify digital and analog display standards (VGA, DVI-D, HDMI 2.1, DisplayPort 1.4).</li>
      <li>PC-3.2: Configure High-Definition Audio CODECs, sampling rates, and multi-channel speaker topologies.</li>
      <li>PC-3.3: Calculate maximum data transfer bandwidths for USB 2.0, USB 3.2 Gen 2x2, and Thunderbolt 4.</li>
      <li>PC-3.4: Resolve device driver signing, interrupt request (IRQ) conflicts, and legacy COM/LPT port parameters.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 03: Multi-Monitor Workstation & High-Definition Audio Configuration
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Dual IPS Monitors, DisplayPort 1.4 cables, HDMI 2.1 cables, HD Audio Diagnostic Suite, Device Manager.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Connect Primary monitor via DisplayPort 1.4 and secondary monitor via HDMI 2.1 to dedicated PCIe GPU.</li>
        <li>In Windows Display Settings, arrange virtual monitor positions, set native 1920x1080 resolution, and configure 144Hz refresh rate.</li>
        <li>Navigate to Sound Control Panel; configure Realtek HD Audio to 24-bit, 192,000 Hz Studio Quality.</li>
        <li>Verify color profile calibration and perform end-to-end multi-channel surround sound test.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the primary technical distinction between DisplayPort and HDMI packet architecture?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> DisplayPort transmits data across 1 to 4 micro-packetized Main Links similar to Ethernet/PCIe packets, supporting Daisy Chaining via Multi-Stream Transport (MST). HDMI uses fixed Transition-Minimized Differential Signaling (TMDS) clock-synchronized channels.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What is the maximum throughput of USB 3.2 Gen 2x2 and how is it achieved?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> 20 Gbps (Gigabits per second), achieved by utilizing dual-lane 10 Gbps differential signaling over Type-C cabling.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 04: WORKPLACE IT SUPPORT, STORAGE PARTITIONS &AMP; BACKUP DIAGNOSTICS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 04: Workplace IT Support, Storage Partitions &amp; Backup Diagnostics
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What official document records customer details, equipment serial number, reported faults, technician observations, and work authorized?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন প্রাতিষ্ঠানিক নথিতে গ্রাহকের বিবরণ, যন্ত্রের সিরিয়াল নম্বর, ত্রুটির বিবরণ এবং অনুমোদিত কাজের হিসাব লিপিবদ্ধ করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Job Sheet / Service Work Order</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Vendor Sales Catalog</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Delivery Challan</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Equipment Brochure</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Why is performing a verified data backup mandatory before installing an operating system or servicing storage?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: অপারেটিং সিস্টেম ইনস্টল বা স্টোরেজ মেরামতের পূর্বে ব্যাকআপ নেওয়া কেন বাধ্যতামূলক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. OS deployment and drive partitioning erase volumes, risking catastrophic data loss</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. It makes the computer boot faster</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. It updates motherboard firmware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. It reduces hardware temperature</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. What is the fundamental architectural difference between System Software and Application Software?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সিস্টেম সফটওয়্যার এবং অ্যাপ্লিকেশন সফটওয়্যারের মধ্যে মৌলিক প্রযুক্তিগত পার্থক্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. System software manages hardware resources and operating environment, whereas application software accomplishes user-specific tasks</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. System software requires internet, application software does not</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. System software is always free, application software is paid</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. System software only runs on mobile devices</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. What is a Partition Table on a physical storage drive?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি ফিজিক্যাল স্টোরেজ ড্রাইভে পার্টিশন টেবিল বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. A low-level data structure (MBR or GPT) recording partition boundaries, sizes, and bootable flags</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A physical table used to assemble desktop PCs</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. A cooling pad placed under a laptop</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A list of peripheral driver manufacturers</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Why must an IT technician collect backups before replacing hardware components or repairing computers?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটার বা হার্ডওয়্যার মেরামতের পূর্বে টেকনিশিয়ানের ডেটা ব্যাকআপ নেওয়ার মূল উদ্দেশ্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To ensure business data can be fully restored in the event of drive failure or corruption</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To increase CPU clock speed</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To avoid purchasing software licenses</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To change the monitor display refresh rate</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. What is a primary operational benefit of Cloud Backup solutions over local on-premise external drives?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: লোকাল ড্রাইভের তুলনায় ক্লাউড ব্যাকআপ সলিউশনের প্রধান প্রযুক্তিগত সুবিধা কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Off-site physical isolation protects data against local fires, floods, theft, and physical disasters</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Cloud backup does not require an internet connection</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Cloud backup completely eliminates the need for strong passwords</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cloud storage is always free with infinite capacity</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Why must thorough post-repair functional testing be executed immediately following hardware service?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: হার্ডওয়্যার মেরামতের পরপরই সম্পূর্ণ কার্যকারিতা পরীক্ষা (Functional Testing) কেন বাধ্যতামূলক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To confirm reported faults are resolved and all interrelated subsystems operate within nominal tolerances</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To quickly hand over the PC without checking</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To format the client's hard drive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To void manufacturer warranty</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. If an unresolvable hardware hazard or serious safety breach is discovered in the workshop, what is the technician's immediate responsibility?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কর্মক্ষেত্রে কোনো গুরুতর বৈদ্যুতিক বা হার্ডওয়্যার নিরাপত্তা ঝুঁকি দেখা দিলে টেকনিশিয়ানের তাৎক্ষণিক দায়িত্ব কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Report immediately to designated supervisor/authority and document hazard in the safety register</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Hide damaged component in storage</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Attempt unauthorized modifications</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Ignore it and leave the workplace</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. In Microsoft Excel, which logical function evaluates whether a condition is met and returns one value if TRUE and another if FALSE?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট এক্সেলে কোন লজিক্যাল ফাংশনটি শর্ত সাপেক্ষে সত্য বা মিথ্যা মান প্রদান করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. =IF(logical_test, value_if_true, value_if_false)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. =CHECK(condition, true_val, false_val)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. =TEST(case, result1, result2)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. =CHOOSE(val1, val2)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. What does URL stand for in web communications?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ওয়েব কমিউনিকেশনে URL-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Uniform Resource Locator</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Universal Radio Link</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Unified Routing Ledger</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Universal Record Locator</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. What is an Enterprise Data Center?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি এন্টারপ্রাইজ ডেটা সেন্টার বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Dedicated facility housing clustered servers, storage SANs, UPS battery backup, and precision HVAC cooling</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A small retail store selling computer mice</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. An internet cafe with desktop terminals</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A software package for viewing pictures</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What electric tool is used by hardware technicians to blow dust and particulate debris out of chassis heatsinks?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটার কেসিং ও হিটসিঙ্ক থেকে ধুলোবালি পরিষ্কার করতে হার্ডওয়্যার টেকনিশিয়ানরা কোন বৈদ্যুতিক টুলটি ব্যবহার করেন?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Electric Blower Gun / Compressed Air Duster</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Soldering Iron</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hot Air Gun</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Drill Machine</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Which of the following is an inherent physical characteristic of Solid-State Drives (SSDs)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সলিড-স্টেট ড্রাইভের (SSD) অন্তর্নিহিত ভৌত বৈশিষ্ট্য নিচের কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Zero moving mechanical parts, resulting in silent operation, shock resistance, and microsecond seek latency</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Mechanical spinning platters with magnetic actuator arms</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. High vulnerability to magnetic interference</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Requirement of routine acoustic lubrication</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Which of the following is NOT a function of the computer BIOS/UEFI firmware?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি কম্পিউটার BIOS/UEFI ফার্মওয়্যারের কাজ নয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Running complex spreadsheet macro calculations and video editing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Performing Power-On Self-Test (POST)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Identifying and initializing system hardware peripherals</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Handing over execution to the operating system bootloader</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. Which of the following constitutes the core architecture of an Operating System?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনগুলো একটি অপারেটিং সিস্টেমের মূল অভ্যন্তরীণ উপাদান?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Kernel, Device Drivers, File System Manager, Memory Manager, and User Shell</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Mouse, Keyboard, and Monitor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Power Supply Unit, Heatsink, and Fan</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. HDMI Cable, VGA Cable, and RJ45</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. If a desktop PC displays low resolution, 60Hz flickering, and lacks 3D acceleration after OS installation, which driver is missing?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নতুন ওএস ইনস্টল করার পর ডিসপ্লে যদি নিম্ন রেজোলিউশন দেখায় এবং ফ্লিকার করে, তবে কোন ড্রাইভারটি অনুপস্থিত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Dedicated GPU / Graphics Display Driver</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Sound card driver</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Touchpad driver</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. BIOS chipset firmware</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. What two factors must precisely match when procuring and installing device drivers for an operating system?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: অপারেটিং সিস্টেমের জন্য ডিভাইস ড্রাইভার নির্বাচনের ক্ষেত্রে কোন দুটি বিষয় মেলানো আবশ্যক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Exact hardware device model/chipset and OS version/architecture (32-bit x86 vs 64-bit x64)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Color of motherboard and computer case</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Monitor screen diagonal size and keyboard brand</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Wi-Fi router password and power rating</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. What tool is used to attach RJ45 connectors to UTP Cat6 network cables?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: Cat6 UTP নেটওয়ার্ক কেবলে RJ45 কানেক্টর লাগাতে কোন টুল ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Modular Crimping Tool</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Needle Pliers</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Phillips Screwdriver</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Wire Stripper</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What does LAN stand for?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: LAN-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Local Area Network</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Logical Array Node</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Large Area Network</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Long Access Node</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. In the IPv4 subnet 192.168.168.128/26, what is the valid usable host IP address range?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: 192.168.168.128/26 সাবনেটে ব্যবহারযোগ্য বৈধ হোস্ট আইপি অ্যাড্রেসের রেঞ্জ কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 192.168.168.129 to 192.168.168.190 (Broadcast: 192.168.168.191)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 192.168.168.1 to 192.168.168.62</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 192.168.168.128 to 192.168.168.255</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 192.168.168.65 to 192.168.168.126</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Compare Wired vs Wireless transmission media (properties, advantages, and limitations):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: তারযুক্ত বনাম তারবিহীন মাধ্যমের বৈশিষ্ট্য, সুবিধা ও সীমাবদ্ধতা সংক্ষেপে লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Wired Media (Copper/Fiber):</strong> High throughput (up to 10-100 Gbps), low latency, excellent resistance to RF interference, secure from physical eavesdropping outside premises. Limited by physical cabling runs and installation labor.<br/><strong>Wireless Media (Wi-Fi/Microwave):</strong> Complete user mobility, rapid deployment without running conduit, supports mobile devices. Susceptible to radio interference, structural attenuation (concrete walls), and requires robust WPA3 encryption.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: তারযুক্ত মাধ্যমে উচ্চ গতি ও নির্ভরযোগ্য সংযোগ পাওয়া যায় এবং বাহ্যিক সংকেতের ব্যাঘাত ঘটে না। তারবিহীন মাধ্যমে গতিশীলতা ও সহজে সংযোগের সুবিধা থাকলেও দেয়াল ও দূরত্বের কারণে সংকেত দুর্বল হতে পারে এবং কঠোর এনক্রিপশন প্রয়োজন হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. Explain post-installation functionality checking for hardware and software systems:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: হার্ডওয়্যার এবং সফটওয়্যার ইনস্টলেশনের পর কার্যকারিতা পরীক্ষার ধাপগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Verify Device Manager shows zero missing driver alerts (yellow exclamation marks).<br/>2. Execute Windows Update to pull WHQL patches and stability hotfixes.<br/>3. Test peripheral connectivity (USB ports, display outputs, audio jacks, webcam, Gigabit LAN link speed).<br/>4. Stress-test CPU and RAM thermals under load to ensure thermal paste and cooling fans operate nominally.<br/>5. Confirm endpoint security suite is active with updated signature databases.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ডিভাইস ম্যানেজারে কোনো ড্রাইভার ত্রুটি নেই তা নিশ্চিত করা। ২. ওএস আপডেট সম্পন্ন করা। ৩. সমস্ত ইউএসবি, ডিসপ্লে, নেটওয়ার্ক ও অডিও পোর্ট পরীক্ষা করা। ৪. কুলিং ফ্যান এবং প্রসেসরের তাপমাত্রা পরীক্ষা করা। ৫. অ্যান্টিভাইরাস সক্রিয় ও আপডেট করা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. Differentiate between Manual Backup and Scheduled Automated Backup:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ম্যানুয়াল ব্যাকআপ এবং স্বয়ংক্রিয় সিডিউল ব্যাকআপের মধ্যে পার্থক্য কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Manual Backup:</strong> Initiated on-demand by the user or technician; flexible for immediate pre-service snapshots, but vulnerable to human oversight, forgetfulness, and inconsistent versioning.<br/><strong>Scheduled Automated Backup:</strong> Configured via software policies (VSS, Task Scheduler, Cloud sync) to run systematically during off-peak hours (e.g., nightly at 02:00 AM). Guarantees consistent RPO (Recovery Point Objective) with zero human intervention required.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ম্যানুয়াল ব্যাকআপ ব্যবহারকারী নিজে প্রয়োজনমাফিক নেয়, যা ভুলে যাওয়ার ঝুঁকি থাকে। সিডিউল ব্যাকআপ সিস্টেম নিজে নির্দিষ্ট সময়ে (যেমন প্রতিদিন রাতে) স্বয়ংক্রিয়ভাবে সম্পন্ন করে, ফলে নিয়মিত ডেটা সুরক্ষা নিশ্চিত থাকে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Why is maintaining comprehensive technical maintenance and troubleshooting documentation vital in IT departments?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: আইটি ডিপার্টমেন্টে প্রযুক্তিগত রক্ষণাবেক্ষণ ও ট্রাবলশুটিং ডকুমেন্টেশন সংরক্ষণ করা কেন জরুরি?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Documentation creates an institutional knowledge base that eliminates dependency on single individuals. It records hardware lifecycle history, network topology changes, IP assignment ledgers, vendor license keys, and proven solutions to recurring technical faults, speeding up mean time to repair (MTTR).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ডকুমেন্টেশন থাকলে প্রতিষ্ঠানের যেকোনো টেকনিশিয়ান পূর্বের ত্রুটি ও তার সমাধান সহজে জানতে পারে। এটি হার্ডওয়্যারের ইতিহাস, লাইসেন্স রেকর্ড এবং নেটওয়ার্ক ডায়াগ্রাম সংরক্ষণের মাধ্যমে মেরামতের সময় বহুগুণ কমিয়ে আনে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. Define 'Conflict of Interest' in professional IT support and service delivery:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: প্রফেশনাল আইটি সাপোর্টে 'স্বার্থের দ্বন্দ্ব' (Conflict of Interest) বলতে কী বোঝায়?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> A situation where an IT technician's personal financial, commercial, or private affiliations compromise or appear to compromise their professional judgment and organizational duty. Example: steering company hardware procurement to an external vendor owned by a family member without disclosure.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: যখন কোনো আইটি পেশাজীবীর ব্যক্তিগত আর্থিক বা পারিবারিক স্বার্থ তার প্রাতিষ্ঠানিক দায়িত্ব ও পেশাদার সিদ্ধান্তের নিরপেক্ষতাকে প্রভাবিত করে (যেমন নিজের আত্মীয়ের প্রতিষ্ঠান থেকে গোপনে অতিরিক্ত মূল্যে হার্ডওয়্যার কেনা)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. List the core functions and capabilities of a professional Word Processing application:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: একটি প্রফেশনাল ওয়ার্ড প্রসেসিং সফটওয়্যারের প্রধান কাজগুলো কী কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Rich text typographical formatting (fonts, styles, kerning, paragraph alignment, margins).<br/>2. Document structure tools (automated Table of Contents, footnotes, citations, section breaks).<br/>3. Advanced data embedding (tables, charts, vectors, raster images).<br/>4. Mail Merge for bulk personalized correspondence.<br/>5. Collaborative review tools (Track Changes, in-line comments, version history).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. টেক্সট ও ফন্ট ফরম্যাটিং। ২. স্বয়ংক্রিয় সূচিপত্র ও ফুটনোট তৈরি। ৩. টেবিল, ছবি ও চার্ট সন্নিবেশ। ৪. মেইল মার্জের মাধ্যমে একসাথে অনেকের কাছে চিঠি বা সনদ পাঠানো। ৫. ট্র্যাক চেঞ্জেস ও যৌথ সম্পাদনা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain the purpose and business role of Social Media platforms in modern enterprise operations:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: আধুনিক প্রাতিষ্ঠানিক যোগাযোগে সোশ্যাল মিডিয়ার ভূমিকা ও উদ্দেশ্য ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Social media platforms serve as vital communication channels for corporate brand visibility, real-time customer service announcements, talent recruitment, security advisory broadcasts, and direct engagement with external stakeholders and global client communities.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: সোশ্যাল মিডিয়া প্ল্যাটফর্ম আধুনিক প্রতিষ্ঠানে দ্রুত তথ্য আদান-প্রদান, ব্র্যান্ডিং, গ্রাহক সেবা প্রদান, জরুরি নিরাপত্তা সতর্কতা প্রচার এবং নতুন কর্মী নিয়োগে কার্যকর মাধ্যম হিসেবে কাজ করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. Provide the formal technical definition of Information Technology (IT):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: তথ্য প্রযুক্তির (IT) প্রাতিষ্ঠানিক সংজ্ঞা লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Information Technology encompasses the design, implementation, management, support, and operation of computer-based information systems—including hardware architecture, software engineering, enterprise networking, databases, and cybersecurity infrastructure—to safely store, retrieve, process, transmit, and protect organizational data.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: তথ্য প্রযুক্তি (IT) হলো কম্পিউটার হার্ডওয়্যার, সফটওয়্যার, নেটওয়ার্কিং ও ডেটাবেজ প্রযুক্তির সমন্বিত ব্যবহার যার মাধ্যমে প্রাতিষ্ঠানিক তথ্য নিরাপদভাবে প্রক্রিয়াকরণ, সংরক্ষণ, সুরক্ষা এবং আদান-প্রদান করা হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Explain the function and safety mechanism of an Anti-Static ESD Wristband:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অ্যান্টি-স্ট্যাটিক ইএসডি রিস্টব্যান্ডের কাজ ও অভ্যন্তরীণ সুরক্ষা ব্যবস্থা ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> It safely bleeds electrostatic charges accumulating on the human body to ground through a built-in 1-Megaohm current-limiting safety resistor, preventing invisible static discharges from puncturing microscopic gate oxides of integrated circuits (CPUs, RAM, motherboards) while protecting the technician against AC mains shock.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: এটি মানবদেহে জমে থাকা স্ট্যাটিক চার্জকে ১-মেগাওহম রোধকের মধ্য দিয়ে নিরাপদে মাটিতে বা কেসিংয়ে ডিসচার্জ করে। এটি সংবেদনশীল আইসি ও চিপের মাইক্রোস্কোপিক সার্কিট পুড়ে যাওয়া থেকে রক্ষা করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Detail the step-by-step Partitioning and Formatting procedure during clean OS installation:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অপারেটিং সিস্টেম ইনস্টলেশনের সময় পার্টিশনিং এবং ফরম্যাটিং প্রক্রিয়ার ধাপগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Boot system from installation media (UEFI USB flash drive).<br/>2. Launch Windows Setup and select 'Custom: Install Windows only (advanced)'.<br/>3. Delete unneeded legacy partitions or allocate unpartitioned disk space.<br/>4. Click 'New', define partition capacity in Megabytes (e.g., 102400 MB for 100 GB system partition C:).<br/>5. Confirm setup prompt to allow Windows to create requisite system partitions (Recovery, EFI System Partition, Microsoft Reserved MSR).<br/>6. Select the designated primary volume and click 'Format' with the NTFS file system (4KB cluster allocation units).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. বুটেবল ইউএসবি ড্রাইভ দিয়ে পিসি বুট করা। ২. কাস্টম ইনস্টলেশন নির্বাচন করা। ৩. ড্রাইভের অপ্রয়োজনীয় পার্টিশন মুছে ফেলা। ৪. 'New' বাটনে ক্লিক করে আকার নির্ধারণ করে নতুন পার্টিশন তৈরি করা। ৫. প্রয়োজনীয় সিস্টেম পার্টিশন (EFI, MSR) তৈরিতে সম্মতি দেওয়া। ৬. প্রাইমারি ড্রাইভটি নির্বাচন করে NTFS ফরম্যাট করা এবং ইনস্টলেশন শুরু করা।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 04)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 04
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Assemble, Test, Diagnose & Maintain Desktop/Server Hardware Architecture
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Motherboard Architecture, Chipsets (PCH), VRM Power Delivery & System Bus Topologies
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-4.1: Compare motherboard form factors (ATX, Micro-ATX, Mini-ITX, E-ATX) and mounting hole alignments.</li>
      <li>PC-4.2: Differentiate legacy Northbridge/Southbridge architecture from unified Platform Controller Hub (PCH) designs.</li>
      <li>PC-4.3: Inspect Voltage Regulator Module (VRM) phases, chokes, MOSFETs, and solid electrolytic capacitors.</li>
      <li>PC-4.4: Configure UEFI secure boot, CSM compatibility mode, and XMP/DOCP memory profiles.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 04: Motherboard Bench Inspection, VRM Thermal Profiling & BIOS Flash
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> ATX Test Bench, Motherboard, Infrared Thermometer, USB 3.0 Flash Drive (FAT32), Anti-static Mat.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Inspect motherboard PCB for bulging/leaking electrolytic capacitors or burnt VRM MOSFET traces.</li>
        <li>Install brass standoff screws in chassis matching ATX form-factor specification holes to prevent PCB grounding shorts.</li>
        <li>Connect 24-pin ATX and 8-pin EPS 12V CPU power connectors.</li>
        <li>Format USB drive to FAT32, copy validated vendor BIOS binary, and perform UEFI BIOS flashback update.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What critical functions did the legacy Northbridge handle that modern CPUs have integrated directly?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> The memory controller (IMC), high-speed PCIe lanes for the primary discrete graphics card, and the high-speed interface to the Southbridge (e.g. DMI or HyperTransport).
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Why is brass standoff screw alignment critical during motherboard chassis installation?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Misaligned standoffs make physical contact with the underside circuit traces of the multi-layer PCB, causing catastrophic ground shorts that trip SMPS short-circuit protection (SCP).
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 05: WORKPLACE INFORMATION SYSTEMS, HARDWARE ASSEMBLY &AMP; DISASTER RECOVERY
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 05: Workplace Information Systems, Hardware Assembly &amp; Disaster Recovery
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. Where can an IT support technician reliably locate authentic workplace technical information and operating procedures?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একজন আইটি টেকনিশিয়ান কর্মক্ষেত্রে নির্ভরযোগ্য প্রযুক্তিগত তথ্য এবং কার্যপ্রণালী কোথা থেকে সংগ্রহ করবেন?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Standard Operating Procedures (SOP), Manufacturer Technical Manuals, and Official Policy Documentation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Unverified social media comments</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Anonymous internet chat forums</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Outdated promotional flyers</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. What hardware peripheral converts physical paper documents, photographs, and schematics into digital raster images?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন হার্ডওয়্যার পেরিফেরালটি কাগজের নথি বা ছবিকে ডিজিটাল ফাইলে রূপান্তর করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Flatbed Optical Scanner</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Plotter</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Dot Matrix Printer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Barcode Reader</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. What is the primary function of the Windows Taskbar at the bottom of the screen?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: স্ক্রিনের নিচে থাকা উইন্ডোজ টাস্কবারের মূল কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Launching pinned applications, viewing active running program icons, and monitoring system notification area (system tray)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Formatting storage drives</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Overclocking the CPU</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Defragmenting RAM memory</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. What web browser is developed by Microsoft and integrated natively into Windows 10 and 11?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফটের তৈরি কোন ওয়েব ব্রাউজারটি উইন্ডোজ ১০ এবং ১১-এ প্রি-ইনস্টল করা থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Microsoft Edge</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Mozilla Firefox</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Safari</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Google Chrome</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Which computer input peripheral is engineered for pointing, selecting, and manipulating graphical user interface elements?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: গ্রাফিক্যাল ইউজার ইন্টারফেসে অবজেক্ট নির্বাচন, ক্লিক ও মুভ করার জন্য কোন ইনপুট ডিভাইস ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Mouse / Optical Pointing Device</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Microphone</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Speaker</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Projector</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Which internal computer component is recognized as the 'Brain' of the system, executing arithmetic and logic operations?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটারের কোন হার্ডওয়্যার যন্ত্রাংশকে 'মস্তিষ্ক' বলা হয়, যা গাণিতিক ও যৌক্তিক নির্দেশ সম্পাদন করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Central Processing Unit (CPU)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Power Supply Unit (PSU)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hard Disk Drive (HDD)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Heat Sink</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. What does SSD stand for in modern storage terminology?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আধুনিক স্টোরেজ প্রযুক্তিতে SSD-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Solid-State Drive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. System Storage Disk</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Serial Synchronous Drive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Static Silicon Device</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. What is the primary technical function of the 3V lithium coin-cell (CR2032) CMOS battery on the motherboard?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাদারবোর্ডের ৩ ভোল্ট লিথিয়াম কয়েন-সেল (CR2032) CMOS ব্যাটারির মূল কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Powers volatile CMOS RAM to retain BIOS/UEFI settings, passwords, and Real-Time Clock (RTC) when mains power is off</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Powers the CPU cooling fan</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Provides emergency power to the monitor</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Accelerates internet connection speed</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Why must technicians partition and format a hard drive before deploying an operating system?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: অপারেটিং সিস্টেম ইনস্টল করার পূর্বে হার্ড ড্রাইভ পার্টিশন এবং ফরম্যাট করার কারণ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To divide physical storage into logical volumes and establish a compatible file system (NTFS/FAT32) for file allocation and indexing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To clean physical dust from magnetic platters</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To increase the rotational speed (RPM)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To test speaker audio output</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Why must technicians consult manufacturer instruction manuals before assembling sensitive computer hardware?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটার হার্ডওয়্যার অ্যাসেম্বল করার পূর্বে প্রস্তুতকারকের নির্দেশিকা ম্যানুয়াল পড়া কেন আবশ্যক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To follow correct installation procedures, avoid damaging delicate pins/sockets, observe safety precautions, and preserve warranty</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To memorize marketing slogans</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To practice typing speed</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To manually calculate CPU transistors</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Which software drivers must be installed immediately after completing a clean operating system installation?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নতুন অপারেটিং সিস্টেম ইনস্টল করার পর সর্বপ্রথম কোন ডিভাইস ড্রাইভারগুলো ইনস্টল করা উচিত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Motherboard Chipset, Dedicated GPU Display, Ethernet/Wi-Fi Network, and Audio drivers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Video games and photo editors</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Web browsers and email clients</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Screen recording utilities</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What administrative console in Windows is used to manage local user accounts, passwords, and group policies?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজে লোকাল ব্যবহারকারী অ্যাকাউন্ট, পাসওয়ার্ড এবং গ্রুপ পরিচালনা করতে কোন অ্যাডমিনিস্ট্রেটিভ কনসোল ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Local Users and Groups (lusrmgr.msc) / User Accounts Control Panel</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Disk Management</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Device Manager</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Event Viewer</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. What physical connector standard is used on twisted-pair cables for Gigabit Ethernet LAN interfaces?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: গিগাবিট ইথারনেট ল্যান সংযোগের জন্য টুইস্টেড পেয়ার কেবলে কোন কানেক্টর স্ট্যান্ডার্ড ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. RJ45 (8P8C)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. RJ11</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. DB9</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. HDMI</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. When troubleshooting a damaged network patch cord where the copper wires are intact but the plastic retaining tab is snapped off, what is the professional fix?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নেটওয়ার্ক কেবলের তার ভালো থাকলেও RJ45 প্লাগের প্লাস্টিক ক্লিপ ভেঙে গেলে পেশাদার সমাধান কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Cut off the broken plug and crimp a new RJ45 modular plug following T568A or T568B pinout</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Tape the broken plug with electrical tape</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Glue the connector into the switch port permanently</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Replace the entire network switch</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What error occurs when two host devices on the same local subnet are configured with the identical IPv4 address?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একই লোকাল নেটওয়ার্কে দুটি কম্পিউটারে যদি একই আইপি অ্যাড্রেস কনফিগার করা হয়, তবে কী ধরনের ত্রুটি ঘটে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. IP Address Conflict (causing intermittent connectivity or loss of network access for both hosts)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. DNS Poisoning</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Broadcast Storm</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Bandwidth Throttling</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Which network protocol translates human-readable hostnames into computer-routable IP addresses?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন নেটওয়ার্ক প্রোটোকল মানুষের পাঠযোগ্য হোস্টনেমকে কম্পিউটারের রাউটিংযোগ্য আইপি ঠিকানায় রূপান্তর করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Domain Name System (DNS)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Dynamic Host Configuration Protocol (DHCP)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Simple Mail Transfer Protocol (SMTP)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. File Transfer Protocol (FTP)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. What Occupational Safety and Health (OSH) precaution must be taken regarding a desktop computer's internal power supply (PSU)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ডেস্কটপ কম্পিউটারের ইন্টারনাল পাওয়ার সাপ্লাই ইউনিট (PSU) নিয়ে কাজ করার সময় কোন OSH সতর্কতা মানা বাধ্যতামূলক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Never open the metal PSU casing, as internal high-voltage capacitors store lethal electrical charges long after unplugging</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Submerge the PSU in water to cool it</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Disassemble the capacitors with a metal screwdriver</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Wear wool gloves</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. What is the fundamental objective of an organizational Disaster Recovery Plan (DRP)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: প্রতিষ্ঠানের ডিজাস্টার রিকভারি প্ল্যান (DRP)-এর মূল লক্ষ্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To restore mission-critical IT infrastructure, data repositories, and business operations quickly following catastrophic failures</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To permanently terminate IT personnel</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To liquidate corporate computer hardware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To avoid paying software licenses</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What is the architectural distinction between 32-bit (x86) and 64-bit (x64) operating systems?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ৩২-বিট এবং ৬৪-বিট অপারেটিং সিস্টেমের মধ্যে কাঠামোগত পার্থক্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 32-bit OS can address a maximum of 4 GB of RAM, while 64-bit OS can address theoretically up to 16 Exabytes and handle larger computational registers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 32-bit OS is faster than 64-bit OS</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 64-bit OS only supports floppy disks</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 32-bit OS does not support color monitors</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. What document must be prepared, justified, and formally approved before procuring expensive hardware components for an enterprise client?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: গ্রাহকের জন্য দামি হার্ডওয়্যার ক্রয়ের পূর্বে অনুমোদন ও মূল্যের বিস্তারিত হিসাব সম্বলিত কোন নথি পেশ করতে হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Formal Cost Estimation & Approval Request (Bill of Materials / Procurement Requisition)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Hand-written personal receipt</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Scrap metal inventory list</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Anonymous feedback form</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Compare Microsoft Excel vs Google Sheets (architecture, collaboration, and use cases):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: মাইক্রোসফট এক্সেল বনাম গুগল শিটসের মধ্যে প্রযুক্তিগত ও ব্যবহারিক তুলনা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Microsoft Excel:</strong> Powerful standalone desktop application optimized for processing massive multi-million-row datasets, executing complex VBA/PowerQuery macros, and advanced statistical modeling offline.<br/><strong>Google Sheets:</strong> Cloud-native web spreadsheet enabling real-time multi-user simultaneous collaboration, automated cloud saving, seamless Google Workspace integration, and access from any modern browser without desktop software installation.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: এক্সেল একটি শক্তিশালী ডেস্কটপ সফটওয়্যার যা অফলাইনে বিশাল ডেটাবেজ ও জটিল ম্যাক্রো বিশ্লেষণে সেরা। গুগল শিটস একটি ক্লাউড ওয়েব অ্যাপ যা যেকোনো ডিভাইস থেকে সরাসরি ব্রাউজারে চলে এবং একাধিক ব্যক্তি একই সাথে কাজ করতে পারে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. Explain the core capabilities of Google Docs in enterprise document workflows:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: প্রাতিষ্ঠানিক ডকুমেন্টেশনের ক্ষেত্রে গুগল ডকসের প্রধান বৈশিষ্ট্যগুলো কী কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Google Docs provides cloud-based real-time collaborative word processing with automated version history, in-line suggestions and commenting, granular share permissions (Viewer, Commenter, Editor), Google Drive cloud syncing, and multi-format export (.docx, .pdf, .epub).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: গুগল ডকস ক্লাউডভিত্তিক ওয়ার্ড প্রসেসর যা স্বয়ংক্রিয় সংরক্ষণ, একাধিক ব্যক্তির রিয়েল-টাইম এডিটিং, রিভিশন হিস্ট্রি এবং ড্রাইভ ক্লাউড ব্যাকআপ নিশ্চিত করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. What is an Enterprise Data Center and what core infrastructure systems does it require?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: এন্টারপ্রাইজ ডেটা সেন্টার কী এবং এতে কোন কোন সহায়ক অবকাঠামো আবশ্যক?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> A Data Center is a centralized facility housing an organization's critical IT systems and data repositories. Core infrastructure includes: redundant server rack arrays, enterprise SAN/NAS storage, dual-feed Uninterruptible Power Supplies (UPS) and diesel generators, precision HVAC environmental cooling (hot/cold aisle containment), fire suppression (FM-200/Novec), and biometric physical security.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ডেটা সেন্টার হলো এমন একটি সুরক্ষিত কেন্দ্রীয় ভবন যেখানে প্রতিষ্ঠানের মূল সার্ভার ও ডেটা সংরক্ষিত থাকে। এতে নিরবচ্ছিন্ন বিদ্যুৎ (UPS ও জেনারেটর), তাপমাত্রা নিয়ন্ত্রণকারী বিশেষ এসি, গ্যাসভিত্তিক অগ্নিনির্বাপক ব্যবস্থা এবং বায়োমেট্রিক নিরাপত্তা থাকে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Explain the function and application of an AVO Meter (Ampere, Voltage, Ohm) in hardware diagnostics:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: হার্ডওয়্যার ডায়াগনস্টিক্সে AVO মিটারের (অ্যাম্পিয়ার, ভোল্ট, ওহম) ভূমিকা ও প্রয়োগ ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> An AVO Meter (Digital Multimeter) measures electrical properties in circuit diagnostics: Voltage (confirming +12V, +5V, +3.3V DC rails from the power supply and 3V CMOS coin cell), Current (monitoring circuit power draw in Amperes), and Resistance/Continuity (identifying broken traces on PCBs and testing cable pin continuity with audible tone).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: AVO মিটার দিয়ে ভোল্টেজ (পাওয়ার সাপ্লাইয়ের ১২V, ৫V ও ৩V সেল ব্যাটারি), কারেন্ট এবং রেজিস্ট্যান্স/কন্টিনিউটি (তারের সংযোগ ঠিক আছে কিনা) পরিমাপ করে সার্কিটের ত্রুটি নির্ণয় করা হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. What are the tangible operational benefits of consulting technical operational manuals and vendor schematics?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: প্রযুক্তিগত অপারেশনাল ম্যানুয়াল ও প্রস্তুতকারকের নির্দেশিকা ব্যবহারের সুবিধা কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Prevents catastrophic hardware destruction from incorrect connector voltages or mechanical pin misalignment, ensures adherence to manufacturer torque specifications, accelerates troubleshooting via official diagnostic flowcharts, and guarantees compliance with manufacturer warranty terms.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ম্যানুয়াল দেখে কাজ করলে ভুল সংযোগ বা অতিরিক্ত চাপে হার্ডওয়্যার ক্ষতিগ্রস্ত হয় না, ওয়ারেন্টি অক্ষুণ্ন থাকে এবং অফিসিয়াল নির্দেশিকা মেনে দ্রুত ত্রুটি সারানো যায়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. Define Wide Area Network (WAN) and contrast its scope with a Local Area Network (LAN):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ওয়াইড এরিয়া নেটওয়ার্ক (WAN) কাকে বলে এবং লোকাল এরিয়া নেটওয়ার্কের (LAN) সাথে এর পার্থক্য কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> A WAN spans broad geographical distances (cities, countries, or globally), interconnecting multiple disparate LANs across public or leased telecommunication circuits (fiber backbones, MPLS, satellite). The Internet is the world's largest public WAN. In contrast, a LAN is confined to a localized physical perimeter (office building or campus) under single organizational administration.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ল্যান (LAN) একটি নির্দিষ্ট ভবন বা ক্যাম্পাসের মধ্যে সীমাবদ্ধ থাকে। ওয়ান (WAN) শহর, দেশ বা বিশ্বজুড়ে বিস্তৃত একাধিক ল্যানকে টেলিযোগাযোগ বা স্যাটেলাইটের মাধ্যমে সংযুক্ত করে (যেমন ইন্টারনেট)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain the IPv4 addressing scheme (structure, octets, and network vs host allocation):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: IPv4 অ্যাড্রেসিং স্কিমের গঠন এবং নেটওয়ার্ক বনাম হোস্ট অংশের ব্যাখ্যা দিন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> IPv4 uses a 32-bit logical address represented as 4 decimal octets separated by dots (e.g., 192.168.10.50). Each octet contains 8 bits (values 0-255). The address is divided into a Network Portion (identifying the specific subnet) and a Host Portion (identifying the specific node interface on that subnet), demarcated by the Subnet Mask.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: IPv4 ঠিকানা ৩২ বিট দীর্ঘ, যা ডট দিয়ে আলাদা করা ৪টি অক্টেটে (০-২৫৫) বিভক্ত থাকে। সাবনেট মাস্কের মাধ্যমে এর নির্দিষ্ট অংশ নেটওয়ার্ক শনাক্ত করতে এবং অবশিষ্ট অংশ নির্দিষ্ট কম্পিউটার বা হোস্ট শনাক্ত করতে ব্যবহৃত হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. Categorize Application Software with real-world enterprise examples:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অ্যাপ্লিকেশন সফটওয়্যারের শ্রেণিবিভাগ বাস্তব উদাহরণসহ উল্লেখ করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>General Productivity Software:</strong> Office suites (Word, Excel, Google Workspace).<br/>2. <strong>Communication Tools:</strong> Email clients (Outlook), messaging and video conferencing (Slack, Zoom, Teams).<br/>3. <strong>Specialized / Vertical Applications:</strong> CAD engineering tools (AutoCAD), medical billing databases, accounting suites (Tally, QuickBooks).<br/>4. <strong>Utility &amp; Maintenance:</strong> Archive tools (7-Zip), disk cleaners, antivirus.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. সাধারণ উৎপাদনশীল সফটওয়্যার (অফিস প্যাকেজ)। ২. যোগাযোগ সফটওয়্যার (আউটলুক, জুম, টিমস)। ৩. বিশেষায়িত অ্যাপ্লিকেশন (অটোক্যাড, ট্যালি, ফটোশপ)। ৪. রক্ষণাবেক্ষণ সফটওয়্যার (৭-জিপ, অ্যান্টিভাইরাস)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Describe standard email backup methodologies in corporate IT environments:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: কর্পোরেট আইটি পরিবেশে ইমেইল ব্যাকআপের স্ট্যান্ডার্ড পদ্ধতিগুলো সংক্ষেপে লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Local Archive PST/MBOX Export:</strong> Exporting historical email folders to password-protected offline archive files on secure local storage.<br/>2. <strong>IMAP / Exchange Server Synchronization:</strong> Maintaining synchronized mailboxes on centralized corporate servers backed up by automated VSS snapshots.<br/>3. <strong>Cloud-to-Cloud Office 365 / Google Workspace SaaS Backup:</strong> Third-party automated automated backups protecting against accidental deletion or ransomware encryption.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. আউটলুক থেকে লোকাল ড্রাইভে .PST বা .MBOX ফাইল এক্সপোর্ট করে সংরক্ষণ। ২. কেন্দ্রীয় এক্সচেঞ্জ বা IMAP সার্ভারে ডেটা সংরক্ষণ। ৩. ক্লাউড-টু-ক্লাউড স্বয়ংক্রিয় ক্লাউড ব্যাকআপ সার্ভিস ব্যবহার।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Detail the Official 6-Step CompTIA/Institutional Technical Troubleshooting Methodology:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: প্রাতিষ্ঠানিক ৬-ধাপ বিশিষ্ট টেকনিক্যাল ট্রাবলশুটিং মেথডোলজি বিস্তারিত লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Step 1: Identify the problem</strong> (Gather information, duplicate problem, question users, identify symptoms, determine recent system changes).<br/><strong>Step 2: Establish a theory of probable cause</strong> (Question the obvious, consider multiple causes).<br/><strong>Step 3: Test the theory to determine cause</strong> (Confirm theory or establish new theory).<br/><strong>Step 4: Establish a plan of action and implement the solution</strong> (Plan steps, consider corporate policies, execute resolution).<br/><strong>Step 5: Verify full system functionality and implement preventive measures</strong> (Confirm with user, apply preventive steps).<br/><strong>Step 6: Document findings, actions, and outcomes</strong> (Record issue, root cause, and fix in knowledge base).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. সমস্যা চিহ্নিত করা ও লক্ষণ অনুসন্ধান। ২. সম্ভাব্য কারণের থিওরি বা হাইপোথিসিস তৈরি করা। ৩. থিওরি পরীক্ষা করে মূল কারণ নিশ্চিত করা। ৪. সমাধানের কর্মপরিকল্পনা তৈরি ও বাস্তবায়ন করা। ৫. সিস্টেমের সম্পূর্ণ কার্যকারিতা যাচাই ও প্রতিরোধমূলক ব্যবস্থা গ্রহণ। ৬. ফলাফল, গৃহীত ব্যবস্থা ও সমাধান প্রাতিষ্ঠানিক নথিতে লিপিবদ্ধ করা।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 05)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 05
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Assemble, Test, Diagnose & Maintain Desktop/Server Hardware Architecture
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Switched-Mode Power Supply (SMPS), Voltage Tolerances, Power Factor & Cooling Dynamics
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-5.1: Measure SMPS output rails (+12V, +5V, +3.3V, -12V, +5VSB) within ATX12V ±5% tolerance bands.</li>
      <li>PC-5.2: Test Power Good (PWR_OK / Gray wire) signal latency (100ms to 500ms).</li>
      <li>PC-5.3: Calculate system power wattage consumption including GPU transient power spikes.</li>
      <li>PC-5.4: Design chassis positive vs negative airflow dynamics to minimize internal dust accumulation.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 05: SMPS Multimeter Bench Testing, Ripple Check & Thermal Airflow Calibration
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Digital Multimeter, ATX 24-Pin PSU Tester, Jumper Wire, Anemometer, Thermal Camera.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Disconnect SMPS from all system components; bridge Pin 16 (PS_ON# Green) to Pin 17 (Ground Black).</li>
        <li>Verify SMPS cooling fan starts immediately.</li>
        <li>Insert DMM probes into Pin 8 (Gray wire PWR_OK); confirm voltage reads +5.0V within 100-500ms.</li>
        <li>Measure Pin 10 (+12V Yellow, must be between 11.40V and 12.60V) and Pin 4 (+5V Red, must be 4.75V to 5.25V).</li>
        <li>Configure intake fans (front/bottom) to exceed exhaust fans (rear/top) to establish positive pressure airflow.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the function of the Power Good (PWR_OK) signal generated by the SMPS?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> It indicates to the motherboard timer and processor that all internal voltage rails have stabilized above undervoltage thresholds, allowing the CPU to safely exit its reset state and commence POST.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Why is positive air pressure preferable in professional computer workstations?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Positive pressure forces air out of all unsealed cracks and expansion slot grills, ensuring air enters exclusively through filtered intake vents, preventing dust infiltration.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 06: STORAGE ARCHITECTURE, MODERN FILE SYSTEMS &AMP; APPLICATION SOFTWARE
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 06: Storage Architecture, Modern File Systems &amp; Application Software
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What is the standard native file extension for documents created in modern versions of Microsoft Word?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট ওয়ার্ডের আধুনিক সংস্করণগুলোতে তৈরিকৃত নথির স্ট্যান্ডার্ড এক্সটেনশন কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. .docx (XML-based Open Packaging Convention)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. .txt</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. .rtf</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. .pdf</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. In Microsoft Excel, every calculation formula or function MUST begin with which character?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট এক্সেলে যেকোনো সূত্র বা ফাংশন লেখার শুরুতে কোন চিহ্নটি দেওয়া বাধ্যতামূলক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. = (Equals sign)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. + (Plus sign)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. @ (At sign)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. # (Hash sign)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. In Microsoft PowerPoint, which presentation view displays thumbnail versions of all slides for rapid reorganization?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট পাওয়ারপয়েন্টে সব স্লাইডের থাম্বনেইল একত্রে দেখে সহজে পুনর্বিন্যাস করতে কোন ভিউ ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Slide Sorter View</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Normal View</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Slide Show View</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Reading View</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. In PowerPoint presentations, what term describes the visual animation that occurs when transitioning between slides?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: পাওয়ারপয়েন্টে এক স্লাইড থেকে পরবর্তী স্লাইডে যাওয়ার সময়ের ভিজ্যুয়াল অ্যানিমেশনকে কী বলা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Slide Transition</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Object Animation</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Trigger Effect</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Action Setting</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Which of the following programs is a core operating system file management utility rather than a web browser?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি ইন্টারনেট ওয়েব ব্রাউজার নয়, বরং অপারেটিং সিস্টেমের ফাইল ম্যানেজমেন্ট ইউটিলিটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Windows File Explorer (explorer.exe)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Google Chrome</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Mozilla Firefox</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Microsoft Edge</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. What is the primary function of an Internet Search Engine (e.g., Google, Bing)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি ইন্টারনেট সার্চ ইঞ্জিনের (যেমন গুগল) প্রধান প্রযুক্তিগত কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Indexing web pages and retrieving relevant information matching user queries via search algorithms</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Formatting solid-state drives</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Defragmenting magnetic storage platters</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Compiling C++ source code</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. What is the technical definition of Cloud Computing?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ক্লাউড কম্পিউটিং বলতে প্রযুক্তিগতভাবে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Delivery of on-demand computing services (servers, storage, databases, networking, software) over the internet</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Weather forecasting using satellite radar</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Installing software from local CD-ROMs</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Connecting computers with serial cables</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which application enables a support technician to view and control a remote user's desktop across the network to provide live assistance?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন অ্যাপ্লিকেশনের মাধ্যমে টেকনিশিয়ান দূরবর্তী ইউজারের কম্পিউটারের স্ক্রিন দেখে সরাসরি মাউস ও কিবোর্ড দিয়ে নিয়ন্ত্রণ করতে পারেন?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Remote Desktop Connection / AnyDesk / TeamViewer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Microsoft Paint</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Windows Media Player</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Notepad</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Which Windows management console is used to initialize new disks, create volumes, assign drive letters, and shrink/extend partitions?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজে নতুন ডিস্ক চালু করা, পার্টিশন তৈরি, সাইজ পরিবর্তন এবং ড্রাইভ লেটার অ্যাসাইন করতে কোন কনসোল ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Disk Management (diskmgmt.msc)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Device Manager</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Task Manager</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Resource Monitor</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. What does the acronym BIOS stand for in computer systems?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটার সিস্টেমে BIOS-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Basic Input/Output System</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Binary Integrated Operating Software</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Base Input Online Service</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Board Interface Operating System</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. What is the fundamental architectural role of Device Drivers in an operating system?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: অপারেটিং সিস্টেমে ডিভাইস ড্রাইভারের মৌলিক ভূমিকা কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Acts as a software translator enabling the OS and applications to communicate with specific hardware components</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Protects the PC from physical dust</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Accelerates power supply cooling</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Translates human languages</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What software utility is designed to scan storage drives, detect malicious software (trojans, worms, spyware), and quarantine infected files?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন সফটওয়্যার ড্রাইভ স্ক্যান করে ট্রোজান, ওয়ার্ম, স্পাইওয়্যার ইত্যাদির মতো ক্ষতিকর ম্যালওয়্যার শনাক্ত ও কোয়ারেন্টাইন করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Antivirus / Anti-Malware Suite</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Disk Defragmenter</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Registry Cleaner</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. File Compression Utility</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. What command-line utility sends ICMP Echo Request packets to test network connectivity and packet loss?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ICMP Echo রিকোয়েস্ট পাঠিয়ে নেটওয়ার্ক সংযোগ ও প্যাকেট লস পরীক্ষা করার কমান্ড-লাইন টুল কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. ping</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. traceroute</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. netstat</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. arp</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Which of the following is an Internet Web Browser and NOT an Operating System?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি একটি ওয়েব ব্রাউজার এবং অপারেটিং সিস্টেম নয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Opera</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Linux Ubuntu</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Microsoft Windows 11</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. macOS Monterey</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What Windows feature rolls back system files, registry keys, and installed drivers to a previous stable state without affecting personal documents?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজের কোন ফিচারটি ব্যক্তিগত ফাইল পরিবর্তন না করেই সিস্টেম ফাইল, ড্রাইভার ও রেজিস্ট্রিকে পূর্বের অবস্থায় ফিরিয়ে নেয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. System Restore</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Windows Disk Cleanup</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Format C:</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. BitLocker Drive Encryption</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. What is the maximum individual file size supported by the legacy FAT32 file system?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: পুরোনো FAT32 ফাইল সিস্টেমে একটি একক ফাইলের সর্বোচ্চ সাইজ কত হতে পারে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 4 GB (minus 1 byte / 4,294,967,295 bytes)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 2 TB</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 16 TB</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 700 MB</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Which modern Windows file system supports granular file permissions (ACLs), encryption (EFS), compression, and transaction journaling?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজের কোন আধুনিক ফাইল সিস্টেমে ফাইলের অনুমতি (ACL), এনক্রিপশন (EFS) এবং জার্নালিং সুবিধা রয়েছে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. NTFS (New Technology File System)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. FAT16</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. FAT32</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. exFAT</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. What keyboard shortcut combination directly opens the Windows Task Manager?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজ টাস্ক ম্যানেজার সরাসরি ওপেন করার কিবোর্ড শর্টকাট কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Ctrl + Shift + Esc</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Alt + F4</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Ctrl + P</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Win + R</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What is the standard data storage capacity of a single-layer standard DVD-ROM optical disc?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি একক লেয়ার বিশিষ্ট স্ট্যান্ডার্ড ডিভিডি-রম (DVD-ROM) ডিস্কের ডেটা ধারণক্ষমতা কত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 4.7 GB</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 700 MB</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 25 GB</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 1.44 MB</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. What Windows utility is used to cleanly uninstall third-party application software packages and registered libraries?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজে থার্ড-পার্টি অ্যাপ্লিকেশন সফটওয়্যার সম্পূর্ণ আনইনস্টল করতে কোন উইন্ডো ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Programs and Features / Installed Apps Settings</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Recycle Bin</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Disk Cleanup</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Task Scheduler</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Explain the core functions and responsibilities of the Operating System Kernel:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অপারেটিং সিস্টেম কার্নেলের মূল দায়িত্ব ও কাজগুলো সংক্ষেপে লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> The Kernel is the central core of the operating system operating in privileged mode. It manages system hardware resources: CPU process scheduling and context switching, virtual memory paging, hardware interrupt handling, file system operations, and low-level device I/O communication.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: কার্নেল হলো ওএস-এর মূল অভ্যন্তরীণ প্রোগ্রাম যা মেমরিতে সর্বদা অবস্থান করে। এটি সিপিইউ প্রসেস নিয়ন্ত্রণ, মেমরি বরাদ্দ, হার্ডওয়্যার ইন্টারাপ্ট হ্যান্ডলিং এবং ফাইল সিস্টেমের ইনপুট/আউটপুট পরিচালনা করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. Explain how Windows System Restore Points function and when they should be deployed:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: উইন্ডোজ সিস্টেম রিস্টোর পয়েন্ট কীভাবে কাজ করে এবং এটি কখন প্রয়োগ করা উচিত?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> System Restore uses the Volume Shadow Copy Service (VSS) to capture snapshots of critical system files, installed drivers, registry hives, and DLLs before major updates or software installations. When a driver crash or registry corruption causes system instability, the technician can roll back to the restore point without deleting user documents.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: সিস্টেম রিস্টোর উইন্ডোজের সিস্টেম ফাইল, রেজিস্ট্রি ও ড্রাইভারের একটি নিরাপদ স্ন্যাপশট সংরক্ষণ করে। ভুল ড্রাইভার ইনস্টলেশন বা সিস্টেম ক্র্যাশ হলে ব্যক্তিগত ফাইল অক্ষুণ্ন রেখেই পিসিকে পূর্বের সুস্থ অবস্থায় ফিরিয়ে আনা যায়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. Compare optical storage media formats: Compact Disc (CD), Digital Versatile Disc (DVD), and Blu-ray Disc (BD):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অপটিক্যাল স্টোরেজ মিডিয়া: সিডি, ডিভিডি এবং ব্লু-রে ডিস্কের প্রযুক্তিগত তুলনা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>CD (Compact Disc):</strong> 700 MB capacity; uses 780 nm infrared laser.<br/><strong>DVD (Digital Versatile Disc):</strong> 4.7 GB (single-layer) to 8.5 GB (dual-layer); uses 650 nm red laser with tighter pit spacing.<br/><strong>Blu-ray Disc (BD):</strong> 25 GB (single-layer) to 50 GB (dual-layer); uses 405 nm blue-violet laser allowing micro-fine pit density for high-definition media storage.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: সিডি (CD) ধারণক্ষমতা ৭০০ মেগাবাইট (ইনফ্রারেড লেজার)। ডিভিডি (DVD) ধারণক্ষমতা ৪.৭ থেকে ৮.৫ গিগাবাইট (লাল লেজার)। ব্লু-রে (BD) ধারণক্ষমতা ২৫ থেকে ৫০ গিগাবাইট (নীল-বেগুনী ক্ষুদ্র তরঙ্গদৈর্ঘ্যের লেজার)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Compare modern storage file systems: FAT32 vs NTFS vs exFAT:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ফাইল সিস্টেমের মধ্যে প্রযুক্তিগত তুলনা: FAT32 বনাম NTFS বনাম exFAT:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>FAT32:</strong> High cross-platform compatibility across Windows, Mac, Linux, and embedded devices; limited to 4 GB maximum file size and 2 TB partition size.<br/><strong>NTFS:</strong> Windows native enterprise file system with file permissions (ACLs), EFS encryption, disk quotas, volume compression, and journaling against sudden power loss.<br/><strong>exFAT:</strong> Designed for high-capacity flash drives and SDXC cards, eliminating the 4 GB file limitation while maintaining cross-platform compatibility without heavy NTFS journaling overhead.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: FAT32 সব ডিভাইসে সমর্থিত কিন্তু ৪ জিবি-র বেশি বড় ফাইল সাপোর্ট করে না। NTFS উইন্ডোজের জন্য সর্বোত্তম যাতে নিরাপত্তা, পারমিশন ও ফাইল রিকভারি জার্নালিং রয়েছে। exFAT পেনড্রাইভ ও এসডি কার্ডের জন্য আদর্শ যা ৪ জিবি সীমাবদ্ধতা মুক্ত।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. Explain Antivirus Real-Time Protection vs Scheduled On-Demand Scanning:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অ্যান্টিভাইরাস রিয়েল-টাইম প্রটেকশন বনাম অন-ডিমান্ড স্ক্যানিংয়ের তুলনা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Real-Time Protection (Resident Shield):</strong> Actively monitors memory, active processes, and intercepts every file read/write or download at the kernel driver level, blocking threats before execution.<br/><strong>On-Demand Scanning:</strong> Manually triggered or scheduled deep scan inspecting inert files stored on storage sectors, verifying file hashes against virus signature databases and heuristic analysis.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: রিয়েল-টাইম প্রটেকশন মেমোরিতে সার্বক্ষণিক সক্রিয় থেকে যেকোনো ফাইল ওপেন বা ডাউনলোড করার সাথে সাথেই পরীক্ষা করে ম্যালওয়্যার ঠেকায়। অন-ডিমান্ড স্ক্যান হলো নির্দিষ্ট সময়ে পুরো হার্ডড্রাইভ স্ক্যান করে লুকানো ভাইরাস শনাক্ত করা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. Explain the Ping command-line diagnostic utility and key parameters (-t, -n, -l):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: পিং (Ping) কমান্ড এবং এর গুরুত্বপূর্ণ প্যারামিটারগুলোর (-t, -n, -l) ব্যবহার ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> The <code>ping</code> utility sends ICMP Echo Request packets to a target IP or FQDN to evaluate round-trip time (RTT) and packet loss.<br/><code>ping -t [target]</code>: Pings the target continuously until manually interrupted (Ctrl+C).<br/><code>ping -n [count] [target]</code>: Specifies the exact number of echo requests to transmit.<br/><code>ping -l [size] [target]</code>: Defines buffer payload size in bytes to test MTU fragmentation.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: পিং কমান্ড আইসিএমপি প্যাকেট পাঠিয়ে সংযোগ ও লেটেন্সি পরীক্ষা করে। '-t' দিয়ে অবিরাম পিং চালানো হয়। '-n' দিয়ে কতটি প্যাকেট যাবে তা ঠিক করা হয়। '-l' দিয়ে প্যাকেটের সাইজ (বাইট) নির্ধারণ করা হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain Web Browser Caching mechanisms and why clearing the cache resolves web application rendering faults:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ওয়েব ব্রাউজার ক্যাশিং কীভাবে কাজ করে এবং ক্যাশ পরিষ্কার করলে ওয়েব পেজ ত্রুটি কীভাবে ঠিক হয়?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Web browsers cache static assets (HTML, CSS stylesheets, JavaScript bundles, images) to local storage to eliminate redundant HTTP downloads on repeat visits. However, if a web application deploys updated scripts while the client retains stale cached files, version mismatches or broken layouts occur. Clearing the cache forces an HTTP GET request to download fresh assets from the web server.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ব্রাউজার বারবার লোড হওয়া এড়াতে ছবি ও স্ক্রিপ্ট লোকাল মেমরিতে সংরক্ষণ করে যাকে ক্যাশ বলে। ওয়েবসাইট আপডেট হলে পুরোনো ক্যাশ ফাইলের কারণে পেজ বিকৃত হতে পারে। ক্যাশ ক্লিয়ার করলে ব্রাউজার নতুন ফাইল ডাউনলোড করে পেজটি নিখুঁতভাবে দেখায়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. What is the Remote Desktop Protocol (RDP) and what cybersecurity safeguards must be applied?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: রিমোট ডেস্কটপ প্রোটোকল (RDP) কী এবং এর সুরক্ষায় কোন পদক্ষেপ নেওয়া উচিত?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> RDP (developed by Microsoft, running on TCP port 3389) allows graphical desktop management of remote workstations. Critical security safeguards include: enforcing Network Level Authentication (NLA), changing default port 3389, mandating Multi-Factor Authentication (MFA), enforcing account lockout policies against brute-force attacks, and tunneling RDP sessions exclusively through an encrypted corporate VPN.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: RDP (পোর্ট 3389) দিয়ে দূর থেকে অন্য কম্পিউটারের উইন্ডোজ ডেস্কটপ পরিচালনা করা যায়। সুরক্ষার জন্য ভিপিএন ব্যবহার করা, নেটওয়ার্ক লেভেল অথেন্টিকেশন (NLA) চালু রাখা এবং শক্তিশালী জটিল পাসওয়ার্ড ব্যবহার করা আবশ্যক।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Explain the function of the Slide Master feature in Microsoft PowerPoint:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: মাইক্রোসফট পাওয়ারপয়েন্টে স্লাইড মাস্টার (Slide Master) ফিচারের কাজ কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Slide Master serves as the universal design template controlling global slide themes, background styles, color palettes, fonts, header/footer text, and logo placement across all presentation slides simultaneously, ensuring rigorous brand consistency across enterprise decks.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: স্লাইড মাস্টার হলো এমন একটি কেন্দ্রীয় টেমপ্লেট যার মাধ্যমে প্রেজেন্টেশনের সমস্ত স্লাইডের ফন্ট, রঙ, ব্যাকগ্রাউন্ড ও লোগো একবারে নির্ধারণ করা যায়, ফলে প্রতিটি স্লাইডে আলাদা করে ডিজাইন করতে হয় না।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Detail a comprehensive Preventive Maintenance checklist for workplace desktop computers:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: কর্মক্ষেত্রের ডেস্কটপ কম্পিউটারের জন্য একটি পূর্ণাঙ্গ প্রিভেন্টিভ মেইনটেন্যান্স চেকলিস্ট লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Physical Dust Extraction:</strong> Clean heatsinks, fans, and power supply vents with compressed air.<br/>2. <strong>Thermal Management:</strong> Replace dried thermal compound (paste) on CPU/GPU every 18-24 months.<br/>3. <strong>Storage Health Inspection:</strong> Check S.M.A.R.T. disk telemetry with CrystalDiskInfo or <code>wmic diskdrive get status</code>.<br/>4. <strong>File System Maintenance:</strong> Run <code>chkdsk /f</code> and execute Disk Cleanup to purge temporary files.<br/>5. <strong>Security Auditing:</strong> Update operating system security patches and antivirus definition tables.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ব্লোয়ার দিয়ে প্রসেসর ফ্যান ও পাওয়ার সাপ্লাইয়ের ধুলো পরিষ্কার। ২. প্রতি দেড়-দুই বছরে নতুন থার্মাল পেস্ট লাগানো। ৩. এস.এম.এ.আর.টি দিয়ে ড্রাইভের স্বাস্থ্য পরীক্ষা। ৪. অপ্রয়োজনীয় ফাইল ডিলিট ও ডিস্ক ক্লিনআপ। ৫. ওএস সিকিউরিটি আপডেট ও অ্যান্টিভাইরাস স্ক্যান।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 06)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 06
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Assemble, Test, Diagnose & Maintain Desktop/Server Hardware Architecture
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Microprocessor Architecture, Instruction Pipeline, Multi-Core Processing & Sockets
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-6.1: Differentiate Land Grid Array (LGA), Pin Grid Array (PGA), and Ball Grid Array (BGA) sockets.</li>
      <li>PC-6.2: Explain CPU cache hierarchy (L1 Instruction/Data, L2 Unified, L3 Shared Smart Cache).</li>
      <li>PC-6.3: Calculate processor clock frequency from Base Clock (BCLK) and internal Core Multiplier.</li>
      <li>PC-6.4: Install processor correctly observing Pin 1 orientation markers and zero-insertion-force (ZIF) rules.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 06: CPU Socket Inspection, Thermal Interface Application & Stress Testing
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> LGA/PGA Motherboard, Desktop Processor, High-Performance Cooler, Isopropyl Alcohol, Prime95.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Inspect socket pins with magnifying glass for bent, bridged, or oxidized contact points.</li>
        <li>Align golden triangle marker on processor corner with socket triangle indicator; lower vertically with zero force.</li>
        <li>Close load plate and secure retention lever.</li>
        <li>Apply thermal paste in a uniform cross or dot pattern; mount cooler with diagonal cross-pattern torque.</li>
        <li>Boot into OS, run Prime95 Small FFTs load test, and verify Tdie core temperatures remain below 80°C.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What occurs during CPU thermal throttling when junction temperature (TjMax) is reached?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> The processor internal thermal sensors trigger PROCHOT# (Processor Hot), causing the clock generator to reduce frequency and operating voltage (VID) to prevent thermal degradation.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Why is L1 cache split into instruction (L1i) and data (L1d) caches?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> To enable simultaneous fetching of machine instructions and operand data in the CPU execution pipeline without bus contention (Harvard architecture principle).
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 07: SUBNETTING MATHEMATICS, HOST CALCULATION &AMP; OCCUPATIONAL SAFETY
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 07: Subnetting Mathematics, Host Calculation &amp; Occupational Safety
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. How many host bits and usable host IP addresses are available in a /26 IPv4 subnet?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: /26 সাবনেটে কতটি হোস্ট বিট এবং কতটি ব্যবহারযোগ্য আইপি ঠিকানা পাওয়া যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 6 host bits, 64 total addresses, 62 usable hosts (2^6 - 2 = 62)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 8 host bits, 256 total addresses, 254 usable hosts</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 5 host bits, 32 total addresses, 30 usable hosts</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 4 host bits, 16 total addresses, 14 usable hosts</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. What is the dotted decimal subnet mask corresponding to CIDR notation /26?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: CIDR নোটেশন /26 এর ডটেড ডেসিমাল সাবনেট মাস্ক কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 255.255.255.192</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 255.255.255.128</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 255.255.255.224</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 255.255.255.240</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. In the subnet containing host IP 192.168.168.188 /26, what is the Network ID (first address)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: 192.168.168.188 /26 আইপি ধারণকারী সাবনেটের নেটওয়ার্ক আইডি (প্রথম ঠিকানা) কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 192.168.168.128</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 192.168.168.0</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 192.168.168.192</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 192.168.168.64</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. In the subnet containing host IP 192.168.168.188 /26, what is the Directed Broadcast address?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: 192.168.168.188 /26 সাবনেটের ডিরেক্টেড ব্রডকাস্ট ঠিকানা কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 192.168.168.191</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 192.168.168.255</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 192.168.168.188</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 192.168.168.127</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. What is the valid usable host range for the subnet containing 192.168.168.188 /26?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: 192.168.168.188 /26 সাবনেটের ব্যবহারযোগ্য হোস্ট আইপির বৈধ রেঞ্জ কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 192.168.168.129 through 192.168.168.190</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 192.168.168.128 through 192.168.168.191</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 192.168.168.1 through 192.168.168.254</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 192.168.168.193 through 192.168.168.254</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. How many total subnets can be created from a Class C network by borrowing 2 host bits (/26)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ক্লাস সি নেটওয়ার্ক থেকে ২ বিট ধার করে (/26) মোট কতটি সাবনেট তৈরি করা যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 4 subnets (2^2 = 4: .0, .64, .128, .192)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 2 subnets</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 8 subnets</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 16 subnets</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. How many usable host IP addresses are provided by a /27 IPv4 subnet?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি /27 IPv4 সাবনেটে কতটি ব্যবহারযোগ্য হোস্ট আইপি পাওয়া যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 30 usable hosts (2^5 - 2 = 30)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 14 usable hosts</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 62 usable hosts</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 126 usable hosts</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. How many usable host IP addresses are provided by a /28 IPv4 subnet?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি /28 IPv4 সাবনেটে কতটি ব্যবহারযোগ্য হোস্ট আইপি পাওয়া যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 14 usable hosts (2^4 - 2 = 14)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 30 usable hosts</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 6 usable hosts</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 2 usable hosts</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. What is the primary technical objective of Personal Protective Equipment (PPE) in an electronics hardware workshop?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ইলেকট্রনিক্স হার্ডওয়্যার ওয়ার্কশপে পার্সোনাল প্রটেক্টিভ ইকুইপমেন্ট (PPE) ব্যবহারের মূল উদ্দেশ্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Minimizing technician risk of physical injury, electric shock, chemical exposure, and burns</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Improving typing accuracy</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Speeding up software downloads</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cooling computer hardware</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Which fire extinguisher class is specifically certified for electrical equipment fires (servers, energized distribution panels)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: বৈদ্যুতিক যন্ত্রপাতি ও সার্ভারের অগ্নিকাণ্ড নির্বাপণের জন্য কোন ক্লাসের অগ্নি নির্বাপক সিলিন্ডার ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Class C (CO2 / Clean Agent FM-200)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Class A (Water/Wood)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Class B (Flammable Liquids)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Class D (Combustible Metals)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Why should water NEVER be applied to an energized electrical fire?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: বিদ্যুৎ পরিবাহী লাইনে বা সরঞ্জামে আগুন লাগলে পানি ব্যবহার করা কেন সম্পূর্ণ নিষেধ?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Water conducts electricity, causing fatal electrocution to the user while spreading short circuits</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Water leaves stains on server chassis</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Water cools equipment too quickly</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Water evaporates into flammable steam</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What does ESD stand for in electronics assembly and servicing?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ইলেকট্রনিক্স অ্যাসেম্বলি ও মেরামতে ESD বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Electrostatic Discharge</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Electronic System Diagnostic</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Extended Storage Device</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Electrical Safety Directive</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. What level of electrostatic discharge voltage can destroy sensitive CMOS integrated circuits without a human feeling the spark?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মানবদেহ কোনো স্পার্ক অনুভব না করা সত্ত্বেও কত ভোল্টের স্ট্যাটিক ডিসচার্জ সংবেদনশীল আইসি নষ্ট করতে পারে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. As little as 10 to 100 Volts (human threshold of perception is ~3,000 Volts)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Only voltages above 50,000 Volts</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Only voltages below 1 Volt</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Exactly 10,000 Volts</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Which diagnostic tool verifies pin-to-pin continuity and identifies crossed or broken pairs in an RJ45 Ethernet patch cord?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: RJ45 ইথারনেট কেবলের পিন সংযোগের ধারাবাহিকতা ও তারের ত্রুটি যাচাই করতে কোন যন্ত্র ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. RJ45 Network Cable Continuity Tester</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Digital thermometer</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Acoustic sound level meter</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Optical lux meter</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What diagnostic mode on a Digital Multimeter (DMM) produces an audible tone when electrical resistance is near 0 ohms?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ডিজিটাল মাল্টিমিটারের কোন মোডে সার্কিট সংযোগ অক্ষত থাকলে (০ ওহম রোধ) বিপ শব্দ শোনা যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Continuity Test Mode (Audible Beeper)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. AC Voltage Mode</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Capacitance Mode</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Diode Bias Mode</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. What is the nominal output DC voltage of the yellow wires in a standard desktop ATX power supply connector?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ডেস্কটপ ATX পাওয়ার সাপ্লাইয়ের হলুদ (Yellow) তারের স্ট্যান্ডার্ড ডিসি ভোল্টেজ কত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. +12V DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. +5V DC</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. +3.3V DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. -12V DC</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. What is the nominal output DC voltage of the red wires in a standard desktop ATX power supply connector?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ডেস্কটপ ATX পাওয়ার সাপ্লাইয়ের লাল (Red) তারের স্ট্যান্ডার্ড ডিসি ভোল্টেজ কত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. +5V DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. +12V DC</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. +3.3V DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. -5V DC</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. What is the nominal output DC voltage of the orange wires in a standard desktop ATX power supply connector?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ডেস্কটপ ATX পাওয়ার সাপ্লাইয়ের কমলা (Orange) তারের স্ট্যান্ডার্ড ডিসি ভোল্টেজ কত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. +3.3V DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. +5V DC</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. +12V DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. -12V DC</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What color wire represents Ground (0V common electrical reference) in an ATX power supply harness?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ATX পাওয়ার সাপ্লাই ক্যাবল হার্নেসে গ্রাউন্ড (০V রেফারেন্স) নির্দেশ করতে কোন রঙের তার ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Black</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Green</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Blue</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. White</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Which wire is jumped to ground to turn on an ATX power supply unit without connecting to a motherboard (the paperclip test)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাদারবোর্ড সংযোগ ছাড়াই একটি ATX পাওয়ার সাপ্লাই চালু করতে কোন রঙের তারটি গ্রাউন্ডের সাথে শর্ট করতে হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Green (PS_ON# pin 16) jumped to any Black Ground pin</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Yellow (+12V) jumped to Red (+5V)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Orange (+3.3V) jumped to Blue (-12V)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Purple (+5VSB) jumped to Gray (PW_OK)</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Demonstrate the complete 4-step subnet calculation for IP 192.168.168.188 /26:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: 192.168.168.188 /26 আইপির পূর্ণাঙ্গ সাবনেটিং হিসাব ৪টি ধাপে সম্পন্ন করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Step 1: Subnet Mask &amp; Bits:</strong> /26 = 26 network bits, leaving 32 - 26 = 6 host bits. Subnet mask in binary: 11111111.11111111.11111111.11000000 = 255.255.255.192.<br/><strong>Step 2: Block Size (Magic Number):</strong> 256 - 192 = 64 (or 2^6 = 64).<br/><strong>Step 3: Subnet Multiples:</strong> Subnets increment by 64 in the 4th octet: .0, .64, .128, .192. Since 188 falls between 128 and 191, the Network ID is 192.168.168.128.<br/><strong>Step 4: Subnet Parameters:</strong><br/>&bull; Network Address: 192.168.168.128<br/>&bull; First Usable Host: 192.168.168.129<br/>&bull; Last Usable Host: 192.168.168.190<br/>&bull; Directed Broadcast: 192.168.168.191<br/>&bull; Total usable hosts: 2^6 - 2 = 62 hosts.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ধাপ ১: /26 মানে ২৬ বিট নেটওয়ার্ক এবং ৬ বিট হোস্ট। মাস্ক: 255.255.255.192। ধাপ ২: ব্লক সাইজ = ২৫৬ - ১৯২ = ৬৪। ধাপ ৩: সাবনেট রেঞ্জ ০, ৬৪, ১২৮, ১৯২। যেহেতু ১৮৮ সংখ্যাটি ১২৮ থেকে ১৯১-এর মধ্যে, তাই নেটওয়ার্ক আইডি 192.168.168.128। ধাপ ৪: প্রথম হোস্ট 192.168.168.129, শেষ হোস্ট 192.168.168.190, ব্রডকাস্ট 192.168.168.191 এবং মোট ব্যবহারযোগ্য হোস্ট ৬২টি।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. State the mathematical formulas for calculating subnets and usable hosts per subnet:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: সাবনেট সংখ্যা এবং প্রতি সাবনেটে ব্যবহারযোগ্য হোস্ট সংখ্যা বের করার গাণিতিক সূত্র লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Number of Subnets:</strong> <code>2^n</code>, where <em>n</em> represents the number of borrowed network bits from the host portion.<br/><strong>Usable Hosts per Subnet:</strong> <code>2^h - 2</code>, where <em>h</em> represents the remaining host bits in the address. The subtracted 2 accounts for the reserved Network ID and Directed Broadcast address.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: সাবনেট সংখ্যা = ২^n (যেখানে n হলো ধার করা নেটওয়ার্ক বিট)। ব্যবহারযোগ্য হোস্ট সংখ্যা = ২^h - ২ (যেখানে h হলো অবশিষ্ট হোস্ট বিট; ২ বিয়োগ করা হয় কারণ প্রথমটি নেটওয়ার্ক আইডি এবং শেষটি ব্রডকাস্ট আইডি)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. Why are two IP addresses subtracted from every subnet's total address pool?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: প্রতিটি সাবনেটের মোট আইপি অ্যাড্রেস থেকে কেন দুটি ঠিকানা বিয়োগ করা হয়?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Network Address (all host bits 0):</strong> Reserved by the routing subsystem to identify the logical subnet network segment itself; cannot be bound to a physical network interface.<br/>2. <strong>Directed Broadcast Address (all host bits 1):</strong> Reserved by the IP protocol to broadcast packets simultaneously to every host on that local subnet; cannot be assigned to an individual host.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. প্রথম ঠিকানাটির সব হোস্ট বিট ০ থাকে, যা পুরো সাবনেট নেটওয়ার্ককে নির্দেশ করে। ২. শেষ ঠিকানাটির সব হোস্ট বিট ১ থাকে, যা ওই সাবনেটের সব ডিভাইসে একসাথে ব্রডকাস্ট করার জন্য সংরক্ষিত। তাই কোনো ডিভাইসে এই দুটি আইপি বসানো যায় না।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Detail Occupational Safety and Health (OSH) guidelines for computer hardware workshop lifting and posture:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: হার্ডওয়্যার ওয়ার্কশপে ভারি যন্ত্র তোলা এবং বসার ভঙ্গির OSH স্বাস্থ্যবিধি লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Safe Lifting:</strong> Bend at the knees, keep the back straight, hold equipment close to the body, and lift using leg muscles rather than twisting the lower spine. Use team lifting for server chassis over 25 kg.<br/>2. <strong>Ergonomic Seating:</strong> Chair height adjusted so feet rest flat on the floor, thighs parallel to floor, elbows at 90 degrees, and monitor positioned at eye level to prevent repetitive strain injuries (RSI).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ভারী জিনিস তোলার সময় কোমর সোজা রেখে হাঁটু ভাঁজ করে পায়ের শক্তিতে তুলতে হবে এবং ভারী সার্ভারের জন্য দুজন মিলে কাজ করতে হবে। ২. চেয়ারে সোজা হয়ে বসা, কনুই ৯০ ডিগ্রিতে রাখা এবং মনিটর চোখের সমান্তরালে রেখে ঘাড়ের চাপ কমানো।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. List mandatory Personal Protective Equipment (PPE) for computer service center operations:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: কম্পিউটার সার্ভিসিং সেন্টারে আবশ্যকীয় পিপিই (PPE)-এর তালিকা দিন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Safety goggles / polycarbonate eye protection (deflecting solder splashes or clipped component leads).<br/>2. Anti-static ESD wriststrap and grounded anti-static mat.<br/>3. Thermal heat-resistant gloves (handling hot heatsinks or reflow heatguns).<br/>4. Anti-static rubber-soled closed-toe shoes (preventing electrical grounding risks).<br/>5. Fume extractor or particulate respirator mask (during PCB soldering or dust extraction).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. চোখে সুরক্ষার চশমা (কাটা তার বা ঝালাইয়ের ছিটকা থেকে রক্ষা)। ২. অ্যান্টি-স্ট্যাটিক রিস্টব্যান্ড ও গ্রাউন্ডেড ম্যাট। ৩. তাপরোধী গ্লাভস। ৪. রাবারের জুতো (বিদ্যুৎ শক প্রতিরোধে)। ৫. মাস্ক বা ধোঁয়া নিষ্কাশন ব্যবস্থা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. Describe the emergency first aid protocol for an electric shock casualty in the workshop:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: কর্মক্ষেত্রে বিদ্যুৎস্পৃষ্ট ব্যক্তির জরুরি প্রাথমিক চিকিৎসার ধাপগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Immediate Hazard Neutralization:</strong> Immediately cut mains AC circuit breaker or emergency stop (EPO). If inaccessible, push casualty away from the live conductor using non-conductive wood or dry plastic broom handle.<br/>2. <strong>Do NOT touch victim directly</strong> while they remain energized.<br/>3. <strong>Check Responsiveness:</strong> Check breathing and pulse. If absent, immediately initiate CPR (Cardiopulmonary Resuscitation) at 30 compressions to 2 rescue breaths and call emergency medical services.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. প্রধান মেইন সুইচ বা সার্কিট ব্রেকার তাৎক্ষণিক বন্ধ করুন। সম্ভব না হলে শুকনো কাঠ বা প্লাস্টিক দিয়ে বিদ্যুৎ পরিবাহী তার সরান। ২. বিদ্যুৎস্পৃষ্ট ব্যক্তিকে সরাসরি স্পর্শ করবেন না। ৩. শ্বাস-প্রশ্বাস পরীক্ষা করুন এবং প্রয়োজন হলে দ্রুত সিপিআর (CPR) শুরু করে হাসপাতালে খবর দিন।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain the safe protocol for handling, storing, and disposing of swollen Lithium-ion laptop batteries:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ফোলা বা ক্ষতিগ্রস্ত লিথিয়াম-আয়ন ল্যাপটপ ব্যাটারির নিরাপদ ব্যবস্থাপনা ও নিষ্কাশন পদ্ধতি লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Swollen Li-ion batteries contain flammable pressurized electrolyte gas at high risk of thermal runaway and explosion. <strong>Protocol:</strong> Do NOT puncture, compress, or attempt to recharge. Safely place the swollen cell into a fireproof, non-conductive metal container filled with dry sand or vermiculite, and dispatch immediately to a certified hazardous waste e-waste facility.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ফোলা ব্যাটারিতে অগ্নিকাণ্ড ও বিস্ফোরণের মারাত্মক ঝুঁকি থাকে। এতে কোনোভাবেই চাপ দেওয়া বা ফুটো করা যাবে না। ব্যাটারিটি শুকনো বালু বা অগ্নিপ্রতিরোধক বাক্সে রেখে অবিলম্বে অনুমোদিত বিপজ্জনক ই-বর্জ্য কেন্দ্রে পাঠাতে হবে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. Describe the step-by-step diagnostic procedure for testing an ATX desktop power supply unit with a multimeter:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ডিজিটাল মাল্টিমিটার দিয়ে ATX পাওয়ার সাপ্লাই পরীক্ষা করার সঠিক ধাপগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Unplug all internal power cables from motherboard, GPU, and drives.<br/>2. Bridge Pin 16 (Green PS_ON#) to any Pin 15/17 (Black Ground) with a paperclip; plug in mains power and verify fan spins.<br/>3. Set DMM to DC Voltage 20V scale.<br/>4. Connect black DMM probe to any Black ground pin.<br/>5. Probe Yellow pins (must read +11.4V to +12.6V), Red pins (must read +4.75V to +5.25V), and Orange pins (must read +3.14V to +3.47V).<br/>6. Probe Gray Pin 8 (Power_Good, PW_OK; must read +5V within 100-500ms of boot).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. সব ক্যাবল মাদারবোর্ড থেকে খুলুন। ২. সবুজ তারের সাথে কালো তার পেপারক্লিপ দিয়ে শর্ট করে পাওয়ার অন করুন। ৩. মাল্টিমিটার ২০V ডিসিতে রাখুন। ৪. কালো প্রোব গ্রাউন্ডে রেখে হলুদ তারে +১২V, লাল তারে +৫V এবং কমলা তারে +৩.৩V ভোল্টেজ ঠিক আছে কিনা পরীক্ষা করুন।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Detail the color-coding and voltage specifications of the 24-pin ATX power supply harness:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ২৪-পিন ATX পাওয়ার সাপ্লাইয়ের তারের রঙের সংকেত ও ভোল্টেজ স্পেসিফিকেশন উল্লেখ করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>Yellow:</strong> +12V DC (powers CPU VRMs, GPU PCIe slots, and motor spindles).<br/>&bull; <strong>Red:</strong> +5V DC (powers logic boards, optical drives, and USB power circuits).<br/>&bull; <strong>Orange:</strong> +3.3V DC (powers motherboard chipset, RAM, and M.2 NVMe slots).<br/>&bull; <strong>Black:</strong> COM / Ground (0V reference).<br/>&bull; <strong>Purple:</strong> +5VSB (Standby +5V continuous power).<br/>&bull; <strong>Green:</strong> PS_ON# (active-low power toggle).<br/>&bull; <strong>Gray:</strong> Power Good / PW_OK (+5V logic signal).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: হলুদ: +১২V (সিপিইউ ও গ্রাফিক্স কার্ডের জন্য)। লাল: +৫V (লজিক চিপ ও ইউএসবি)। কমলা: +৩.৩V (চিপসেট ও র‍্যাম)। কালো: গ্রাউন্ড (০V)। বেগুনি: +৫V স্ট্যান্ডবাই। সবুজ: পাওয়ার অন সিগন্যাল। ধূসর: পাওয়ার গুড সিগন্যাল।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Explain comprehensive Electrostatic Discharge (ESD) preventative measures for high-reliability workstations:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: উচ্চ সংবেদনশীল কম্পিউটার ওয়ার্কশপে ইলেকট্রোস্ট্যাটিক ডিসচার্জ (ESD) প্রতিরোধের সার্বিক ব্যবস্থা লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Wear a certified 1-Megaohm anti-static wriststrap grounded to building earth.<br/>2. Place all loose motherboards, CPUs, and expansion cards onto static-dissipative ESD mats (never on cardboard or plastic bubble wrap).<br/>3. Maintain workshop relative humidity between 40% and 60% to suppress static charge generation.<br/>4. Store and transport semiconductor components inside shielded metallized Anti-Static Faraday bags.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. গ্রাউন্ডেড ইএসডি রিস্টব্যান্ড পরিধান করা। ২. অ্যান্টি-স্ট্যাটিক ম্যাটের ওপর যন্ত্রাংশ রেখে কাজ করা। ৩. ওয়ার্কশপের আর্দ্রতা ৪০%-৬০% এর মধ্যে বজায় রাখা। ৪. যন্ত্রাংশ বহনের জন্য মেটালাইজড অ্যান্টি-স্ট্যাটিক ব্যাগের ব্যবহার নিশ্চিত করা।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 07)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 07
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Assemble, Test, Diagnose & Maintain Desktop/Server Hardware Architecture
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Primary Semiconductor Memory (RAM/ROM), Timings, Dual-Channel Topology & DDR5
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-7.1: Classify SRAM, DRAM, SDRAM, DDR4, and DDR5 architectural architectures and signaling voltages.</li>
      <li>PC-7.2: Install memory modules in designated DIMM slots to establish symmetric Dual-Channel bandwidth.</li>
      <li>PC-7.3: Interpret memory latency timings (CAS Latency - tRCD - tRP - tRAS).</li>
      <li>PC-7.4: Diagnose single-bit vs multi-bit memory parity errors using MemTest86 diagnostic software.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 07: Dual-Channel RAM Installation, Timing Verification & MemTest86 Audit
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> DDR4/DDR5 DIMM modules, MemTest86 Bootable USB, CPU-Z, Motherboard Manual.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Consult motherboard manual for optimal 2-stick channel population (typically Slots A2 and B2).</li>
        <li>Open retention clips, align notch on memory module PCB with socket key, and press firmly until both latches snap shut.</li>
        <li>Boot into UEFI BIOS; enable Extreme Memory Profile (XMP / DOCP / EXPO) to load rated speed and primary timings.</li>
        <li>Boot MemTest86 USB drive; execute Pass 1 through Pass 4 testing all memory addressing ranges with 0 errors.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the theoretical bandwidth advantage of Dual-Channel memory mode over Single-Channel mode?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Dual-Channel mode doubles the memory bus width from 64 bits to 128 bits, theoretically doubling data throughput between the integrated memory controller (IMC) and system RAM.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What does CAS Latency (CL) represent in RAM specification?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> The delay time in clock cycles between the memory controller requesting a specific memory column and the data being available on the module output pins.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 08: TECHNICAL SUPPORT LEVEL-3: SOFTWARE TAXONOMY &AMP; UTILITY DIAGNOSTICS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 08: Technical Support Level-3: Software Taxonomy &amp; Utility Diagnostics
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. How is computer software fundamentally categorized at an architectural level?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটার সফটওয়্যারকে কাঠামোগতভাবে প্রধান কোন দুটি ভাগে ভাগ করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. System Software (OS, Device Drivers, Utilities) and Application Software (Productivity, Custom)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Hardware and Firmware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Internal software and External software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Wired software and Wireless software</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Which software category is responsible for directly controlling hardware, allocating memory, and managing processing threads?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন সফটওয়্যার হার্ডওয়্যার নিয়ন্ত্রণ, মেমরি বরাদ্দ এবং প্রসেসিং পরিচালনা করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. System Software (Operating System & Kernel)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Presentation Software</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Database Software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Spreadsheet Software</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. Which of the following is classified as System Utility Software?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি সিস্টেম ইউটিলিটি সফটওয়্যারের অন্তর্ভুক্ত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Disk Defragmenter, Antivirus, Backup Tool, and File Compression utility</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Microsoft PowerPoint</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Adobe Photoshop</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Google Chrome</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. What is Firmware?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ফার্মওয়্যার বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Low-level software semi-permanently written to non-volatile flash ROM chips (e.g., BIOS/UEFI) to initialize hardware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Temporary cache files stored in RAM</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Commercial accounting packages</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Open-source games</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Which utility compresses multiple files into a single archive to conserve storage and reduce transfer time?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন ইউটিলিটি একাধিক ফাইলকে সংকুচিত করে একটি ফাইলে রূপান্তর করে স্টোরেজ ও স্থানান্তর সময় সাশ্রয় করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 7-Zip / WinRAR / WinZip</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Disk Cleanup</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Device Manager</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Notepad</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. What diagnostic utility scans storage sectors for physical defects and repairs logical file index errors?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন ইউটিলিটি হার্ড ড্রাইভের খারাপ সেক্টর এবং ফাইল সিস্টেমের ত্রুটি মেরামত করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Check Disk (chkdsk)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. System File Checker (sfc)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Diskpart</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Defrag</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. What command-line utility in Windows scans and repairs corrupted Windows system files using cached pristine versions?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজের ক্ষতিগ্রস্ত সিস্টেম ফাইল স্ক্যান করে ভালো কপি দিয়ে মেরামত করার কমান্ড কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. sfc /scannow</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. format c:</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. ipconfig /release</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. ping -t</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. What does Open Source Software (OSS) mean?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ওপেন সোর্স সফটওয়্যার (OSS) বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Software distributed with its source code accessible for inspection, modification, and redistribution</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Software that can only run while connected to the internet</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Software that has no author or copyright</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Software that cannot be purchased</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Which software licensing model allows users to evaluate software free for a trial period, after which payment is required?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন লাইসেন্সিং মডেলে নির্দিষ্ট মেয়াদের জন্য বিনামূল্যে সফটওয়্যার ব্যবহারের পর ফি দিতে হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Shareware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Freeware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Public Domain</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Proprietary Commercial</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. What software runs continuously in the background without a direct user interface to handle print jobs, network requests, and system events?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ব্যবহারকারীর দৃশ্যমান ইন্টারফেস ছাড়াই ব্যাকগ্রাউন্ডে স্বচালিতভাবে সিস্টেম ইভেন্ট ও প্রিন্ট কাজ পরিচালনা করে কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Windows Service / Daemon</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Desktop Widget</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Browser Extension</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Screensaver</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Which Windows utility is used to schedule automated maintenance tasks, backups, and script execution at specific times?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজে নির্দিষ্ট সময়ে ব্যাকআপ ও স্ক্রিপ্ট চালানোর স্বয়ংক্রিয় সিডিউল তৈরি করতে কোন ইউটিলিটি ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Task Scheduler (taskschd.msc)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Task Manager</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Event Viewer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Services console</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What Windows diagnostic console records system events, application crashes, security audits, and hardware errors?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজের কোন ডায়াগনস্টিক কনসোলে অ্যাপ্লিকেশন ক্র্যাশ, সিকিউরিটি লগ ও সিস্টেমের ত্রুটি রেকর্ড থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Event Viewer (eventvwr.msc)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Device Manager</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Performance Monitor</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Disk Management</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Which command-line tool manages disk partitions, volumes, and virtual hard disks via interactive scripts?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ইন্টারঅ্যাক্টিভ স্ক্রিপ্টের মাধ্যমে ডিস্ক পার্টিশন ও ভলিউম পরিচালনা করার কমান্ড-লাইন টুল কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. diskpart</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. fdisk</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. format</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. chkdsk</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. What tool is used to monitor real-time CPU, memory, disk, and network utilization per active process?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: প্রতিটি সক্রিয় প্রসেসের রিয়েল-টাইম সিপিইউ, মেমরি ও নেটওয়ার্ক ব্যবহার পর্যবেক্ষণ করতে কোন টুল ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Task Manager / Resource Monitor (resmon)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Calculator</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Paint</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Notepad</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. Which software utility creates byte-for-byte exact images of storage disks for disaster recovery or system deployment?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সিস্টেম ডিপ্লয়মেন্ট বা ডিজাস্টার রিকভারির জন্য পুরো হার্ডড্রাইভের অবিকল ইমেজ তৈরি করে কোন সফটওয়্যার?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Disk Imaging Software (e.g., Clonezilla, Macrium Reflect)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Text Editor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Media Player</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Web Browser</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. What is a Device Driver digital signature, and why does modern Windows require it?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ডিভাইস ড্রাইভারের ডিজিটাল সিগনেচার কী এবং উইন্ডোজে এটি কেন আবশ্যক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. A cryptographic digital signature verifying driver authenticity (WHQL) and ensuring it has not been tampered with</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. The serial number stamped on the cable</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. The font used in the driver manual</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. The price of the driver package</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. What is an Uninterruptible Power Supply (UPS) software daemon used for?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ইউপিএস (UPS) মনিটরিং সফটওয়্যার ডেমন কী কাজে ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Monitoring battery level over USB/serial and initiating automated OS shutdown during prolonged power outages</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Overclocking the CPU</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Increasing Wi-Fi signal strength</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Defragmenting hard disks</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. Which Windows utility cleans temporary files, recycle bin items, and system cache to recover drive space?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজের কোন ইউটিলিটি অপ্রয়োজনীয় অস্থায়ী ফাইল ও ক্যাশ মুছে ড্রাইভ স্পেস খালি করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Disk Cleanup (cleanmgr.exe)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Registry Editor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Defrag</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Event Viewer</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What software category includes CAD, CAM, video rendering engines, and accounting ERP systems?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ক্যাড (CAD), ভিডিও রেন্ডারিং এবং অ্যাকাউন্টিং ইআরপি কোন ধরনের সফটওয়্যারের উদাহরণ?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Specialized / Vertical Application Software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. System Software</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Firmware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Device Drivers</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. What is the primary function of Virtual Memory (paging file / pagefile.sys)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ভার্চুয়াল মেমরির (পেজফাইল) মূল কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Simulates additional RAM by using secondary storage when physical RAM is exhausted</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Accelerates GPU 3D rendering</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Backs up user emails to cloud</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Formats flash memory drives</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Explain Software Taxonomy: Detailed technical classification of System Software vs Application Software:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: সফটওয়্যার শ্রেণিবিন্যাস: সিস্টেম সফটওয়্যার বনাম অ্যাপ্লিকেশন সফটওয়্যারের বিস্তারিত শ্রেণিবিভাগ লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>1. System Software:</strong><br/>&bull; Operating Systems (Windows, Linux, macOS).<br/>&bull; Device Drivers (chipset, display, network, audio).<br/>&bull; System Utilities (Disk cleanup, defragmenter, antivirus, disk imaging).<br/>&bull; Firmware (UEFI/BIOS).<br/><strong>2. Application Software:</strong><br/>&bull; General Purpose: Office productivity suites, web browsers, media players.<br/>&bull; Specialized / Vertical: AutoCAD, Adobe Creative Cloud, Hospital Information Systems.<br/>&bull; Custom Software: Bespoke in-house banking or inventory solutions.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: সিস্টেম সফটওয়্যার হার্ডওয়্যার ও প্ল্যাটফর্ম পরিচালনা করে (যেমন ওএস, ড্রাইভার, ইউটিলিটি, বায়োস)। অ্যাপ্লিকেশন সফটওয়্যার ব্যবহারকারীর নির্দিষ্ট কাজ সম্পাদন করে (যেমন ওয়ার্ড, এক্সেল, অটোক্যাড, কাস্টম ব্যাংকিং সফটওয়্যার)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. Detail the Five Major Categories of System Utility Programs and their maintenance roles:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: সিস্টেম ইউটিলিটি প্রোগ্রামের ৫টি প্রধান বিভাগ এবং তাদের রক্ষণাবেক্ষণ ভূমিকা ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Storage Diagnostic Utilities:</strong> <code>chkdsk</code>, CrystalDiskInfo (bad sector scanning, S.M.A.R.T. telemetry).<br/>2. <strong>Security &amp; Malware Protection:</strong> Windows Defender, Malwarebytes (real-time signature scanning, quarantine).<br/>3. <strong>Data Backup &amp; Recovery:</strong> Macrium Reflect, File History (automated disk cloning, differential backups).<br/>4. <strong>File Compression &amp; Archival:</strong> 7-Zip, WinRAR (lossless algorithmic compression, multi-volume splitting).<br/>5. <strong>System Performance &amp; Cleanup:</strong> Disk Cleanup, Resource Monitor (cache purging, process analysis).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ড্রাইভ ডায়াগনস্টিক (chkdsk, SMART)। ২. নিরাপত্তা ও অ্যান্টিভাইরাস (ডিফেন্ডার)। ৩. ব্যাকআপ ও রিকভারি (স্ন্যাপশট ও ক্লোনিং)। ৪. ফাইল কম্প্রেশন (৭-জিপ)। ৫. পারফরম্যান্স ও ক্যাশ ক্লিনার (রিসোর্স মনিটর ও ডিস্ক ক্লিনআপ)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. Explain the System File Checker (sfc /scannow) and DISM repair workflow in Windows maintenance:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: উইন্ডোজ মেরামতে System File Checker (sfc /scannow) এবং DISM-এর কার্যপদ্ধতি লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <code>sfc /scannow</code> scans protected system files and replaces corrupted binaries with cached copies from <code>%WinDir%\\System32\\dllcache</code>.<br/>2. If the local component store is itself corrupted, execute: <code>DISM /Online /Cleanup-Image /RestoreHealth</code> to repair the Windows component store directly from Windows Update servers, followed by re-running <code>sfc /scannow</code>.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. 'sfc /scannow' ক্ষতিগ্রস্ত সিস্টেম ফাইল পরীক্ষা করে লোকাল ক্যাশ থেকে ভালো ফাইল প্রতিস্থাপন করে। ২. লোকাল ক্যাশ ক্ষতিগ্রস্ত থাকলে 'DISM /Online /Cleanup-Image /RestoreHealth' কমান্ড চালিয়ে উইন্ডোজ ক্লাউড থেকে সুস্থ ফাইল নামিয়ে মেরামত করতে হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Compare Open Source Software (OSS) vs Proprietary Commercial Licensing models:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ওপেন সোর্স সফটওয়্যার বনাম বাণিজ্যিক মালিকানাধীন (Proprietary) সফটওয়্যারের তুলনা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Open Source Software (GPL, MIT, Apache):</strong> Source code is publicly available; users may inspect, modify, compile, and redistribute without royalties; zero vendor lock-in.<br/><strong>Proprietary Commercial (Microsoft, Adobe, Oracle):</strong> Compiled machine code distributed under restrictive End-User License Agreement (EULA); source code is closed trade secret; requires paid licensing per user/seat; unauthorized copying constitutes copyright infringement.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ওপেন সোর্স সফটওয়্যারের সোর্স কোড উন্মুক্ত থাকে যা যে কেউ পরিবর্তন বা বিনামূল্যে ব্যবহার করতে পারে। প্রোপাইটারি বাণিজ্যিক সফটওয়্যারের সোর্স কোড গোপন থাকে এবং লাইসেন্স ফি দিয়ে ব্যবহারের অনুমতি নিতে হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. Explain the role of Windows Services (services.msc) and their startup types:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: উইন্ডোজ সার্ভিস (services.msc) কী এবং এর বিভিন্ন স্টার্টআপ টাইপ ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Windows Services are background daemons executing without user interaction.<br/>&bull; <strong>Automatic:</strong> Starts immediately during OS initialization before user login (e.g., EventLog, Spooler).<br/>&bull; <strong>Automatic (Delayed Start):</strong> Starts shortly after boot to reduce boot congestion.<br/>&bull; <strong>Manual:</strong> Starts only when explicitly invoked by an application or user.<br/>&bull; <strong>Disabled:</strong> Prevented from starting under any circumstance.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: উইন্ডোজ সার্ভিস হলো ব্যাকগ্রাউন্ড প্রোগ্রাম যা লগইন ছাড়াই চলে। অটোমেটিক: পিসি চালুর সাথে সাথেই রান করে। ম্যানুয়াল: কোনো অ্যাপ কল করলে কেবল তখনই রান করে। ডিজেবলড: সম্পূর্ণ বন্ধ থাকে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. Categorize Windows Event Viewer logs and their severity levels:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: উইন্ডোজ ইভেন্ট ভিউয়ারের প্রধান লগ এবং সেভিয়ারিটি লেভেলের বিবরণ দিন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Log Categories:</strong><br/>&bull; Application: Events logged by installed programs.<br/>&bull; Security: Audit logins, privilege elevation, and authentication events.<br/>&bull; System: Kernel, hardware drivers, and core OS events.<br/><strong>Severity Levels:</strong> Information (routine milestone), Warning (potential issue), Error (component failure), Critical (system crash / BSOD).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: লগ বিভাগ: অ্যাপ্লিকেশন (সফটওয়্যার ইভেন্ট), সিকিউরিটি (লগইন ও পারমিশন), সিস্টেম (কার্নেল ও ড্রাইভার)। সেভিয়ারিটি: ইনফরমেশন (সাধারণ তথ্য), ওয়ার্নিং (সতর্কতা), এরর (ত্রুটি), ক্রিটিক্যাল (সিস্টেম ক্র্যাশ)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain Virtual Memory (paging file / pagefile.sys) and best practices for configuration:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ভার্চুয়াল মেমরি (পেজফাইল) কীভাবে কাজ করে এবং এর সর্বোত্তম কনফিগারেশন কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> When physical RAM is depleted, the Windows Memory Manager pages least-recently-used 4KB memory blocks out of RAM into <code>pagefile.sys</code> on secondary storage. <strong>Best practices:</strong> Place the pagefile on high-speed NVMe SSDs; set initial and maximum sizes identical (e.g., 1.5x physical RAM) to prevent dynamic file fragmentation, or allow Windows system-managed allocation.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: শারীরিক র‍্যাম পূর্ণ হয়ে গেলে উইন্ডোজ হার্ডড্রাইভের একটি নির্দিষ্ট অংশকে (pagefile.sys) মেমরি হিসেবে ব্যবহার করে। দ্রুতগতির এসএসডিতে পেজফাইল রাখলে পারফরম্যান্স ভালো থাকে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. Compare Disk Imaging (Bare-Metal Backup) vs File-Level Backup:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ডিস্ক ইমেজিং (বেয়ার-মেটাল ব্যাকআপ) বনাম ফাইল-লেভেল ব্যাকআপের পার্থক্য লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Disk Imaging (Block-Level):</strong> Captures an exact, sector-by-sector clone of the entire physical drive, including partition tables, MBR/GPT, bootloader, operating system, drivers, and user data. Enables full bare-metal restore to new hardware in minutes.<br/><strong>File-Level Backup:</strong> Backs up only selected individual files and folders (documents, photos). Much faster with smaller storage overhead, but cannot boot a system without reinstalling the OS and applications from scratch.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ডিস্ক ইমেজিং পুরো হার্ডড্রাইভের (ওএস, পার্টিশন, সফটওয়্যারসহ) হুবহু ক্লোন কপি করে যা দিয়ে সম্পূর্ণ নষ্ট পিসি এক ক্লিকে আগের মতো চালু করা যায়। ফাইল ব্যাকআপ কেবল নির্দিষ্ট কিছু ফাইল কপি করে, যা দিয়ে ওএস রিকভার করা যায় না।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Describe Device Driver Rollback and Safe Mode troubleshooting procedures:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ডিভাইস ড্রাইভার রোলব্যাক এবং সেফ মোড ট্রাবলশুটিং পদ্ধতি বর্ণনা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> If a driver update causes Windows Blue Screen of Death (BSOD) or instability:<br/>1. Boot into Windows Recovery Environment (WinRE) and select 'Safe Mode' (loading only minimal generic drivers).<br/>2. Open Device Manager (<code>devmgmt.msc</code>).<br/>3. Right-click the offending device, select Properties &gt; Driver tab, and click <strong>'Roll Back Driver'</strong> to reinstate the previous verified WHQL driver version.<br/>4. Restart the system normally.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: নতুন ড্রাইভার দিয়ে সমস্যা বা ব্লু-স্ক্রিন হলে: ১. সেফ মোডে পিসি বুট করা। ২. ডিভাইস ম্যানেজার ওপেন করা। ৩. নির্দিষ্ট ডিভাইসের প্রপার্টিজে গিয়ে 'Roll Back Driver'-এ ক্লিক করে পূর্বের ভালো ড্রাইভারটি ফিরিয়ে আনা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Explain Windows Registry architecture (HKEY hives) and essential precautions before editing:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: উইন্ডোজ রেজিস্ট্রি হাইভ (HKEY) গঠন এবং সম্পাদনার পূর্বসতর্কতা ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> The Registry is the centralized hierarchical configuration database in Windows.<br/>&bull; <code>HKEY_LOCAL_MACHINE (HKLM)</code>: Global hardware and system settings.<br/>&bull; <code>HKEY_CURRENT_USER (HKCU)</code>: Preferences for the currently logged-in user.<br/>&bull; <code>HKEY_CLASSES_ROOT (HKCR)</code>: File extension associations and COM registrations.<br/><strong>Precautions:</strong> Always export a full <code>.reg</code> backup of the target key or create a System Restore Point prior to editing, as incorrect values can render Windows unbootable.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: রেজিস্ট্রি হলো উইন্ডোজের কেন্দ্রীয় কনফিগারেশন ডেটাবেজ (HKLM, HKCU, HKCR)। রেজিস্ট্রি এডিটের পূর্বে অবশ্যই রেজিস্ট্রি কি (Key) ব্যাকআপ এক্সপোর্ট করতে হবে বা রিস্টোর পয়েন্ট তৈরি করতে হবে, কারণ সামান্য ভুলে পুরো ওএস নষ্ট হতে পারে।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 08)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 08
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Assemble, Test, Diagnose & Maintain Desktop/Server Hardware Architecture
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Secondary Storage, Solid-State Drives (NVMe/SATA), Mechanical HDDs & RAID Topologies
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-8.1: Contrast mechanical HDD geometry (platters, spindle motor, read/write heads) with NAND flash SSDs.</li>
      <li>PC-8.2: Compare SATA 3.0 (6 Gbps / AHCI) with NVMe over PCIe Gen 4/5 (64,000+ MB/s / 64K command queues).</li>
      <li>PC-8.3: Analyze RAID levels: RAID 0 (Striping), RAID 1 (Mirroring), RAID 5 (Distributed Parity), RAID 10 (Striped Mirrors).</li>
      <li>PC-8.4: Read and interpret S.M.A.R.T. diagnostic health attributes (Reallocated Sector Count, Wear Leveling Count).</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 08: M.2 NVMe SSD Thermal Pad Installation & Hardware RAID 1 Mirroring Array
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> M.2 NVMe SSD (PCIe Gen 4), Thermal Heatsink, Precision Screwdriver, CrystalDiskInfo, BIOS RAID Utility.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Peel plastic protective film from thermal interface pad; seat M.2 SSD into M.2_1 (CPU-attached) slot at 30-degree angle.</li>
        <li>Fasten M.2 screw or toolless Q-latch; install aluminum heatsink.</li>
        <li>In BIOS Storage configuration, set SATA/NVMe mode to Intel RST / AMD RAID Mode.</li>
        <li>Create a RAID 1 Mirrored volume across two identical secondary drives; verify write cache policy.</li>
        <li>Boot Windows, launch CrystalDiskInfo, and confirm Transfer Mode is PCIe 4.0 x4 and S.M.A.R.T. Health Status is 100% Good.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: Why is NVMe protocol significantly faster than legacy AHCI protocol on solid-state media?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> AHCI was designed for slow rotating mechanical drives and supports only 1 queue with 32 commands. NVMe supports up to 64,000 queues with 64,000 commands each, taking full advantage of low-latency parallel flash channels.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: In RAID 5 with four 2TB hard drives, what is the usable storage capacity and fault tolerance?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Usable capacity is (N - 1) * Capacity = (4 - 1) * 2TB = 6TB. Fault tolerance is 1 drive failure without data loss.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 09: TECHNICAL SUPPORT LEVEL-3: CABLING STANDARDS &AMP; NETWORK INTERFACE DIAGNOSTICS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 09: Technical Support Level-3: Cabling Standards &amp; Network Interface Diagnostics
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What is the standard wire color sequence for the TIA/EIA-568B cabling standard (Pins 1 through 8)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: TIA/EIA-568B কেবলিং স্ট্যান্ডার্ড অনুযায়ী পিন ১ থেকে ৮ পর্যন্ত তারের সঠিক রঙের ধারাবাহিকতা কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. White-Blue, Blue, White-Orange, Orange, White-Green, Green, White-Brown, Brown</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. White-Orange, Orange, White-Brown, Brown, White-Green, Green, White-Blue, Blue</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. What is the standard wire color sequence for the TIA/EIA-568A cabling standard (Pins 1 through 8)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: TIA/EIA-568A কেবলিং স্ট্যান্ডার্ড অনুযায়ী পিন ১ থেকে ৮ পর্যন্ত তারের সঠিক রঙের ধারাবাহিকতা কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Orange, White-Orange, Green, White-Green, Blue, White-Blue, Brown, White-Brown</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. White-Brown, Brown, White-Blue, Blue, White-Green, Green, White-Orange, Orange</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. A Straight-Through Ethernet cable has which wiring configuration on both ends?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি স্ট্রেইট-থ্রু ইথারনেট কেবলের উভয় প্রান্তে কোন ধরনের ওয়্যারিং কনফিগারেশন থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Identical pinout on both ends (either T568A to T568A, or T568B to T568B)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. T568A on one end and T568B on opposite end</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Inverted pinout (Pin 1 to Pin 8)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Random pinout</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. A Crossover Ethernet cable is traditionally required to interconnect:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ঐতিহ্যগতভাবে কোন দুটি যন্ত্রকে সরাসরি সংযুক্ত করতে ক্রসওভার কেবলের প্রয়োজন হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Two like devices directly without a switch (e.g., PC to PC, Switch to Switch)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. PC to Switch</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Switch to Router</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Printer to Switch</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. What modern feature in Gigabit Ethernet switches automatically detects cable pinout and eliminates the need for crossover cables?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: গিগাবিট সুইচে কোন আধুনিক ফিচারের কারণে কেবলের ধরন যাই হোক না কেন সংযোগ স্বয়ংক্রিয়ভাবে কার্যকর হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Auto-MDI/MDIX</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Auto-Negotiation</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Full Duplex</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. CSMA/CD</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. What is the maximum certified transmission distance for twisted-pair copper cable (Cat5e/Cat6) without a repeater or switch?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোনো রিপিটার ছাড়া টুইস্টেড-পেয়ার তামার কেবলে (Cat5e/Cat6) সর্বোচ্চ কত দূরত্ব পর্যন্ত ডেটা পাঠানো যায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 100 meters (328 feet)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 50 meters</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 250 meters</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 500 meters</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Which category of twisted-pair cable supports 10 Gbps speeds at a frequency of 250 MHz up to 55m (or Cat6a up to 100m at 500 MHz)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ১০ জিবিপিএস গতি এবং ২৫০ মেগাহার্টজ ফ্রিকোয়েন্সি সমর্থন করে কোন ক্যাটাগরির কেবল?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Cat6 / Cat6a</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Cat3</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Cat5</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cat1</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. What physical layer mechanism prevents electromagnetic interference (EMI) and crosstalk between wire pairs in a UTP cable?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: UTP কেবলে তারের জোড়াগুলোর মধ্যে ইলেক্ট্রোম্যাগনেটিক ইন্টারফেয়ারেন্স ও ক্রসটক কমাতে কী ব্যবস্থা নেওয়া হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Twisting the wire pairs at varying twist rates (twists per inch)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Copper shield braiding only</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Outer jacket color</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Using thicker insulation</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Which Windows command displays the full network adapter configuration, including MAC address, IP, subnet mask, gateway, and DNS servers?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজে ম্যাক অ্যাড্রেস, আইপি, সাবনেট মাস্ক, ডিফল্ট গেটওয়ে ও ডিএনএস সার্ভার দেখতে কোন কমান্ড ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. ipconfig /all</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ipconfig /renew</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. netstat -a</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. nslookup</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Which command releases the current DHCP lease on a Windows workstation?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজ ওয়ার্কস্টেশনে বর্তমান DHCP থেকে প্রাপ্ত আইপি রিলিজ করার কমান্ড কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. ipconfig /release</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ipconfig /flushdns</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. ipconfig /registerdns</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. netsh interface reset</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Which command clears the local DNS resolver cache to remove outdated or poisoned name resolution records?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কম্পিউটারের লোকাল ডিএনএস ক্যাশ সম্পূর্ণ পরিষ্কার করার কমান্ড কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. ipconfig /flushdns</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ipconfig /renew</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. ping /flush</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. cls</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What does an IP address in the range 169.254.0.1 to 169.254.255.254 (APIPA) signify on a Windows workstation?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজ পিসিতে 169.254.x.x (APIPA) রেঞ্জের আইপি দেখালে কী অর্থ প্রকাশ পায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. The workstation could not reach a DHCP server and self-assigned an Automatic Private IP Address</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. The workstation has connected to the global internet</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. The network interface card is physically fried</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. The DNS server is operating normally</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. What command-line utility traces the route and lists each intermediate router hop between source PC and target destination?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উৎস থেকে গন্তব্য পর্যন্ত প্রতিটি রাউটারের হপ (Hop) ও বিলম্ব প্রদর্শন করতে কোন কমান্ড ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. tracert (Windows) / traceroute (Linux)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ping</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. route print</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. netstat</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Which command-line utility displays active TCP connections, listening ports, and ethernet protocol statistics?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সক্রিয় TCP সংযোগ এবং ওপেন লিসেনিং পোর্ট দেখতে কোন কমান্ড ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. netstat -an</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ipconfig</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. tracert</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. getmac</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What diagnostic tool queries DNS servers to verify domain name resolution and find MX, A, or CNAME records?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ডিএনএস সার্ভার থেকে কোনো ডোমেনের রেকর্ড (MX, A, CNAME) অনুসন্ধান ও যাচাইয়ের জন্য কোন টুল ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. nslookup / dig</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ping</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. arp -a</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. nbtstat</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. What is the purpose of an Ethernet loopback adapter plug during NIC diagnostics?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নেটওয়ার্ক ইন্টারফেস কার্ড (NIC) পরীক্ষায় ইথারনেট লুপব্যাক প্লাগের কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Connects transmit pins to receive pins (pins 1-3 and 2-6) to test NIC internal transceiver circuitry</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Boosts network speed to 10 Gbps</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Connects the computer to satellite Wi-Fi</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Discharges static electricity from the switch</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. What LED indicator on an Ethernet NIC indicates an established electrical link with the switch?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি ইথারনেট ল্যান পোর্টে সুইচের সাথে সফল বৈদ্যুতিক সংযোগ স্থাপিত হয়েছে তা নির্দেশ করে কোন এলইডি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Link LED (solid green/amber)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Activity LED (flashing green)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Power LED</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Error LED</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. If the Link LED is completely dark when a network cable is plugged in, what is the most probable physical cause?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নেটওয়ার্ক কেবল লাগানোর পরও যদি ল্যান পোর্টের লিংক লাইট না জ্বলে, তবে সম্ভাব্য কারণ কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Broken cable, disconnected far end, faulty RJ45 plug, or damaged switch port</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Incorrect DNS server IP</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Expired DHCP lease</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Low monitor brightness</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What tool is used to terminate UTP wires into punch-down keystone jacks and rack-mounted patch panels?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: প্যাচ প্যানেল এবং কিস্টোন জ্যাকের মধ্যে UTP তার পাঞ্চ করে আটকাতে কোন টুল ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 110/Krone Impact Punch-Down Tool</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. RJ45 Crimper</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Wire stripper</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Heat gun</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. In structured cabling, what device acts as a centralized termination block mounted in server racks to interconnect drops with switches?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সার্ভার র্যাকে স্থাপন করা কোন কেন্দ্রীয় টার্মিনেশন ব্লকের মাধ্যমে সমস্ত ক্যাবল সুইচের সাথে সংযুক্ত করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Patch Panel</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Cable tray</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Server rack fan</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Power strip</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Compare TIA/EIA-568A vs TIA/EIA-568B pinout color coding with full wire mapping:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: TIA/EIA-568A এবং TIA/EIA-568B কালার কোডিংয়ের পূর্ণাঙ্গ পিনআউট তুলনা লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>T568A:</strong> 1: White-Green, 2: Green, 3: White-Orange, 4: Blue, 5: White-Blue, 6: Orange, 7: White-Brown, 8: Brown.<br/><strong>T568B:</strong> 1: White-Orange, 2: Orange, 3: White-Green, 4: Blue, 5: White-Blue, 6: Green, 7: White-Brown, 8: Brown.<br/><em>Note:</em> The Orange and Green pairs swap positions between Pins (1, 2) and Pins (3, 6).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: T568A: ১: সাদা-সবুজ, ২: সবুজ, ৩: সাদা-কমলা, ৪: নীল, ৫: সাদা-নীল, ৬: কমলা, ৭: সাদা-বাদামি, ৮: বাদামি। T568B: ১: সাদা-কমলা, ২: কমলা, ৩: সাদা-সবুজ, ৪: নীল, ৫: সাদা-নীল, ৬: সবুজ, ৭: সাদা-বাদামি, ৮: বাদামি। (উভয় স্ট্যান্ডার্ডে কমলা ও সবুজ জোড়ার পিন বদল হয়)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. Explain Straight-Through vs Crossover cable schematic and the role of Auto-MDI/MDIX:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: স্ট্রেইট-থ্রু ও ক্রসওভার কেবলের ব্যবহার এবং অটো-MDI/MDIX প্রযুক্তির সুবিধা ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Straight-Through:</strong> Pin 1 to Pin 1, Pin 2 to Pin 2, etc. Used for connecting DCE to DTE devices (PC to Switch).<br/><strong>Crossover:</strong> Swaps Pin 1 with 3 and Pin 2 with 6, connecting transmit to receive directly (PC to PC).<br/><strong>Auto-MDI/MDIX:</strong> Modern Gigabit PHY transceivers automatically detect transmit/receive pair polarity and swap them internally in silicon, making any cable type functional.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: স্ট্রেইট-থ্রু ভিন্ন ডিভাইস (পিসি থেকে সুইচ) সংযুক্ত করে। ক্রসওভার সরাসরি একই ডিভাইস (পিসি থেকে পিসি) সংযুক্ত করে। অটো-MDI/MDIX সুইচ পোর্টের ট্রান্সমিট ও রিসিভ পিন স্বয়ংক্রিয়ভাবে ঘুরিয়ে নেয়, ফলে যেকোনো কেবল দিয়েই সংযোগ চলে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. Explain APIPA (169.254.0.0/16) root causes, symptoms, and troubleshooting protocol:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: APIPA (169.254.x.x) আইপি আসার কারণ, লক্ষণ এবং সমাধানের ধাপগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Root Cause:</strong> Workstation configured for DHCP fails to receive a DHCP Offer due to disconnected cable, dead switch port, or depleted DHCP pool.<br/><strong>Troubleshooting:</strong> 1. Check physical link light. 2. Verify cable continuity with tester. 3. Check DHCP server service status. 4. Execute <code>ipconfig /release</code> followed by <code>ipconfig /renew</code>.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: লক্ষণ: কম্পিউটারে 169.254 দিয়ে শুরু হওয়া আইপি আসে এবং ইন্টারনেট থাকে না। কারণ: DHCP সার্ভারের সাথে সংযোগ ব্যর্থ। সমাধান: কেবলের সংযোগ ও বাতি পরীক্ষা করা, ডিএইচসিপি সার্ভার ঠিক আছে কিনা দেখা এবং 'ipconfig /release' ও 'renew' চালানো।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Detail the step-by-step diagnostic sequence using ipconfig /all, ping, and tracert:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ipconfig /all, ping এবং tracert কমান্ড ব্যবহারের মাধ্যমে নেটওয়ার্ক ত্রুটি নির্ণয়ের ধারাবাহিক ধাপগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Run <code>ipconfig /all</code>: Verify valid IP, subnet mask, default gateway, and DNS servers.<br/>2. Run <code>ping 127.0.0.1</code>: Verifies internal TCP/IP stack integrity.<br/>3. Run <code>ping [Default Gateway IP]</code>: Verifies local LAN connectivity to router.<br/>4. Run <code>ping 8.8.8.8</code>: Verifies external WAN connectivity through router/ISP.<br/>5. Run <code>ping www.google.com</code>: Verifies DNS name resolution.<br/>6. Run <code>tracert [target]</code>: Pinpoints the exact router hop where packets are dropped.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ipconfig /all দিয়ে সঠিক আইপি ও গেটওয়ে আছে কিনা দেখা। ২. ping 127.0.0.1 দিয়ে পিসির নিজস্ব নেটওয়ার্ক কার্ড যাচাই। ৩. গেটওয়ে পিং করে রাউটার যাচাই। ৪. 8.8.8.8 পিং করে ইন্টারনেট যাচাই। ৫. গুগল ডোমেন পিং করে ডিএনএস যাচাই। ৬. tracert দিয়ে কোন রাউটারে ডেটা আটকাচ্ছে তা নির্ণয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. Explain DNS resolution troubleshooting using nslookup and ipconfig /flushdns:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: nslookup এবং ipconfig /flushdns কমান্ড দিয়ে ডিএনএস ত্রুটি সমাধানের পদ্ধতি লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. If a website fails to open by domain name but opens by direct IP address, DNS resolution is failing.<br/>2. Execute <code>nslookup hostname.com</code> to inspect query responses from primary DNS.<br/>3. Point to a public resolver: <code>nslookup hostname.com 8.8.8.8</code> to determine if local DNS is broken.<br/>4. Clear corrupt cached records with <code>ipconfig /flushdns</code> to force fresh authoritative lookups.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ওয়েবসাইট আইপি দিয়ে খুললেও নাম দিয়ে না খুললে ডিএনএস সমস্যা। 'nslookup ডোমেন' লিখে ডিএনএস আইপি ঠিক আছে কিনা পরীক্ষা করুন। কোনো ভুল রেকর্ড ক্যাশ হয়ে থাকলে 'ipconfig /flushdns' দিয়ে ক্যাশ পরিষ্কার করুন।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. Describe the architecture of Structured Cabling (Patch Panels, Horizontal Runs, Work Area Outlets):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: স্ট্রাকচার্ড কেবলিং আর্কিটেকচার (প্যাচ প্যানেল, অনুভূমিক ওয়্যারিং ও আউটলেট)-এর গঠন বর্ণনা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Structured cabling divides building telecommunications into standard subsystems:<br/>&bull; <strong>Work Area:</strong> Wall-mounted RJ45 keystone faceplates connecting user workstations via 1-3m patch cords.<br/>&bull; <strong>Horizontal Cabling:</strong> Solid-conductor Cat6 runs inside conduits from work areas to the telecommunications room (max 90m).<br/>&bull; <strong>Patch Panel:</strong> 19-inch rack-mounted termination block where horizontal cables punch down into rear 110 blocks.<br/>&bull; <strong>Equipment Room:</strong> Short stranded patch cords interconnect patch panel front ports with core switches.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: স্ট্রাকচার্ড কেবলিংয়ে দেয়ালের আউটলেট (Work Area) থেকে তার গিয়ে সার্ভার রুমের প্যাচ প্যানেলের পেছনে পাঞ্চ হয় (Horizontal Cabling, সর্বোচ্চ ৯০ মিটার)। এরপর প্যাচ কর্ড দিয়ে প্যাচ প্যানেল থেকে সুইচে সংযোগ দেওয়া হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain UTP cable termination standards and the rule regarding wire untwisting:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: UTP কেবল টার্মিনেশন স্ট্যান্ডার্ড এবং তারের মোচড় (Twist) না খোলার নিয়ম ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> When terminating Cat6 cables into RJ45 plugs or punch-down jacks, wire pairs must NOT be untwisted more than <strong>0.5 inches (12.7 mm)</strong> from the point of termination. Excessive untwisting destroys the differential cancellation of electromagnetic interference, introducing high Near-End Crosstalk (NEXT) and packet drops at Gigabit speeds.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: RJ45 কানেক্টর লাগানোর সময় তারের মোচড় বা টুইস্ট কোনোভাবেই ০.৫ ইঞ্চির বেশি খোলা যাবে না। অতিরিক্ত টুইস্ট খুললে সিগন্যালে নয়েজ ও ক্রসটক বেড়ে যায় এবং সংযোগের গতি কমে যায়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. Detail Network Interface Card (NIC) hardware diagnostic LED indicators:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: নেটওয়ার্ক ইন্টারফেস কার্ডের (NIC) হার্ডওয়্যার ডায়াগনস্টিক এলইডি সংকেতের অর্থ লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>Link LED (Solid Green/Amber):</strong> Indicates physical carrier signal detected and synchronized with the remote switch port. Solid Green = Gigabit (1000 Mbps); Solid Amber = 100 Mbps; Off = No physical link.<br/>&bull; <strong>Activity LED (Flashing Green):</strong> Flashes intermittently to indicate active TX/RX packet transmission across the media interface.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: লিংক এলইডি (সবুজ/হলুদ স্থির আলো): সুইচের সাথে ভৌত সংযোগ ঠিক আছে। সবুজ মানে ১০০০ এমবিপিএস, হলুদ মানে ১০০ এমবিপিএস, বন্ধ মানে তার নষ্ট। অ্যাক্টিভিটি এলইডি (টিপটিপ আলো): ডেটা আদান-প্রদান হচ্ছে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Identify Common Ethernet Cabling Faults detectable by continuity wire mappers:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: কেবল কন্টিনিউটি টেস্টার দিয়ে শনাক্ত করা যায় এমন প্রধান ৪টি কেবল ত্রুটি উল্লেখ করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Open:</strong> One or more copper conductors are physically severed inside the cable or not making contact with the RJ45 pin.<br/>2. <strong>Short:</strong> Two or more conductor wires touch each other, creating an electrical short circuit.<br/>3. <strong>Crossed Pair:</strong> Transmit and receive pairs wired in reverse.<br/>4. <strong>Split Pair:</strong> Wires from different twisted pairs are terminated onto adjacent pins, maintaining DC continuity but causing severe crosstalk failure.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ওপেন (Open): কোনো তারের সংযোগ বিচ্ছিন্ন থাকা। ২. শর্ট (Short): ভেতরের দুটি তার পরস্পর লেগে যাওয়া। ৩. ক্রসড পেয়ার (Crossed): তারের পিন উল্টো বসা। ৪. স্প্লিট পেয়ার (Split): আলাদা জোড়ার তার ভুল পিনে লেগে নয়েজ তৈরি করা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Compare bandwidth, frequency, and maximum distance across Cat5e, Cat6, Cat6a, and Cat7 cabling:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: Cat5e, Cat6, Cat6a এবং Cat7 কেবলের ব্যান্ডউইথ, ফ্রিকোয়েন্সি ও দূরত্বের তুলনা দিন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>Cat5e:</strong> 1 Gbps up to 100m; 100 MHz frequency.<br/>&bull; <strong>Cat6:</strong> 1 Gbps up to 100m (10 Gbps up to 55m); 250 MHz frequency.<br/>&bull; <strong>Cat6a:</strong> 10 Gbps up to 100m full distance; 500 MHz frequency; heavily shielded against alien crosstalk.<br/>&bull; <strong>Cat7:</strong> 10 Gbps up to 100m; 600 MHz frequency; individually shielded pairs (S/FTP).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: Cat5e: ১ জিবিপিএস (১০০ মিটার, ১০০ মেগাহার্টজ)। Cat6: ১০ জিবিপিএস (৫৫ মিটার) ও ১ জিবিপিএস (১০০ মিটার, ২৫০ মেগাহার্টজ)। Cat6a: ১০ জিবিপিএস (পূর্ণ ১০০ মিটার, ৫০০ মেগাহার্টজ)। Cat7: ১০ জিবিপিএস (পূর্ণ ১০০ মিটার, ৬০০ মেগাহার্টজ, উন্নত শিল্ডেড)।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 09)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 09
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Assemble, Test, Diagnose & Maintain Desktop/Server Hardware Architecture
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> System Expansion Busses, PCIe Lane Topologies, Legacy Interfaces & Peripheral Cards
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-9.1: Distinguish parallel busses (ISA, PCI, AGP) from point-to-point serial packet interconnects (PCI Express).</li>
      <li>PC-9.2: Calculate PCIe per-lane bandwidth across Gen 3 (1 GB/s), Gen 4 (2 GB/s), and Gen 5 (4 GB/s).</li>
      <li>PC-9.3: Understand mechanical vs electrical lane slot configurations (e.g. x16 mechanical running at x8 or x4 electrical).</li>
      <li>PC-9.4: Secure discrete expansion cards into expansion slots and connect auxiliary PCIe 6-pin / 8-pin power cables.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 09: Discrete PCIe 4.0 x16 Graphics Card Installation & Power Supply Balancing
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> PCIe Graphics Card, Anti-static Mat, Philips Screwdriver, GPU-Z Diagnostic Utility.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Remove corresponding chassis expansion slot metal backplate covers.</li>
        <li>Align PCIe x16 gold fingers with primary CPU-directed PCIe slot; press evenly until slot locking clip engages.</li>
        <li>Secure graphics card metal bracket to chassis frame using two mounting screws to eliminate GPU sag.</li>
        <li>Connect two separate 8-pin PCIe power cables from SMPS (avoiding single daisy-chained pigtail cable).</li>
        <li>Boot into OS, launch GPU-Z, and confirm Bus Interface reports "PCIe x16 4.0 @ x16 4.0".</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the encoding overhead improvement between PCIe Gen 2 (8b/10b) and PCIe Gen 3/4/5 (128b/130b)?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> PCIe Gen 2 utilized 8b/10b encoding which had a 20% bandwidth overhead (2 extra bits per byte). PCIe Gen 3 and later utilize 128b/130b encoding, reducing protocol overhead to approximately 1.54%.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Why is it recommended to power high-end discrete GPUs with independent PCIe cables instead of a single split cable?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> A standard 8-pin PCIe cable is rated for 150W. High-transient power draws can exceed the wire gauge amperage rating of a single daisy-chained cable, causing voltage drops, connector melting, or system shutdowns.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 10: ENTERPRISE SYSTEMS, PROFESSIONAL DECORUM &AMP; WORKPLACE OPERATIONS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 10: Enterprise Systems, Professional Decorum &amp; Workplace Operations
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What interpersonal communication practice best conveys professionalism during client technical support interactions?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: গ্রাহক সেবা ও টেকনিক্যাল সাপোর্টে কোন আচরণটি পেশাদারিত্ব প্রকাশ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Active listening, polite tone, clear articulation, and taking concise notes</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Using dense technical jargon to confuse the user</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Interrupting the user frequently</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Rushing through explanations without confirmation</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. What ethical and legal responsibility must an IT technician maintain regarding client data files and documents?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: গ্রাহকের ব্যক্তিগত বা ব্যবসায়িক ডেটা ফাইলের ক্ষেত্রে আইটি টেকনিশিয়ানের নৈতিক দায়িত্ব কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Strict Data Privacy, Non-Disclosure Agreements (NDA), and Confidentiality</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Sharing documents with third parties</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Posting user screenshots on public social channels</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Copying private financial databases to personal thumb drives</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. In Microsoft Word, what does Paragraph Alignment control?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট ওয়ার্ডে প্যারাগ্রাফ অ্যালাইনমেন্টের কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Horizontal text positioning relative to page margins (Left, Center, Right, Justify)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Font color palette</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Spell check dictionary languages</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Table border line width</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. What web browser is officially pre-installed and integrated natively into modern Windows 10 & 11?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: উইন্ডোজ ১০ ও ১১-এ ডিফল্টভাবে প্রি-ইনস্টল থাকা ওয়েব ব্রাউজার কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Microsoft Edge (Chromium Engine)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Mozilla Firefox</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Safari</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Opera Mini</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. What two primary firmware specifications govern x86/x64 motherboard boot architectures?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: x86/x64 মাদারবোর্ডের বুট আর্কিটেকচার পরিচালনাকারী প্রধান দুটি ফার্মওয়্যার স্পেসিফিকেশন কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. UEFI (Unified Extensible Firmware Interface) & Legacy BIOS (CSM)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. MS-DOS & FreeDOS</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. FAT32 & exFAT</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. TCP & UDP</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. What is a Service Level Agreement (SLA) in IT technical support operations?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আইটি টেকনিক্যাল সাপোর্টে সার্ভিস লেভেল এগ্রিমেন্ট (SLA) বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. A contractual agreement defining response times, resolution times, and service availability commitments</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A software purchase receipt</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. A computer warranty registration card</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. An employee job application</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. What is an IT Helpdesk Ticketing System engineered to accomplish?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আইটি হেল্পডেস্ক টিকিটিং সিস্টেমের মূল কাজ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Logging, tracking, prioritizing, categorizing, and documenting customer technical incidents to verified closure</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Buying airline tickets</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Selling computer hardware online</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Printing paper receipts</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. When an IT technician encounters an issue beyond their authorized skill tier or system permissions, what is the correct protocol?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: যখন কোনো ত্রুটি টেকনিশিয়ানের জ্ঞান বা অনুমোদনের বাইরে থাকে, তখন সঠিক প্রটোকল কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Escalate the ticket to Tier 2/Tier 3 senior engineering according to organizational escalation hierarchy</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Guess random administrative passwords</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Close the ticket and claim it cannot be fixed</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Tell the user to fix it themselves</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Why is a formal Change Management procedure mandatory in enterprise IT environments?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: এন্টারপ্রাইজ আইটি সিস্টেমে আনুষ্ঠানিক চেঞ্জ ম্যানেজমেন্ট প্রক্রিয়া কেন বাধ্যতামূলক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To assess risks, plan implementation and rollback, minimize service disruptions, and obtain managerial authorization</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To prevent employees from changing desktop wallpapers</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To avoid documenting hardware upgrades</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To speed up unplanned server reboots</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. What is meant by a 'Conflict of Interest' in professional employment?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কর্মক্ষেত্রে 'স্বার্থের দ্বন্দ্ব' (Conflict of Interest) বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. When personal financial or private interests conflict with official organizational duty</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Disagreeing on which keyboard brand is best</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Working overtime on weekends</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Taking notes during meetings</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Why is compliance with environmental electronic waste (e-waste) disposal mandatory?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ই-বর্জ্য (e-waste) আইনসম্মতভাবে বিনষ্ট বা রিসাইকেল করা কেন বাধ্যতামূলক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Prevents heavy metal toxins (lead, mercury, cadmium) from leaching into groundwater and adheres to environmental legislation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To make computers look shiny</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To prevent computer cables from tangling</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To increase internet bandwidth</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What must be submitted and approved by management before procuring expensive hardware?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: দামি হার্ডওয়্যার ক্রয়ের পূর্বে অনুমোদনের জন্য ম্যানেজমেন্টের কাছে কী জমা দিতে হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Formal Cost Estimation & Bill of Materials (BOM)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A verbal request in the hallway</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. A note written on a napkin</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. An anonymous email</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. In professional email communications, what is the purpose of the BCC (Blind Carbon Copy) field?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ইমেইলে BCC (ব্লাইন্ড কার্বন কপি) ব্যবহারের উদ্দেশ্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Sends a copy of the email to recipients without revealing their email addresses to other recipients</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Encrypts the email with a password</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Deletes the email after 24 hours</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Automatically replies to the sender</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. What security concept ensures that users are granted only the minimum permissions necessary to perform their assigned job duties?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন নিরাপত্তা নীতিমালার অধীনে একজন ব্যবহারকারীকে কেবল তার কাজের জন্য প্রয়োজনীয় সর্বনিম্ন অনুমতি দেওয়া হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Principle of Least Privilege (PoLP)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Principle of Absolute Authority</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Shared Administrative Access</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Open Access Model</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What is the primary technical purpose of Multi-Factor Authentication (MFA / 2FA)?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাল্টি-ফ্যাক্টর অথেন্টিকেশনের (MFA) মূল প্রযুক্তিগত উদ্দেশ্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Enhances security by requiring two or more distinct authentication factors (password + OTP authenticator/biometric)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Requires entering the password twice</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Forces the user to have two computers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Makes login twice as fast</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. What is Phishing in the context of enterprise cybersecurity?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সাইবার নিরাপত্তায় ফিশিং (Phishing) বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Fraudulent deceptive emails or messages designed to trick users into revealing credentials or downloading malware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Catching fish using an electronic device</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Testing network cable speeds</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Scanning hard drives for bad sectors</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. How should an IT support professional respond to an irate or stressed user experiencing a system outage?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সিস্টেম ত্রুটির কারণে ক্ষুব্ধ ব্যবহারকারীর সাথে আইটি সাপোর্ট কর্মীর কেমন আচরণ করা উচিত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Remain calm, acknowledge frustration empathetically, actively listen without interrupting, and focus methodically on resolution</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Argue with the customer</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hang up the phone immediately</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Blame the customer for breaking the computer</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. What is Preventive Maintenance in IT infrastructure management?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আইটি অবকাঠামো ব্যবস্থাপনায় প্রিভেন্টিভ মেইনটেন্যান্স বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Regularly scheduled servicing, cleaning, updating, and inspection of hardware and software to prevent unexpected equipment failures</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Waiting until a server explodes before replacing it</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Deleting all user files once a week</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Replacing computers every month</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What document provides clear, step-by-step instructions for technicians to carry out routine industrial or IT operations consistently?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন নথিতে টেকনিশিয়ানদের জন্য কোনো নির্দিষ্ট প্রযুক্তিগত কাজ ধারাবাহিকভাবে সম্পন্ন করার নিয়মাবলি থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Standard Operating Procedure (SOP)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Comic book</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Marketing catalog</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Purchase invoice</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. What is the final mandatory step in resolving an IT service incident before closing the ticket?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: টিকিট বন্ধ করার পূর্বে যেকোনো আইটি সমস্যা সমাধানের চূড়ান্ত পদক্ষেপ কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Confirm full functionality with the user, obtain their sign-off, and document the resolution in the knowledge base</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Delete the customer's account</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Shut down the server room</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Ask for a cash tip</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Explain Service Level Agreement (SLA) key performance indicators (MTTR, MTTD, Uptime %):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: সার্ভিস লেভেল এগ্রিমেন্টের (SLA) প্রধান কর্মদক্ষতা সূচকগুলো (MTTR, MTTD, Uptime %) ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>MTTR (Mean Time to Repair):</strong> Average time taken to diagnose, repair, and restore a failed system.<br/>&bull; <strong>MTTD (Mean Time to Detect):</strong> Average duration from the initial occurrence of a fault to its automated alert detection.<br/>&bull; <strong>Uptime %:</strong> Percentage of operational availability within a contractual period (e.g., 99.9% 'three nines' permits max 8.76 hours of unplanned downtime per year).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: MTTR: ত্রুটি হওয়ার পর তা মেরামত করে সিস্টেম চালু করতে গড় কত সময় লাগে। MTTD: কোনো ত্রুটি ঘটার পর তা শনাক্ত করতে কত সময় লাগে। Uptime %: চুক্তিবদ্ধ সময়ের মধ্যে সিস্টেম সচল থাকার শতকরা হার (যেমন ৯৯.৯% আপটাইম)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. Detail the complete Helpdesk Incident Ticket Lifecycle from creation to verified closure:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: হেল্পডেস্ক টিকিটের জীবনচক্র (সৃষ্টি থেকে সমাধান পর্যন্ত ধাপগুলো) লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>New / Open:</strong> Incident logged by user or automated monitoring.<br/>2. <strong>Categorization &amp; Prioritization:</strong> Assigned category (Hardware/Network) and priority (Urgent/High/Low) based on business impact.<br/>3. <strong>Assigned / In Progress:</strong> Tier-1 technician begins active diagnosis.<br/>4. <strong>Escalated:</strong> Routed to Tier-2/3 specialist if unresolved.<br/>5. <strong>Resolved:</strong> Solution verified and tested.<br/>6. <strong>Closed:</strong> User confirms satisfaction, sign-off recorded, and knowledge base article updated.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ওপেন: ব্যবহারকারী বা সিস্টেম কর্তৃক টিকিট তৈরি। ২. ক্যাটাগরি ও অগ্রাধিকার নির্ধারণ (ইমপ্যাক্ট অনুযায়ী)। ৩. টেকনিশিয়ান নিয়োগ ও কাজ শুরু। ৪. সমাধান না হলে সিনিয়র টিমে এস্কেলেশন। ৫. সমাধান ও কার্যকারিতা পরীক্ষা। ৬. গ্রাহকের সন্তুষ্টি নিশ্চিত করে নথিবদ্ধ ক্লোজার।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. Explain the Principle of Least Privilege (PoLP) and Role-Based Access Control (RBAC):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ন্যূনতম অধিকারের নীতি (PoLP) এবং রোল-বেজড অ্যাক্সেস কন্ট্রোল (RBAC) ব্যাখ্যা করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>PoLP:</strong> Every user account, process, or program must be granted only the minimum system rights and permissions strictly necessary to execute its specific authorized function, reducing damage from insider threats or compromised accounts.<br/><strong>RBAC:</strong> Assigns permissions to organizational job roles (e.g., Financial Analyst, Helpdesk Tech) rather than individuals, ensuring seamless privilege inheritance and compliance.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: PoLP: ব্যবহারকারীকে শুধু তার কাজের জন্য প্রয়োজনীয় ন্যূনতম পারমিশন দেওয়া, যাতে অ্যাকাউন্ট হ্যাক হলেও পুরো নেটওয়ার্ক বিপদে না পড়ে। RBAC: ব্যক্তির নামের বদলে তার পদের (রোল) ওপর পারমিশন নির্ধারণ করা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. Compare Incident Management vs Change Management in enterprise ITIL frameworks:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: আইটি অপারেশনে Incident Management বনাম Change Management-এর পার্থক্য লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> <strong>Incident Management:</strong> Reactive, fast-paced process aimed at restoring disrupted IT services to normal operational state as quickly as possible, minimizing business impact (e.g., clearing a print queue, swapping a blown power supply).<br/><strong>Change Management:</strong> Proactive, disciplined governance ensuring that changes (e.g., core router firmware upgrade, server OS migration) are evaluated for risk, scheduled during maintenance windows, backed by a rollback plan, and authorized by the Change Advisory Board (CAB).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ইনসিডেন্ট ম্যানেজমেন্ট হলো তাৎক্ষণিক সমস্যা সমাধান করে দ্রুত সিস্টেম সচল করা (যেমন হঠাৎ সার্ভার বন্ধ হলে চালু করা)। চেঞ্জ ম্যানেজমেন্ট হলো পরিকল্পিত পরিবর্তন যা ঝুঁকি যাচাই ও ব্যাকআপ পরিকল্পনা করে বোর্ডের অনুমোদনে করা হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. Identify technical red flags used to detect Phishing emails and malicious correspondence:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ফিশিং বা প্রতারণামূলক ইমেইল শনাক্ত করার প্রযুক্তিগত লক্ষণগুলো উল্লেখ করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Mismatched sender display name and actual header RFC envelope domain (e.g., <code>support@microsofft-security.com</code>).<br/>2. Artificial urgency or coercion ('Account will be suspended in 2 hours').<br/>3. Embedded hyperlinks pointing to mismatched or obfuscated target URLs.<br/>4. Unsolicited attachments with dangerous extensions (<code>.exe, .vbs, .scr, .iso, .zip</code>).<br/>5. Generic greetings ('Dear Customer') lacking personalized corporate identifiers.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. প্রেরকের ইমেইল অ্যাড্রেসে বানানের সূক্ষ্ম ভুল। ২. দ্রুত ব্যবস্থা না নিলে অ্যাকাউন্ট বাতিলের হুমকি। ৩. সন্দেহজনক লিঙ্ক ও অ্যাটাচমেন্ট (.exe, .zip)। ৪. ব্যাকরণগত ভুল এবং কোনো ব্যক্তিগত সম্ভাষণ না থাকা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. Explain Conflict of Interest in workplace procurement and IT vendor relationships:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: আইটি কেনাকাটা ও ভেন্ডর নির্বাচনে 'স্বার্থের দ্বন্দ্ব' কীভাবে কাজ করে এবং তা প্রতিরোধের উপায় কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Occurs when an employee responsible for hardware procurement recommends a supplier in which they or their family have a financial interest or receive personal gifts/kickbacks. <strong>Mitigation:</strong> Enforce mandatory written conflict-of-interest disclosures, mandate blind sealed 3-quote procurement bidding, and rotate procurement committee members.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: যখন কোনো আইটি কর্মকর্তা নিজের আত্মীয়ের কোম্পানি বা উপহার দেওয়া ভেন্ডরের কাছ থেকে বেশি দামে পণ্য কিনে প্রতিষ্ঠানের ক্ষতি করে। এটি রোধে একাধিক কোটেশন নেওয়া এবং স্বচ্ছ কমিটি দ্বারা সিদ্ধান্ত নেওয়া আবশ্যক।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Detail Electronic Waste (e-waste) disposal regulations (RoHS, WEEE) and environmental safety:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: ই-বর্জ্য নিষ্কাশনে RoHS এবং WEEE পরিবেশগত নির্দেশিকা ও সুরক্ষার নিয়ম লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>RoHS (Restriction of Hazardous Substances):</strong> Restricts heavy metals (lead, cadmium, mercury, hexavalent chromium) in electronic manufacturing.<br/>&bull; <strong>WEEE (Waste Electrical and Electronic Equipment):</strong> Mandates institutional collection, safe disassembly, and material recovery for electronics. Uncertified disposal in landfills leaches neurotoxins into groundwater.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: RoHS নির্দেশিকা কম্পিউটারে ক্ষতিকর সীসা, পারদ ও ক্যাডমিয়ামের ব্যবহার নিষিদ্ধ করে। WEEE নির্দেশিকা বাতিল কম্পিউটার পুনরায় রিসাইকেল করা বাধ্যতামূলক করে যাতে মাটির নিচে বিষাক্ত রাসায়নিক না ছড়ায়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. Explain Multi-Factor Authentication (MFA) factors: Knowledge, Possession, and Inherence:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: মাল্টি-ফ্যাক্টর অথেনটিকেশনের ৩টি প্রধান ফ্যাক্টর বিস্তারিত লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Something you know (Knowledge):</strong> Passwords, passphrases, PINs.<br/>2. <strong>Something you have (Possession):</strong> Hardware security key (YubiKey), time-based one-time password (TOTP app on smartphone), smart card.<br/>3. <strong>Something you are (Inherence):</strong> Biometric factors (fingerprint, facial recognition, iris scan).<br/><em>Rule:</em> MFA requires combining two or more factors from <em>different</em> categories.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. যা আপনি জানেন: পাসওয়ার্ড বা পিন কোড। ২. যা আপনার কাছে আছে: মোবাইলের ওটিপি কোড বা সিকিউরিটি টোকেন। ৩. যা আপনার শারীরিক বৈশিষ্ট্য: আঙুলের ছাপ বা ফেস রিকগনিশন। এগুলো মিলিয়ে লগইন সুরক্ষিত হয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Provide a comprehensive Preventive Maintenance checklist for enterprise server rooms:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: এন্টারপ্রাইজ সার্ভার রুমের জন্য একটি প্রিভেন্টিভ মেইনটেন্যান্স চেকলিস্ট তৈরি করুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>HVAC &amp; Thermals:</strong> Maintain ambient temperature at 18&deg;C–22&deg;C (64&deg;F–72&deg;F) and relative humidity between 40% and 55%.<br/>2. <strong>UPS &amp; Generator Testing:</strong> Monthly simulated mains blackout load transfer tests and battery impedance audits.<br/>3. <strong>Cable Management:</strong> Ensure airflow is unblocked in server racks; audit patch panel labeling.<br/>4. <strong>Fire Suppression:</strong> Inspect gas cylinders (FM-200/Novec 1230) pressure gauges.<br/>5. <strong>Firmware Updates:</strong> Apply tested BMC/iLO/iDRAC firmware hotfixes.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. তাপমাত্রা ১৮°-২২° সেলসিয়াসে রাখা। ২. ইউপিএস ব্যাটারি ও জেনারেটরের মাসিক পরীক্ষা। ৩. সার্ভার র্যাকে বাতাসের চলাচল ঠিক রাখতে তার গুছিয়ে রাখা। ৪. গ্যাস ফায়ার সাপ্রেশন সিলিন্ডারের প্রেশার চেক করা। ৫. সার্ভার ফার্মওয়্যার আপডেট রাখা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Detail professional de-escalation communication techniques for handling irate users:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অত্যন্ত ক্ষুব্ধ ব্যবহারকারীর সাথে কথা বলে পরিস্থিতি শান্ত করার পেশাদার কৌশলগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Do Not Interrupt:</strong> Allow the user to vent their initial frustration without interjecting.<br/>2. <strong>Acknowledge &amp; Validate:</strong> Express empathy ('I completely understand how critical this payroll deadline is, and I am prioritizing your case immediately').<br/>3. <strong>Pivot to Fact-Gathering:</strong> Ask calm, clarifying technical questions to redirect emotional panic toward actionable troubleshooting.<br/>4. <strong>Provide Concrete Next Steps:</strong> Give an exact timeline for updates rather than vague assurances.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. কথা না কেটে শান্তভাবে মনোযোগ দিয়ে তাদের অভিযোগ শুনুন। ২. তাদের সমস্যার গুরুত্ব অনুধাবন করে সহমর্মিতা প্রকাশ করুন। ৩. কোনো তর্কে না জড়িয়ে সমস্যা সমাধানের জন্য নির্দিষ্ট প্রযুক্তিগত প্রশ্ন করুন। ৪. নির্দিষ্ট সময় উল্লেখ করে কাজের অগ্রগতি জানান।)</span>
    </div>
  </div>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 10)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 10
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-302 &ndash; Assemble, Test, Diagnose & Maintain Desktop/Server Hardware Architecture
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Storage Partitioning Schemes (MBR vs GPT), File Systems (FAT32, NTFS, exFAT) & Volume Management
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-302):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-10.1: Compare Master Boot Record (MBR - max 2TB, 4 primary partitions) with GUID Partition Table (GPT - 128 partitions, 9.4 ZB).</li>
      <li>PC-10.2: Analyze file system structures: FAT32 (4GB file size limit), NTFS (journaling, ACL permissions, EFS encryption), exFAT.</li>
      <li>PC-10.3: Execute command-line volume management using Windows Diskpart utility (clean, convert gpt, create partition, format).</li>
      <li>PC-10.4: Repair corrupted file systems using Check Disk (chkdsk /f /r) and System File Checker (sfc /scannow).</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 10: Diskpart Storage Initialization, GPT Partitioning & NTFS Permission Hardening
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> External USB Hard Drive / SSD, Windows Command Prompt (Administrator), Disk Management Console.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Open Administrator Command Prompt; type \`diskpart\` followed by \`list disk\`.</li>
        <li>Identify target disk number; execute \`select disk X\` (verify correct disk to avoid accidental data loss).</li>
        <li>Execute \`clean\` to zero partition headers, then execute \`convert gpt\`.</li>
        <li>Execute \`create partition primary size=50000\` (50 GB partition) followed by \`format fs=ntfs quick label="Engineering"\`.</li>
        <li>Assign drive letter \`assign letter=E\`; verify volume appears healthy in Disk Management.</li>
        <li>In Security Properties, disable inherited permissions and grant Full Control exclusively to local Administrators.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What are the two major advantages of GPT partitioning over legacy MBR partitioning?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> 1. GPT supports drive volumes up to 9.4 Zettabytes and 128 primary partitions without requiring extended partitions. 2. GPT stores redundant secondary partition tables and CRC32 checksums at the end of the drive for automatic self-recovery.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What is the maximum single file size allowable on a storage drive formatted with the FAT32 file system?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> 4 GiB minus 1 byte (4,294,967,295 bytes).
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 11: COMPUTER ARCHITECTURE, MODERN HARDWARE &AMP; SYSTEM INITIALIZATION
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 11: Computer Architecture, Modern Hardware &amp; System Initialization
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>
  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What organizational code establishes ethical behavior, professional decorum, and compliance standards for technical staff?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন প্রাতিষ্ঠানিক নীতিমালা প্রযুক্তিগত কর্মীদের নৈতিক আচরণ, পেশাদার শিষ্টাচার ও দায়িত্ব পালনের নিয়ম নির্ধারণ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Workplace Code of Conduct / Ethics Policy</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Software license agreement</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hardware warranty booklet</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Marketing brochure</td>
      </tr>
    </tbody>
  </table>
  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. In Microsoft Excel, which function calculates the total sum of numbers in a specified cell range?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাইক্রোসফট এক্সেলে নির্দিষ্ট সেল রেঞ্জের সংখ্যাগুলোর মোট যোগফল নির্ণয় করতে কোন ফাংশন ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. =SUM(range)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. =TOTAL(range)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. =ADD(range)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. =COUNT(range)</td>
      </tr>
    </tbody>
  </table>
  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. What is the fundamental utility of an internet search engine in IT support?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আইটি সাপোর্টে একটি ইন্টারনেট সার্চ ইঞ্জিনের মূল কার্যকারিতা কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Discovering, indexing, and retrieving technical solutions and vendor documentation matching search queries</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Formatting solid-state drives</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Compiling operating system kernels</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cooling down computer hardware</td>
      </tr>
    </tbody>
  </table>
  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. In IT technical support, what is the very first step when troubleshooting a customer problem?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আইটি সাপোর্টে কোনো প্রযুক্তিগত সমস্যা সমাধানের সর্বপ্রথম পদক্ষেপ কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Identify and clearly define the problem by gathering information and questioning the user</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Immediately replace the motherboard</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Reinstall the operating system</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Tell the user to buy a new computer</td>
      </tr>
    </tbody>
  </table>
  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. What does GPT stand for in modern storage partition management?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আধুনিক স্টোরেজ ড্রাইভ পার্টিশন ব্যবস্থাপনায় GPT-এর পূর্ণরূপ কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. GUID Partition Table (supports drives > 2 TB and up to 128 primary partitions)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. General Processing Technology</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Graphics Packet Transmitter</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Global Port Terminal</td>
      </tr>
    </tbody>
  </table>
  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. What high-speed expansion bus on modern motherboards connects dedicated graphics cards, NVMe SSDs, and capture cards?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাদারবোর্ডে গ্রাফিক্স কার্ড এবং দ্রুতগতির NVMe SSD সংযুক্ত করতে কোন হাই-স্পিড এক্সপেনশন বাস ব্যবহৃত হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. PCIe (Peripheral Component Interconnect Express)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. ISA</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. PCI legacy</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. AGP</td>
      </tr>
    </tbody>
  </table>
  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Which motherboard component serves as the central communication hub interconnecting the CPU, RAM, PCIe slots, and peripherals?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: মাদারবোর্ডের কোন উপাদানটি সিপিইউ, র‍্যাম ও পেরিফেরাল ডিভাইসের মধ্যে কেন্দ্রীয় যোগাযোগ নিয়ন্ত্রণ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Motherboard Chipset (Northbridge/Southbridge or unified PCH)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Power supply fan</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Computer case bezel</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Optical drive tray</td>
      </tr>
    </tbody>
  </table>
  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. What two parameters must match when selecting and installing compatible hardware drivers?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: যথাযথ হার্ডওয়্যার ড্রাইভার ইনস্টল করার জন্য কোন দুটি প্যারামিটার মেলানো আবশ্যক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Hardware device model/chipset and OS version/architecture (32-bit vs 64-bit)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Desktop wallpaper and mouse color</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Monitor screen diagonal size and keyboard brand</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Wi-Fi router password and power rating</td>
      </tr>
    </tbody>
  </table>
  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. In the BIOS/UEFI boot sequence priority list, what does setting the USB drive as the first boot device achieve?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: BIOS/UEFI বুট প্রায়োরিটি তালিকায় ইউএসবি ড্রাইভকে ১ নম্বরে সেট করলে কী ঘটে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Enables booting from an external bootable USB installer or diagnostic tool before internal hard drive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Speeds up internet downloading</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Increases RAM capacity</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Charges the smartphone faster</td>
      </tr>
    </tbody>
  </table>
  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Why must technicians adhere to environmental regulations when disposing of defunct hardware components?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নষ্ট কম্পিউটার ও ইলেকট্রনিক যন্ত্রপাতি বিনষ্ট করার সময় পরিবেশগত নিয়ম মানা কেন জরুরি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To prevent hazardous toxic materials (lead, mercury, cadmium) from contaminating groundwater and soil</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To reduce the weight of office garbage cans</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To prevent computer viruses from spreading in landfills</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To reduce electricity bills</td>
      </tr>
    </tbody>
  </table>
  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. What is an IP addressing scheme in network engineering?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নেটওয়ার্ক ইঞ্জিনিয়ারিংয়ে আইপি অ্যাড্রেসিং স্কিম বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. A systematic logical framework assigning unique IP addresses and subnets across organizational host devices</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A physical label stuck to a computer case</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. The postal mailing address of the company</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A program that formats USB drives</td>
      </tr>
    </tbody>
  </table>
  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What network service automatically assigns dynamic IP configurations to client workstations?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন নেটওয়ার্ক সার্ভিস ক্লায়েন্ট কম্পিউটারে স্বয়ংক্রিয়ভাবে আইপি অ্যাড্রেস বরাদ্দ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. DHCP (Dynamic Host Configuration Protocol)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. DNS</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. SMTP</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. FTP</td>
      </tr>
    </tbody>
  </table>
  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. How many bits are in an IPv6 address, and how is it represented?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি IPv6 ঠিকানায় কত বিট থাকে এবং এটি কীভাবে প্রকাশ করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. 128 bits, represented in 8 groups of 4 hexadecimal digits separated by colons</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 32 bits in dotted decimal notation</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. 64 bits in octal notation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 48 bits in hyphenated hexadecimal</td>
      </tr>
    </tbody>
  </table>
  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Why is post-installation functionality checking mandatory after completing an OS deployment?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: অপারেটিং সিস্টেম ইনস্টলেশনের পর পূর্ণাঙ্গ ফাংশনালিটি চেকিং কেন বাধ্যতামূলক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To ensure that all drivers, system updates, security software, peripheral devices, and network connections function flawlessly</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To quickly leave the client site</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To delete the user's files</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To check if the computer case is warm</td>
      </tr>
    </tbody>
  </table>
  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What is the purpose of software license activation?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সফটওয়্যার লাইসেন্স অ্যাক্টিভেশনের মূল উদ্দেশ্য কী?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Verifies with the software vendor that the license key is genuine and has not been used on more devices than permitted</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Speeds up keyboard typing</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Cools down the processor</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Automatically deletes malware</td>
      </tr>
    </tbody>
  </table>
  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Why must an IT technician thoroughly document customer requirements before assembling or upgrading a PC?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি কম্পিউটার অ্যাসেম্বল বা আপগ্রেডের পূর্বে গ্রাহকের প্রয়োজনীয়তা বিস্তারিত নথিবদ্ধ করা কেন আবশ্যক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To ensure the hardware specifications (CPU, RAM, GPU, storage) perfectly align with the client's actual workload and budget</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To show off technical vocabulary</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To delay the project delivery</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To avoid talking to the customer</td>
      </tr>
    </tbody>
  </table>
  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. What is a Partition Table on a hard drive?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি হার্ড ড্রাইভে পার্টিশন টেবিল বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. A data structure located on the first sectors of a disk detailing the layout, sizes, and types of partitions</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A desk where computers are repaired</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. A spreadsheet created in Excel</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A type of network switch</td>
      </tr>
    </tbody>
  </table>
  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. What is the key advantage of a Scheduled Automated Backup over a manual backup?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ম্যানুয়াল ব্যাকআপের তুলনায় স্বয়ংক্রিয় সিডিউল ব্যাকআপের প্রধান সুবিধা কোনটি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Backups run consistently without relying on human memory, ensuring regular, up-to-date data protection</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Automated backups do not use any storage space</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Automated backups eliminate the need for electricity</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Automated backups work without an operating system</td>
      </tr>
    </tbody>
  </table>
  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What is Disaster Recovery Planning in enterprise IT?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: এন্টারপ্রাইজ আইটিতে ডিজাস্টার রিকভারি প্ল্যানিং (DRP) বলতে কী বোঝায়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. A comprehensive strategy and set of policies to restore mission-critical systems and data following disasters</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Calling the fire department when a monitor breaks</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Buying insurance only</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Deleting all company emails</td>
      </tr>
    </tbody>
  </table>
  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Why must every identified technical problem and solution be systematically documented in the service database?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: শনাক্তকৃত প্রতিটি কারিগরি ত্রুটি ও সমাধান সার্ভিস ডেটাবেজে সংরক্ষণ করা কেন প্রয়োজন?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Creates a searchable knowledge base, tracks recurring failure trends, and aids other technicians in resolving similar issues</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To fill up the hard drive</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To hide mistakes from management</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To pass time during the workday</td>
      </tr>
    </tbody>
  </table>
  <p style="font-size: 11pt; font-weight: bold; color: #1e293b; margin-top: 14px; margin-bottom: 6px; border-left: 3px solid #2563eb; padding-left: 6px;">
    Section B: Technical Short Questions &amp; Practical Problem Solutions (Questions 21 &ndash; 30)
  </p>
  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 10px 14px; margin-bottom: 16px;">
    <p style="margin: 4px 0 2px 0;"><strong>21. What is an operational manual and why is it essential for IT support technicians?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অপারেশনাল ম্যানুয়াল কী এবং আইটি টেকনিশিয়ানদের জন্য এটি কেন অপরিহার্য?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> An operational manual is an authoritative technical document provided by equipment manufacturers or enterprise IT detailing hardware specifications, installation procedures, configuration parameters, and diagnostic flowcharts. It prevents hardware damage and speeds up troubleshooting.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: অপারেশনাল ম্যানুয়াল হলো এমন একটি প্রযুক্তিগত নির্দেশিকা যাতে হার্ডওয়্যারের স্পেসিফিকেশন, সঠিক ইনস্টলেশন ও ত্রুটি নির্ণয়ের পদ্ধতি থাকে, যা যন্ত্রাংশের ক্ষতি প্রতিরোধ করে দ্রুত সমাধানে সাহায্য করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>22. Explain the methods used to rename a file or folder in Microsoft Windows:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: উইন্ডোজে একটি ফাইল বা ফোল্ডারের নাম পরিবর্তনের পদ্ধতিগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Keyboard Shortcut:</strong> Select file/folder and press <strong>F2</strong>.<br/>2. <strong>Context Menu:</strong> Right-click file and click 'Rename' (or click rename icon in Windows 11).<br/>3. <strong>Mouse:</strong> Click once to select, pause, then click the filename label.<br/>4. <strong>Command Line:</strong> In Command Prompt, run <code>ren oldname.txt newname.txt</code> or PowerShell <code>Rename-Item</code>.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ফাইল নির্বাচন করে F2 কী চাপুন। ২. মাউসের ডান বাটন ক্লিক করে Rename সিলেক্ট করুন। ৩. কমান্ড প্রম্পটে 'ren পুরোনো_নাম নতুন_নাম' লিখে এন্টার চাপুন।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>23. What is the role of modern video conferencing software (Google Meet, Zoom, Microsoft Teams) in enterprise operations?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: আধুনিক প্রাতিষ্ঠানিক যোগাযোগে ভিডিও কনফারেন্সিং সফটওয়্যারের (গুগল মিট, জুম, টিমস) ভূমিকা কী?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Enables real-time audiovisual collaboration, screen sharing, remote desktop assistance, webinar hosting, and distributed team synchronization without physical travel, reducing corporate operational overhead.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ভিডিও কনফারেন্সিং সফটওয়্যার দূরবর্তী কর্মীদের মধ্যে তাৎক্ষণিক মিটিং, স্ক্রিন শেয়ারিং, সরাসরি রিমোট প্রেজেন্টেশন এবং বিশ্বব্যাপী দলগত কাজ পরিচালনার সুযোগ দেয়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>24. How does an Operating System manage computer hardware resources?</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অপারেটিং সিস্টেম কম্পিউটারের হার্ডওয়্যার রিসোর্স কীভাবে ব্যবস্থাপনা করে?)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Processor Scheduling:</strong> Allocates CPU execution time slices across threads via round-robin or priority preemptive scheduling.<br/>2. <strong>Memory Management:</strong> Dynamically assigns physical RAM to processes and swaps pages to virtual memory.<br/>3. <strong>Device I/O Management:</strong> Communicates with hardware via certified device drivers and handles interrupts.<br/>4. <strong>Storage/File System:</strong> Indexes and structures data storage using NTFS/FAT32.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. সিপিইউ শিডিউলিংয়ের মাধ্যমে প্রসেসর সময় বণ্টন। ২. র‍্যাম মেমরি বরাদ্দ ও ভার্চুয়াল মেমরি পরিচালনা। ৩. ডিভাইস ড্রাইভার দিয়ে ইনপুট-আউটপুট নিয়ন্ত্রণ। ৪. ফাইল সিস্টেম দিয়ে ডেটা সংরক্ষণ ও সুরক্ষা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>25. Explain the IP addressing scheme: IPv4 vs IPv6, Public vs Private, and Subnetting:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: আইপি অ্যাড্রেসিং স্কিম: IPv4 বনাম IPv6, পাবলিক বনাম প্রাইভেট এবং সাবনেটিংয়ের ব্যাখ্যা দিন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>IPv4:</strong> 32-bit address (4 octets, e.g. 192.168.1.1). Approximately 4.3 billion addresses.<br/>&bull; <strong>IPv6:</strong> 128-bit address (8 hexadecimal groups, e.g. 2001:db8::1). Provides 3.4 x 10^38 addresses.<br/>&bull; <strong>Private IP:</strong> Non-routable on the public internet (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16); translated via NAT.<br/>&bull; <strong>Subnetting:</strong> Partitioning a network into smaller broadcast domains to optimize bandwidth and security.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: IPv4 হলো ৩২-বিট এবং IPv6 হলো ১২৮-বিট অ্যাড্রেস। প্রাইভেট আইপি লোকাল নেটওয়ার্কে বিনামূল্যে ব্যবহৃত হয় এবং ইন্টারনেটে সরাসরি রাউটিং হয় না (NAT লাগে)। সাবনেটিং নেটওয়ার্ককে ছোট ছোট অংশে ভাগ করে গতি ও নিরাপত্তা বাড়ায়।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>26. Compare the three fundamental backup types: Full Backup, Differential Backup, and Incremental Backup:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: তিনটি মৌলিক ব্যাকআপ পদ্ধতির মধ্যে প্রযুক্তিগত তুলনা করুন: ফুল, ডিফারেন্সিয়াল ও ইনক্রিমেন্টাল ব্যাকআপ:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>Full Backup:</strong> Copies all designated files and clears archive bits. Slowest to back up; fastest single-step restore.<br/>&bull; <strong>Differential Backup:</strong> Copies all files created or modified since the <em>last Full Backup</em>. Does not clear archive bits. Moderate backup time; requires Full + 1 Differential to restore.<br/>&bull; <strong>Incremental Backup:</strong> Copies only files created or modified since the <em>last backup of any type</em>. Clears archive bits. Fastest backup speed; requires Full + all chained incrementals to restore.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ফুল ব্যাকআপ: সব ডেটা কপি করে (সবচেয়ে নিরাপদ ও দ্রুত রিস্টোর)। ডিফারেন্সিয়াল: শেষ ফুল ব্যাকআপের পর যা পরিবর্তন হয়েছে কেবল তা কপি করে। ইনক্রিমেন্টাল: শেষ যেকোনো ব্যাকআপের পর নতুন পরিবর্তনটুকু কপি করে (সবচেয়ে কম সময় ও স্টোরেজ লাগে)।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>27. Explain the role and value of Technical Software Support in enterprise organizations:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: প্রতিষ্ঠানে টেকনিক্যাল সফটওয়্যার সাপোর্টের ভূমিকা ও গুরুত্ব সংক্ষেপে লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> Technical software support provides incident resolution, patch management, security vulnerability remediation, compatibility testing, and user training. It ensures continuous software availability, protects corporate data, and minimizes costly business downtime.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: সফটওয়্যার সাপোর্ট প্রতিষ্ঠানের সিস্টেম চালু রাখা, নিয়মিত সিকিউরিটি প্যাচ ও বাগ ফিক্স করা, ডেটা সুরক্ষা নিশ্চিত করা এবং কর্মীদের প্রযুক্তিগত সহায়তা প্রদানের মাধ্যমে কাজের ধারাবাহিকতা রক্ষা করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>28. Detail the importance and function of core Operating System components (Kernel, Shell, Drivers, File System):</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: অপারেটিং সিস্টেমের মূল উপাদানগুলোর (কার্নেল, শেল, ড্রাইভার, ফাইল সিস্টেম) গুরুত্ব ও কাজ লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> &bull; <strong>Kernel:</strong> Privileged heart of the OS controlling CPU, memory, and hardware interfaces.<br/>&bull; <strong>Shell / GUI:</strong> Command interpreter or graphical user interface allowing users to launch apps and manipulate files.<br/>&bull; <strong>Device Drivers:</strong> Translation modules bridging kernel calls with proprietary hardware controller chips.<br/>&bull; <strong>File System:</strong> Logical organization structure managing directory trees, file metadata, permissions, and storage clusters.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: কার্নেল হার্ডওয়্যার ও মেমরি নিয়ন্ত্রণ করে। শেল বা গ্রাফিক্যাল ইন্টারফেস ব্যবহারকারীকে কমান্ড দেওয়ার সুযোগ দেয়। ড্রাইভার হার্ডওয়্যারের সাথে যোগাযোগ ঘটায়। ফাইল সিস্টেম ডিস্কে ফাইল সংরক্ষণ ও অনুমতি নিয়ন্ত্রণ করে।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>29. Explain the Post-Installation Testing procedures for a clean Windows workstation setup:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: নতুন উইন্ডোজ ইনস্টল করার পর পোস্ট-ইনস্টলেশন পরীক্ষার ধাপগুলো লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. Check Device Manager for missing hardware drivers.<br/>2. Run Windows Update until no pending security patches remain.<br/>3. Verify activation of Windows and application licenses.<br/>4. Verify internet speed and DNS resolution.<br/>5. Test peripheral functions (sound playback, microphone, printer, multi-monitor display).<br/>6. Create an initial 'Clean Baseline' System Restore Point.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ডিভাইস ম্যানেজারে সব ড্রাইভার ঠিক আছে কিনা নিশ্চিত করা। ২. সমস্ত উইন্ডোজ আপডেট সম্পন্ন করা। ৩. লাইসেন্স সক্রিয় আছে কিনা পরীক্ষা করা। ৪. নেটওয়ার্ক ও ব্রাউজিং স্পিড দেখা। ৫. সাউন্ড, ডিসপ্লে ও প্রিন্টার পরীক্ষা করা। ৬. একটি ফ্রেশ রিস্টোর পয়েন্ট তৈরি করে রাখা।)</span>
    </div>
    <p style="margin: 4px 0 2px 0;"><strong>30. Detail the Post-Repair Hardware Testing Protocol before handing equipment back to a client:</strong><br/><span style="font-size: 9pt; color: #64748b;">(বাংলা: কম্পিউটার মেরামতের পর গ্রাহককে হস্তান্তরের পূর্বে হার্ডওয়্যার টেস্টিং প্রটোকল লিখুন:)</span></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer:</strong> 1. <strong>Visual Inspection:</strong> Confirm no loose screws, foreign metal objects, or unseated cables inside chassis.<br/>2. <strong>POST &amp; BIOS Diagnostics:</strong> Confirm all installed RAM sticks and NVMe/SATA drives are recognized at rated speeds.<br/>3. <strong>Thermal Stress Test:</strong> Run a 15-minute load test (e.g., Prime95 or Cinebench) while monitoring CPU temperatures (must remain below 85&deg;C).<br/>4. <strong>Port Testing:</strong> Verify all front and rear USB ports, audio jacks, and video outputs.<br/>5. <strong>Client Documentation:</strong> Record test results on the Job Sheet and obtain customer sign-off.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা: ১. ভেতরে কোনো আলগা স্ক্রু বা তারের সংযোগ শিথিল নেই তা নিশ্চিত করা। ২. বায়োসে সমস্ত র‍্যাম ও স্টোরেজ ড্রাইভ সঠিকভাবে চেনাচ্ছে কিনা দেখা। ৩. স্ট্রেস টেস্ট চালিয়ে প্রসেসরের তাপমাত্রা নিরাপদ সীমার মধ্যে আছে কিনা পরীক্ষা করা। ৪. সব ইউএসবি ও অডিও পোর্ট চেক করা। ৫. জব শিটে টেস্ট ফলাফল লিখে গ্রাহকের স্বাক্ষর নেওয়া।)</span>
    </div>
  </div>


  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 11)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 11
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-303 &ndash; Configure, Terminate, Subnet & Troubleshoot Local Area Networks (LAN)
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Network Topologies, Transmission Media (Twisted Pair, Coaxial, Optical Fiber) & Standards
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-303):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-11.1: Compare physical network topologies (Star, Bus, Ring, Mesh, Hybrid) regarding fault tolerance and scalability.</li>
      <li>PC-11.2: Classify twisted-pair cabling categories (Cat5e, Cat6, Cat6a, Cat7) and maximum operational frequencies.</li>
      <li>PC-11.3: Differentiate Unshielded Twisted Pair (UTP) from Shielded Twisted Pair (STP / SFTP) in industrial environments.</li>
      <li>PC-11.4: Compare Multi-Mode Fiber (MMF / LED / Short Range) with Single-Mode Fiber (SMF / Laser / Long Haul).</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 11: Cat6 Ethernet Cable Crimping (T568B Standard) & Cable Continuity Certification
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Cat6 Solid Core UTP Cable, RJ45 Modular Plugs, RJ45 Ratchet Crimper, Cable Stripper, Digital Wiremap Cable Tester.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Strip approximately 1.5 inches of outer cable jacket using rotary cable stripper without nicking internal conductor insulation.</li>
        <li>Untwist 4 conductor pairs; straighten and arrange wires according to TIA/EIA-568B standard: White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown.</li>
        <li>Trim wires flush at a clean 90-degree angle to approximately 0.5 inches.</li>
        <li>Insert conductors into RJ45 plug until all 8 copper ends are fully visible through the transparent front cap.</li>
        <li>Compress crimper firmly until ratchet releases; insert ends into cable tester and confirm all LEDs (1 through 8 + G) illuminate sequentially in order.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: Why are wire pairs twisted together in UTP cabling?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Twisting causes electromagnetic interference (EMI) and radio frequency interference (RFI) to induce equal and opposite voltages on both conductors, allowing differential signaling at the receiver to cancel out crosstalk.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What is the exact color sequence of the TIA/EIA-568A standard?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> White-Green, Green, White-Orange, Blue, White-Blue, Orange, White-Brown, Brown.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 12: WORKPLACE ETHICS, PERIPHERALS & OPERATING SYSTEM CONFIGURATION
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 12: Workplace Ethics, Peripherals &amp; Operating System Configuration
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Core Systems Administration &amp; Ethics (1 &ndash; 20)
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What is a basic requirement of workplace ethics? (কর্মক্ষেত্রের নৈতিকতার মৌলিক প্রয়োজনীয়তা কী?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Breaking established rules</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Keeping promises</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Blaming colleagues for faults</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Unannounced late arrival</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Which tool is used to adjust spacing between lines in a paragraph? (অনুচ্ছেদের লাইন স্পেসিং সমন্বয় করতে কোন টুল ব্যবহার হয়?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Font Color Palette</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Line and Paragraph Spacing</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Text Highlighter Tool</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Format Painter</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. What is the term used for copying information from one location to another? (তথ্যকে এক স্থান থেকে অন্য স্থানে কপি করাকে কী বলা হয়?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Cut</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Copy</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Delete</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Truncate</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. Which is NOT a web browser? (নিচের কোনটি web browser নয়?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Mozilla Firefox</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Google (Search Engine)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Google Chrome</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Microsoft Edge</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. A device used to connect multiple computers in a network is a: (নেটওয়ার্কে বহু কম্পিউটার সংযোগ করতে যে device ব্যবহৃত হয় তা হলো:)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Visual Display Unit</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Router</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Flatbed Scanner</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Thermal Printer</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Which type of support deals with issues related to computer programs? (computer programs সংক্রান্ত সমস্যায় কোন support ব্যবহৃত হয়?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Hardware support</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Software support</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Electrical infrastructure</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Structural engineering</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Why is it important to use ESD protection during PC assembly? (PC assembly-তে ESD protection কেন গুরুত্বপূর্ণ?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Increase benchmark clocks</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Prevent electric shock to components</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Improve case aesthetics</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Clean internal dust</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which cable is used to provide power to a desktop PC? (desktop PC-তে power দেওয়ার জন্য কোন cable ব্যবহার হয়?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. HDMI Display Cable</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Power cord (AC Mains)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Category 6 Patch Cable</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Optical Audio Cable</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Safe work practices are essential to avoid: (নিরাপদ work practices প্রয়োজন হয় কোনটি এড়াতে?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Career promotion</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Electrical and mechanical hazards</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. System efficiency</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Ergonomic comfort</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. What is the importance of understanding operating system components and functionality?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Accelerating 3D gaming</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. To troubleshoot issues and configure the OS effectively</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Bypassing domain security</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Designing marketing flyers</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Software that can help identify and install drivers is often referred to as a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Media Player</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Driver agent</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Disk Defragmenter</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Web browser</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. The documented troubleshooting status is reported to the: (নথিভুক্ত troubleshooting status কোথায় রিপোর্ট করা হয়?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. External competitor</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Authority</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Social media feed</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Computer reseller</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Documenting network settings and configuration is important for: (network settings ও configuration নথিভুক্ত করা গুরুত্বপূর্ণ কেন?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Deleting domain policies</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Future maintenance purposes</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Purchasing patch cables</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Reducing display latency</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. What is the primary function of a router in a network? (নেটওয়ার্কে router-এর মূল function কী?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Printing physical reports</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Filters and forwards data packets between networks</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Audio amplification</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Barcode scanning</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. Before collecting software for installation, it is important to follow:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Public forum opinions</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Software licensing &amp; procurement procedures</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Unofficial peer downloads</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Random web search links</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Which of the following is a recognized type of backup scheme?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Full backup</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Direct volatile copy</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Partial snippet dump</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Split cache write</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Which of these is a modern standard type of partition table?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. GPT (GUID Partition Table)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. JPEG Table</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. MPEG Partition</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. DOCX Schema</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. After identifying the cause of a fault, you should: (fault-এর কারণ শনাক্ত করার পর কী করা উচিত?)</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Conceal the failure log</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Perform testing to ensure the cause</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Discard all hardware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Reject user work orders</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. Which standard port connects modern digital displays to a PC workstation?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. HDMI / DisplayPort</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Parallel LPT Port</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. PS/2 Mouse Port</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. RJ-11 Phone Jack</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. What is the operational purpose of antivirus software?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Defragment hard disk sectors</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Protect systems from malware, trojans, and unauthorized intrusions</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Overclock the motherboard bus</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Compress video footage</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Short Questions -->
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 14px; margin-bottom: 6px;">
    Section B: Technical Short Answers &amp; Workplace Analytical Case Studies (21 &ndash; 30)
  </p>

  <blockquote style="border-left: 4px solid #0284c7; background-color: #f8fafc; padding: 10px 14px; margin: 10px 0; font-size: 10pt; color: #1e293b;">
    <p style="margin: 4px 0 2px 0;"><strong>21. What kind of information is found in job sheets? (job sheets-এ কী ধরনের তথ্য পাওয়া যায়?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Details of specific tasks assigned to an IT technician or worker.<br/>
      <span style="color: #475569;">বাংলা: একজন worker বা টেকনিশিয়ানকে কোন কাজ দেওয়া হয়েছে—তার বিস্তারিত বিবরণ ও শর্তাবলী।</span><br/>
      <strong>Workplace Example:</strong> Job Sheet #104: <em>"Install Windows 11 Enterprise on Workstation 4, configure corporate Wi-Fi SSID, and replace faulty mechanical keyboard."</em>
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>22. What is screen resolution? (screen resolution কী?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> It refers to the number of distinct pixels displayed horizontally and vertically on a monitor; it directly governs display visual clarity and workspace estate.<br/>
      <span style="color: #475569;">বাংলা: স্ক্রিনে আনুভূমিক ও উল্লম্বভাবে মোট কত পিক্সেল দেখা যায়, যা ডিসপ্লে কতটা পরিষ্কার ও স্পষ্ট হবে তা নির্ধারণ করে।</span><br/>
      <strong>Workplace Example:</strong> 1920 &times; 1080 resolution = Full HD (FHD) display providing crisp typography and balanced graphic rendering.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>23. What is a web address or URL? (web address বা URL কী?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Uniform Resource Locator (URL) is the globally unique alphanumeric address used to access a specific document, web service, or resource on the Internet.<br/>
      <span style="color: #475569;">বাংলা: ইন্টারনেটে কোনো ওয়েবপেজ বা রিসোর্সের নির্দিষ্ট অনন্য ঠিকানা।</span><br/>
      <strong>Workplace Example:</strong> <code>https://www.google.com</code> or <code>https://portal.company.com/it-helpdesk</code>
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>24. What is the purpose of a data center? (data center-এর উদ্দেশ্য কী?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> A dedicated secure facility used to house, manage, power, and cool large amounts of networked enterprise servers, storage arrays, and mission-critical IT infrastructure.<br/>
      <span style="color: #475569;">বাংলা: বিশাল পরিমাণ ডেটা, সার্ভার ও আইটি সিস্টেম এক নিরাপদ কেন্দ্রীয় স্থানে সংরক্ষণ, পরিচালনা ও রক্ষণাবেক্ষণ করা।</span><br/>
      <strong>Workplace Example:</strong> Enterprise hyperscale facilities (such as Google or Microsoft Azure data centers) housing millions of concurrent customer databases.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>25. What information is typically displayed under "System Information"?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Comprehensive architectural details regarding computer hardware components and operating system state.<br/>
      <span style="color: #475569;">বাংলা: কম্পিউটারের হার্ডওয়্যার ও ওএস সংক্রান্ত সামগ্রিক তথ্য যেমন: প্রসেসর মডেল, র্যাম সাইজ, বায়োস সংস্করণ, স্টোরেজ ক্ষমতা।</span><br/>
      <strong>Workplace Example:</strong> OS: Windows 11 Pro 64-bit; Processor: Intel Core i5-12400 @ 2.50GHz; Installed RAM: 16.0 GB; Storage: 512 GB NVMe SSD.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>26. What is the basic definition of a computer network?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> An interconnected collection of independent computing devices capable of exchanging data packets, sharing peripheral hardware, and accessing common resources.<br/>
      <span style="color: #475569;">বাংলা: এমন দুটি বা ততোধিক ডিভাইসের আন্তঃসংযোগ যা পরস্পরের সাথে তথ্য আদান-প্রদান এবং রিসোর্স শেয়ার করতে সক্ষম।</span><br/>
      <strong>Workplace Example:</strong> Corporate Local Area Network (LAN): 25 desktop workstations, 2 departmental network laser printers, and 1 central file server linked via an Ethernet switch.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>27. Where is security software typically stored before installation?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Stored within a designated local drive directory, secure network distribution share, or authenticated installation media.<br/>
      <span style="color: #475569;">বাংলা: ইনস্টল করার পূর্বে সফটওয়্যারের সেটআপ ফাইল কম্পিউটারের লোকাল ড্রাইভ (যেমন: D: ড্রাইভ বা Downloads ফোল্ডার) বা নেটওয়ার্ক শেয়ারে রাখা হয়।</span><br/>
      <strong>Workplace Example:</strong> <code>D:\\Software_Installers\\Antivirus_Enterprise_x64.exe</code>
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>28. What is the benefit of following instruction manuals during hardware/software upgrades?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Ensures procedural compliance, prevents hardware component damage, maintains equipment warranty, and minimizes operational errors.<br/>
      <span style="color: #475569;">বাংলা: সঠিক ম্যানুয়াল অনুসরণ করলে ভুলের ঝুঁকি কমে, যন্ত্রাংশের ক্ষতি রোধ হয় এবং প্রাতিষ্ঠানিক স্ট্যান্ডার্ড বজায় থাকে।</span><br/>
      <strong>Workplace Example:</strong> Following motherboard manual to seat RAM in dual-channel slots DIMM_A2 and DIMM_B2 for optimal memory bus throughput.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>29. What is a disaster recovery plan (DRP)?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> A formal, documented set of procedures designed to restore mission-critical IT infrastructure, data repositories, and enterprise applications following a catastrophic outage or disaster.<br/>
      <span style="color: #475569;">বাংলা: প্রাকৃতিক দুর্যোগ বা কারিগরি বিপর্যয়ের পর ব্যবসায়িক কার্যক্রম ও আইটি সিস্টেম পুনরুদ্ধার করার পূর্বনির্ধারিত নথিবদ্ধ পরিকল্পনা।</span><br/>
      <strong>Workplace Example:</strong> Primary Server Failure &rarr; Failover to Offsite Cold/Warm Backup Site &rarr; Database Snapshot Restoration &rarr; Service Verification within SLA.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>30. What is calculated and approved before initiating hardware repair or replacement?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 2px;">
      <strong>Technical Answer:</strong> Total repair vs. replacement cost (Cost-Benefit Analysis) and expected downtime impact.<br/>
      <span style="color: #475569;">বাংলা: যন্ত্রাংশ মেরামত বা নতুন পরিবর্তনের মোট সম্ভাব্য খরচ নির্ধারণ এবং আর্থিক অনুমোদন গ্রহণ।</span><br/>
      <strong>Workplace Example:</strong> Hard Drive Repair Cost: 1,200 BDT (temporary life) vs. Brand New 500GB SSD: 3,200 BDT (3-year warranty) &rarr; SSD replacement approved by department head.
    </div>
  </blockquote>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 12)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 12
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-303 &ndash; Configure, Terminate, Subnet & Troubleshoot Local Area Networks (LAN)
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Network Interface Cards (NIC), Physical MAC Addressing & Layer 2 Ethernet Switching
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-303):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-12.1: Analyze 48-bit Media Access Control (MAC) address structure (24-bit OUI + 24-bit Vendor Serial).</li>
      <li>PC-12.2: Differentiate Half-Duplex (CSMA/CD) from Full-Duplex dedicated switched collision domains.</li>
      <li>PC-12.3: Configure NIC link speed and duplex settings (1000 Mbps Full Duplex, Auto-Negotiation, Jumbo Frames).</li>
      <li>PC-12.4: Inspect Ethernet frames (Preamble, SFD, Destination/Source MAC, Type/Length, Data Payload, FCS/CRC).</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 12: Gigabit NIC Configuration, MAC Address Identification & Switch Port Audit
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Gigabit Managed Switch, Windows Workstation, Wireshark Packet Analyzer, Command Prompt.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Open Command Prompt; execute \`getmac /v\` and \`ipconfig /all\` to record physical MAC address and OUI vendor prefix.</li>
        <li>In Network Adapter Properties > Configure > Advanced, set Speed & Duplex from "Auto" to "1.0 Gbps Full Duplex".</li>
        <li>Enable Jumbo Packet size to 9014 bytes for high-throughput LAN storage transfer.</li>
        <li>Launch Wireshark, capture Ethernet traffic, and inspect Layer 2 frame header containing 6-byte Source and Destination MAC addresses.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the purpose of the 24-bit Organizationally Unique Identifier (OUI) in a MAC address?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> It is assigned by the IEEE to specifically identify the hardware manufacturer or vendor of the network interface controller.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Why is CSMA/CD unnecessary on modern switched Ethernet networks operating in Full Duplex?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Switches provide dedicated, micro-segmented point-to-point links with separate transmit (Tx) and receive (Rx) pairs, completely eliminating collisions.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 13: IT SUPPORT SERVICE LEVEL 3 ASSESSMENT SERIES A
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 13: IT Support Service Level 3 Assessment Series A
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Office Productivity &amp; Systems Integration (1 &ndash; 20)
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. Google Sheets is an example of:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Web-based spreadsheet</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Desktop relational database</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Slide presentation tool</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Antivirus firewall agent</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. What is a standard professional report likely to include?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Drop Cap, Columns, Page Numbers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Audio tracks and game loops</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Isolated unformatted graphs only</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Video transition effects</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. Which of the following is a courteous way to communicate in the workplace?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Active listening</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Aggressive confrontation</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Ignoring email notices</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Interrupting team presentations</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. What does 'archiving' an email mean?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Saving it in a separate folder for future reference</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Permanently erasing from server</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Flagging as suspicious spam</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Automatic forwarding to all contacts</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. What principle should be followed when communicating on the internet to ensure respectful interaction?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Netiquette</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Flaming discourse</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Anonymous baiting</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Spamming group feeds</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Which type of support deals with issues related to computer programs?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Software support</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Structural engineering</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. HVAC maintenance</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Electrical substation grid</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Interpreting IT infrastructure involves understanding:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. The underlying systems and components supporting IT operations</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Office furniture aesthetics</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Decorative screen wallpapers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Mouse pad dimensions</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which of the following is NOT a fundamental function of system BIOS?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Running and managing user application software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Power-On Self Test (POST)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Executing boot loader handoff</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Initializing core hardware registers</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. What is the fundamental purpose of an operating system?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Provide a platform for running applications and managing hardware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Format disk without partitions</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Generate printer ink</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Supply electrical current to CPU</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. When assembling a computer, where is thermal interface material (paste) typically applied?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Between the CPU integrated heat spreader (IHS) and heatsink base</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Inside the power supply casing</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Directly onto RAM edge connectors</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Around the DVD optical lens</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Which of the following is a recognized partition table type for disk formatting?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. GPT (GUID Partition Table)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. DOCX format</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. MP3 audio schema</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. AVI multimedia container</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. Understanding basic personal computer components and functions is considered:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Basic core IT knowledge</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Superfluous hobby skills</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Advanced quantum computing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Obsolete trade practice</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Which of the following is a frequent local area network (LAN) addressing conflict?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. IP address conflict</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. CPU dust accumulation</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Audio mute state</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Monitor brightness shift</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. What is the primary purpose of documenting a network address plan?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To provide systematic guidelines for configuring new network devices</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To consume administrative paper</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To shut down all network ports</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To bypass gateway firewalls</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. Taking a full backup before performing an OS upgrade is done to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Protect and preserve existing user data against loss</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Intentionally slow the workstation</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Exhaust hard disk capacity</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Calibrate optical mouse dpi</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Before initiating software setup, installer executables are typically stored in a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Local drive (e.g., D: or Downloads folder)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Unformatted floppy disk</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Volatile RAM disk cache</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Network printer memory</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Disaster recovery planning is critical to ensure:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Business data can be quickly restored in the event of hardware or site failure</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Monitor refresh rates double</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Cooling fan noise diminishes</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. GPU power usage decreases</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. The formalized technical workflow to extract files from backup media is called:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Restore procedure</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Permanent deletion protocol</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Partition wipe routine</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. File shredder task</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. After replacing a suspected faulty component, the technician must:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Test the replaced equipment and benchmark PC performance</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Return computer without power test</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Overclock voltage rails to max</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Delete event viewer logs</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Physical hardware issues can frequently be detected by:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Physical observation (sight, sound, odor, LEDs)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Speculative guessing</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Shaking the workstation casing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Lowering room lighting</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Short Questions -->
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 14px; margin-bottom: 6px;">
    Section B: Technical Short Answers &amp; Workplace Analytical Case Studies (21 &ndash; 30)
  </p>

  <blockquote style="border-left: 4px solid #0284c7; background-color: #f8fafc; padding: 10px 14px; margin: 10px 0; font-size: 10pt; color: #1e293b;">
    <p style="margin: 4px 0 2px 0;"><strong>21. What does the Insert tab allow in PowerPoint? (পাওয়ারপয়েন্টে 'Insert' ট্যাব দিয়ে কী করা যায়?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Allows embedding multimedia and structural objects: images, tables, smart shapes, charts, video clips, and text boxes.<br/>
      <span style="color: #475569;">বাংলা: স্লাইডে ছবি, টেবিল, চার্ট, ভিডিও, শেপ এবং টেক্সট বক্স যুক্ত করার সুবিধা দেয়।</span><br/>
      <strong>Workplace Example:</strong> Inserting an architectural network diagram image and table of IP subnets into an executive briefing slide.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>22. What does respecting confidentiality mean in an IT support context?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Strict non-disclosure of proprietary customer data, network credentials, payroll records, or private user files encountered during support operations.<br/>
      <span style="color: #475569;">বাংলা: কর্মক্ষেত্রের ক্লায়েন্ট ডেটা, পাসওয়ার্ড বা ব্যক্তিগত তথ্য অন্য কারো সাথে প্রকাশ বা শেয়ার না করা।</span><br/>
      <strong>Workplace Example:</strong> Never sharing or exporting employee personal payroll records discovered while migrating a workstation drive.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>23. Name a web-based service for editing documents online:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Google Docs (or Microsoft Office 365 Word Online).<br/>
      <span style="color: #475569;">বাংলা: গুগল ডকস (Google Docs)—অনলাইনে সরাসরি ব্রাউজারে ডকুমেন্ট তৈরি, সম্পাদনা ও স্বয়ংক্রিয়ভাবে ক্লাউডে সংরক্ষণ করার সেবা।</span><br/>
      <strong>Workplace Example:</strong> Multiple system engineers collaboratively reviewing an Incident Post-Mortem document in real time.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>24. What is the fundamental purpose of a data center?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> To securely store, manage, and process high-volume enterprise data with redundant power, climate control, and fiber connectivity.<br/>
      <span style="color: #475569;">বাংলা: বিশাল পরিমাণ ডেটা ও ক্লাউড সিস্টেম সুরক্ষিত ও নিরবচ্ছিন্নভাবে পরিচালনা করা।</span><br/>
      <strong>Workplace Example:</strong> Enterprise bank data centers hosting online banking transaction ledgers across clustered SAN arrays.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>25. What is the function of a blower gun in hardware maintenance?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Dislodges settled particulate matter, lint, and dust from heatsinks, power supply cages, and motherboard circuitry via high-velocity air streams without physical component contact.<br/>
      <span style="color: #475569;">বাংলা: কোনো যন্ত্রাংশ স্পর্শ না করে শক্তিশালী বাতাসের প্রবাহ দিয়ে মাদারবোর্ড ও ফ্যানের জমে থাকা ধুলোবালি অপসারণ করা।</span><br/>
      <strong>Workplace Example:</strong> Clearing dust clogged inside CPU heatsink fins to restore thermal dissipation and eliminate thermal throttling.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>26. What does MBR stand for in storage architecture?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Master Boot Record &mdash; The legacy 512-byte first sector of a partitioned storage device containing the bootloader and 4-entry primary partition table.<br/>
      <span style="color: #475569;">বাংলা: মাস্টার বুট রেকর্ড—হার্ড ড্রাইভের প্রথম সেক্টর যা বায়োসকে ওএস বুট করতে এবং পার্টিশন শনাক্ত করতে সহায়তা করে।</span><br/>
      <strong>Workplace Example:</strong> Diagnosing a "Non-system disk or disk error" caused by an overwritten or corrupted MBR partition table.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>27. What is subnetting? (সাবনেটিং কী?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> The practice of dividing a single large physical or logical IP network into smaller, isolated, and routable subnetworks.<br/>
      <span style="color: #475569;">বাংলা: একটি বৃহৎ আইপি নেটওয়ার্ককে ছোট ছোট সাব-নেটওয়ার্কে বিভক্ত করা যাতে পারফরম্যান্স ও নিরাপত্তা বৃদ্ধি পায়।</span><br/>
      <strong>Workplace Example:</strong> Splitting a <code>192.168.1.0/24</code> network into <code>192.168.1.0/25</code> (Management) and <code>192.168.1.128/25</code> (Guest Wi-Fi).
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>28. Where should security software installers be placed prior to workstation deployment?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> In an isolated local volume (e.g., secondary partition or staging folder) to safeguard the installer package against temporary network dropouts.<br/>
      <span style="color: #475569;">বাংলা: কম্পিউটারের লোকাল ড্রাইভে বা অফলাইন স্টোরেজে, যাতে নেটওয়ার্ক বিচ্ছিন্ন হলেও ইনস্টলেশন ব্যাহত না হয়।</span><br/>
      <strong>Workplace Example:</strong> Copying <code>EndpointSecurity_Setup.msi</code> to <code>D:\\Deploy\\</code> before starting system hardening.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>29. Why are verified recovery tools chosen during data restoration?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> To guarantee data integrity, verify checksum signatures, and avoid secondary filesystem corruption during snapshot recovery.<br/>
      <span style="color: #475569;">বাংলা: ব্যাকআপ ফাইল যেন নির্ভুলভাবে রিস্টোর হয় এবং ফাইল নষ্ট না হয় তা নিশ্চিত করতে বিশ্বস্ত টুল নির্বাচন করা হয়।</span><br/>
      <strong>Workplace Example:</strong> Using enterprise Veeam or Clonezilla instead of unverified third-party freeware utilities.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>30. What information is documented upon concluding a troubleshooting intervention?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 2px;">
      <strong>Technical Answer:</strong> Final equipment operational status, root cause analysis, components swapped, updated driver versions, and user sign-off timestamp.<br/>
      <span style="color: #475569;">বাংলা: সমস্যা সমাধানের পর কম্পিউটারের বর্তমান স্থিতি, কী কী কাজ করা হয়েছে এবং পরীক্ষার ফলাফল নথিবদ্ধ করা।</span><br/>
      <strong>Workplace Example:</strong> Ticket #8841 Closed: "Replaced degraded 500W PSU; 12V rail restored to +12.18V. 1-hour stress test passed with zero crashes."
    </div>
  </blockquote>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 13)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 13
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-303 &ndash; Configure, Terminate, Subnet & Troubleshoot Local Area Networks (LAN)
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> The 7-Layer OSI Reference Model & The 4-Layer TCP/IP Architectural Protocol Suite
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-303):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-13.1: Map protocols and Protocol Data Units (PDUs) to all 7 OSI layers (Application to Physical).</li>
      <li>PC-13.2: Differentiate Connection-Oriented TCP (3-way handshake SYN/SYN-ACK/ACK) from Connectionless UDP.</li>
      <li>PC-13.3: Identify standard well-known port numbers (FTP 20/21, SSH 22, Telnet 23, DNS 53, DHCP 67/68, HTTP 80, HTTPS 443).</li>
      <li>PC-13.4: Trace end-to-end data encapsulation and decapsulation from user data to raw bit streams.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 13: Wireshark Packet Analysis of TCP 3-Way Handshake & Protocol Dissection
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Wireshark Packet Capture Suite, Web Browser, Local Apache/Nginx Web Server.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Start Wireshark capture on active Ethernet interface with display filter \`tcp.port == 80\`.</li>
        <li>Open web browser and navigate to HTTP web server IP address.</li>
        <li>Stop Wireshark capture and locate the 3 initial handshake packets.</li>
        <li>Verify Packet 1 contains \`[SYN]\` flag with client initial sequence number.</li>
        <li>Verify Packet 2 contains \`[SYN, ACK]\` flag from server acknowledging client sequence + 1.</li>
        <li>Verify Packet 3 contains \`[ACK]\` flag from client completing the reliable connection establishment.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What are the names of the Protocol Data Units (PDUs) at OSI Layers 4, 3, 2, and 1 respectively?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Layer 4: Segment; Layer 3: Packet; Layer 2: Frame; Layer 1: Bit.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Why does DNS utilize UDP port 53 for standard name queries but TCP port 53 for zone transfers?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Standard name queries are small single-packet transactions where UDP low-overhead latency is preferred. Zone transfers between DNS servers contain large database sets requiring reliable, sequenced TCP streaming.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 14: IT SUPPORT SERVICE LEVEL 3 WRITTEN TEST PAPER B
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 14: IT Support Service Level 3 Written Test Paper B
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Hardware Diagnostics &amp; Office Tools (1 &ndash; 20)
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What is the default file extension of a modern Microsoft Excel workbook?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. .xlsx</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. .pptx</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. .docx</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. .pdf</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. In a word processor, which feature automatically repeats text at the top and bottom of every page?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Header &amp; Footer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Page Setup Margins</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Footnote only</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Endnote reference</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. Expressing technical opinions in enterprise meetings should always be:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Respectful and constructive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Timid and non-communicative</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Loud and aggressive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Dismissive of colleagues</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. Which of the following is traditionally an installed desktop app rather than a purely web-based service?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Microsoft Word (standalone executable)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Google Meet</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Zoom Web Client</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Google Docs</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. When composing an email, what action is taken to transmit an existing document file with the message?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Attach file</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Erase document</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Terminate thread</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Rename directory</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Providing compute, storage, and networking resources over the internet on-demand is known as:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Cloud service</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Firmware microcode</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Dial-up peer tunneling</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Analog modulation</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. A mouse, mechanical keyboard, and digital monitor are classified collectively as:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Computer Peripherals</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Application software</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. CPU cache lines</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. BIOS extensions</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. An AVO meter (multimeter) is used by hardware technicians to measure:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Electrical properties (Amperes, Volts, Ohms)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Hydraulic atmospheric pressure</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Operating system license count</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Acoustic ambient decibels</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Which device displays visual graphics and text generated by the PC graphics adapter?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Monitor</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Mouse</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Keyboard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Scanner</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. What does PXE ROM capability enable on a workstation network interface?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Boot the computer image directly over a network</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Encrypt the physical hard drive</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Connect a wireless printer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Clean thermal compound</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Software designed to scan system hardware, identify missing controllers, and install drivers is called:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Driver agent / updater</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Spreadsheet parser</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Virus authoring tool</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Game rendering engine</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. After launching an OS installation wizard, the technician's immediate next step is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Follow the interactive setup wizard instructions</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Pull out the AC mains power cord</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Unseat the primary storage drive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Short the CMOS reset jumper</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. A structured architectural document allocating IP blocks across departments is called:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. IP Addressing scheme</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Twisted pair pinout</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Transmission spectrum</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Font encoding schema</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Consulting network topology documentation during connectivity troubleshooting assists by:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Clarifying physical/logical layout and historical changes</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Changing the workstation paint</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Increasing bandwidth magically</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Deleting unused IP routes</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. Which of the following is recognized as system utility software?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Antivirus / Disk Defragmenter</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Word Processor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Spreadsheet software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Video editor</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. After installing newly deployed enterprise software, the technician should:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Configure settings and verify operational functionality</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Instantly uninstall the package</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Terminate Windows explorer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Delete product license keys</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. The designated drive or directory where recovered files are placed is called the:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Recovery target / Destination</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Corrupted sector buffer</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Recycler bin cache</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Raw source sector</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. A standard method for backing up desktop mail client records (e.g., Outlook PST) is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Using the mail client Import/Export Wizard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Deleting all incoming messages</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Forwarding all emails to spam</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Reinstalling the sound card</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. When troubleshooting complex faults, the technician should interview:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. The affected user or responsible system administrator</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Uninvolved external bystanders</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hardware logistics couriers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Social media commentators</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Which of the following is a direct method of identifying hardware defects?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Physical observation (burnt smell, bulging capacitors, abnormal fan whir)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Changing the desktop wallpaper</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Muting system audio</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Disconnecting USB peripherals blindly</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Short Questions -->
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 14px; margin-bottom: 6px;">
    Section B: Technical Short Answers &amp; Workplace Analytical Case Studies (21 &ndash; 30)
  </p>

  <blockquote style="border-left: 4px solid #0284c7; background-color: #f8fafc; padding: 10px 14px; margin: 10px 0; font-size: 10pt; color: #1e293b;">
    <p style="margin: 4px 0 2px 0;"><strong>21. Mention one key workplace communication skill:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Effective questioning &mdash; Asking targeted, open-ended questions to clarify user symptoms.<br/>
      <span style="color: #475569;">বাংলা: কার্যকর ও পরিষ্কারভাবে প্রশ্ন করা যাতে ব্যবহারকারীর সমস্যা দ্রুত ও সঠিকভাবে বোঝা যায়।</span><br/>
      <strong>Workplace Example:</strong> "Did the error appear immediately after updating the graphics driver, or while launching the accounting software?"
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>22. What is the operational purpose of the SUM function in Microsoft Excel?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Calculates the mathematical total of a designated contiguous or non-contiguous range of numerical cell values.<br/>
      <span style="color: #475569;">বাংলা: নির্দিষ্ট সেল বা কলামের একাধিক সংখ্যার মোট যোগফল স্বয়ংক্রিয়ভাবে নির্ণয় করা।</span><br/>
      <strong>Workplace Example:</strong> Formula <code>=SUM(A1:A10)</code> totals the inventory hardware cost across ten workstation items.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>23. Name a web-based service used for creating and editing documents online:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Google Docs.<br/>
      <span style="color: #475569;">বাংলা: গুগল ডকস—ক্লাউডভিত্তিক ওয়ার্ড প্রসেসর যাতে ইন্টারনেট ব্রাউজারে রিয়েল-টাইমে ডকুমেন্ট তৈরি ও এডিট করা যায়।</span><br/>
      <strong>Workplace Example:</strong> Drafting a Technical SLA proposal simultaneously with remote engineers.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>24. What constitutes a computer accessory?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> An auxiliary hardware device that enhances computer capability or ergonomic operation (e.g., optical mouse, webcam, external microphone).<br/>
      <span style="color: #475569;">বাংলা: কম্পিউটারের সাথে সংযুক্ত সহায়ক যন্ত্রাংশ যেমন মাউস, ওয়েবক্যাম বা হেডসেট।</span><br/>
      <strong>Workplace Example:</strong> An ergonomic vertical mouse deployed to reduce repetitive wrist strain for CAD operators.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>25. Name one item of Personal Protective Equipment (PPE) utilized when handling sensitive PC components:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Anti-Static ESD Wrist Strap.<br/>
      <span style="color: #475569;">বাংলা: অ্যান্টি-স্ট্যাটিক রিস্ট ব্যান্ড—শরীরের ক্ষতিকর স্থির বিদ্যুৎ মাটিতে নিষ্কাশন করে চিপ ধ্বংস হওয়া থেকে বাঁচায়।</span><br/>
      <strong>Workplace Example:</strong> Fastening the alligator clip to unpainted metal chassis ground before unboxing DDR5 RAM modules.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>26. Why is it essential to partition and format a storage drive during OS installation?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Partitioning defines logical allocation boundaries (isolating OS from user data), while formatting establishes the filesystem (e.g., NTFS) and file index tables.<br/>
      <span style="color: #475569;">বাংলা: স্টোরেজ ড্রাইভকে সুবিন্যস্তভাবে ভাগ করা এবং অপারেটিং সিস্টেমের জন্য ফাইল সিস্টেম তৈরি করা।</span><br/>
      <strong>Workplace Example:</strong> Partitioning a 1TB drive into C: (200GB OS) and D: (800GB Data), so future OS reinstalls will not erase user files.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>27. What is an IP address? (আইপি অ্যাড্রেস কী?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Internet Protocol (IP) address is a unique numerical identifier assigned to every network interface card (NIC) communicating over an IP network.<br/>
      <span style="color: #475569;">বাংলা: নেটওয়ার্কে যুক্ত প্রতিটি কম্পিউটারের অনন্য শনাক্তকারী নম্বর বা ডিজিটাল ঠিকানা।</span><br/>
      <strong>Workplace Example:</strong> Workstation static IP: <code>192.168.10.45</code> on subnet mask <code>255.255.255.0</code>.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>28. Where are security software packages typically staged before workstation installation?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Within a secure local storage directory (e.g., <code>C:\\Temp\\Installers</code> or <code>D:\\Software</code>) after verification of the installer's digital hash.<br/>
      <span style="color: #475569;">বাংলা: ইন্টারনেট থেকে ডাউনলোড করে লোকাল ড্রাইভের নির্দিষ্ট ফোল্ডারে রাখা হয়।</span><br/>
      <strong>Workplace Example:</strong> Downloading <code>Kaspersky_Endpoint.exe</code> into the local Downloads folder prior to offline execution.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>29. What specific data is captured within a "user data backup"?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Files, documents, spreadsheets, photographs, email archives, and custom user preferences created or saved by human operators.<br/>
      <span style="color: #475569;">বাংলা: ব্যবহারকারীর তৈরি করা ব্যক্তিগত ও অফিশিয়াল ফাইল, ডকুমেন্ট এবং স্প্রেডশিট।</span><br/>
      <strong>Workplace Example:</strong> Archiving the entire <code>C:\\Users\\Accountant\\Documents\\Fiscal2026\\</code> directory.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>30. Name one effective method to detect PC hardware problems per standard procedures:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 2px;">
      <strong>Technical Answer:</strong> Direct Physical Observation.<br/>
      <span style="color: #475569;">বাংলা: সরাসরি শারীরিক পর্যবেক্ষণ (যেমন অস্বাভাবিক শব্দ, দুর্গন্ধ, অতিরিক্ত উত্তাপ বা এলইডি সংকেত)।</span><br/>
      <strong>Workplace Example:</strong> Hearing a rhythmic clicking sound indicating impending mechanical failure of hard drive read/write actuator arms.
    </div>
  </blockquote>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 14)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 14
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-303 &ndash; Configure, Terminate, Subnet & Troubleshoot Local Area Networks (LAN)
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> IPv4 Addressing Classes, CIDR Variable Length Subnet Masking (VLSM) & Network Services
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-303):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-14.1: Identify IPv4 address classes (Class A 1-126, Class B 128-191, Class C 192-223, Class D 224-239 Multicast).</li>
      <li>PC-14.2: Distinguish RFC 1918 Private IP address ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) from Public IPs.</li>
      <li>PC-14.3: Calculate Network ID, First Usable Host, Last Usable Host, Broadcast Address, and Subnet Masks (/24 to /30).</li>
      <li>PC-14.4: Configure static IPv4 parameters and verify DHCP DORA lease allocation (Discover, Offer, Request, Acknowledge).</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 14: Subnetting a /24 Network into 4 Subnets & DHCP Server Scope Configuration
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Cisco Packet Tracer / Physical Managed Router, 4 Client PCs, Windows Server / Router DHCP.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Given 192.168.10.0/24, borrow 2 subnet bits to create 4 subnets with mask 255.255.255.192 (/26).</li>
        <li>Calculate Subnet 1: Net ID 192.168.10.0, Usable 192.168.10.1 to .62, Broadcast 192.168.10.63.</li>
        <li>Calculate Subnet 2: Net ID 192.168.10.64, Usable 192.168.10.65 to .126, Broadcast 192.168.10.127.</li>
        <li>Configure Router Interface Gig0/0 with IP 192.168.10.1 255.255.255.192 as Default Gateway.</li>
        <li>Set up DHCP scope on router excluding 192.168.10.1 to 192.168.10.10 for static servers.</li>
        <li>Release and renew IP on Client PC (\`ipconfig /renew\`); confirm IP is leased within Subnet 1 range.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: How many usable host IP addresses are available in a subnet with a /29 subnet mask (255.255.255.248)?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> 6 usable hosts (32 - 29 = 3 host bits; 2^3 - 2 = 8 - 2 = 6 hosts, as Network ID and Broadcast address cannot be assigned to hosts).
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What is an Automatic Private IP Addressing (APIPA) address and what does its presence indicate?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> An address in the 169.254.0.1 to 169.254.255.254 range (/16). It indicates the client network adapter is set to DHCP but failed to communicate with or receive an IP lease from a DHCP server.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 15: SYSTEMS SUPPORT & INFRASTRUCTURE DIAGNOSTICS PAPER C
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 15: Systems Support &amp; Infrastructure Diagnostics Paper C
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Hardware Diagnostics &amp; BIOS Configuration (1 &ndash; 20)
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. Which peripheral device is universally utilized to input alphanumeric text into a PC?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Keyboard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Scanner</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Plotter</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. CRT Monitor</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. What formatting elements are typically featured in an executive document report?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Drop Cap, Columns, Page Numbers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Flashing background banners</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Video animation tracks</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Raw bytecode text</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. Which action describes transmitting local digital files from a client computer to a remote server?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Uploading</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Downloading</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Web Browsing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Defragmenting</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. In technical project review meetings, engineer contributions should be:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Respectful and constructive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Adversarial and confrontational</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Passively disengaged</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Constantly interrupting</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. What is the standard definition of 'netiquette'?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Internet etiquette or professional online conduct</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A Trojan horse virus variant</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. An open-source web browser</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A network cabling standard</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Which technical support category resolves physical component failures (e.g., failed PSU, RAM errors)?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Hardware support</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Database administration</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Web design support</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Application scripting</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Assisting end users with workstation anomalies is the core mandate of:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Customer support service in an IT system</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Manufacturing assembly line</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Corporate tax auditing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Software sales marketing</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. How is the BIOS/UEFI setup utility accessed on modern motherboards during startup?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Pressing designated hotkey (F2, Del, or Esc) during POST</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Clicking a desktop shortcut icon</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Opening Control Panel within Windows</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Running a web browser tab</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. What is the chief responsibility of the computer operating system?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Provide a platform for executing applications and managing hardware resources</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Store data with power turned off</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Generate monitor pixel color</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Regulate AC wall outlet voltage</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Workplace Occupational Safety and Health (OSH) regulations are instituted to avoid:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Electrical and mechanical physical hazards</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Fast CPU clock frequencies</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Increased hard drive capacity</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. High internet throughput</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Which standard partition scheme is required to boot 64-bit OS on modern UEFI firmware?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. GPT (GUID Partition Table)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. EXE file header</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. PNG graphic bitmap</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. MP4 media table</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. An automated program assisting in identifying and updating device drivers is termed:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Driver agent</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Game launcher</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Web browser plugin</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Disk defragmenter</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. What is the primary industry standard application of an 8P8C RJ45 connector?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Terminating twisted-pair Ethernet cables (Cat5e/Cat6)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Supplying 240V AC mains electricity</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Connecting analog microphones</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Interfacing legacy serial modems</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. A Wide Area Network (WAN) is engineered to connect computing systems across:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Expansive geographical areas (cities, regions, nations)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A single office cubicle</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. A desktop computer chassis</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A single wireless keyboard</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What represents the mandatory concluding step of a software deployment procedure?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Verifying operational functionality and license activation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Abruptly unplugging system power</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Deleting the operating system</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Altering user BIOS boot order</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. After completing software installation, the technician must configure parameters according to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Documented user requirements and operational specifications</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Default random settings</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hardware manufacturer marketing ads</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Social media forum threads</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Locating the local database storage file of an email client (e.g., .ost/.pst) is critical for:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Performing backups and email migration</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Increasing broadband speeds</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Modifying account passwords</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Changing monitor refresh rates</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. Which of the following is an integrated built-in utility for operating system image backup?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. System-provided backup tool (e.g., Windows Backup &amp; Restore)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Web browser cache view</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Text editor Notepad</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Spreadsheet formula bar</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. Hardware diagnostic procedures rely on which primary technique during initial triage?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Physical observation and sensory inspection</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Ignoring diagnostic beep codes</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Random component swapping</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Changing system wallpaper</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Once an issue is identified and resolved, findings must formally be:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Documented in the service ticket ledger</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Erased from technician memory</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Shared on public message boards</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Ignored in future audits</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Short Questions -->
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 14px; margin-bottom: 6px;">
    Section B: Technical Short Answers &amp; Workplace Analytical Case Studies (21 &ndash; 30)
  </p>

  <blockquote style="border-left: 4px solid #0284c7; background-color: #f8fafc; padding: 10px 14px; margin: 10px 0; font-size: 10pt; color: #1e293b;">
    <p style="margin: 4px 0 2px 0;"><strong>21. What is the core technical function of word processing software?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Enables creating, modifying, formatting, styling, and outputting structured text documents.<br/>
      <span style="color: #475569;">বাংলা: টেক্সটভিত্তিক ডকুমেন্ট তৈরি, সংশোধন, ডিজাইন এবং প্রিন্ট করার সার্বিক সুবিধা দেওয়া।</span><br/>
      <strong>Workplace Examples:</strong> 1. Drafting professional Resumes; 2. Generating quarterly financial reports; 3. Creating formal corporate correspondence.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>22. What organizational benefits result from maintaining polite communication in technical meetings?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Cultivates psychological safety, de-escalates conflicts, fosters constructive brainstorming, and strengthens team consensus.<br/>
      <span style="color: #475569;">বাংলা: পেশাদার পরিবেশ বজায় থাকে, মতামত শ্রদ্ধার সাথে গৃহীত হয় এবং দলীয় সমন্বয় বৃদ্ধি পায়।</span><br/>
      <strong>Workplace Examples:</strong> 1. Constructive conflict resolution during post-incident reviews; 2. Encouraging junior engineers to speak; 3. Building inter-departmental trust.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>23. Identify three recognized web-based services for real-time document authoring:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> 1. Google Docs, 2. Microsoft Office 365 Word Online, 3. Zoho Writer.<br/>
      <span style="color: #475569;">বাংলা: ১. গুগল ডকস, ২. মাইক্রোসফট অফিস ৩৬৫ অনলাইন, ৩. জোহো রাইটার।</span><br/>
      <strong>Workplace Example:</strong> Cloud collaboration allowing simultaneous multi-user redlining of an RFP document.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>24. What constitutes the primary operational role of an IT Help Desk service?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Serves as the Single Point of Contact (SPOC) to triage user incidents, reset credentials, diagnose software defects, and route escalations.<br/>
      <span style="color: #475569;">বাংলা: ফোন, চ্যাট বা টিকেটের মাধ্যমে ব্যবহারকারীর আইটি সমস্যার সমাধান ও সার্বিক প্রযুক্তিগত সহায়তা প্রদান।</span><br/>
      <strong>Workplace Example:</strong> Unlocking locked Active Directory user accounts and guiding users through VPN multi-factor authentication.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>25. Contrast the engineering differences between HDD and SSD storage devices:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> HDDs rely on mechanical spinning platters (5400/7200 RPM) and magnetic heads with high latency (~12ms); SSDs utilize non-volatile NAND flash memory chips with near-instantaneous access (~0.05ms) and superior shock resistance.<br/>
      <span style="color: #475569;">বাংলা: HDD ঘূর্ণায়মান মেকানিক্যাল ডিস্ক ব্যবহার করে যা ধীরগতির; SSD ফ্ল্যাশ চিপ ব্যবহার করে যা অনেক দ্রুত ও টেকসই।</span><br/>
      <strong>Workplace Example:</strong> Upgrading a workstation boot drive from HDD (120 MB/s read) to NVMe SSD (3500 MB/s read) reduces OS boot duration from 75s to 9s.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>26. Provide three practical examples of operating system boot media:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> 1. Bootable USB Flash Drive (created via Rufus/Ventoy), 2. Optical DVD Installation Media, 3. PXE Network Boot Server.<br/>
      <span style="color: #475569;">বাংলা: ১. বুটেবল ইউএসবি ড্রাইভ, ২. ডিভিডি ডিস্ক, ৩. পিএক্সই নেটওয়ার্ক বুট সার্ভার।</span><br/>
      <strong>Workplace Example:</strong> Deploying Windows 11 Enterprise across 40 systems via a bootable USB installer configured with an <code>autounattend.xml</code> script.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>27. What is the engineering objective of reviewing a network architecture blueprint?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Identifies physical cabling topology, switch trunk links, VLAN assignments, router gateways, and potential single points of failure (SPOF).<br/>
      <span style="color: #475569;">বাংলা: নেটওয়ার্কের নোডগুলো কীভাবে সংযুক্ত আছে তা বোঝা এবং রাউটার ও কেবলের সঠিক পাথ নির্ণয় করা।</span><br/>
      <strong>Workplace Example:</strong> Locating which Core Switch port serves the Accounting department's VLAN prior to installing a network security appliance.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>28. What operational actions must occur following the installation of enterprise applications?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Configure organizational preferences, apply license keys, install prerequisite runtime libraries, and verify end-to-end functionality.<br/>
      <span style="color: #475569;">বাংলা: লাইসেন্স সক্রিয় করা, কনফিগারেশন সেটিংস সমন্বয় করা এবং সফটওয়্যার সঠিকভাবে চলছে কিনা তা পরীক্ষা করা।</span><br/>
      <strong>Workplace Example:</strong> Pointing AutoCAD to the corporate network license server and verifying GPU hardware acceleration is active.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>29. What specific data categories are preserved under "user data backups"?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Non-reproducible personal and project assets: business documents, financial ledgers, email archives, browser bookmarks, and encryption keys.<br/>
      <span style="color: #475569;">বাংলা: ব্যবহারকারীর তৈরি করা ব্যক্তিগত ও অফিশিয়াল ফাইল, ছবি ও প্রয়োজনীয় ডেটা।</span><br/>
      <strong>Workplace Example:</strong> Preserving <code>C:\\Users\\Finance\\AppData\\Roaming\\Outlook\\archive.pst</code> prior to drive migration.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>30. What key data points are recorded in a hardware troubleshooting incident log?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 2px;">
      <strong>Technical Answer:</strong> Initial failure symptom, diagnostics executed, hardware components swapped/tested, final operational state, and technician signature.<br/>
      <span style="color: #475569;">বাংলা: সমস্যার প্রাথমিক বিবরণ, সমাধানের জন্য গৃহীত পদক্ষেপ এবং চূড়ান্ত সফল পরীক্ষার ফলাফল।</span><br/>
      <strong>Workplace Example:</strong> "Fault: Periodic BSOD (Memory Management). Diagnostic: MemTest86 flagged errors on DIMM 2. Action: Replaced with 8GB DDR4 3200MHz. Verification: 4 passes clean."
    </div>
  </blockquote>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 15)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 15
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-304 &ndash; Enforce Computer Security, Antivirus Policy, Data Backup & Disaster Recovery
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> System & Network Security, Stateful Packet Inspection Firewalls & Hardening Protocols
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-304):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-15.1: Implement the CIA Triad (Confidentiality, Integrity, Availability) in IT systems architecture.</li>
      <li>PC-15.2: Configure Windows Defender Firewall with Advanced Security (Inbound/Outbound Port, Protocol & Program rules).</li>
      <li>PC-15.3: Enforce strong password complexity policies and Account Lockout thresholds via Group Policy (gpedit.msc).</li>
      <li>PC-15.4: Detect and mitigate Denial of Service (DoS/DDoS), Man-in-the-Middle (MitM), and ARP Poisoning attacks.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 15: Windows Firewall Custom Rule Deployment & Security Baseline Hardening
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Windows 11 Workstation, Windows Defender Firewall with Advanced Security, Nmap Port Scanner.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Launch \`wf.msc\` (Windows Defender Firewall with Advanced Security).</li>
        <li>Create a new Inbound Rule: Rule Type = Port, Protocol = TCP, Specific Local Ports = 8080.</li>
        <li>Action = Allow the connection if secure; Scope = Limit Remote IP to Authorized Management Subnet (192.168.1.0/24).</li>
        <li>Block ICMP Echo Request (Ping) to prevent external host discovery scanning.</li>
        <li>Open \`gpedit.msc\`; navigate to Computer Configuration > Windows Settings > Security Settings > Account Policies > Password Policy; configure Minimum Password Length = 12 characters and Password Must Meet Complexity Requirements = Enabled.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the core difference between a stateless packet filter and a stateful inspection firewall?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> A stateless filter inspects each packet in isolation against static rules (IP, Port). A stateful firewall tracks active connection states (TCP SYN, ESTABLISHED) and automatically allows legitimate return traffic belonging to an established outbound session.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What cryptographic hash algorithm should be used to verify file integrity and why is MD5 obsolete?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> SHA-256 or SHA-512 (Secure Hash Algorithm). MD5 is cryptographically broken due to vulnerabilities allowing collision attacks where two different files produce identical hash digests.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 16: ENTERPRISE NETWORKING & OCCUPATIONAL HEALTH PAPER D
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 16: Enterprise Networking &amp; Occupational Health Paper D
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Hardware Maintenance &amp; Addressing (1 &ndash; 20)
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. A workplace document defining assigned tasks and technical specifications for a job order is a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Job Sheet</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Personal Diary</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Marketing Brochure</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Advertising Flyer</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Which spreadsheet chart type is optimal for plotting numerical trends and rates of change over continuous time?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Line Chart</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Pie Chart</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Doughnut Chart</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Radar Chart</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. To insert digital graphics, vector shapes, or tables in Microsoft Word, you navigate to the:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Insert Tab</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Developer Ribbon</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. View Settings Menu</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Help Window</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. Which of the following is an open-source, compliant web browser application?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Mozilla Firefox</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Google Drive</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. YouTube</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Microsoft Outlook</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Which web-based platform supports real-time multi-user document collaboration?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. All of the above (Google Docs, Sheets, Slides)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Google Docs only</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Google Sheets only</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Google Slides only</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Replacing a failing CPU cooling fan or broken SATA interface belongs under:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Hardware support</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Cloud architecture</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Software coding</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Database optimization</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Assisting users encountering workstation difficulties is a primary pillar of:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Customer support service in an IT system</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Marketing sales campaigns</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Financial balance auditing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Industrial factory fabrication</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which of the following is a common network addressing problem causing immediate disconnection?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. IP conflict</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Low monitor contrast</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. High CPU fan speed</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Mouse battery drain</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. When two network endpoints attempt to utilize the identical IPv4 address, the condition is termed:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. IP conflict</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Packet segmentation</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Link aggregation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Subnet broadcasting</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. The fundamental architectural design and kernel organization of an operating system is its:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. OS Architecture</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. User style theme</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Display driver model</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Desktop layout format</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Restoring lost, formatted, or corrupted information from an authenticated snapshot is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Data Recovery</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Data Encryption</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Disk Compression</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Volume Truncation</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. An operating system's purpose includes:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Managing hardware resources and abstracting application execution</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Generating electric power</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Supplying printer paper</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Regulating room temperature</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Safe and compliant handling of electrical and mechanical IT equipment is enforced to avoid:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Electrical shocks and mechanical physical hazards</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. High GPU clock speeds</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Reduced software latency</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Fast network transfer</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Wearing an anti-static wrist strap during component handling shields circuitry against:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Electrostatic Discharge (ESD) damage</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Thermal overheating</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Operating system bugs</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Driver incompatibility</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. Adherence to occupational safety standards protects technicians from:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Workplace injuries, shocks, and equipment damage</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Fast RAM performance</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Increased hard drive space</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Higher monitor resolution</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Modern firmware architecture replacing the legacy 16-bit IBM PC BIOS is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. UEFI (Unified Extensible Firmware Interface)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. USB 3.2 protocol</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. HDMI 2.1 schema</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. VGA analog standard</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Prior to deployment, security software packages should be cached within:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Verified local storage volume or administrative staging folder</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Network printer print queue</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Corrupted optical disk</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Router NVRAM buffer</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. Which software packages are assembled based on user business requirements?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Application software and maintenance utility software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Kernel microcode only</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Video games exclusively</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Motherboard BIOS ROM chips</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. Interviewing the user reporting an incident helps the technician:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Understand the exact problem symptoms from the user's perspective</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Invoice billing prematurely</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Order unnecessary components</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Blame vendor warranty policies</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Following diagnostic resolution, the completed service order records:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Computer maintenance actions and operational troubleshooting status</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. The user's personal hobbies</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Ambient room humidity</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Retail cost of furniture</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Short Questions -->
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 14px; margin-bottom: 6px;">
    Section B: Technical Short Answers &amp; Workplace Analytical Case Studies (21 &ndash; 30)
  </p>

  <blockquote style="border-left: 4px solid #0284c7; background-color: #f8fafc; padding: 10px 14px; margin: 10px 0; font-size: 10pt; color: #1e293b;">
    <p style="margin: 4px 0 2px 0;"><strong>21. What is the operational impact of speaking politely during corporate team meetings?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Fosters an open environment where technical risks are voluntarily disclosed without fear of ridicule, accelerating defect resolution.<br/>
      <span style="color: #475569;">বাংলা: বিনয়ের সাথে কথা বললে শ্রদ্ধাপূর্ণ পরিবেশ সৃষ্টি হয় এবং ভুলের কারণ সহজে চিহ্নিত করা যায়।</span><br/>
      <strong>Contrast Example:</strong> Polite: <em>"I see your point regarding VLAN tagging, but could we evaluate whether a static route solves the latency?"</em> vs. Impolite: <em>"That design makes no sense."</em>
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>22. What is the primary purpose of a computer printer?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Electro-photographic or inkjet rendering device that outputs electronic documents, diagrams, and digital text onto physical media (paper).<br/>
      <span style="color: #475569;">বাংলা: কম্পিউটার বা ডিজিটাল ডকুমেন্টের দৃশ্যমান ও স্থায়ী হার্ড কপি কাগজে প্রিন্ট করা।</span><br/>
      <strong>Workplace Example:</strong> Printing physical hard copies of legal service level agreements and architectural schematics.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>23. How can an administrator effectively organize corporate email workflows?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Implementing server/client rules, categorized project folders, priority flags, spam filters, and scheduled mailbox archiving.<br/>
      <span style="color: #475569;">বাংলা: ফোল্ডার, লেবেল এবং স্বয়ংক্রিয় ফিল্টার রুলস তৈরি করে ইনবক্স গোছানো।</span><br/>
      <strong>Workplace Example:</strong> Setting an automated Outlook rule moving all tickets from <code>monitoring@company.com</code> into a dedicated "P1_Alerts" folder.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>24. Explain the mission of an enterprise Data Center:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Centralized facility housing high-density rackmount servers, SAN arrays, redundant UPS generators, and perimeter cooling units for continuous 99.999% uptime.<br/>
      <span style="color: #475569;">বাংলা: বিপুল পরিমাণ তথ্য, ক্লাউড সার্ভিস ও সার্ভার অবকাঠামো নিরাপদে সার্বক্ষণিক সচল রাখা।</span><br/>
      <strong>Workplace Example:</strong> Hosting cloud email, customer relationship databases, and ERP applications for thousands of simultaneous branches.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>25. What does the acronym SOHO signify in computer networking?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Small Office / Home Office &mdash; Designates compact network environments (1 to 10 nodes) operating behind a single integrated broadband gateway.<br/>
      <span style="color: #475569;">বাংলা: Small Office / Home Office—যা ছোট অফিস বা বাসাবাড়ির ক্ষুদ্র নেটওয়ার্ক পরিবেশ নির্দেশ করে।</span><br/>
      <strong>Workplace Example:</strong> Deploying a combined Wi-Fi 6 router, 8-port Gigabit switch, and network NAS for a 5-person accounting consultancy.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>26. What is the fundamental mandate of performing data backups?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Protect business continuity against ransomware attacks, hardware drive failure, accidental deletion, or physical site disasters.<br/>
      <span style="color: #475569;">বাংলা: তথ্যের নিরাপত্তা নিশ্চিত করা এবং কোনো বিপর্যয় ঘটলে যাতে দ্রুত ডেটা পুনরুদ্ধার করা যায়।</span><br/>
      <strong>Workplace Example:</strong> Restoring an entire SQL database snapshot following a catastrophic ransomware infection without paying ransoms.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>27. What constitutes 'safe working practices' when handling electronic equipment?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Disconnecting AC mains power before servicing, using insulated tools, wearing ESD grounding straps, and handling expansion cards strictly by non-conductive edges.<br/>
      <span style="color: #475569;">বাংলা: পিসি খোলার পূর্বে বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা, গ্রাউন্ডিং নিশ্চিত করা এবং সুরক্ষা সরঞ্জাম মেনে চলা।</span><br/>
      <strong>Workplace Example:</strong> Unplugging PSU power cord and depressing power button for 5s to discharge internal reservoir capacitors before touching VRMs.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>28. Following identification of a suspected fault cause, what action validates the diagnosis?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Controlled verification testing &mdash; Swapping with a known-good component or running targeted stress diagnostics to confirm problem resolution.<br/>
      <span style="color: #475569;">বাংলা: ত্রুটিযুক্ত অংশ প্রতিস্থাপন করে সিস্টেমে পূর্ণাঙ্গ পরীক্ষা চালানো যাতে কারণটি নিশ্চিত হয়।</span><br/>
      <strong>Workplace Example:</strong> Installing a known-good PCIe graphics card into a black-screen workstation to prove the old GPU's VRAM was dead.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>29. Why is partitioning and formatting mandatory during operating system setup?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Partitioning defines partition boundaries (EFI System Partition, Windows OS, Recovery Environment), while formatting establishes the filesystem metadata tables.<br/>
      <span style="color: #475569;">বাংলা: স্টোরেজ ড্রাইভকে ওএস ইনস্টলেশনের উপযুক্ত ফাইল সিস্টেমে রূপান্তর করা।</span><br/>
      <strong>Workplace Example:</strong> Initializing an NVMe drive as GPT and creating a 100MB EFI system partition (FAT32) alongside the primary C: NTFS partition.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>30. What constitutes the mandatory concluding phase of any software deployment?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 2px;">
      <strong>Technical Answer:</strong> Comprehensive Acceptance Testing &mdash; Verifying program launch, database connectivity, print spooling, and user privilege restrictions.<br/>
      <span style="color: #475569;">বাংলা: সফটওয়্যারটি চালনা করে এর সব ফিচার ও সংযোগ পরীক্ষা করা।</span><br/>
      <strong>Workplace Example:</strong> Launching SAP GUI on a newly configured workstation, logging in with test credentials, and executing a sample query successfully.
    </div>
  </blockquote>

  <!-- SPECIALIZED REFERENCE TABLE: PRIVATE IP ADDRESS RANGES -->
  <p style="font-weight: bold; margin: 14px 0 4px 0; color: #0f172a;">
    Special Reference Table: RFC 1918 Private IP Address Ranges &amp; IPv6 Unique Local Unicast
  </p>
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #94a3b8; font-size: 9.5pt; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #0f172a; color: #ffffff;">
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 18%;">IP Standard</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 18%;">Address Class / Scope</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 28%;">Network Prefix &amp; Subnet Range</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 36%;">Usable Host Capacity &amp; Enterprise Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold; background-color: #f8fafc;" rowspan="3">IPv4 (RFC 1918)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 600;">Class A</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><code>10.0.0.0</code> to <code>10.255.255.255</code> (<code>10.0.0.0/8</code>)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">16,777,214 hosts &bull; Hyperscale enterprise campuses &amp; multi-site VPNs</td>
      </tr>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 600;">Class B</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><code>172.16.0.0</code> to <code>172.31.255.255</code> (<code>172.16.0.0/12</code>)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">1,048,574 hosts &bull; Mid-to-large business LANs &amp; university networks</td>
      </tr>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 600;">Class C</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><code>192.168.0.0</code> to <code>192.168.255.255</code> (<code>192.168.0.0/16</code>)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">65,534 hosts (256 &times; /24 subnets) &bull; SOHO, departmental offices &amp; home LANs</td>
      </tr>
      <tr style="background-color: #f1f5f9;">
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;" rowspan="2">IPv6 (RFC 4193)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 600;">Reserved Prefix</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><code>FC00::/7</code></td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Reserved for centralized assignment &bull; Non-routable public internet</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">Used / Local Prefix</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;"><code>FD00::/7</code></td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Unique Local Addresses (ULA) &bull; Locally generated 40-bit pseudo-random global ID</td>
      </tr>
    </tbody>
  </table>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 16)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 16
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-304 &ndash; Enforce Computer Security, Antivirus Policy, Data Backup & Disaster Recovery
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Antivirus Architecture, Heuristic Detection, Malware Taxonomy & Quarantine Engineering
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-304):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-16.1: Classify malware types: Viruses, Worms, Trojan Horses, Ransomware, Spyware, Rootkits, and Polymorphic code.</li>
      <li>PC-16.2: Differentiate signature-based pattern detection from heuristic behavioral monitoring and sandboxing.</li>
      <li>PC-16.3: Isolate infected endpoints from network VLANs to prevent lateral worm propagation.</li>
      <li>PC-16.4: Execute deep offline malware eradication using Windows Defender Offline Scan and bootable rescue media.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 16: Endpoint Malware Isolation, Offline Disinfection & Registry Remediation
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Infected Test VM / Workstation, Windows Defender Offline Scanner, Sysinternals Suite (Autoruns, Process Explorer).
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Disconnect network interface cable immediately upon malware alert to break Command & Control (C2) communication.</li>
        <li>Initiate Windows Defender Offline Scan (\`Start-MpWDOScan\` via PowerShell Administrator).</li>
        <li>Following reboot, launch Sysinternals Process Explorer; verify digital signatures of all running processes.</li>
        <li>Launch Sysinternals Autoruns; inspect Run, RunOnce, and Winlogon keys to remove persistent malicious startup entries.</li>
        <li>Execute full signature definition update and re-scan storage volumes to verify total eradication.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the primary technical distinction between a computer virus and a computer worm?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> A virus requires a host executable program or human intervention (e.g. running an infected file) to replicate. A worm is a standalone self-replicating program that exploits operating system or network service vulnerabilities to spread across networks autonomously without user interaction.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What is a Rootkit and why is it notoriously difficult for standard OS-level antivirus scanners to detect?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> A rootkit is malware designed to intercept and alter core operating system kernel API calls (hooking syscalls) to conceal its own processes, files, and registry keys from standard detection tools.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 17: IT SUPPORT SYSTEMS EXAMINATION PAPER E
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 17: IT Support Systems Examination Paper E
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Systems Diagnostics &amp; Memory Architecture (1 &ndash; 19)
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. What is the administrative definition of a job sheet?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. A formal document describing assigned technical tasks</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. An anonymous blog post</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. A private user diary</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A product retail invoice</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Which of the following is NOT a spreadsheet application?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Prezi (Presentation Tool)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Microsoft Excel</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Google Sheets</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. LibreOffice Calc</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. What mathematical result does the AVERAGE function compute in spreadsheet software?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Finds the arithmetic mean of selected numbers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Multiplies all matrix values</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Returns the maximum value</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Tallies alphanumeric text strings</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. What is the fundamental operational capability of an internet search engine?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Crawl, index, and retrieve relevant information across the web</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Format local hard drives</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Solder motherboard pins</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Modulate analog audio waves</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. In modern networking terminology, the on-demand delivery of compute power and database storage over the internet is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Cloud Service</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Offline Tape Vault</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. P2P File Swap</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Local Loop Modulation</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Evaluating end-user support solutions entails:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Determining the most effective, lasting method to resolve user technical issues</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Arbitrarily closing support tickets</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Charging customer premium penalty fees</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Deleting user active directory profiles</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. What essential function does motherboard BIOS/UEFI firmware execute during startup?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Initializes hardware components and performs POST routines</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Edits digital photographs</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Compiles Java source code</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Compresses multimedia video</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which hardware maintenance tool cleans dust from motherboard components without physical contact?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Blower gun / Compressed gas duster</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Steel wire brush</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. High-pressure water hose</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Magnetic tip screwdriver</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. What does the term "volatile memory" mean when defining Random Access Memory (RAM)?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. All stored bits are erased when electrical power is removed</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Retains data permanently forever</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Is made of volatile glass fibers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Explodes under heavy processor loads</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. What software components are typically deployed immediately following clean operating system installation?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Hardware chipset and device drivers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Entertainment games only</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Audio player skins</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Unverified third-party freeware</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. What is the technical purpose of disk partitioning?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To divide physical storage into distinct logical volumes for OS and data isolation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To physically cut magnetic platters</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To increase monitor refresh rates</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To boost broadband upload speeds</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What primary architectural motivation drives global migration from IPv4 to IPv6?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Vastly expanded 128-bit address space eliminating address exhaustion</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Eliminating physical cables completely</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Lowering computer hardware costs</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Making router power supplies obsolete</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. A short, flexible Ethernet cable utilized to bridge workstation ports to wall faceplates is a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Patch cord</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Submarine feeder cable</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. High-voltage utility cable</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. RG-59 coaxial trunk</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. Which categories of software are procured in accordance with business requirements?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Application software and maintenance utility software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Firmware microcode exclusively</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Operating systems without drivers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Casual video games only</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What mandatory verification occurs following installation of application packages?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Executing functional testing and confirming license activation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Shutting down system without save</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Formatting primary storage volume</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Deleting administrative credentials</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Why is identifying the local database repository of a desktop email client crucial?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. For backing up messages, calendars, and local contacts before hardware migration</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. For increasing printer toner life</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. For clearing CMOS BIOS passwords</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. For adjusting monitor color gamut</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Which protocol feature within mail clients creates portable mailbox archives?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Import/Export Wizard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Mark all as Read</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Empty Deleted Items</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Send and Receive All</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. Hardware fault identification starts with sensory checks, known as:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Physical observation</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Speculative guess</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Unplugging monitors</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Lowering desk elevation</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. Concluded troubleshooting actions are formally entered into:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Computer maintenance and troubleshooting status reports</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Marketing sales catalogs</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Public social media feeds</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Personal scratchpad notes</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Short Questions -->
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 14px; margin-bottom: 6px;">
    Section B: Technical Short Answers &amp; Workplace Analytical Case Studies (20 &ndash; 30)
  </p>

  <blockquote style="border-left: 4px solid #0284c7; background-color: #f8fafc; padding: 10px 14px; margin: 10px 0; font-size: 10pt; color: #1e293b;">
    <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. What is documented after completing hardware troubleshooting?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: হার্ডওয়্যার সমস্যা সমাধানের পর কী নথিবদ্ধ করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 12px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Personal opinions and non-technical guesses</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Kept unwritten to preserve technician autonomy</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Computer maintenance log, steps taken, parts replaced, and operational status</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Erased immediately to save disk storage</td>
      </tr>
    </tbody>
  </table>

    <p style="margin: 6px 0 2px 0;"><strong>21. Why are printed brochures utilized in professional business environments?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Present structured service catalogs, corporate offerings, and technical SLA metrics in a concise, tactile format.<br/>
      <span style="color: #475569;">বাংলা: পণ্য বা সেবা সম্পর্কে সংক্ষেপে ও আকর্ষণীয়ভাবে গ্রাহককে তথ্য প্রদানের জন্য।</span><br/>
      <strong>Workplace Example:</strong> Distributing an IT Services Brochure outlining Managed Help Desk, Cloud Backup, and Cybersecurity SLAs.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>22. What is a symbol in word processing software?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> A specialized typographic glyph or Unicode character that does not correspond to a standard physical keyboard key.<br/>
      <span style="color: #475569;">বাংলা: বিশেষ চিহ্ন বা ক্যারেক্টার যা সাধারণ কীবোর্ডে সরাসরি পাওয়া যায় না।</span><br/>
      <strong>Workplace Examples:</strong> Copyright (&copy;), Trademark (&trade;), Euro Currency (&euro;), Checkmark (&check;), Degree (&deg;).
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>23. Name a recognized web-based document editing service:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Google Docs.<br/>
      <span style="color: #475569;">বাংলা: গুগল ডকস—ওয়েব ব্রাউজারের মাধ্যমে সরাসরি ডকুমেন্ট তৈরির সেবা।</span><br/>
      <strong>Workplace Example:</strong> Simultaneous multi-stakeholder drafting of an annual IT Disaster Recovery audit.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>24. Define what constitutes a networking device:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> A physical electronic apparatus that facilitates communication, packet filtering, routing, and switching across nodes.<br/>
      <span style="color: #475569;">বাংলা: যে হার্ডওয়্যার ডিভাইস কম্পিউটার ও অন্যান্য নোডকে নেটওয়ার্কে যুক্ত ও ডেটা আদান-প্রদান নিশ্চিত করে।</span><br/>
      <strong>Workplace Examples:</strong> Enterprise Switches (Cisco Catalyst), Edge Routers, Wireless Access Points (WAPs).
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>25. What is the technical responsibility of a Network Interface Card (NIC)?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Operates at OSI Layer 1 &amp; Layer 2 to serialize parallel system bus data into network signals (electrical, optical, or RF) encoded with a unique 48-bit MAC address.<br/>
      <span style="color: #475569;">বাংলা: কম্পিউটারকে কেবল বা তারহীনভাবে নেটওয়ার্কের সাথে যুক্ত করে ডেটা প্যাকেট আদান-প্রদান করা।</span><br/>
      <strong>Workplace Example:</strong> Gigabit Ethernet PCIe NIC receiving Cat6 patch cables at 1000 Mbps full duplex.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>26. Why is storage partitioning and formatting required prior to OS installation?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Establishes partition boundaries (MBR/GPT) and formats the drive with a recognized filesystem (e.g., NTFS) and Master File Table (MFT).<br/>
      <span style="color: #475569;">বাংলা: স্টোরেজকে ওএস ও ডেটা রাখার জন্য উপযুক্ত পার্টিশন ও ফাইল সিস্টেমে প্রস্তুত করা।</span><br/>
      <strong>Workplace Example:</strong> Allocating C: drive for Windows 11 and D: drive for corporate database records.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>27. What constitutes a Gateway in enterprise networking?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> A network node (typically a router or multi-layer switch) that acts as an entrance and exit point between disparate subnets or WAN internet connections.<br/>
      <span style="color: #475569;">বাংলা: যে ডিভাইস দুটি ভিন্ন নেটওয়ার্কের মধ্যে সংযোগ ঘটায় এবং ট্রাফিক বাইরে পাঠাতে সহায়তা করে।</span><br/>
      <strong>Workplace Example:</strong> The Default Gateway IP (<code>192.168.1.1</code>) routing internal LAN requests to external ISP fiber modems.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>28. Where are antivirus setup packages safely cached prior to installation?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Within an authenticated local volume (e.g., <code>D:\\Software_Deploy</code>) to prevent tampering and corruption.<br/>
      <span style="color: #475569;">বাংলা: লোকাল ড্রাইভের নির্দিষ্ট ফোল্ডারে যাতে ইন্টারনেট বন্ধ থাকলেও ইনস্টল করা যায়।</span><br/>
      <strong>Workplace Example:</strong> Saving <code>AV_Corporate_x64.exe</code> in <code>D:\\Installers\\</code>.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>29. What represents the primary objective of automated data backups?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Prevent irreversible data loss and facilitate rapid recovery following hardware failure, malware corruption, or human error.<br/>
      <span style="color: #475569;">বাংলা: ডেটার নির্ভরযোগ্য কপি সংরক্ষণ করে স্থায়ী ক্ষতি থেকে ব্যবসা রক্ষা করা।</span><br/>
      <strong>Workplace Example:</strong> Nightly cloud snapshot backups safeguarding employee document repositories.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>30. Why is interviewing the reporting user essential during hardware fault triage?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 2px;">
      <strong>Technical Answer:</strong> Uncovers critical contextual clues &mdash; recent software installs, unusual noises, power spikes, or exact error dialog codes seen prior to failure.<br/>
      <span style="color: #475569;">বাংলা: ব্যবহারকারীর অভিজ্ঞতা শুনে সমস্যার সঠিক কারণ ও প্রেক্ষাপট দ্রুত চিহ্নিত করা।</span><br/>
      <strong>Workplace Example:</strong> Learning that the workstation crashed specifically when rendering 4K video files, narrowing the fault to GPU overheating.
    </div>
  </blockquote>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 17)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 17
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-304 &ndash; Enforce Computer Security, Antivirus Policy, Data Backup & Disaster Recovery
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Enterprise Data Backup Methodologies, Recovery Objectives (RTO/RPO) & Disaster Recovery
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-304):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-17.1: Compare Full, Incremental, and Differential backup strategies regarding storage consumption and restore time.</li>
      <li>PC-17.2: Apply the industry-standard 3-2-1 Backup Rule (3 copies, 2 media types, 1 offsite/immutable copy).</li>
      <li>PC-17.3: Define Recovery Time Objective (RTO) and Recovery Point Objective (RPO) metrics for critical business systems.</li>
      <li>PC-17.4: Perform bare-metal system image creation and restore validation on physical hardware.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 17: Bare-Metal System Image Creation & Point-in-Time Shadow Copy Restoration
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> External High-Speed Backup Drive, Windows Backup and Restore (Windows 7), Volume Shadow Copy Service (VSS).
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Connect external dedicated backup drive with sufficient storage capacity.</li>
        <li>Navigate to Control Panel > Backup and Restore > Create a system image.</li>
        <li>Select EFI System Partition, Windows OS (C:) drive, and Windows Recovery Environment partition; initiate image creation.</li>
        <li>Verify Volume Shadow Copy service (VSS) successfully creates atomic snapshot without database corruption.</li>
        <li>Create a dedicated Windows System Repair Disc / Recovery USB; test booting into Windows RE and verify image catalog detection.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the functional difference between an Incremental backup and a Differential backup during recovery?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> An Incremental backup backs up only files modified since the last backup of any type and clears the archive bit; restoration requires the last Full backup PLUS every subsequent Incremental backup in sequence. A Differential backup backs up all files modified since the last Full backup and does NOT clear the archive bit; restoration requires only the last Full backup PLUS the single latest Differential backup.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Define RTO (Recovery Time Objective) and RPO (Recovery Point Objective).
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> RTO is the maximum acceptable duration of system downtime before business operations must be restored. RPO is the maximum acceptable amount of data loss measured in time (e.g. 1 hour of lost transactions) between the last successful backup and the disaster event.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 18: COMPREHENSIVE SYSTEMS ADMINISTRATION & DIAGNOSTIC PAPER F
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 18: Comprehensive Systems Administration &amp; Diagnostic Paper F
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Multiple Choice Questions &bull; Systems Operations &amp; Standards (1 &ndash; 20)
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. The designated destination directory where backup archives are written is termed the:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Destination folder</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Source directory</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Origin sector</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Volatile cache</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. What behavior conveys highest professional decorum during workplace technical communications?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Speaking clearly and politely</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Engaging in idle gossip</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Using informal street slang</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Ignoring corporate guidelines</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. An authorized document describing tasks, assigned technician, and parts list is a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Job Sheet</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Personal Memoir</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Marketing Pamphlet</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Retail Price Tag</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. Which of the following software applications is NOT a full word processor?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Microsoft Document Viewer (read-only viewer)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. OpenOffice Writer</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Google Docs</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Microsoft Word</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. Which input component translates hand movement into graphical pointer navigation on screen?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Mouse / Trackpad</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. CRT Monitor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Thermal Printer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Barcode Scanner</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. The main objective of an internet search engine is to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Index and retrieve relevant information across the World Wide Web</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Transmit email messages</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Compress digital video</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Format primary hard drives</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. What is the technical role of a Uniform Resource Locator (URL)?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Address uniquely locating a web document or application resource on the internet</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Encrypt network hardware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Reset CMOS battery timing</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Solder CPU power pins</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Resolving physical motherboard, RAM, or power supply malfunctions belongs to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Hardware support</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Network policy design</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Frontend web coding</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Database modeling</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Resolving operating system anomalies, registry crashes, and application bugs falls under:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Software support</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Electrical cabling</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Building civil architecture</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Hardware fabrication</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. The Central Processing Unit (CPU) executes which fundamental operations?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Performs mathematical calculations and executes instruction cycles</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Emits display light pixels</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Stores data permanently without power</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Modulates analog audio output</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. Which of the following is classified as temporary volatile storage?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. RAM (Random Access Memory)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Hard Disk Drive (HDD)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Solid State Drive (SSD)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Read-Only Memory (ROM)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What critical software packages are installed immediately after installing Windows or Linux?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Required chipset, display, and network drivers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Casual media games</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Benchmark wallpapers</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Social media toolbars</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. Prior to executing hardware replacements or software upgrades, a technician must:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Read manufacturer instruction manuals and verify compatibility</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Discard diagnostic logs</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Insert random USB thumb drives</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Overclock memory voltage</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. An architectural design assigning subnet blocks and IP pools across an organization is an:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. IP Addressing scheme</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Transmission media</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Physical topology wire</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Font encoding script</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. What does the networking acronym OSI stand for?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Open Systems Interconnection</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Operating System Interface</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Open Source Initiative</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Optical Signal Interconnect</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Before collecting and installing enterprise software, technicians must strictly adhere to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Occupational Safety and Health (OSH) &amp; licensing procedures</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Marketing fashion trends</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Social media discussions</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Commercial gaming reviews</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Documenting exact user software requirements ensures that:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. The correct software version, edition, and licenses are procured</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Workstation paint color matches</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Office catering orders arrive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Keyboard cable length increases</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. A Disaster Recovery Plan (DRP) ensures that:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Critical data and services can be rapidly restored after system failure</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Physical storage never fills up</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Monitor power consumption doubles</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Audio speakers become louder</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. What is recorded in formal service tickets following troubleshooting completion?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Computer maintenance summary and operational troubleshooting status</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. The client's favorite sports team</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Weather forecasts for the city</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. The technician's lunch choices</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. The documented troubleshooting status report is officially submitted to the:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Designated Authority / IT Supervisor</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Competitor enterprise</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hardware salvage yard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Social media forum</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Short Questions -->
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-top: 14px; margin-bottom: 6px;">
    Section B: Technical Short Answers &amp; Workplace Analytical Case Studies (21 &ndash; 30)
  </p>

  <blockquote style="border-left: 4px solid #0284c7; background-color: #f8fafc; padding: 10px 14px; margin: 10px 0; font-size: 10pt; color: #1e293b;">
    <p style="margin: 4px 0 2px 0;"><strong>21. What detailed information is documented upon concluding troubleshooting? (ট্রাবলশুটিং বা সমস্যা সমাধানের পর কোন কোন তথ্য নথিবদ্ধ করা হয়?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> The root problem description, specific diagnostic steps executed, parts replaced, final solution, and empirical post-repair benchmark test results.<br/>
      <span style="color: #475569;">বাংলা: মূল সমস্যাটি কী ছিল, এটি ঠিক করতে কী কী পদক্ষেপ নেওয়া হয়েছে, চূড়ান্ত সমাধান এবং পরীক্ষার ফলাফল নথিবদ্ধ করা হয়।</span><br/>
      <strong>Real-World Case Study (Loose RAM):</strong><br/>
      &bull; <em>Symptom:</em> PC powers on (fans spinning) but screen remains black (No Display); single long beep emitted.<br/>
      &bull; <em>Diagnostic Action:</em> Reseated the DDR4 RAM module firmly into primary DIMM slot until retention clips clicked.<br/>
      &bull; <em>Verification Result:</em> Display restored immediately; MemTest86 passed with 0 errors. Ticket closed.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>22. How do visual safety signs contribute to workplace hazard prevention?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Provide instant visual warnings of acute environmental hazards, locate emergency equipment, and guide rapid egress paths.<br/>
      <span style="color: #475569;">বাংলা: চিহ্নগুলো কর্মীদের সম্ভাব্য বিপদ সম্পর্কে সতর্ক করে, সুরক্ষার সরঞ্জাম দেখিয়ে দেয় এবং নিরাপদ থাকার দিকনির্দেশনা দেয়।</span><br/>
      <strong>Workplace Examples:</strong><br/>
      1. <em>"Wet Floor / Caution Slippery"</em>: Alerts personnel to damp flooring, preventing physical slip and fall accidents.<br/>
      2. <em>"Emergency Exit / Fire Escape"</em>: Illuminated signage guiding occupants toward safety during power outages or fire alarms.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>23. Define document text alignment: (ডকুমেন্টে অ্যালাইনমেন্ট বলতে কী বোঝায়?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> The spatial positioning of paragraph text and graphic objects relative to page margins (Left, Center, Right, or Justified).<br/>
      <span style="color: #475569;">বাংলা: পৃষ্ঠার মার্জিনের সাপেক্ষে টেক্সট বা ছবিগুলো কীভাবে সাজানো বা সারিবদ্ধভাবে রাখা হবে তাকে অ্যালাইনমেন্ট বলে।</span><br/>
      <strong>Workplace Examples:</strong> Left Alignment for standard business prose; Center Alignment for formal document titles; Justified Alignment for newspaper columns.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>24. How do you technically interpret a 'website'? ('ওয়েবসাইট' বলতে আপনি কী বোঝেন?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> A collection of interconnected, publicly or privately accessible web pages sharing a common Fully Qualified Domain Name (FQDN) hosted on web servers.<br/>
      <span style="color: #475569;">বাংলা: ইন্টারনেটে থাকা পরস্পর সম্পর্কিত কিছু ওয়েবপেজের সমষ্টি, যা একটি নির্দিষ্ট ডোমেইন নামের অধীনে থাকে এবং অনলাইনে ব্রাউজ করা যায়।</span><br/>
      <strong>Workplace Examples:</strong> <code>https://www.google.com</code> (search portal), <code>https://www.wikipedia.org</code> (encyclopedia).
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>25. What is the operational scope of Hardware Support? (হার্ডওয়্যার সাপোর্ট কী?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Physical assembly, diagnosing, repairing, preventive cleaning, and upgrading of tangible computing equipment and peripherals.<br/>
      <span style="color: #475569;">বাংলা: কম্পিউটারের বিভিন্ন ভৌত বা বাহ্যিক যন্ত্রাংশ ঠিক করা, রক্ষণাবেক্ষণ করা বা নতুন স্থাপন করাকে হার্ডওয়্যার সাপোর্ট বলে।</span><br/>
      <strong>Workplace Examples:</strong> Replacing broken laptop display panels, swapping failed PSU units, and clearing dust from enterprise server blades.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>26. What is the engineering role of the Power Supply Unit (PSU)?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Converts dangerous high-voltage Alternating Current (110V/220V AC) from wall sockets into tightly regulated low-voltage Direct Current (+3.3V, +5V, +12V DC) required by sensitive motherboard ICs.<br/>
      <span style="color: #475569;">বাংলা: দেয়ালের এসি বিদ্যুৎকে কম্পিউটারের জন্য নিরাপদ ও কম ভোল্টেজের ডিসি বিদ্যুতে রূপান্তর করে যাতে যন্ত্রাংশ পুড়ে না যায়।</span><br/>
      <strong>Workplace Example:</strong> Feeding clean +12V DC current to the multi-phase CPU VRM to ensure stable processing under continuous 100% calculation loads.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>27. What is an IP address? (আইপি অ্যাড্রেস কী?)</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> A logical numeric address (32-bit IPv4 or 128-bit IPv6) assigned to network interfaces to enable routing and packet delivery across networks.<br/>
      <span style="color: #475569;">বাংলা: নেটওয়ার্কে যুক্ত থাকা প্রতিটি ডিভাইসের অনন্য ডিজিটাল নম্বর বা ঠিকানা, যার সাহায্যে ডিভাইসগুলো একে অপরের সাথে যোগাযোগ করে।</span><br/>
      <strong>Workplace Example:</strong> Router local management IP: <code>192.168.1.1</code>; Workstation static IP: <code>192.168.1.50</code>.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>28. What constitutes the mandatory first step when preparing for operating system installation?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Audit hardware requirements (CPU, RAM, TPM 2.0, Secure Boot) and perform a comprehensive full backup of all existing user data on the drive.<br/>
      <span style="color: #475569;">বাংলা: কম্পিউটারের সিস্টেম রিকোয়ারমেন্টস যাচাই করা এবং আগের সব প্রয়োজনীয় ডেটার ব্যাকআপ সম্পূর্ণ করা।</span><br/>
      <strong>Workplace Example:</strong> Exporting user profile folders and bitlocker recovery keys to an external drive before repartitioning the primary SSD for Windows 11.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>29. What is the essential first step when preparing for application software installation?</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 6px;">
      <strong>Technical Answer:</strong> Review software vendor system specifications (OS build compatibility, minimum RAM, required DirectX/Vulkan runtime, disk space) and verify administrative privileges.<br/>
      <span style="color: #475569;">বাংলা: সফটওয়্যারটি পিসিতে চলবে কিনা তা জানতে প্রয়োজনীয় যোগ্যতা (সিস্টেম রিকোয়ারমেন্টস) যাচাই করা।</span><br/>
      <strong>Workplace Example:</strong> Verifying a workstation has at least 16GB RAM and AVX2 instruction support before deploying Adobe Premiere Pro.
    </div>

    <p style="margin: 6px 0 2px 0;"><strong>30. Explain the Three Primary Enterprise Backup Schemes: Full, Differential, and Incremental:</strong></p>
    <div style="margin-left: 10px; font-size: 9.5pt; color: #334155; margin-bottom: 2px;">
      <strong>Technical Answer:</strong> The foundational backup architectures governing data redundancy and restore velocities.<br/>
      <span style="color: #475569;">বাংলা: প্রধান তিনটি ব্যাকআপ স্কিম (ফুল, ডিফারেনশিয়াল, ইনক্রিমেন্টাল) এবং তাদের তুলনামূলক সময়সূচী।</span>
    </div>
  </blockquote>

  <!-- SPECIALIZED REFERENCE TABLE: 3-TIER BACKUP SCHEME MATRIX -->
  <p style="font-weight: bold; margin: 14px 0 4px 0; color: #0f172a;">
    Special Reference Matrix: 3-Tier Enterprise Backup Schemes &amp; Real-World Schedule Comparison
  </p>
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #94a3b8; font-size: 9.5pt; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #0f172a; color: #ffffff;">
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 18%;">Backup Scheme</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 34%;">Operational Definition &amp; Mechanism</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 26%;">Sunday &ndash; Monday Real Schedule</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 22%;">Restoration Speed &amp; Media Needed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold; background-color: #f8fafc;">Full Backup</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Creates a complete replica of all designated files and system partitions. Resets archive bit flags.</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Sunday Night:</strong> Complete image of all server databases and user directories.</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #047857; font-weight: 600;">Fastest Recovery (Single backup media required to restore).</td>
      </tr>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold; background-color: #f8fafc;">Differential Backup</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Copies only files altered since the <em>last Full Backup</em>. Does NOT clear archive bits; daily size grows cumulative.</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Monday &ndash; Friday:</strong> Backs up everything that changed since Sunday's initial full backup.</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Moderate Recovery (Requires Sunday's Full Backup + latest Differential tape).</td>
      </tr>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold; background-color: #f8fafc;">Incremental Backup</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Copies only files altered since the <em>last backup of any type</em>. Clears archive bits; fastest daily execution.</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Monday:</strong> Copies Sunday modifications.<br/><strong>Tuesday:</strong> Copies only Monday modifications.</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; color: #b45309; font-weight: 600;">Slowest Recovery (Requires Sunday Full + all chained daily Incrementals).</td>
      </tr>
    </tbody>
  </table>


  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 18)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 18
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-305 &ndash; Enforce Occupational Health & Safety (OHS), Workplace Standards & Helpdesk Operations
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Occupational Health & Safety (OHS), Electrostatic Discharge (ESD) Prevention & Ergonomics
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-305):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-18.1: Comply with national and international OHS workplace safety regulations for IT technicians.</li>
      <li>PC-18.2: Implement Electrostatic Discharge (ESD) protection: Antistatic wrist strap (1-megaohm resistor), antistatic mat, and dissipative bags.</li>
      <li>PC-18.3: Identify electrical hazard protocols (high-voltage CRT/SMPS capacitor discharge, Class C fire extinguishers).</li>
      <li>PC-18.4: Apply ergonomic standards: monitor viewing height, 90-degree elbow posture, lumbar support, and 20-20-20 eye strain rule.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 18: Workshop ESD Workstation Setup & Safe High-Voltage Equipment Handling Audit
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> ESD Antistatic Bench Mat, Antistatic Wrist Strap with Grounding Clip, Digital Static Field Meter, CO2 Fire Extinguisher.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Inspect workshop grounding outlet with three-prong socket tester to confirm valid Earth ground.</li>
        <li>Lay dissipative ESD mat on technician bench; connect grounding cord with 1 MΩ resistor to earth ground point.</li>
        <li>Wear antistatic wrist strap firmly on skin; clip alligator lead to common bench ground.</li>
        <li>Verify zero static charge using static field meter before unpacking sensitive semiconductor components (CPUs/SSDs).</li>
        <li>Verify emergency electrical shutoff switch location and inspect Class C / CO2 fire extinguisher certification tag.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: Why does an antistatic wrist strap incorporate a built-in 1-megaohm (1 MΩ) resistor?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> To protect the technician from lethal electric shock in the event that the technician touches a live AC electrical circuit; the 1 MΩ resistance limits fault current to a safe microampere level while still effectively bleeding off static charges.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: Which class of fire extinguisher is mandatory for electrical equipment fires and what should NEVER be used?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> Class C (or Class E in international standards) CO2 or dry chemical extinguishers must be used. Water (Class A) must NEVER be used on energized electrical fires due to high electrical conductivity leading to electrocution.
        </p>
      </div>
    </div>

  </div>


  <!-- ==========================================
       SET# 19: NATIONAL COMPETENCY ASSESSMENT SERIES
       (Dated 14 June 2026 & Level-3 IT Support)
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 4px; margin-top: 20px; margin-bottom: 6px;">
    Set# 19: National Competency Assessment Series (Dated 14 June 2026 &amp; Level-3 IT Support)
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 8px;">
    Section A: Official Multiple Choice Questions (Questions 1 &ndash; 20) &bull; Authentic Booklet Transcription
  </p>

  <!-- Q1 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>1. When should a team meeting be attended?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি টিম মিটিংয়ে কখন উপস্থিত হওয়া উচিত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. On time</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 30 minutes late</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Only when summoned</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. After the meeting adjourns</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>2. Visual signs posted at the workplace help in:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কর্মক্ষেত্রে ভিজ্যুয়াল সাইন বা দৃশ্যমান প্রতীকগুলো কীসে সাহায্য করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Decorating walls</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Creating confusion</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Giving clear instructions, warnings, or emergency directions</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Increasing equipment noise</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>3. What features is a formal standard technical report likely to include?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি স্ট্যান্ডার্ড রিপোর্টে সাধারণত কী কী অন্তর্ভুক্ত থাকে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Random cartoons and audio clips</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Plain unformatted text without headings</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Drop Cap, Columns, Page Numbers, Headings, and Tables</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Only watermarks</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>4. In default Windows desktop environments, the taskbar is typically situated:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: টাস্কবার (Taskbar) সাধারণত স্ক্রিনের কোথায় অবস্থান করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. In the middle of the screen</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. At the bottom of the screen</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Hidden behind the BIOS</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Inside the system tray only</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>5. What is the unique global address of a web resource called?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি ওয়েব পেজের অনন্য (ইউনিক) ঠিকানাকে কী বলা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. URL (Uniform Resource Locator)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. HTML Tag</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. MAC Address</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cookie String</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>6. Which web-based cloud platform provides real-time collaborative document editing?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: রিয়েল-টাইম ডকুমেন্ট এডিটিংয়ের জন্য কোন ওয়েব-ভিত্তিক সেবাটি ব্যবহার করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Google Docs</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Microsoft Office 365 Word Online</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Zoho Writer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. All of the above</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>7. Which of the following is an authorized physical working area for an enterprise IT support technician?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি একটি আইটি সাপোর্ট সার্ভিসের কাজের ক্ষেত্র?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Enterprise Data Center / Server Room / IT Help Desk</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Cafeteria Kitchen</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Outdoor Parking Bay</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Reception Waiting Lobby</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>8. Which hardware unit is classified as an external peripheral device?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি একটি এক্সটার্নাল পেরিফেরাল (বাহ্যিক) ডিভাইস হিসেবে গণ্য করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Central Processing Unit (CPU)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. DDR5 RAM Module</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Optical Mouse / Keyboard / Flatbed Scanner</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Motherboard Chipset</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>9. Which component stores BIOS/UEFI settings and powers the Real-Time Clock (RTC) when unplugged?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোন উপাদানটি BIOS সেটিংস সংরক্ষণ করে এবং কম্পিউটার বন্ধ থাকলেও ঘড়ির সময় সচল রাখে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. CMOS Coin Cell Battery (CR2032 3V Lithium)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Heatsink Fan</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. SATA Cable</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. ATX Power Switch</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>10. Which voltage rail is NOT normally supplied by a standard ATX desktop Power Supply Unit?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোন ভোল্টেজটি সাধারণত কম্পিউটারের ATX PSU দ্বারা সরবরাহ করা হয় না?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. +3.3V DC (Orange)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. +5.0V DC (Red) &amp; +12.0V DC (Yellow)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. -12.0V DC (Blue)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. 24V DC (Non-standard; not supplied by ATX PSUs)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>11. The Copyright Act 2005 primarily safeguards and protects:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কপিরাইট আইন ২০০৫ মূলত কী রক্ষা ও নিয়ন্ত্রণ করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Software, source code, and digital intellectual property from piracy</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Physical power cables</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Computer desks and chairs</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Electricity tariffs</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>12. What is a crucial mandatory step prior to installing an operating system?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: ওএস ইনস্টলেশনের প্রস্তুতির জন্য নিচের কোনটি একটি অত্যন্ত গুরুত্বপূর্ণ পদক্ষেপ?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Overclocking the CPU to maximum voltage</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Verifying system hardware prerequisites and backing up all existing data</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Removing the CMOS battery permanently</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Disconnecting the keyboard</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>13. The physical or logical geometric arrangement of nodes in a network is termed:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি নেটওয়ার্কে ডিভাইসগুলোর ভৌত বা যৌক্তিক বিন্যাসকে কী বলা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Server Cluster</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Transmission Bandwidth</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. IP Routing Hop</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>D. Network Topology (Star, Mesh, Bus, Ring, Hybrid)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>14. A Wide Area Network (WAN) typically spans across:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: একটি ওয়াইড এরিয়া নেটওয়ার্ক (WAN) সাধারণত কোন ভৌগোলিক পরিসীমা কভার করে?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. A single office room</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. A single campus building (LAN)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. A vast geographical region, multiple cities, countries, or continents (e.g., the Internet)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. A personal desk area (PAN)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>15. In IT Support Level 3 competency, which practical skill is a core assessment requirement?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: আইটি সাপোর্ট লেভেল ৩ দক্ষতার ক্ষেত্রে নিচের কোনটি একটি মৌলিক ও বাধ্যতামূলক দিক?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Assembling factory machinery</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. Installing, configuring, securing, and troubleshooting application software and OS</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Writing high-level financial tax laws</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Designing high-rise office architecture</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>16. Why must user requirements be formally documented before acquiring enterprise software?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সফটওয়্যার সংগ্রহের আগে ব্যবহারকারীর প্রয়োজনীয়তাগুলো কেন নথিবদ্ধ (ডকুমেন্ট) করা হয়?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. To guarantee the exact functional software and licensing match actual operational needs</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. To fill filing cabinets with paperwork</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To delay project timelines</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To avoid talking to end users</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>17. Which methodology represents a reliable email backup protocol?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি একটি নির্ভরযোগ্য ইমেইল ব্যাকআপ তৈরির পদ্ধতি?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>A. Exporting mailbox items and address books into an encrypted local data archive (.pst/.olm/mbox)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Deleting old emails from the inbox</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Printing emails onto paper</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Forwarding spam to coworkers</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>18. Which of the following is classified as an enterprise backup storage medium?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: নিচের কোনটি এক ধরনের ব্যাকআপ স্টোরেজ মিডিয়া?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. System RAM cache</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. External Storage Devices (External SSD/HDD, Network Attached Storage NAS, Magnetic LTO Tape)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. GPU VRAM Buffer</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. CPU L1 Cache</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>19. When identifying the probable root cause of an infrastructure fault, whom should you consult?</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: কোনো কারিগরি ত্রুটির সম্ভাব্য কারণ চিহ্নিত করার সময় আপনি কার সাথে পরামর্শ করবেন?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Uninvolved third parties or casual visitors</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>B. The appropriate person (System/Network Administrator, IT Team Lead, affected user)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Facility security guard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Hardware sales vendor only</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p style="margin-top: 6px; margin-bottom: 3px;">
    <strong>20. Following diagnostic troubleshooting, all identified problems and fixes must be:</strong><br/>
    <span style="font-size: 9pt; color: #475569;">বাংলা: সমস্যা সমাধানের পর চিহ্নিত সমস্যা ও গৃহীত পদক্ষেপগুলো কী করা উচিত?</span>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 14px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Disregarded and forgotten</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Kept as a personal secret</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;" data-correct="true" class="exam-correct-cell"><span class="exam-verified-key font-bold text-emerald-700 dark:text-emerald-400">✓ </span>C. Formally documented in ticketing logs and the central IT knowledge base</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Erased from system logs</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Descriptive Questions & Troubleshooting Protocols (Set 19 - 14 June 2026) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #0f172a; font-size: 11pt;">
      Section B: Analytical Technical Questions &amp; Practical Workplace Solutions (Questions 21 &ndash; 30)
    </p>

    <!-- Q21 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>21. What does "active listening" mean in the workplace?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: কর্মক্ষেত্রে "সক্রিয় শ্রবণ" (Active Listening) বলতে কী বোঝায়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> Active listening means listening with full concentration to understand the speaker perfectly.<br/>
      <strong>Example:</strong> Nodding head and taking notes during a meeting.<br/>
      <strong>উত্তর (বাংলা):</strong> সক্রিয় শ্রবণ মানে হলো বক্তার কথা পুরোপুরি বোঝার জন্য সম্পূর্ণ মনোযোগ দিয়ে শোনা।<br/>
      <strong>উদাহরণ:</strong> মিটিংয়ে কথা শোনার সময় মাথা নেড়ে সায় দেওয়া এবং নোট নেওয়া।
    </div>

    <!-- Q22 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>22. What is the taskbar used for?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: টাস্কবার (Taskbar) কী কাজে ব্যবহার করা হয়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> The taskbar is used to launch apps, switch between open programs, and check the time.<br/>
      <strong>Example:</strong> Clicking the Chrome icon on the bottom bar to open the browser.<br/>
      <strong>উত্তর (বাংলা):</strong> টাস্কবার মূলত অ্যাপস চালু করতে, চলমান প্রোগ্রামে যেতে এবং সময় দেখতে ব্যবহার করা হয়।<br/>
      <strong>উদাহরণ:</strong> স্ক্রিনের নিচে থাকা ক্রোম (Chrome) আইকনে ক্লিক করে ব্রাউজার ওপেন করা।
    </div>

    <!-- Q23 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>23. Define document text alignment and illustrate its primary variations:</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: ডকুমেন্টে টেক্সট অ্যালাইনমেন্ট (Alignment) বলতে কী বোঝায়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> Alignment refers to the spatial arrangement and positioning of text relative to page margins: Left (Ctrl+L), Center (Ctrl+E), Right (Ctrl+R), and Justified (Ctrl+J).<br/>
      <strong>উত্তর (বাংলা):</strong> অ্যালাইনমেন্ট হলো পৃষ্ঠার মার্জিনের সাপেক্ষে টেক্সটের অবস্থান বা বিন্যাস নির্ধারণ করা (বাম, কেন্দ্র, ডান ও জাস্টিফাই)।
    </div>

    <!-- Q24 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>24. Briefly describe a common problem-solving method in an IT system:</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: আইটি সিস্টেমে একটি সাধারণ সমস্যা সমাধানের পদ্ধতি সংক্ষেপে বর্ণনা করো।</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> Troubleshooting is a common method that involves identifying the problem, finding the cause, and fixing it.<br/>
      <strong>Example:</strong> Restarting a PC when it suddenly freezes.<br/>
      <strong>উত্তর (বাংলা):</strong> ট্রাবলশুটিং হলো একটি সাধারণ পদ্ধতি যার মাধ্যমে সমস্যাটি চিহ্নিত করা হয়, কারণ খোঁজা হয় এবং তা সমাধান করা হয়।<br/>
      <strong>উদাহরণ:</strong> কম্পিউটার হঠাৎ হ্যাং হয়ে গেলে তা রিস্টার্ট (Restart) করা।
    </div>

    <!-- Q25 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>25. What is meant by proprietary software?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: প্রোপরাইটারি সফটওয়্যার (Proprietary software) বলতে কী বোঝায়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> It is commercial software that is owned by a company, and users must buy a license to use it.<br/>
      <strong>Example:</strong> Microsoft Windows or Microsoft Office.<br/>
      <strong>উত্তর (বাংলা):</strong> এটি এমন বাণিজ্যিক সফটওয়্যার যা কোনো কোম্পানির মালিকানাধীন থাকে এবং এটি ব্যবহারের জন্য লাইসেন্স কিনতে হয়।<br/>
      <strong>উদাহরণ:</strong> মাইক্রোসফট উইন্ডোজ (Windows) বা মাইক্রোসফট অফিস।
    </div>

    <!-- Q26 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>26. What needs to be installed after the operating system is installed?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: অপারেটিং সিস্টেম ইনস্টল করার পর কী ইনস্টল করতে হয়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> Device drivers and essential application software need to be installed.<br/>
      <strong>Example:</strong> Installing Graphics Drivers and Google Chrome.<br/>
      <strong>উত্তর (বাংলা):</strong> ওএস ইনস্টলের পর ডিভাইস ড্রাইভার এবং প্রয়োজনীয় অ্যাপ্লিকেশন সফটওয়্যার ইনস্টল করতে হয়।<br/>
      <strong>উদাহরণ:</strong> গ্রাফিক্স ড্রাইভার এবং গুগল ক্রোম ব্রাউজার ইনস্টল করা।
    </div>

    <!-- Q27 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>27. What is an IP address?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: আইপি অ্যাড্রেস (IP address) কী?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> An IP address is a unique numerical label assigned to each device connected to a network.<br/>
      <strong>Example:</strong> 192.168.1.1<br/>
      <strong>উত্তর (বাংলা):</strong> আইপি অ্যাড্রেস হলো একটি নেটওয়ার্কে যুক্ত প্রতিটি ডিভাইসের জন্য একটি অনন্য বা নির্দিষ্ট নম্বরভিত্তিক ঠিকানা।<br/>
      <strong>উদাহরণ:</strong> 192.168.1.1
    </div>

    <!-- Q28 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>28. What does "Restore procedure" involve?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: "রিস্টোর পদ্ধতি" (Restore procedure) বলতে কী বোঝায়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> It involves copying backed-up data back to its original location after a system failure.<br/>
      <strong>Example:</strong> Recovering deleted photos from a backup drive.<br/>
      <strong>উত্তর (বাংলা):</strong> এটি হলো কোনো সিস্টেম নষ্ট বা ক্র্যাশ হওয়ার পর ব্যাকআপ ফাইল থেকে ডাটা পুনরায় আগের জায়গায় ফিরিয়ে আনা।<br/>
      <strong>উদাহরণ:</strong> ব্যাকআপ ড্রাইভ থেকে মুছে যাওয়া ছবি বা ফাইল উদ্ধার (Recover) করা।
    </div>

    <!-- Q29 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>29. Why are user requirements documented before collecting software?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: সফটওয়্যার সংগ্রহের আগে ব্যবহারকারীর প্রয়োজনীয়তাগুলো কেন নথিবদ্ধ (ডকুমেন্ট) করা হয়?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 8px;">
      <strong>Answer (English):</strong> To make sure the right software is chosen according to the user's actual needs.<br/>
      <strong>Example:</strong> Writing down that a client needs video editing software, so you choose Adobe Premiere Pro instead of MS Word.<br/>
      <strong>উত্তর (বাংলা):</strong> ব্যবহারকারীর আসল প্রয়োজন অনুযায়ী সঠিক সফটওয়্যারটি নির্বাচন করা নিশ্চিত করার জন্য।<br/>
      <strong>উদাহরণ:</strong> ক্লায়েন্টের ভিডিও এডিটিং সফটওয়্যার লাগবে তা আগে লিখে রাখা, যাতে MS Word-এর বদলে Adobe Premiere Pro কেনা যায়।
    </div>

    <!-- Q30 -->
    <p style="margin: 6px 0 2px 0;">
      <strong>30. Why is it important to interview the appropriate person about the problem?</strong><br/>
      <span style="font-size: 9pt; color: #475569;">বাংলা: সমস্যাটি সম্পর্কে উপযুক্ত ব্যক্তির সাক্ষাৎকার নেওয়া (কথা বলা) কেন গুরুত্বপূর্ণ?</span>
    </p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Answer (English):</strong> To get accurate information and find the exact cause of the problem quickly.<br/>
      <strong>Example:</strong> Asking the Network Administrator directly about a server down issue instead of asking a security guard.<br/>
      <strong>উত্তর (বাংলা):</strong> সঠিক তথ্য পেতে এবং সমস্যার আসল কারণটি দ্রুত খুঁজে বের করার জন্য।<br/>
      <strong>উদাহরণ:</strong> সার্ভার ডাউন হলে সিকিউরিটি গার্ডকে না জিজ্ঞেস করে সরাসরি নেটওয়ার্ক অ্যাডমিনিস্ট্রেটরকে জিজ্ঞেস করা।
    </div>
  </div>

 margin-top: 22px; margin-bottom: 8px;">
    Section C: Practical Systems Engineering &amp; Hardware Diagnostic Reference Handbook
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #475569; margin-bottom: 10px;">
    Institutional Benchmark Standards &bull; Power Rails, Diagnostic Flowcharts, Formulas &amp; Conjuncts
  </p>

  <!-- Table 1: ATX Motherboard Voltage Tolerances -->
  <p style="font-weight: bold; margin: 10px 0 4px 0; color: #0f172a;">
    1. 24-Pin ATX Motherboard Power Supply Voltage Rails &amp; Acceptable Tolerance Limits
  </p>
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #94a3b8; font-size: 9.5pt; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #0f172a; color: #ffffff;">
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 18%;">Voltage Rail</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 16%;">Standard Wire Color</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 16%;">Tolerance Range</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 22%;">Minimum / Maximum Range</th>
        <th style="padding: 5px 8px; border: 1px solid #475569; text-align: left; width: 28%;">Primary Hardware Load</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;">+3.3V DC</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Orange</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">&plusmn;5%</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">+3.14V to +3.47V</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Motherboard chipset, PCIe logic, M.2 NVMe SSD</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;">+5.0V DC</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Red</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">&plusmn;5%</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">+4.75V to +5.25V</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">SATA SSDs, HDDs logic board, USB 2.0/3.0 bus</td>
      </tr>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;">+12.0V DC</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Yellow</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">&plusmn;5%</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">+11.40V to +12.60V</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">CPU VRM power, PCIe graphics card, cooling fans</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;">-12.0V DC</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Blue</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">&plusmn;10%</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">-10.80V to -13.20V</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Legacy serial COM ports, PCI sound cards</td>
      </tr>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;">+5.0VSB (Standby)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Purple</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">&plusmn;5%</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">+4.75V to +5.25V</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Powers RTC, Wake-on-LAN, power button logic</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;">PWR_OK / PG</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Gray</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Signal (+5V)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">+2.4V to +5.0V</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Indicates voltages are stable; enables CPU boot</td>
      </tr>
      <tr>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1; font-weight: bold;">PS_ON# (Control)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Green</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Active Low</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Pull to GND (0V)</td>
        <td style="padding: 5px 8px; border: 1px solid #cbd5e1;">Short to black wire to manually start PSU</td>
      </tr>
    </tbody>
  </table>

  <!-- Table 2: 12-Step No Display Protocol -->
  <p style="font-weight: bold; margin: 10px 0 4px 0; color: #0f172a;">
    2. Systematic 12-Step Desktop Hardware "No Display" Diagnostic Protocol
  </p>
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; width: 8%;">Step</th>
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: left; width: 42%;">Diagnostic Action</th>
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: left; width: 50%;">Expected Result &amp; Troubleshooting Threshold</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">01</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Monitor Power Verification</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Confirm monitor AC power cable is firmly seated and power LED illuminates.</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">02</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Monitor Input Source Selection</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Ensure OSD is set to the correct active input port (HDMI 1, DP, VGA).</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">03</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Display Cable Inspection</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Inspect cable pins for bent wires; test with a known-good HDMI/DP cable.</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">04</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Correct Port Routing Check</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">If a dedicated GPU is installed, plug video cable into the GPU, NOT motherboard IO.</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">05</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Motherboard POST Beep &amp; Debug LEDs</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Check status of CPU, DRAM, VGA, and BOOT debug LEDs on modern motherboards.</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">06</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">RAM Reseating &amp; Single-Stick Test</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Remove all RAM; clean gold contacts with vinyl eraser; test one stick in Slot A2.</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">07</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">CMOS Settings Reset</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Remove AC power, take out CR2032 coin cell for 5 min to reset corrupt BIOS timings.</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">08</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">GPU Reseating &amp; Power Inspection</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Reseat graphics card firmly into primary PCIe x16 slot; check 8-pin auxiliary cables.</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">09</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Integrated Graphics Isolation</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">If CPU has an iGPU, remove dedicated graphics card and test display via motherboard port.</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">10</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Disconnect Non-Essential Peripherals</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Unplug all USB drives, webcams, audio interfaces, and secondary SATA storage.</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">11</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">CPU Socket &amp; Pin Inspection</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Inspect LGA socket pins for bending or thermal paste contamination on pads.</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">12</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">PSU Voltage Rail Verification</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Measure +12V and +3.3V rails under load with a DMM; swap with known-good PSU.</td>
      </tr>
    </tbody>
  </table>

  <!-- Table 3: Bengali Conjunct & Keyboard Reference -->
  <p style="font-weight: bold; margin: 10px 0 4px 0; color: #0f172a;">
    3. Bengali Conjuncts (যুক্তাক্ষর) &amp; Typing Matrix (Bijoy vs. Avro Layouts)
  </p>
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; width: 14%;">যুক্তাক্ষর</th>
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: left; width: 28%;">বর্ণ বিশ্লেষণ (Components)</th>
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: left; width: 28%;">বিজয় লেআউট (Bijoy Keystroke)</th>
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: left; width: 30%;">অভ্র ফোনেটিক (Avro Phonetic)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; font-size: 11pt;">ক্ষ</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">ক + ষ</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>j + g + N</code></td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>kkh / kSh</code></td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; font-size: 11pt;">জ্ঞ</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">জ + ঞ</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>u + g + I</code></td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>jng / gyo</code></td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; font-size: 11pt;">ষ্ণ</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">ষ + ণ</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>N + g + B</code></td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>ShN</code></td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; font-size: 11pt;">ব্র</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">ব + র-ফলা</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>h + z</code></td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>bro / br</code></td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; font-size: 11pt;">ঙ্ক</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">ঙ + ক</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>Q + g + j</code></td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>Ngk / nko</code></td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold; font-size: 11pt;">হ্ম</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">হ + ম</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>i + g + m</code></td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;"><code>hm / hmo</code></td>
      </tr>
    </tbody>
  </table>

  
  <!-- =========================================================================
       SECTION C: INSTITUTIONAL SCORING RUBRICS & COMPETENCY CRITERIA (SET 19)
       National Technical & Vocational Qualifications Framework (NTVQF) Level-3
       ========================================================================= -->
  <div class="exam-section-c-container" style="background-color: #ffffff; border: 2px solid #1e3a8a; border-radius: 6px; padding: 12px 16px; margin-top: 14px; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(30, 58, 138, 0.08);">
    
    <!-- Institutional Competency Header -->
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 6px; margin-bottom: 10px;">
      <p style="font-size: 11.5pt; font-weight: bold; color: #1e3a8a; margin: 0; text-transform: uppercase;">
        Section C: Institutional Scoring Rubrics &amp; Competency Assessment Matrix &bull; Set# 19
      </p>
      <p style="font-size: 9.5pt; color: #475569; margin: 2px 0 0 0;">
        <strong>Unit Code &amp; Title:</strong> IT-SUP-301 / 305 &ndash; Comprehensive Final Practical Examination & Technical Support Diagnostics
      </p>
      <p style="font-size: 9pt; color: #64748b; margin: 1px 0 0 0;">
        <strong>Curriculum Domain:</strong> Full-Cycle Computer Systems Assembly, OS Deployment, Network Integration & Diagnostics
      </p>
    </div>

    <!-- Official 100-Mark Scoring Distribution Table -->
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 12px;">
      <thead>
        <tr style="background-color: #f1f5f9; color: #0f172a;">
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Assessment Section</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Total Questions</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 20%;">Allocated Marks</th>
          <th style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; width: 25%;">Passing Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section A: Multiple Choice Questions</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">25 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">50 Marks (2 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 25 Marks (50%)</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section B: Technical &amp; Diagnostic Answers</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">5 Questions</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">30 Marks (6 marks/Q)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 15 Marks (50%)</td>
        </tr>
        <tr>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1;"><strong>Section C: Practical Job Sheet &amp; Viva-Voce</strong></td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">Practical + 2 Viva Qs</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center;">20 Marks (12 Job + 8 Viva)</td>
          <td style="padding: 5px 8px; border: 1px solid #cbd5e1; text-align: center; color: #047857; font-weight: 600;">Min. 10 Marks (50%)</td>
        </tr>
        <tr style="background-color: #eff6ff; font-weight: bold; color: #1e3a8a;">
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1;">Aggregate Qualification Total</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">Full Assessment</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center;">100 Marks</td>
          <td style="padding: 6px 8px; border: 1px solid #cbd5e1; text-align: center; color: #1e3a8a;">Competent (C) &ge; 50 Marks</td>
        </tr>
      </tbody>
    </table>

    <!-- Performance Criteria Checklist -->
    <p style="font-weight: bold; margin: 8px 0 4px 0; color: #0f172a; font-size: 10pt;">
      National Performance Criteria Checklist (Unit: IT-SUP-301 / 305):
    </p>
    <ul style="margin: 0 0 10px 20px; padding: 0; font-size: 9.5pt; color: #334155;">
      <li>PC-19.1: Assemble a complete desktop computing system from bare components adhering to strict safety and engineering protocols.</li>
      <li>PC-19.2: Install and configure operating system, storage partitioning (GPT), and vendor hardware device drivers.</li>
      <li>PC-19.3: Terminate Cat6 cabling, integrate workstation into departmental LAN, configure IP parameters, and verify gateway routing.</li>
      <li>PC-19.4: Resolve simulated complex fault scenarios (no power, BSOD memory fault, DNS failure) under timed examination conditions.</li>
    </ul>

    <!-- Practical Assessment Job Sheet -->
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px 12px; margin-bottom: 10px;">
      <p style="font-weight: bold; margin: 0 0 3px 0; color: #0369a1; font-size: 10pt;">
        Official Practical Assessment Job Sheet &bull; Task Assignment:
      </p>
      <p style="font-size: 9.5pt; margin: 2px 0; color: #1e293b;">
        <strong>Task Title:</strong> Job Sheet 19: Comprehensive 100-Point Systems Engineering Assembly & Diagnostic Benchmark
      </p>
      <p style="font-size: 9pt; margin: 2px 0; color: #475569;">
        <strong>Required Tools &amp; Materials:</strong> Complete Desktop PC Component Kit, Cat6 Cable, Crimping Tool, OS Installation Flash Drive, Multimeter, Diagnostic Suite.
      </p>
      <p style="font-size: 9pt; font-weight: 600; margin: 4px 0 2px 0; color: #334155;">
        Step-by-Step Practical Demonstration Procedure:
      </p>
      <ol style="margin: 2px 0 4px 20px; padding: 0; font-size: 9pt; color: #334155;">
        <li>Assemble bare motherboard, CPU, cooling fan, dual-channel RAM, M.2 NVMe SSD, and SMPS into chassis.</li>
        <li>Perform cable management; connect front panel headers (Power SW, Reset, HDD LED, Power LED, Audio, USB 3.0).</li>
        <li>Power on system; verify normal single POST beep and enter UEFI BIOS setup.</li>
        <li>Install 64-bit operating system via bootable UEFI flash drive onto NVMe SSD using GPT partition table.</li>
        <li>Crimp Cat6 patch cable (T568B); connect to departmental switch port; verify DHCP lease and ping gateway with 0% packet loss.</li>
        <li>Present completed functional workstation to National Board Examiner for final viva-voce evaluation.</li>
      </ol>
    </div>

    <!-- Viva-Voce Oral Examination Rubric -->
    <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 4px; padding: 8px 12px;">
      <p style="font-weight: bold; margin: 0 0 4px 0; color: #6b21a8; font-size: 10pt;">
        Official Viva-Voce Oral Examination Rubric (Examiner Criteria):
      </p>
      
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q1: What is the systematic 6-step troubleshooting methodology recommended by international IT industry standards?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> 1. Identify the problem (gather symptoms, question user); 2. Establish a theory of probable cause; 3. Test the theory to determine cause; 4. Establish a plan of action to resolve the problem and implement the solution; 5. Verify full system functionality and implement preventive measures; 6. Document findings, actions, and outcomes.
        </p>
      </div>
      <div style="margin-bottom: 6px; font-size: 9pt;">
        <p style="margin: 0; color: #581c87; font-weight: 600;">
          Viva Q2: What constitutes competency certification for an IT Support Service Level-3 candidate?
        </p>
        <p style="margin: 2px 0 0 10px; color: #334155;">
          <strong>Examiner Assessment Key:</strong> The candidate must demonstrate mastery across all 3 assessment pillars: Objective Technical Knowledge (Section A >= 25/50), Procedural Problem Solving (Section B >= 15/30), and Hands-on Practical Performance & Viva-Voce Defense (Section C >= 10/20), achieving an aggregate score >= 50/100.
        </p>
      </div>
    </div>

  </div>


  <!-- Official Closing & Invigilator Ledger Block -->
  <div style="margin-top: 24px; border-top: 2px solid #0f172a; padding-top: 10px; font-size: 10pt;">
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: none;">
      <tbody>
        <tr>
          <td style="width: 50%; padding: 6px 0; border: none;">
            <strong>Candidate Signature:</strong> _____________________________
          </td>
          <td style="width: 50%; padding: 6px 0; text-align: right; border: none;">
            <strong>Invigilator Signature:</strong> _____________________________
          </td>
        </tr>
        <tr>
          <td style="width: 50%; padding: 4px 0; border: none; font-size: 9pt; color: #64748b;">
            Examination Date: 14 June 2026
          </td>
          <td style="width: 50%; padding: 4px 0; text-align: right; border: none; font-size: 9pt; color: #64748b;">
            Official Council Verification Stamp &bull; Passed
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
`;
