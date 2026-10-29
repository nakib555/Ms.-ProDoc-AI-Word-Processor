/**
 * Full Exam Question Paper & Technical Answer Sheets (Sets 01 - 11)
 * Re-authored to strict Microsoft Word Professional Examination standards:
 * - Clean semantic tables compatible with ProDoc Table Properties, Context Menu, Resizing, and Sort
 * - Zero duplicated questions across Sets 01 through 11
 * - Enhanced anti-shaving attributes (keep-with-next, exam-mcq-table)
 * - Authentic MS Word examination typography, candidate ledger, and structured answer blocks
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
    <p style="font-size: 11pt; font-style: italic; margin: 2px 0 6px 0; color: #64748b;">
      National Examination Board &bull; Comprehensive Assessment Series (Sets 01 &ndash; 11)
    </p>
    <p style="font-size: 10pt; font-weight: 600; margin: 0; color: #475569;">
      Time Allowed: 3 Hours &nbsp;|&nbsp; Total Marks: 100 &nbsp;|&nbsp; Passing Marks: 50
    </p>
  </div>

  <!-- Candidate Identification Ledger Table (Fully editable via ProDoc Table Tools) -->
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #94a3b8; margin-bottom: 14px; font-size: 10pt;">
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

  <!-- General Instructions -->
  <div style="background-color: #f1f5f9; border-left: 4px solid #4f46e5; padding: 6px 12px; margin-bottom: 14px; font-size: 9.5pt; color: #334155;">
    <strong>Instructions to Candidates:</strong>
    1. Read all questions carefully before answering. Each set represents a distinct technical domain.
    2. Multiple Choice Questions: Choose the correct option indicated by the tick mark (✓).
    3. Technical Answer Sheets: Provide clear, concise steps and diagrams where applicable.
  </div>

  <!-- ==========================================
       SET# 01: COMPUTER ARCHITECTURE & PROCESSORS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 01: Computer Architecture, Bus Systems &amp; Hardware Components
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions (Select the single best answer for each question)
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. A microprocessor unit, a memory unit, and an input/output unit integrated together form a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Central Processing Unit</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Software Compiler</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Microcomputer System</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Arithmetic Logic Unit</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Which of the following is NOT one of the three primary computer system buses?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Data Bus</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Timer Bus</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Control Bus</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Address Bus</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. Which CPU internal register always holds the address of the next instruction to be fetched?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Program Counter (PC)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Instruction Register (IR)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Accumulator (AC)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Memory Buffer Register (MBR)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. The personnel who design, program, operate, and manage computer systems together are classified as:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. System Software</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Liveware / Humanware</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Embedded Firmware</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Peripheral Hardware</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. In modern processor architecture, a microprocessor integrates which two primary functional blocks:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Display Unit and RAM Interface</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Arithmetic Logic Unit (ALU) &amp; Control Unit (CU)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Power Management &amp; Battery Controller</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Optical Drive &amp; Magnetic Storage</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. What are the primary functions of thermal paste applied between the CPU and heat sink?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Thermal interface material (TIM) eliminates microscopic air gaps between the uneven surfaces of the CPU heat spreader and the copper heat sink base, ensuring maximum thermal conductivity and heat dissipation.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. Contrast Unified Extensible Firmware Interface (UEFI) with Legacy BIOS:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> UEFI supports partitions larger than 2.2 TB using GPT, enables Secure Boot cryptographic validation, provides a graphical mouse-driven setup, and executes in 32-bit or 64-bit mode compared to the 16-bit real mode limit of legacy BIOS.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 02: OPERATING SYSTEMS & SYSTEM MANAGEMENT
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 02: Operating Systems, Virtual Memory &amp; System Administration
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. The core component of an Operating System that manages CPU time, memory allocation, and hardware interrupts is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Command Shell</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Operating System Kernel</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Application Wrapper</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. File Allocation Table</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. In Windows operating systems, which executable launches the Graphical Windows Registry Editor?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. regedit.exe</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. winregistry.exe</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. sysreg.msc</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. configedit.dll</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. Virtual memory implementation primarily uses which hardware mechanism to swap inactive memory pages to disk:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Direct Memory Bus</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Static Cache Indexing</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Paging &amp; Page Table Mapping</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Register Renaming</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. Which command-line utility verifies the integrity of protected Windows system files and repairs damaged ones?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. sfc /scannow</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. chkdsk /f</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. defrag /all</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. cleanmgr /sageset</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What file system provides file-level compression, Access Control Lists (ACLs), and journaling for modern Windows?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. FAT32</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. exFAT</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. NTFS (New Technology File System)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. CDFS</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. What troubleshooting steps should be taken when Windows displays Blue Screen of Death (BSOD) stop code "IRQL_NOT_LESS_OR_EQUAL"?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> 1. Roll back newly installed device drivers; 2. Run Windows Memory Diagnostic (mdsched.exe) to verify RAM integrity; 3. Run BlueScreenView to inspect memory dump files (minidump); 4. Ensure antivirus kernel filters are updated.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. Describe the function of the Windows Boot Configuration Data (BCD) store:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> The BCD is a firmware-independent database that contains boot-time configuration parameters and controls how the Windows Boot Manager (bootmgr) loads operating system kernels.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 03: COMPUTER NETWORKING & PROTOCOLS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 03: Computer Networks, OSI Model &amp; Internet Protocols
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. At which layer of the OSI 7-Layer Reference Model do Network Switches operate when inspecting MAC addresses?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Physical Layer (Layer 1)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Data Link Layer (Layer 2)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Network Layer (Layer 3)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Transport Layer (Layer 4)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. What is the address length and hexadecimal notation format of an IPv6 network address?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. 32 bits divided into 4 decimal octets</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. 48 bits divided into 6 byte pairs</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. 128 bits divided into 8 colon-separated groups</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. 256 bits divided into 16 binary blocks</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. Which networking protocol automatically assigns dynamic IP addresses, default gateways, and DNS servers to client hosts?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Dynamic Host Configuration Protocol (DHCP)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Simple Network Management Protocol (SNMP)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Address Resolution Protocol (ARP)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Network Time Protocol (NTP)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What standard pinout wiring code is most universally used for RJ-45 terminating twisted-pair Ethernet patch cables?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. IEEE 802.11ac Specification</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. TIA/EIA-568-B (White-Orange, Orange, White-Green...)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. ISO/IEC 27001 Annexure A</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. RS-232 Serial Port Standard</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What well-known TCP port number is utilized by secure HTTPS web traffic encrypted with TLS/SSL?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Port 80</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Port 21</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Port 443</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Port 53</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. What is the meaning and implication of an IP address in the 169.254.x.x range (APIPA)?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Automatic Private IP Addressing (APIPA) indicates that the host computer is configured for DHCP but failed to communicate with a DHCP server on the local subnet. It can talk only to other local APIPA clients.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. Explain how the "tracert" (traceroute) utility identifies network bottlenecks:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Tracert sends packets with incrementally increasing Time-To-Live (TTL) values starting from 1. Each intermediate router decrements TTL, drops expired packets, and returns an ICMP Time Exceeded message, revealing hop latencies.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 04: OFFICE SUITE & DOCUMENT PROCESSING
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 04: Document Processing, Formulas &amp; Office Automation
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. In Microsoft Word, which ribbon tab contains the tools to insert and format Table of Authorities and Footnotes?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Insert Tab</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. References Tab</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Layout Tab</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Review Tab</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. In Microsoft Excel, what symbol prefix locks both column and row references (Absolute Cell Referencing)?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Hash Symbol (#A#1)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Dollar Sign ($A$1)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. At Symbol (@A@1)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Exclamation Mark (!A!1)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. Which modern Excel lookup function searches across columns/rows and returns matching values without right-side restrictions?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. VLOOKUP</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. HLOOKUP</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. XLOOKUP</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. SEARCHEX</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. In PowerPoint, what view allows global modifications to fonts, logo placement, and placeholder layouts across all slides?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Slide Sorter View</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Slide Master View</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Presenter View</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Outline View</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What word processor feature automatically combines a standard form letter document with a structured recipient database?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Mail Merge</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Quick Parts</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Track Changes</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Cross-reference</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. Write the exact Excel formula to calculate employee bonus (10% if sales in B2 &gt;= 50,000, else 5%):</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> <code style="background-color: #f1f5f9; padding: 2px 4px; border-radius: 3px;">=IF(B2&gt;=50000, B2*0.10, B2*0.05)</code>
    </p>

    <p style="margin-bottom: 2px;"><strong>7. What causes a document in Word to display a blank second page after inserting a full-width table?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Word always appends a mandatory trailing paragraph mark (¶) after every table. If the table extends to the exact bottom margin, this paragraph is pushed onto the next page. Solution: Select the mark and set font size to 1pt or enable hidden font.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 05: STORAGE TECHNOLOGIES & RAID SYSTEMS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 05: Storage Devices, NVMe SSDs &amp; RAID Configurations
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. Non-Volatile Memory Express (NVMe) solid state drives interface directly with which high-speed bus:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Legacy SATA III (6 Gbps)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. PCI Express (PCIe) Lanes</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. USB 3.0 Header</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. IDE / PATA Ribbon</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Which RAID configuration stripes data with distributed parity across a minimum of 3 physical disks?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. RAID 0 (Striping)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. RAID 1 (Mirroring)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. RAID 5 (Distributed Parity)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. JBOD (Spanning)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. What wear-leveling algorithm command allows operating systems to inform SSDs which blocks of data are no longer considered in use?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. TRIM Command</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. SCANDISK</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. FLUSHBUFF</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. DEFRAG</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. In magnetic hard disk drive (HDD) geometry, what constitutes a complete vertical stack of identical tracks across all platters?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Sector</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Cylinder</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Cluster</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Head Assembly</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What backup strategy copies only the files that have changed since the last FULL backup and does not clear the archive bit?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Incremental Backup</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Differential Backup</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Mirror Snapshot</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Synthetic Full</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. Why is traditional disk defragmentation harmful to Solid State Drives (SSDs)?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> SSDs have near-instant random access with zero rotational latency. Defragmenting writes unnecessary rewrite cycles across flash cells, accelerating SSD cell degradation without providing any performance gain.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. Explain S.M.A.R.T. disk monitoring and list two critical failure attributes:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Self-Monitoring, Analysis and Reporting Technology (S.M.A.R.T.) monitors internal drive reliability. Critical failure attributes include: 1. Reallocated Sector Count (indicates dying magnetic sectors); 2. Uncorrectable Sector Count.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 06: CYBERSECURITY & THREAT MITIGATION
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 06: Cybersecurity, Malware Analysis &amp; Network Defense
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. Malicious software that self-replicates across computer networks WITHOUT requiring human interaction or a host file is a:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Macro Virus</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Network Worm</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Trojan Horse</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Logic Bomb</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. What form of cyber attack encrypts a victim company's files and demands digital cryptocurrency payment for the private decryption key?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Ransomware Attack</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Denial of Service (DoS)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Cross-Site Scripting (XSS)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. ARP Poisoning</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. In asymmetric cryptography (public-key cryptography), which key is used to decrypt a message encrypted with the recipient's public key?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Sender's Public Key</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Recipient's Private Key</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Shared Symmetric Session Key</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Certificate Authority Master Key</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What security defense continuously analyzes packets statefully at the network perimeter to block unauthorized inbound connections?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Stateful Inspection Firewall</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Network Hub Repeater</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Loopback Adapter</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Bandwidth Shaper</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. Multi-Factor Authentication (MFA) requires proof combining at least two distinct categories:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Two different passwords</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Two different usernames</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Knowledge (Password) + Possession (Token) or Inherence (Biometric)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Email Address + Phone Number</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. Define Social Engineering and identify three common organizational attack vectors:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Social engineering manipulates human trust rather than cracking software flaws. Common vectors: 1. Phishing / Spear Phishing (fraudulent emails); 2. Pretexting (posing as IT support); 3. Baiting / Tailgating (unauthorized physical entry).
    </p>

    <p style="margin-bottom: 2px;"><strong>7. What immediate incident response steps must an IT technician execute upon detecting active ransomware on an office workstation?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> 1. Immediately disconnect network cables and disable Wi-Fi/Bluetooth to halt lateral network propagation; 2. Preserve volatile RAM if required for forensics; 3. Notify the CISO / Incident Response Team; 4. Do not pay ransom; restore from clean offline backups.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 07: HARDWARE MAINTENANCE & BENCH DIAGNOSTICS
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 07: Bench Hardware Maintenance, Power Supplies &amp; Motherboard Diagnostics
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. When testing a computer ATX Power Supply Unit (SMPS) with a digital multimeter, what DC voltage should be measured on the Yellow wire rail?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. +3.3 Volts DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. +5.0 Volts DC</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. +12.0 Volts DC</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. -12.0 Volts DC</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. A desktop computer powers on, fan spins at high speed, but the system emits continuous repeated beeps with no display. This symptom most commonly points to:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Failed Hard Disk Boot Sector</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Unseated, Faulty, or Oxidized RAM Module</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Dead CMOS CR2032 Battery</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Defective Audio Driver</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. To prevent Electrostatic Discharge (ESD) damage when servicing sensitive motherboard and CPU electronics, an engineer must use:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Anti-Static Wrist Strap clipped to equipment ground chassis</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Heavy Rubber Insulated Gloves</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Standard Plastic Screwdriver</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Wool Desk Mat</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. If a computer's system clock consistently resets to January 1st, 2000 whenever AC wall power is turned off, what should be replaced?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. CPU Socket Heatsink</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Motherboard 3V Lithium Coin Cell (CR2032)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Front Panel USB Header</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Main Power Cord</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What diagnostic symptom indicates failed electrolytic capacitors on a motherboard?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Bulging, swollen tops with brown electrolyte crusting</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Shiny metallic pins</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Cold temperature during heavy compute load</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Dim motherboard LEDs</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. Provide the systematic troubleshooting flowchart when a computer demonstrates "No Power" (no LEDs, no fan spin):</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> 1. Verify wall outlet with another appliance; 2. Reseat power cord at both ends; 3. Check PSU rocker switch (I/O); 4. Perform the "paperclip test" on the 24-pin ATX connector (short Green PS-ON pin 16 to any Black Ground pin); 5. If PSU fan spins, verify front panel power switch header connection.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. What bench procedure cleans oxidized gold edge fingers on DDR4/DDR5 RAM sticks?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Gently buff the gold contacts using a soft vinyl eraser to remove oxidation layers, followed by a wipe with 99% pure Isopropyl Alcohol (IPA) on a lint-free microfiber cloth. Allow complete evaporation before reseating into the DIMM slot.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 08: PRINTERS, PERIPHERALS & CABLING
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 08: Peripheral Interfacing, Display Technologies &amp; Printer Engineering
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. In electrophotographic laser printers, which component uses high heat and mechanical pressure to melt toner permanently into paper fibers?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Photosensitive OPC Drum</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Primary Corona Wire</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Fuser Assembly Roller Unit</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Transfer Belt</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Which modern digital display interface supports variable refresh rates (FreeSync/G-Sync) and daisy-chaining multiple monitors via MST (Multi-Stream Transport)?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Legacy Analog VGA (DE-15)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. DisplayPort (DP 1.4 / 2.0)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. S-Video Port</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. DVI-A Single Link</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. What type of printer is universally used in Point of Sale (POS) retail receipts because it requires no ink or ribbon cartridges?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Direct Thermal Printer (heat-sensitive paper)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Continuous Inkjet Tank</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Dot Matrix Impact 24-Pin</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Solid Ink Wax Printer</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What universal reversible connector specification can carry PCIe data, DisplayPort video, and USB-PD charging up to 100W–240W?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Micro-USB Type-B</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. USB Type-C (Thunderbolt 3/4)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Mini-HDMI Type-C</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. FireWire IEEE 1394</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What resolution metric quantifies the physical scanning clarity of flatbed document scanners?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Optical DPI (Dots Per Inch)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Nit Luminance</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Baud Rate</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Frame Rate (Hz)</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. What is the cause when a laser printer produces recurring black smudges every 3 inches down printed pages?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> A repetitive defect with fixed spacing equal to the circumference of an internal roller points directly to a physical scratch or baked toner flaw on the Organic Photoconductor (OPC) drum or fuser heat roller.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. Explain the function of a printer print spooler (spoolsv.exe) and how to restart it when print jobs hang:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> The print spooler intercepts print jobs and buffers them in memory/disk (<code style="background-color: #f1f5f9; padding: 1px 3px;">System32\\spool\\PRINTERS</code>) so apps can resume immediately. To fix a hang: Open elevated cmd &rarr; <code style="background-color: #f1f5f9; padding: 1px 3px;">net stop spooler</code> &rarr; delete queued files &rarr; <code style="background-color: #f1f5f9; padding: 1px 3px;">net start spooler</code>.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 09: VIRTUALIZATION & CLOUD COMPUTING
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 09: Virtualization, Hypervisors &amp; Cloud Infrastructure
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. Which type of hypervisor installs directly on bare-metal hardware without requiring an underlying host operating system?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Type-1 Bare-Metal Hypervisor (e.g. VMware ESXi, Proxmox)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Type-2 Hosted Hypervisor (e.g. VirtualBox)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Application Container Docker Engine</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Emulation Interpreter</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. In cloud computing service architecture, Microsoft 365, Google Workspace, and Salesforce are categorized under:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Infrastructure as a Service (IaaS)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Platform as a Service (PaaS)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Software as a Service (SaaS)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Function as a Service (FaaS)</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. In Windows Server Active Directory domains, what centralized policy engine controls user desktop environments and security policies?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Group Policy Objects (GPO)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Task Manager Services</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. DHCP Scope Options</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Device Manager Tree</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What CPU virtualization extensions must be enabled in motherboard BIOS/UEFI settings to run 64-bit virtual machines?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Intel VT-x / AMD-V (SVM Mode)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Intel Hyper-Threading</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Overclocking XMP Profile</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. SpeedStep C-States</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What virtual networking adapter mode bridges a virtual machine directly to the physical router as if it were a distinct physical host on the LAN?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Host-Only Adapter</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Internal Isolated Network</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Bridged Networking (Adapter)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. NAT Shared IP</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. Differentiate Virtual Machines (VMs) from Lightweight OS Containers (Docker):</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Virtual Machines virtualize the entire hardware layer and each runs its own independent Guest OS kernel. Containers share the host operating system kernel and isolate applications in user space, consuming significantly less memory and CPU overhead.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. Explain the function of a Virtual Machine Snapshot:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> A snapshot freezes the VM disk and memory state at a precise point in time. Future disk writes divert to a delta file. If a risky patch or upgrade corrupts the system, administrators can revert the VM back to the snapshot in seconds.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 10: IT SERVICE MANAGEMENT & DOCUMENTATION
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 10: IT Service Desk, Incident Response &amp; Asset Management
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. In ITIL Service Management framework, what formal agreement between a service provider and customer defines expected uptime and ticket resolution deadlines?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Service Level Agreement (SLA)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Operational Level Contract</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Standard Operating Procedure</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. User Acceptance Protocol</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. Why are barcode or RFID asset tags attached to corporate computer systems upon procurement?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. To enhance Wi-Fi reception</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. To track hardware lifecycle, warranty, and physical location</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. To prevent operating system crashes</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. To satisfy graphic card drivers</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. When an IT technician completes hardware troubleshooting for a client, what is the mandatory final step before closing the service ticket?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Immediately reboot into BIOS setup</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Document the root cause, solution, and verify functionality with user</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Delete client profile folders</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Reset network router to defaults</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What document must chemical manufacturers provide detailing health hazards, safe handling, and spill cleanup for workshop solvents?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Safety Data Sheet (SDS / MSDS)</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Service Desk Changelog</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Quality Assurance Certificate</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Manufacturer RMA form</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. What compliance standard requires secure sanitization or physical degaussing/shredding of retiring hard drives containing sensitive personal data?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. NIST SP 800-88 / GDPR Data Protection Standard</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. IEEE 802.3 Ethernet Standard</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Energy Star Efficiency Rule</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. ANSI Typography Standard</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Troubleshooting
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. Explain the concept and significance of "Chain of Custody" in computer forensic evidence handling:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Chain of custody is a chronological paper trail documenting who collected, transferred, secured, and analyzed digital evidence (such as cloned drive images). Any undocumented gap renders evidence inadmissible in court.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. What calculated approval is mandatory prior to executing a repair that exceeds equipment replacement value?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Total Cost of Ownership (TCO) &amp; Return on Investment (ROI) repair-versus-replace authorization must be approved in writing by departmental management before incurring parts expenses.
    </p>
  </div>

  <div class="prodoc-page-break" data-type="page-break"></div>

  <!-- ==========================================
       SET# 11: PROFESSIONAL ETHICS & WORKPLACE EXCELLENCE
       ========================================== -->
  <h2 style="font-size: 13pt; font-weight: bold; color: #1e1b4b; border-bottom: 1.5px solid #6366f1; padding-bottom: 3px; margin-top: 14px; margin-bottom: 6px;">
    Set# 11: Professional Ethics, Ergonomics &amp; Workplace Communication
  </h2>
  <p style="font-size: 10pt; font-style: italic; color: #64748b; margin-bottom: 10px;">
    Section A: Multiple Choice Questions
  </p>

  <!-- Q1 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>1. When communicating technical troubleshooting steps to a non-technical end user, the technician should:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Use complex technical jargon to assert authority</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Use clear, empathetic, plain language without condescension</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Dismiss user input as irrelevant</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Advise the user to fix the issue themselves</td>
      </tr>
    </tbody>
  </table>

  <!-- Q2 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>2. According to computer workstation ergonomics guidelines, the top edge of the monitor screen should be positioned:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. 12 inches above eye level to stretch the neck</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. At or slightly below eye level (approx. 15&ndash;20&deg; downward angle)</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Below the desktop surface</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Directly touching the keyboard keys</td>
      </tr>
    </tbody>
  </table>

  <!-- Q3 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>3. If an IT engineer discovers unencrypted confidential employee salary spreadsheets on an open share while servicing a drive, ethical conduct dictates:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Copy the data to a personal flash drive</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Share the details informally with colleagues</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ C. Maintain strict confidentiality and alert the Security Officer of the open share</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Delete the spreadsheet permanently</td>
      </tr>
    </tbody>
  </table>

  <!-- Q4 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>4. What is the environmentally responsible disposal method for depleted lead-acid UPS batteries and damaged LCD backlights?</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">A. Discard into municipal household trash bins</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ B. Deliver to a certified hazardous E-Waste recycling facility</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Incinerate in an open outdoor burn pile</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Submerge in tap water containers</td>
      </tr>
    </tbody>
  </table>

  <!-- Q5 -->
  <p class="keep-with-next" style="margin-top: 6px; margin-bottom: 2px;">
    <strong>5. An effective team meeting practice that builds mutual respect and avoids unproductive conflicts is:</strong>
  </p>
  <table class="exam-mcq-table" style="width: 100%; border-collapse: collapse; border: 1px solid #cbd5e1; margin-bottom: 8px;">
    <tbody>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1; font-weight: 600; color: #047857;">✓ A. Active listening, respecting scheduled speaking turns, and documenting action items</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">B. Interrupting others whenever an error is suspected</td>
      </tr>
      <tr>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">C. Multi-tasking on unrelated mobile games</td>
        <td style="width: 50%; padding: 4px 8px; border: 1px solid #cbd5e1;">D. Refusing to take notes or assign deadlines</td>
      </tr>
    </tbody>
  </table>

  <!-- Section B: Technical Questions -->
  <p style="font-weight: bold; margin-top: 12px; margin-bottom: 4px; color: #334155;">
    Section B: Technical Explanations &amp; Professional Standards
  </p>
  <div style="margin-left: 12px; margin-bottom: 10px;">
    <p style="margin-bottom: 2px;"><strong>6. Why is thorough documentation of system modifications critical for engineering continuity?</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Detailed change logs ensure that successor technicians can trace hardware revisions, patch levels, and network configurations without hazardous guesswork, minimizing system downtime during emergencies.
    </p>

    <p style="margin-bottom: 2px;"><strong>7. Describe the "20-20-20" rule recommended by ergonomists for screen-based computer professionals:</strong></p>
    <p style="margin-left: 14px; margin-bottom: 6px; color: #334155;">
      <strong>Answer:</strong> Every 20 minutes spent looking at a computer display, look at an object at least 20 feet away for at least 20 seconds. This relaxes the ciliary eye muscles and significantly mitigates digital eye strain.
    </p>
  </div>

  <!-- Assessment End Footer -->
  <div style="border-top: 2px solid #0f172a; margin-top: 20px; padding-top: 8px; text-align: center; font-size: 9pt; color: #64748b;">
    <strong>[ END OF EXAMINATION QUESTION PAPER &bull; SETS 01 THROUGH 11 COMPLETED ]</strong>
    <p style="margin: 2px 0 0 0;">Official Technical Certification Board &bull; All Rights Reserved &bull; Evaluated under ProDoc Examination Standards</p>
  </div>

</div>
`;
