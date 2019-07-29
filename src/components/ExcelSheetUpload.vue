<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <drag-drop-file-input
          :drop-zone-class="dropZoneClass"
          :height-in-px="200"
          :drop-zone-text-class="dropZoneTextClass"
          drop-zone-text="DROP FILE HERE"
          @drop="onDrop"
          @dragenter="suppressEvent"
          @dragover="suppressEvent"
          @dragleave="unHighlightDropZone"
          ref="dragDropFileInput"
          data-test="dragDropFileInput"
        >
          <template slot="file-input">
            <v-flex xs12 md4>
              <file-input
                label="Upload Sheet"
                prepend-icon="mdi-attachment"
                :value="value.fileName"
                :accept="SheetJSFT"
                @change="onChange"
                @input="onInput"
                ref="fileInput"
                data-test="excelFileInput"
              ></file-input>
            </v-flex>
            <slot name="action-select-layout"></slot>
          </template>
        </drag-drop-file-input>
      </v-flex>
      <v-layout wrap justify-space-between>
        <slot name="action-btn-layout"></slot>
      </v-layout>

      <v-flex xs12>
        <v-data-table
          :headers="cols"
          :items="value.data"
          hide-actions
          ref="vDataTable"
        >
          <template v-slot:items="props">
            <td v-for="header in cols" :key="header.value">
              {{ props.item[header.value] }}
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/**
 * Holds the v-drag-and-drop-file-input and an excel sheet table *
 * components:
 *  v-data-table
 *  file-input
 *  drag-drop-file-input
 *
 * props:
 *  value
 *
 * events:
 *  upload
 *  input
 *  change
 *
 * slots:
 *  action-select-layout
 *  action-btn-layout
 */
import XLSX from "xlsx";
import FileInput from "./common/FileInput";
import DragDropFileInput from "./common/DragDropFileInput";
import { make_cols, SheetJSFT } from "../utils/xlsxUtils";

export default {
  name: "v-excel-sheet-upload",
  components: {
    FileInput,
    DragDropFileInput
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        fileName: "",
        data: []
      }),
      validator: val => {
        return val.hasOwnProperty("fileName") && val.hasOwnProperty("data");
      }
    }
  },
  data: () => ({
    cols: [
      { text: "A", value: 0 },
      { text: "B", value: 1 },
      { text: "C", value: 2 },
      { text: "D", value: 3 },
      { text: "E", value: 4 },
      { text: "F", value: 5 },
      { text: "G", value: 6 }
    ],
    SheetJSFT,
    dragIsOnGoing: false
  }),
  computed: {
    dropZoneClass() {
      return this.dragIsOnGoing
        ? "light-blue theme--dark"
        : "droparea-background elevation-0";
    },
    dropZoneTextClass() {
      return this.dragIsOnGoing
        ? "display-1 font-weight-thin text-xs-center"
        : "text-xs-center";
    }
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    highlightDropZone() {
      this.dragIsOnGoing = true;
    },
    unHighlightDropZone() {
      this.dragIsOnGoing = false;
    },
    suppressEvent(event) {
      this.highlightDropZone();
      event.stopPropagation();
      event.preventDefault();
    },
    async onDrop(event) {
      this.unHighlightDropZone();
      event.stopPropagation();
      event.preventDefault();
      const files = event.dataTransfer.files;

      if (files && files[0]) {
        const { headers, data } = await this.readUploadedFileAsBinary(files[0]);
        if (headers && data) {
          // this.data = data;
          this.cols = headers;
          this.$emit("upload", data);
          const newValue = { fileName: files[0].name, data };
          this.$emit("input", newValue);
          this.$emit("change", newValue);
        } else {
          throw new Error("data is not readable");
        }
      }
    },
    async onChange(event) {
      // Mockfiles for testing purposes

      let files = event.target.files;
      if (process.env.NODE_ENV == "test") {
        files = event.target.mockFiles;
      }

      if (files && files[0]) {
        try {
          const { headers, data } = await this.readUploadedFileAsBinary(
            files[0]
          );
          if (headers && data) {
            this.cols = headers;
            this.$emit("upload", data);
            const newValue = { fileName: files[0].name, data };
            this.$emit("input", newValue);
            this.$emit("change", newValue);
          } else {
            throw new Error("data is not readable");
          }
        } catch (error) {
          throw new Error("Error reading file");
        }
      }
    },
    readUploadedFileAsBinary(inputFile) {
      const temporaryFileReader = new FileReader();

      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        temporaryFileReader.onload = event => {
          /* Parse data */
          const binaryString = event.target.result;
          const workBook = XLSX.read(binaryString, { type: "binary" });

          /* Get first worksheet */
          const workSheetName = workBook.SheetNames[0];
          const workSheet = workBook.Sheets[workSheetName];

          /* Convert to array of arrays */
          const data = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
          const headers = make_cols(workSheet["!ref"]);
          resolve({ headers, data });
        };
        temporaryFileReader.readAsBinaryString(inputFile);
      });
    }
  }
};
</script>

<style>
.droparea-background {
  background-color: rgb(214, 231, 248) !important;
}
</style>
