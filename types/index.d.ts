// Type definitions for v-upload 0.1.0
// Project: v-upload
// Definitions by: Martin Ahindura <https://github.com/Tinitto>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('[~THE MODULE~]');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from '[~THE MODULE~]';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

import Vue from "vue";

interface formItem {
  type: string;
  name: string;
  options?: any;
  children?: formItem;
}

interface excelSheet {
  fileName: string;
  data: Array<Array<any>?>
}

export = {
  VfileInput,
  VDropArea,
  VDragDropFileInput,
  VExcelSheetUpload
};

declare class VfileInput extends Vue {
  readonly $props: {
    label?: string;
    value?: string;
    prependIcon?: string;
    accept?: string;
  };

  readonly $options: {
    name: "v-file-input";
  };

  onChange(event: Event): void;
  onInput(value: string): void;
  pickFile(): void;
}

declare class VDropArea extends Vue {
  readonly cardHeight: string;

  readonly $props: {
    dropZoneClass?: string;
    heightInPx?: number;
    dropZoneTextClass?: string;
    dropZoneText?: string;
  };

  readonly $options: {
    name: "v-drop-area";
  };

  onDrop(event: Event): void;
  onDragEnter(event: Event): void;
  onDragOver(event: Event): void;
  onDragLeave(event: Event): void;
}

declare class VDragDropFileInput extends Vue {
  readonly $options: {
    name: "v-drag-drop-file-input";
  };

  readonly $props: {
    label?: string;
    heightInPx?: number;
    dropZoneTextClass?: string;
    dropZoneText?: string;
    label?: string;
    value?: string;
    prependIcon?: string;
    accept?: string;
  };

  onDrop(event: Event): void;
  onDragEnter(event: Event): void;
  onDragOver(event: Event): void;
  onDragLeave(event: Event): void;
  onChange(event: Event): void;
  onInput(value: string): void;
}

declare class VExcelSheetUpload extends Vue {
  readonly $options: {
    name: "v-excel-sheet-upload";
  };

  readonly dropZoneClass: string;
  readonly dropZoneTextClass: string;

  readonly $props: {
    value?: excelSheet;
  };

  readonly $data: { cols: Array<any>; SheetJSFT: any, dragIsOnGoing: boolean };

  onInput(value: any): void;
  highlightDropZone(): void;
  unHighlightDropZone(): void;
  suppressEvent(event: Event): void;
  async onDrop(event: Event): void;
  async onChange(event: Event): void;
  async readUploadedFileAsBinary(inputFile: (Blob | File)): void;
}

