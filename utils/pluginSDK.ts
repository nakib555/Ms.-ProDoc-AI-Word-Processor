// utils/pluginSDK.ts

import { FieldContext } from './fieldsEngine';

export interface CustomFieldPlugin {
  command: string;
  evaluate: (args: string[], context: FieldContext) => string;
}

export interface CustomBlockPlugin {
  type: string;
  render: (blockData: any) => string;
}

export interface CustomSerializerPlugin {
  format: string;
  serialize: (docModel: any) => string | Blob;
}

export interface CustomImporterPlugin {
  format: string;
  parse: (data: string | Blob) => Promise<any>;
}

export interface CustomSidebarPlugin {
  id: string;
  title: string;
  component: React.ComponentType;
}

export interface CustomRibbonGroupPlugin {
  tabId: string;
  groupId: string;
  label: string;
  buttons: { label: string; icon: any; action: () => void }[];
}

export interface CustomValidatorPlugin {
  id: string;
  validate: (docModel: any) => { id: string; type: 'error' | 'warning' | 'info'; message: string }[];
}

/**
 * Enterprise-grade Plugin SDK Registry.
 * Allows adding rich dynamic extensions to the document processing pipeline.
 */
export class PluginSDK {
  private fields = new Map<string, CustomFieldPlugin>();
  private blocks = new Map<string, CustomBlockPlugin>();
  private serializers = new Map<string, CustomSerializerPlugin>();
  private importers = new Map<string, CustomImporterPlugin>();
  private sidebars = new Map<string, CustomSidebarPlugin>();
  private ribbonGroups: CustomRibbonGroupPlugin[] = [];
  private validators = new Map<string, CustomValidatorPlugin>();

  // --- FIELD REGISTER ---
  public registerField(plugin: CustomFieldPlugin): void {
    const cleanCmd = plugin.command.toUpperCase();
    this.fields.set(cleanCmd, plugin);
  }

  public getFieldEvaluator(command: string): CustomFieldPlugin | undefined {
    return this.fields.get(command.toUpperCase());
  }

  // --- BLOCK REGISTER ---
  public registerBlock(plugin: CustomBlockPlugin): void {
    this.blocks.set(plugin.type, plugin);
  }

  public getBlockRenderer(type: string): CustomBlockPlugin | undefined {
    return this.blocks.get(type);
  }

  // --- SERIALIZER REGISTER ---
  public registerSerializer(plugin: CustomSerializerPlugin): void {
    this.serializers.set(plugin.format.toLowerCase(), plugin);
  }

  public getSerializer(format: string): CustomSerializerPlugin | undefined {
    return this.serializers.get(format.toLowerCase());
  }

  // --- IMPORTER REGISTER ---
  public registerImporter(plugin: CustomImporterPlugin): void {
    this.importers.set(plugin.format.toLowerCase(), plugin);
  }

  public getImporter(format: string): CustomImporterPlugin | undefined {
    return this.importers.get(format.toLowerCase());
  }

  // --- SIDEBAR REGISTER ---
  public registerSidebar(plugin: CustomSidebarPlugin): void {
    this.sidebars.set(plugin.id, plugin);
  }

  public getSidebars(): CustomSidebarPlugin[] {
    return Array.from(this.sidebars.values());
  }

  // --- RIBBON GROUP REGISTER ---
  public registerRibbonGroup(plugin: CustomRibbonGroupPlugin): void {
    this.ribbonGroups.push(plugin);
  }

  public getRibbonGroupsForTab(tabId: string): CustomRibbonGroupPlugin[] {
    return this.ribbonGroups.filter(rg => rg.tabId === tabId);
  }

  // --- VALIDATOR REGISTER ---
  public registerValidator(plugin: CustomValidatorPlugin): void {
    this.validators.set(plugin.id, plugin);
  }

  public runAllCustomValidators(docModel: any): any[] {
    const issues: any[] = [];
    this.validators.forEach(v => {
      try {
        issues.push(...v.validate(docModel));
      } catch (err) {
        console.error(`Error running custom validator ${v.id}:`, err);
      }
    });
    return issues;
  }
}

export const globalPluginSDK = new PluginSDK();

// Register a default pluggable field for trial
globalPluginSDK.registerField({
  command: 'COMPANY_CONFIDENTIAL',
  evaluate: () => 'CONFIDENTIAL - FOR INTERNAL USE ONLY'
});
