import React from 'react';
import { 
  FileStack, Variable, UserCheck, Building2, 
  Calendar, FileText
} from 'lucide-react';
import { useEditor } from '../../../contexts/EditorContext';
import { StudioButton } from '../common/StudioButton';
import { StudioDivider } from '../common/StudioDivider';
import { StudioDropdown, StudioDropdownItem } from '../common/StudioDropdown';

export const TemplatesTray: React.FC = () => {
  const { editor, executeCommand, setDocumentTitle } = useEditor();

  const handleApplyTemplate = (type: string) => {
    if (!editor) return;
    if (!window.confirm('Apply template? This will replace current document contents.')) return;

    if (type === 'academic') {
      setDocumentTitle('Academic Research Paper');
      editor.commands.setContent(`
        <h1 style="text-align: center; margin-bottom: 0.25rem;">Investigation of Emergent Behaviors in Neural Architectures</h1>
        <p style="text-align: center; color: #64748b; font-style: italic; margin-bottom: 2rem;">Jane Doe, Ph.D. &bull; Institute of Computer Science</p>
        <h2>Abstract</h2>
        <p>This paper examines structural optimization in deep networks with empirical evaluations against canonical benchmarks. We formulate explicit bounds for latent representation stability.</p>
        <h2>1. Introduction</h2>
        <p>Recent advances in distributed computing have unlocked unprecedented scales of automated inference. In this work, we present a unified taxonomy.</p>
        <h2>2. Methodology</h2>
        <p>Data was gathered across three independent validation phases under standardized parameters.</p>
      `);
    } else if (type === 'business') {
      setDocumentTitle('Executive Business Proposal');
      editor.commands.setContent(`
        <h1 style="color: #4f46e5;">Executive Business Proposal</h1>
        <p style="color: #64748b; margin-bottom: 1.5rem;">Prepared for: Client Organization &bull; Date: ${new Date().toLocaleDateString()}</p>
        <hr/>
        <h2>Executive Summary</h2>
        <p>Our initiative accelerates operational throughput by 35% through modular workflow automation and unified data ingestion pipelines.</p>
        <h2>Deliverables & Timeline</h2>
        <p>Phase 1 includes discovery, architecture mapping, and iterative prototype delivery over six sprints.</p>
        <h2>Financial Investment</h2>
        <p>Comprehensive cost breakdown detailing implementation, migration, and ongoing SLA maintenance.</p>
      `);
    } else if (type === 'meeting') {
      setDocumentTitle('Team Meeting Minutes');
      editor.commands.setContent(`
        <h1>Project Sync & Meeting Minutes</h1>
        <p style="color: #64748b;">Date: ${new Date().toLocaleDateString()} &bull; Attendees: Product, Design, Engineering</p>
        <h2>Agenda & Discussion</h2>
        <ul>
          <li>Review of sprint backlog and critical path tasks</li>
          <li>Frontend architecture refactoring to remove trademarked patterns</li>
          <li>Performance benchmarks for large document virtual scrolling</li>
        </ul>
        <h2>Action Items</h2>
        <ul>
          <li>[ ] Finalize design system tokens</li>
          <li>[ ] Complete automated regression suite</li>
        </ul>
      `);
    } else if (type === 'resume') {
      setDocumentTitle('Professional Resume');
      editor.commands.setContent(`
        <h1 style="margin-bottom: 0;">Alex Morgan</h1>
        <p style="color: #64748b; margin-bottom: 1rem;">Senior Software Engineer &bull; alex@example.com &bull; San Francisco, CA</p>
        <h2>Professional Experience</h2>
        <h3>Staff Engineer &bull; Cloud Systems Inc. (2022 - Present)</h3>
        <p>Architected low-latency collaborative document engine serving 2M daily active users with 99.99% uptime.</p>
        <h3>Lead Developer &bull; WebTech Labs (2019 - 2022)</h3>
        <p>Spearheaded migration to modern TypeScript component libraries, reducing bundle size by 42%.</p>
        <h2>Education</h2>
        <p>B.S. in Computer Science &bull; University of California, Berkeley</p>
      `);
    }
  };

  const handleInsertVariable = (varName: string) => {
    executeCommand('insertHTML', `<span style="background-color: #e0e7ff; color: #4338ca; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.85em;" contenteditable="false">{{${varName}}}</span>&nbsp;`);
  };

  const templateItems: StudioDropdownItem[] = [
    { id: 'academic', label: 'Academic Research Paper', icon: FileText, onClick: () => handleApplyTemplate('academic') },
    { id: 'business', label: 'Executive Business Proposal', icon: Building2, onClick: () => handleApplyTemplate('business') },
    { id: 'meeting', label: 'Team Meeting Minutes', icon: Calendar, onClick: () => handleApplyTemplate('meeting') },
    { id: 'resume', label: 'Professional Resume', icon: UserCheck, onClick: () => handleApplyTemplate('resume') },
  ];

  const variableItems: StudioDropdownItem[] = [
    { id: 'name', label: '{{first_name}}', onClick: () => handleInsertVariable('first_name') },
    { id: 'lastname', label: '{{last_name}}', onClick: () => handleInsertVariable('last_name') },
    { id: 'company', label: '{{company}}', onClick: () => handleInsertVariable('company') },
    { id: 'email', label: '{{email}}', onClick: () => handleInsertVariable('email') },
    { id: 'date', label: '{{date}}', onClick: () => handleInsertVariable('date') },
  ];

  return (
    <div className="flex items-center gap-1.5 px-3 py-1 overflow-x-auto no-scrollbar w-full">
      {/* Templates Library */}
      <StudioDropdown
        icon={FileStack}
        label="Starter Templates"
        items={templateItems}
        size="sm"
        title="Document Templates"
        triggerClassName="border border-slate-200 dark:border-slate-800"
      />

      <StudioDivider />

      {/* Mail Merge Dynamic Variables */}
      <StudioDropdown
        icon={Variable}
        label="Insert Field"
        items={variableItems}
        size="sm"
        title="Mail Merge Placeholder Fields"
        triggerClassName="border border-slate-200 dark:border-slate-800"
      />

      {/* Quick Field Shortcuts */}
      <StudioButton
        icon={UserCheck}
        label="Client Name"
        onClick={() => handleInsertVariable('client_name')}
        title="Insert {{client_name}}"
        size="sm"
      />
      <StudioButton
        icon={Calendar}
        label="Date"
        onClick={() => handleInsertVariable('current_date')}
        title="Insert {{current_date}}"
        size="sm"
      />
    </div>
  );
};
