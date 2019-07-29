<template>
  <v-container fluid px-0>
    <v-layout row wrap>
      <v-flex xs12>
        <slot name="drop-area">
          <drop-area
            :drop-zone-class="dropZoneClass"
            :height-in-px="heightInPx"
            :drop-zone-text-class="dropZoneTextClass"
            :drop-zone-text="dropZoneText"
            @drop="onDrop"
            @dragenter="onDragEnter"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            ref="dropArea"
            data-test="parentDropArea"
          />
        </slot>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-sm>
          <v-layout wrap justify-space-between>
            <slot name="file-input">
              <v-flex xs12 md4>
                <file-input
                  :label="label"
                  :prepend-icon="prependIcon"
                  :value="value"
                  :accept="accept"
                  @change="onChange"
                  @input="onInput"
                  ref="fileInput"
                  data-test="parentFileInput"
                ></file-input>
              </v-flex>
            </slot>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/**
 * props:
 *  drop-zone-class
 *  height-in-px
 *  drop-zone-text-class
 *  drop-zone-text
 *  label
 *  prepend-icon
 *  value
 *  accept
 *
 * events:
 *  drop
 *  dragenter
 *  dragover
 *  dragleave
 *  change
 *  input
 *
 * slots:
 *  drop-area
 *  file-input
 */
import DropArea from "./DropArea";
import FileInput from "./FileInput";
export default {
  name: "v-drag-drop-file-input",
  props: {
    label: {
      type: String,
      default: "Upload"
    },
    prependIcon: {
      type: String,
      default: "mdi-attachment"
    },
    value: {
      type: String,
      default: ""
    },
    accept: {
      type: String,
      default: "doc,docx,pdf"
    },
    dropZoneClass: {
      type: String,
      default: ""
    },
    heightInPx: {
      type: Number,
      default: 200
    },
    dropZoneTextClass: {
      type: String,
      default: ""
    },
    dropZoneText: {
      type: String,
      default: "DROP FILE HERE"
    }
  },
  components: {
    DropArea,
    FileInput
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    },
    onDrop(event) {
      this.$emit("drop", event);
    },
    onDragEnter(event) {
      this.$emit("dragenter", event);
    },
    onDragOver(event) {
      this.$emit("dragover", event);
    },
    onDragLeave(event) {
      this.$emit("dragleave", event);
    },
    onInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>
