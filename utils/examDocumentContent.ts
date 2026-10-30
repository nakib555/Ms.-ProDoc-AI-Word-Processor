/**
 * Full Exam Question Paper & Technical Answer Sheets (Sets 01 - 10)
 * Re-authored to strict Microsoft Word Professional Examination standards:
 * - Authentic questions and complete technical answers transcribed from booklet images
 * - Completely deduplicated across all sets
 * - Clean semantic tables fully compatible with ProDoc Table Properties, Context Menu, Resizer, and Sort
 * - Zero artificial page breaks: content flows naturally across pages without blank voids
 * - High-DPI print and PDF rendering with crisp vector typography and selectable text
 */

export const FULL_EXAM_DOCUMENT_HTML = `
<div style="font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.35; color: #1e293b;">

  <!-- ==========================================
       OFFICIAL EXAMINATION HEADER & CANDIDATE INFO
       ========================================== -->
  <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 12px;">
    <p style="font-size: 16pt; font-weight: bold; margin: 0; letter-spacing: 0.5px; color: #0f172a; text-transform: uppercase;">
      Technical &amp; Vocational Training Council
    </p>
    <p style="font-size: 13pt; font-weight: bold; margin: 2px 0 0 0; color: #334155;">
      Department of Information Technology &amp; Systems Engineering
    </p>
    <p style="font-size: 10.5pt; font-style: italic; margin: 2px 0 6px 0; color: #64748b;">
      National Examination Board &bull; Assessment Series (Sets 01 &ndash; 10)
    </p>
    <p style="font-size: 10pt; font-weight: 600; margin: 0; color: #475569;">
      Time Allowed: 3 Hours &nbsp;|&nbsp; Total Marks: 100 &nbsp;|&nbsp; Passing Marks: 50
    </p>
  </div>

  <!-- Candidate Identification Ledger Table (Editable via ProDoc Table Tools) -->
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #94a3b8; margin-bottom: 12px; font-size: 10pt;">
    <tbody>
      <tr>
        <td style="width: 25%; padding: 4px 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Candidate Name:</td>
        <td style="width: 40%; padding: 4px 8px; border: 1px solid #cbd5e1;">________________________________</td>
        <td style="width: 15%; padding: 4px 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Roll Number:</td>
        <td style="width: 20%; padding: 4px 8px; border: 1px solid #cbd5e1;">____________</td>
      </tr>
      <tr>
        <td style="width: 25%; padding: 4px 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Registration / ID:</td>
        <td style="width: 40%; padding: 4px 8px; border: 1px solid #cbd5e1;">________________________________</td>
        <td style="width: 15%; padding: 4px 8px; border: 1px solid #cbd5e1; background-color: #f8fafc; font-weight: bold;">Center Code:</td>
        <td style="width: 20%; padding: 4px 8px; border: 1px solid #cbd5e1;">____________</td>
      </tr>
    </tbody>
  </table>

  <!-- General Examination Instructions -->
  <div style="background-color: #f1f5f9; border-left: 4px solid #4f46e5; padding: 6px 12px; margin-bottom: 12px; font-size: 9.5pt; color: #334155;">
    <strong>Instructions to Candidates:</strong>
    1. Read all questions carefully before answering. Each set represents a distinct technical curriculum domain.
    2. Multiple Choice Questions: Choose the correct option indicated by the tick mark (✓).
    3. Technical Answer Sheets: Provide clear, concise explanations and diagnostic steps.
  </div>

  <!-- ==========================================
       SET# 01: COMPUTER ARCHITECTURE & PROCESSORS
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 01: Computer Architecture, Bus Systems &amp; Hardware Diagnostics
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #64748b; margin-bottom: 8px;">
    Section A: Multiple Choice Questions (Select the single best answer for each question)
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. A microprocessor unit, a memory unit, and an input/output unit integrated together form a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Central Processing Unit</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Compiler Software</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Microcomputer</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Arithmetic Logic Unit</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Which of the following is NOT a primary computer bus?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Data Bus</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Timer Bus</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Control Bus</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Address Bus</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. The brain of any computer system is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. ALU</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. CPU</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Memory</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Control Unit</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. The personnel who deal with the computer &amp; its management put together are called:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Software</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Humanware / Liveware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Firmware</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Hardware</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. A microprocessor is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Combined unit of monitor and keyboard</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Combined unit of ALU and CU</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Combined unit of CPU and UPS</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. None of these</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>6. When a bearing in the power supply fan goes out, what should you replace?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Fan</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Case</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Bearing</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. Power Supply Unit (PSU)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>7. All Operating Systems get their total memory initialized from:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. CPU</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. BIOS</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. ROM</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. RAM</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>8. Which provides the fastest data access time?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. RAM</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. ROM</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. CD-ROM</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Hard disk</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>9. A hard disk is divided into concentric tracks which are further subdivided into:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Clusters</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Sectors</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Vectors</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Cylinders</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>10. Computer memory system consists of:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. RAM</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. ROM</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. PROM</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. All of the above</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>11. System software acts as a bridge between computer hardware and:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Management</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Processing</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Utility</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. Application software</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>12. You should protect your computer system from:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Viruses</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Unauthorized access</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Network Worms</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. All of the above</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>13. The operating system manages:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Memory</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Processor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Disks and I/O devices</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. All of the above</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>14. What is the standard file extension of an optical Disc Image file?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. .DSK</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. .OSDSK</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. .OS</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. .ISO</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>15. What is the file extension of a Windows Device Driver and System File?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. .sys</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. .system</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. .stm</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. .syt</td>
      </tr>
    </tbody>
  </table>

  <!-- Q16 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>16. In networking terminology, UTP stands for:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Unshielded Twisted Pair</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Ubiquitous Teflon Port</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Uniformly Terminating Port</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Unshielded T-connector Port</td>
      </tr>
    </tbody>
  </table>

  <!-- Q17 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>17. What is the address length of an IPv4 address?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. 32 bits</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. 64 bits</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. 128 bits</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. 256 bits</td>
      </tr>
    </tbody>
  </table>

  <!-- Q18 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>18. Which character is strictly NOT allowed in a standard email address?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Underscore ( _ )</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. At sign ( @ )</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Period ( . )</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. Space ( &nbsp; )</td>
      </tr>
    </tbody>
  </table>

  <!-- Q19 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>19. In computer security, what does VIRUS stand for?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Very Important Record User Searched</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Verify Interchanged Result Until Source</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Vital Information Resource Under Seize</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Very Important Resource Under Search</td>
      </tr>
    </tbody>
  </table>

  <!-- Q20 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>20. To return the remainder after a number is divided by a divisor in Excel, which function is used?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. ROUND()</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. FACT()</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. MOD()</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. DIV()</td>
      </tr>
    </tbody>
  </table>

  <!-- Q21 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>21. Which of the following represents an absolute cell reference in spreadsheet formulas?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. !A!1</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. $A$1</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. #a#1</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. A1</td>
      </tr>
    </tbody>
  </table>

  <!-- Q22 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>22. Which key on the keyboard is used to start a PowerPoint Slide Show from the first slide?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. F1</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. F2</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. F5</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. F10</td>
      </tr>
    </tbody>
  </table>

  <!-- Q23 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>23. In MS Word, which ribbon tab contains the 'Insert Footnote' command?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Insert Tab</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Review Tab</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. References Tab</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Layout Tab</td>
      </tr>
    </tbody>
  </table>

  <!-- Q24 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>24. Which keyboard shortcut is used to insert a Hyperlink in MS Office documents?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Ctrl + K</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Ctrl + V</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Alt + V</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Alt + K</td>
      </tr>
    </tbody>
  </table>

  <!-- Q25 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>25. Superscript, subscript, outline, emboss, and engrave in word processing are known as:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 10px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Font Effects</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Text Effects</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Font Styles</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. WordArt</td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Diagnostic Questions (Set 01) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #1e293b; font-size: 11pt;">
      Section B: Hardware Diagnostics &amp; Troubleshooting Answer Sheets
    </p>

    <p style="margin: 4px 0 2px 0;"><strong>26. Name 5 famous antivirus software applications and 5 well-known computer viruses:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Famous Antivirus:</strong> 1. Comodo Antivirus, 2. AVAST Antivirus, 3. AVG Antivirus, 4. Avira Antivirus, 5. Bitdefender Antivirus.<br/>
      <strong>Famous Historical Viruses:</strong> 1. ILOVEYOU (2000 email worm), 2. Melissa (1999 macro virus), 3. Mydoom (fast-spreading mass mailer), 4. Conficker (Windows worm), 5. Stuxnet (industrial cyber weapon).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>27. What is Malware?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Malware (short for malicious software) is any file, code, or program intentionally designed to infiltrate, damage, exploit, or gain unauthorized access to computer systems, networks, or servers.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>28. What are the primary causes of 'No Display' on a computer and how do you troubleshoot it?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Diagnostic Checklist:</strong>
      1. Verify monitor power LED is ON.
      2. Ensure computer has exited sleep or hibernation mode.
      3. Check VGA/HDMI/DisplayPort cable seating.
      4. Listen for BIOS POST beep codes.
      5. Reseat RAM modules into slots after cleaning gold contacts with an eraser.
      6. Reseat dedicated PCIe graphics card.
      7. Clear CMOS settings by shorting jumper pins or reseating the CR2032 coin cell.
      8. Inspect SMPS power output to GPU and motherboard 24-pin connector.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>29. How do you troubleshoot and fix random system restarts in Windows?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Step-by-Step Resolution:</strong>
      1. Disable Automatic Restart on system failure in Advanced System Properties to capture BSOD stop codes.
      2. Check CPU and GPU temperatures using diagnostic tools to rule out thermal throttling.
      3. Clean dust buildup from heatsinks and reapply thermal paste.
      4. Run Windows Memory Diagnostic (<code>mdsched.exe</code>) to test physical RAM.
      5. Update or cleanly reinstall display and chipset drivers.
      6. Inspect power supply wattage stability under load.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>30. How do you troubleshoot a 'No Power' issue on a desktop PC?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Diagnostic Procedure:</strong>
      1. Verify main wall outlet with an AVO meter or lamp.
      2. Ensure the I/O rocker switch on the back of the PSU is set to 'I' (ON).
      3. Perform the PSU paperclip test (bridge green pin with any black ground pin on 24-pin ATX connector) to verify fan spinning.
      4. Check front-panel power switch header cables on motherboard.
      5. Disconnect non-essential peripherals to isolate internal short circuits.
    </div>
  </div>

  <!-- ==========================================
       SET# 02: OFFICE APPLICATIONS & COMPUTING
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 02: Office Applications, Bengali Typing &amp; Network Fundamentals
  </h2>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. The Bengali compound character &ldquo;ক্ষ&rdquo; is a combination of which letters?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. হ + ম</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. হ + ষ</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. ক + ষ</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. ম + ম</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Which of the following is NOT a dedicated Bengali Unicode font?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Arial</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Kalpurush</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. SolaimanLipi</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Nikosh</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. Which of the following is a valid cell address in an electronic spreadsheet?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. 5A</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. A5</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. @A5</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. A@5</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. In MS Excel, the function &ldquo;=IF()&rdquo; belongs to which category?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Mathematical Function</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Logical Function</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Comparison Function</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Text Function</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What PowerPoint feature is used to apply motion effects to specific objects on a slide?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Slide Transition</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Slide Design</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Animation Objects</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Reading Layout</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>6. The full form of SSD is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Solid State Device</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Secondary Storage Device</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Solid State Drive</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Static Storage Disk</td>
      </tr>
    </tbody>
  </table>

  <!-- Q7 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>7. From what location are the initial computer instructions executed upon power boot-up?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. ROM BIOS</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. CPU Register</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Boot.ini</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. CONFIG.SYS</td>
      </tr>
    </tbody>
  </table>

  <!-- Q8 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>8. ASCII stands for:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. American Standard Code for Information Interchange</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. American Standard Code for Information Interaction</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. All Standard Code for Information Interchange</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Automatic System Code for Information Interchange</td>
      </tr>
    </tbody>
  </table>

  <!-- Q9 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>9. The standard suite of protocols governing communication across the global Internet is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. FTP</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. UDP</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. TCP/IP</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. NetBIOS</td>
      </tr>
    </tbody>
  </table>

  <!-- Q10 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>10. Which of the following is classified as an Internet Search Engine?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Google Chrome</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Microsoft Edge</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. MSN / Bing</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Yellow Pages PDF</td>
      </tr>
    </tbody>
  </table>

  <!-- Q11 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>11. How do you create a brand new email account on a web service?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Log In</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Sign In</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Reset Password</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ D. Sign Up / Register</td>
      </tr>
    </tbody>
  </table>

  <!-- Q12 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>12. Which of the following is NOT an online Cloud Storage service?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Microsoft OneDrive</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Google Drive</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Local Hard Disk Drive</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. MEGA Cloud</td>
      </tr>
    </tbody>
  </table>

  <!-- Q13 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>13. Which of the following is classified as an Online Word Processor?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Social Media App</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Disk Defragmenter</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Google Docs</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Windows Explorer</td>
      </tr>
    </tbody>
  </table>

  <!-- Q14 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>14. Which computer memory is strictly Volatile (contents lost when powered off)?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. RAM (Random Access Memory)</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. ROM (Read Only Memory)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. SSD NAND Flash</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. EEPROM</td>
      </tr>
    </tbody>
  </table>

  <!-- Q15 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>15. Which of the following is an external peripheral and NOT part of the internal System Unit?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 10px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Flatbed Scanner</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Processor</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Motherboard RAM</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Internal SATA HDD</td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Answer Sheet (Set 02) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #1e293b; font-size: 11pt;">
      Section B: Technical Answer Key (Questions 23 &ndash; 30)
    </p>

    <p style="margin: 4px 0 2px 0;"><strong>23. What is the full form of OSH in occupational environments?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Occupational Safety and Health (standards designed to maintain worker health, safety protocols, and hazard-free workspaces).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>24. Which IP Class does the address 172.16.10.125 belong to?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Class B (Default range: 128.0.0.0 &ndash; 191.255.255.255; 172.16.0.0/12 is reserved for private intranets).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>25. How many bits are there in a standard Ethernet MAC address?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> 48 bits (represented as 6 pairs of hexadecimal digits separated by colons or hyphens, e.g., <code>00:1A:2B:3C:4D:5E</code>).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>26. What does WPM stand for in computer typing?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Words Per Minute &mdash; the standardized metric measuring keyboard typing speed, calculated as total words typed correctly in a 60-second duration.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>27. What is the fundamental difference between SAVE and SAVE AS?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong>
      &bull; <strong>SAVE:</strong> Overwrites and commits recent changes to the existing file at its current storage path without prompting.<br/>
      &bull; <strong>SAVE AS:</strong> Prompts the user to create a new file or replica with a distinct file name, directory location, or format, keeping the original intact.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>28. What is the difference between a Formula and a Function in a spreadsheet?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong>
      &bull; <strong>Formula:</strong> A user-constructed mathematical expression written manually (e.g., <code>=A1+B1*C1</code>).<br/>
      &bull; <strong>Function:</strong> A pre-programmed, built-in algorithmic routine provided by the software (e.g., <code>=SUM(A1:A50)</code> or <code>=VLOOKUP()</code>).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>29. Compare a Network Router versus a Network Switch:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: left; width: 50%;">Network Switch (Layer 2)</th>
            <th style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: left; width: 50%;">Network Router (Layer 3)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Connects devices together inside the same local network (LAN).</td>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Connects multiple distinct networks together (e.g., LAN to WAN/Internet).</td>
          </tr>
          <tr>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Forwards traffic based on hardware MAC addresses.</td>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Forwards packets based on logical IP addresses and routing tables.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>30. What is the function of a Network Interface Card (NIC)?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Answer:</strong> A Network Interface Card provides the physical and electrical interface enabling a computer to communicate over Ethernet or Wi-Fi with other network devices.
    </div>
  </div>

  <!-- ==========================================
       SET# 03: IT INFRASTRUCTURE & PROTOCOLS
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 03: IT Systems Operations, Storage Management &amp; Networking Infrastructure
  </h2>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. What is a Job Sheet in technical workplace administration?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. A formal document describing assigned tasks and work orders</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. An invoice for payment processing</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. An employee attendance log</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. An equipment user manual</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Taking a necessary data backup prior to installing operating systems or software is done to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Increase download speeds</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Clean monitor pixels</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Protect existing data against loss or corruption</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Register software warranties</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. A low-level disk structure that defines how a physical hard drive is partitioned into logical volumes is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Partition Table (MBR or GPT)</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Sector Map</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Defrag Index</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. File Allocation Cache</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. Which tool is used to safely remove dust from delicate computer internal components without physical contact?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Electrostatic Blower Gun / Compressed Air</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Wet Sponge</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Steel Wire Brush</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Household Vacuum Cleaner</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What tool is specifically designed to attach an 8P8C RJ45 modular plug onto a twisted pair network cable?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. RJ45 Crimping Tool</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Cable Stripper Only</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Soldering Iron</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Wire Cutter</td>
      </tr>
    </tbody>
  </table>

  <!-- Q6 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>6. What is the valid usable host range for the subnet on which 192.168.168.188 /26 resides?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 10px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. 192.168.168.129 &ndash; 192.168.168.190</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. 192.168.168.128 &ndash; 192.168.168.191</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. 192.168.168.65 &ndash; 192.168.168.126</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. 192.168.168.193 &ndash; 192.168.168.254</td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Answer Sheet (Set 03 & 04) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #1e293b; font-size: 11pt;">
      Section B: Networking &amp; Security Concepts (Questions 21 &ndash; 30)
    </p>

    <p style="margin: 4px 0 2px 0;"><strong>21. What are the two main types of physical transmission media in networking?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Wired Media (Twisted pair UTP/STP, Coaxial, Fiber Optic) and Wireless Media (Radio waves, Microwaves, Infrared).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>22. What is the critical final step after installing and configuring any hardware or software?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Test and verify functionality against acceptance criteria to confirm normal operations.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>23. What is DNS and how does it function on the Internet?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Domain Name System (DNS) translates human-readable domain names (e.g., <code>www.example.com</code>) into numerical IP addresses (e.g., <code>93.184.216.34</code>), enabling devices to locate and route packets to hosts globally.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>24. What is Bandwidth?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> The maximum data transfer capacity of a network transmission channel over a given unit of time, typically measured in bits per second (bps, Mbps, or Gbps).<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা বিবরণ: এক সেকেন্ডে নেটওয়ার্কের মাধ্যমে কতটুকু ডেটা আদান-প্রদান করা যায়, সেটিই ব্যান্ডউইথ।)</span>
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>25. What is a Firewall and how does it safeguard network boundaries?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> A security barrier that inspects incoming and outgoing network traffic based on predefined security rules, blocking malicious packets, unauthorized access, and cyber threats.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা বিবরণ: ফায়ারওয়াল হলো একটি সিকিউরিটি সিস্টেম যা ক্ষতিকর ট্র্যাফিক ব্লক করে নিরাপদ ডেটা পার হতে দেয়।)</span>
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>26. What is CPU Cache Memory?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> High-speed Static RAM (SRAM) integrated directly on the CPU die (L1, L2, L3) that caches frequently accessed instructions and data to eliminate memory access latency between processor cores and slower system RAM.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>27. What is a Network Gateway?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> A network node that joins two distinct networks running different communication protocols, translating packets so they can cross boundaries.<br/>
      <span style="font-size: 9.5pt; color: #475569;">(বাংলা বিবরণ: গেটওয়ে হলো নেটওয়ার্কের প্রবেশদ্বার, যা এক নেটওয়ার্ককে অন্য নেটওয়ার্কের সাথে যুক্ত করে।)</span>
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>28. What is the purpose of an Anti-Static ESD Wristband?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Answer:</strong> Provides a safe resistive path to electrical ground, safely dissipating static charges from the technician's body and preventing electrostatic discharge (ESD) from frying sensitive CMOS and silicon circuits.
    </div>
  </div>

  <!-- ==========================================
       SET# 05: WORKPLACE SYSTEMS & OPERATIONS
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 05: Workplace Information, System Architecture &amp; Disaster Recovery
  </h2>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. Which device is used to convert physical hard copy documents into digital soft copies?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Optical Scanner</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Laser Printer</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Computer Monitor</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Dial-up Modem</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. The Windows desktop Taskbar is primarily designed to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Display BIOS boot logs</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Launch applications and show running programs</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Defragment hard drives</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Edit registry keys</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. Which motherboard component stores BIOS settings and powers the Real-Time Clock (RTC) when unplugged?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Sound Card</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Network Card</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. CMOS CR2032 Lithium Coin Battery</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Power Supply Fan</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What happens when two devices on the same local network are configured with identical IP addresses?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Network speed doubles</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Both devices combine bandwidth</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. An IP conflict occurs, disconnecting one or both hosts</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Router resets to defaults</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. A documented process to recover and restore business functions after an unplanned disruption is a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 10px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Disaster Recovery Plan (DRP)</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Marketing Strategy</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Network Topology Map</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Software End-User License</td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Answer Sheet (Set 05) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #1e293b; font-size: 11pt;">
      Section B: Professional IT Systems &amp; Maintenance (Questions 21 &ndash; 30)
    </p>

    <p style="margin: 4px 0 2px 0;"><strong>21. Name two modern spreadsheet applications:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Microsoft Excel (desktop/enterprise standard) and Google Sheets (cloud-native collaborative platform).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>22. What is an AVO Meter?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> An analog or digital multimeter that measures <strong>A</strong>mperes (electrical current), <strong>V</strong>olts (potential difference), and <strong>O</strong>hms (electrical resistance).
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>23. What are the key benefits of consulting manufacturer instruction manuals during installations?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> Prevents physical equipment damage, ensures correct jumper and wiring configurations, avoids warranty invalidation, and adheres to safety specifications.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>24. Explain the 6-Step CompTIA Systematic Troubleshooting Methodology:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Standard 6-Step Workflow:</strong>
      1. Identify the problem (gather symptoms, question users, inspect error logs).<br/>
      2. Establish a theory of probable cause (test obvious factors first).<br/>
      3. Test the theory to determine cause.<br/>
      4. Establish a plan of action to resolve the problem and implement the solution.<br/>
      5. Verify full system functionality and implement preventive measures.<br/>
      6. Document findings, actions, and outcomes in the ticketing system.
    </div>
  </div>

  <!-- ==========================================
       SET# 06: WINDOWS INTERNALS & PRODUCTIVITY
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 06: Office Suite Mastery, Windows Internals &amp; Hardware Interfaces
  </h2>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. Which file extension is used for modern OpenXML Microsoft Word documents?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. .doc</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. .docx</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. .txt</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. .pdf</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Which symbol must precede any calculation formula in Microsoft Excel?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. = (Equals)</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. + (Plus)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. @ (At)</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. # (Hash)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. Which PowerPoint view displays thumbnails of all slides for easy reordering and sequencing?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Normal View</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Slide Sorter View</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Slide Show View</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Outline View</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. Which command-line diagnostic tool measures round-trip latency and packet reachability to a remote host?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. ping (ICMP Echo)</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. ipconfig</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. netstat</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. chkdsk</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What is the purpose of Windows System Restore?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 10px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. To upgrade hardware RAM</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. To delete temporary cache files</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. To revert system files and registry to an earlier restore point</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. To reformat the primary C: drive</td>
      </tr>
    </tbody>
  </table>

  <!-- Technical Answer Sheet (Set 06) -->
  <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 10px 14px; margin-top: 10px; margin-bottom: 16px;">
    <p style="font-weight: bold; margin: 0 0 6px 0; color: #1e293b; font-size: 11pt;">
      Section B: Comparative Systems &amp; Storage Architecture (Questions 26 &ndash; 30)
    </p>

    <p style="margin: 4px 0 2px 0;"><strong>26. Explain the difference between Slide Transitions and Object Animations in PowerPoint:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      &bull; <strong>Slide Transition:</strong> Visual motion effect that occurs when transitioning from one slide to the next.<br/>
      &bull; <strong>Object Animation:</strong> Entrance, emphasis, motion path, or exit effect applied to individual elements (text boxes, shapes, pictures) within a single slide.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>27. What is the purpose of a CPU Heat Sink and Cooling Fan?</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <strong>Answer:</strong> The thermal heat sink draws heat away from the silicon processor die via thermal paste and copper/aluminum fins, while the fan expels the heated air, preventing thermal throttling and hardware burnout.
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>28. Compare the FAT32 versus NTFS file systems:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 6px;">
      <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt;">
        <thead>
          <tr style="background-color: #f1f5f9;">
            <th style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: left; width: 50%;">FAT32 (Legacy)</th>
            <th style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: left; width: 50%;">NTFS (Modern Windows)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Max single file size: 4 GB.</td>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Max single file size: 16 TB+.</td>
          </tr>
          <tr>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">No native file-level encryption or permissions.</td>
            <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Supports Access Control Lists (ACLs), EFS encryption, and journaling.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p style="margin: 4px 0 2px 0;"><strong>29. Compare IPv4 versus IPv6 Addressing:</strong></p>
    <div style="margin-left: 10px; font-size: 10pt; color: #334155; margin-bottom: 2px;">
      <strong>Answer:</strong> IPv4 utilizes 32-bit addresses (~4.29 billion total addresses, e.g., <code>192.168.1.1</code>) and relies on NAT due to exhaustion. IPv6 utilizes 128-bit hexadecimal addresses (~3.4 &times; 10<sup>38</sup> addresses, e.g., <code>2001:db8::1</code>), eliminating NAT and supporting built-in IPsec security.
    </div>
  </div>

  <!-- ==========================================
       SET# 07: SUBNETTING & DIAGNOSTICS
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 07: Subnetting Mathematics, Diagnostic Procedures &amp; Workplace Safety
  </h2>

  <!-- Step-by-Step Subnet Calculation Worksheet Table -->
  <div style="background-color: #fdfefe; border: 1.5px solid #4f46e5; border-radius: 4px; padding: 10px 14px; margin-bottom: 14px;">
    <p style="font-size: 11pt; font-weight: bold; color: #312e81; margin: 0 0 6px 0;">
      Mathematical Subnet Analysis: Finding Host Range for 192.168.168.188 / 255.255.255.192
    </p>
    
    <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 8px;">
      <tbody>
        <tr style="background-color: #eef2ff;">
          <td style="width: 30%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold;">Step 1: Prefix &amp; Hosts</td>
          <td style="width: 70%; padding: 4px 8px; border: 1px solid #cbd5e1;">
            Subnet Mask <code>255.255.255.192</code> equates to <strong>/26</strong> prefix length.<br/>
            Host bits = 32 &minus; 26 = 6 bits. Total addresses per block = 2<sup>6</sup> = <strong>64 addresses</strong>.
          </td>
        </tr>
        <tr>
          <td style="width: 30%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold;">Step 2: Subnet Block Size</td>
          <td style="width: 70%; padding: 4px 8px; border: 1px solid #cbd5e1;">
            Magic Number Calculation: 256 &minus; 192 = <strong>64 block interval</strong>.<br/>
            Subnet 0: 192.168.168.0 &ndash; 192.168.168.63<br/>
            Subnet 1: 192.168.168.64 &ndash; 192.168.168.127<br/>
            Subnet 2: <strong>192.168.168.128 &ndash; 192.168.168.191</strong><br/>
            Subnet 3: 192.168.168.192 &ndash; 192.168.168.255
          </td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="width: 30%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold;">Step 3: Matching Subnet</td>
          <td style="width: 70%; padding: 4px 8px; border: 1px solid #cbd5e1;">
            Host IP <code>192.168.168.188</code> falls strictly inside Subnet 2:<br/>
            Network ID: <code>192.168.168.128</code> &nbsp;|&nbsp; Broadcast ID: <code>192.168.168.191</code>
          </td>
        </tr>
        <tr style="background-color: #ecfdf5;">
          <td style="width: 30%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #065f46;">Step 4: Valid Host Range</td>
          <td style="width: 70%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #065f46;">
            Usable Host Range: 192.168.168.129 through 192.168.168.190 (Total 62 usable client hosts).<br/>
            <span style="font-weight: normal; font-size: 9pt; color: #047857;">(বাংলা: ১৯২.১৬৮.১৬৮.১২৯ থেকে ১৯২.১৬৮.১৬৮.১৯০ পর্যন্ত ঠিকানাগুলো ভ্যালিড হোস্ট হিসেবে ব্যবহারযোগ্য।)</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Safety & Diagnostic Standards Table -->
  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #f1f5f9;">
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: left; width: 35%;">Workplace Safety Symbol</th>
        <th style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: left; width: 65%;">Standard Meaning &amp; Regulatory Protocol</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold;">Fire Extinguisher Symbol</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Identifies exact physical location of emergency fire suppression canisters.</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold;">No Smoking Symbol</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Smoking prohibited due to flammable chemicals, packaging, or oxygenated server rooms.</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold;">First Aid Cross Symbol</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Points directly to emergency medical response kits and injury response supplies.</td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: bold;">Electrical Hazard Triangle</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">Alerts personnel to open high-voltage transformers, power racks, and shock risk.</td>
      </tr>
    </tbody>
  </table>

  <!-- ==========================================
       SET# 08 & 09: IT SUPPORT SERVICE LEVEL 3
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 08 &amp; 09: Technical Support Level 3 Examination Answer Sheet
  </h2>
  <p style="font-size: 9.5pt; font-style: italic; color: #64748b; margin-bottom: 8px;">
    Official Bilingual Assessment Ledger &bull; National Technical Competency Framework
  </p>

  <table class="exam-answer-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; font-size: 9.5pt; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #0f172a; color: #ffffff;">
        <th style="padding: 4px 8px; border: 1px solid #475569; text-align: center; width: 8%;">No.</th>
        <th style="padding: 4px 8px; border: 1px solid #475569; text-align: left; width: 50%;">Question &amp; Assessment Scope</th>
        <th style="padding: 4px 8px; border: 1px solid #475569; text-align: left; width: 42%;">Verified Answer Key (English &amp; Bengali)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">1</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          What should be done if a workplace document is difficult to understand?<br/>
          <span style="font-size: 8.5pt; color: #64748b;">(কোনো অফিস নথি বুঝতে সমস্যা হলে কী করা উচিত?)</span>
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          a) Take assistance from peers / supervisors<br/>
          <span style="font-weight: normal; font-size: 8.5pt; color: #334155;">(সহকর্মী বা পর্যবেক্ষণকের সাহায্য নেওয়া)</span>
        </td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">2</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          To increase or decrease display screen clarity, you should adjust:<br/>
          <span style="font-size: 8.5pt; color: #64748b;">(স্ক্রিনের স্বচ্ছতা বাড়াতে বা কমাতে কোনটি পরিবর্তন করতে হবে?)</span>
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          c) Screen resolution setting<br/>
          <span style="font-weight: normal; font-size: 8.5pt; color: #334155;">(স্ক্রিন রেজোলিউশন)</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">3</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          Which of the following is a physical working area for an enterprise IT support team?
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          a) Corporate Data Center / IT Help Desk
        </td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">4</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          Assisting end-users experiencing technical difficulties is a primary aspect of:
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          b) Customer Support Service in an IT system
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">5</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          When should a technician perform a motherboard BIOS update?
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          b) When replacing CPU with a newer architecture or fixing firmware bugs
        </td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">6</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          What is the standard bootable media used for modern OS deployment?
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          a) Bootable USB Flash Disk (created via Media Creation Tool or Rufus)
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">7</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          What is the primary architectural function of the motherboard?
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          c) Interconnects and communicates power and data between all hardware units
        </td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">8</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          A formal set of rules governing packet exchange between devices is a:
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          a) Network Protocol
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">9</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          What does GPT stand for in modern disk partitioning schemes?
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          a) GUID Partition Table (supports drives &gt; 2 TB and up to 128 partitions)
        </td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">10</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          What is meant by a 'Conflict of Interest' in professional employment?<br/>
          <span style="font-size: 8.5pt; color: #64748b;">(স্বার্থের দ্বন্দ্ব বলতে কী বোঝায়?)</span>
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          A situation where personal interests may compromise professional integrity.<br/>
          <span style="font-weight: normal; font-size: 8.5pt; color: #334155;">(ব্যক্তিগত স্বার্থ পেশাগত দায়িত্বকে প্রভাবিত করার পরিস্থিতি)</span>
        </td>
      </tr>
      <tr>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">11</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          Why is it vital to comply with environmental electronic waste regulations?
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          Prevents toxic lead, mercury, and heavy metals from contaminating ecosystems.
        </td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; text-align: center; font-weight: bold;">12</td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1;">
          What is calculated and formally approved before authorizing costly repair work?
        </td>
        <td style="padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">
          The total repair or replacement cost estimate.
        </td>
      </tr>
    </tbody>
  </table>

  <!-- ==========================================
       SET# 10: ENTERPRISE OPERATIONS & WORKPLACE
       ========================================== -->
  <h2 style="font-size: 12.5pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 10: Enterprise Systems, Professional Decorum &amp; Technical Support Operations
  </h2>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. What practice best conveys professionalism during client workplace interactions?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Speaking clearly, politely, and listening actively</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Using technical jargon to confuse the client</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Ignoring user feedback</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Rushing through explanations</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. What must be strictly respected and maintained regarding client confidential matters?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Data Privacy &amp; Non-Disclosure Confidentiality</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Public forum posting</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Casual conversation sharing</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Personal storage duplication</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. In Microsoft Word, what does the Paragraph Alignment feature control?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">A. Font color palette</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Horizontal text positioning (Left, Center, Right, Justify)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Spell check dictionaries</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Table cell borders</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What web browser is officially developed by Microsoft for modern Windows operating systems?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 6px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Microsoft Edge (Chromium engine)</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. Mozilla Firefox</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. Safari</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. Opera Mini</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What are the two primary firmware interface standards found on contemporary PC motherboards?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 10px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. UEFI (Unified Extensible Firmware Interface) &amp; Legacy BIOS</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">B. DOS &amp; CP/M</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">C. FAT &amp; NTFS</td>
        <td style="width: 50%; padding: 3px 8px; border: 1px solid #cbd5e1;">D. TCP &amp; UDP</td>
      </tr>
    </tbody>
  </table>

  <!-- Closing Candidate Verification Block -->
  <div style="margin-top: 18px; border-top: 1.5px solid #0f172a; padding-top: 8px; font-size: 10pt;">
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
            Date of Examination: _______________________
          </td>
          <td style="width: 50%; padding: 4px 0; text-align: right; border: none; font-size: 9pt; color: #64748b;">
            Official Council Seal &amp; Verification Stamp
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
`;
