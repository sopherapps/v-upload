<template>
  <v-card
    :class="dropZoneClass"
    :height="cardHeight"
    @drop="onDrop"
    @dragenter="onDragEnter"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    data-test="rootCard"
  >
    <v-container fill-height>
      <slot name="drop-zone-text">
        <v-layout row justify-center align-center>
          <v-flex xs12>
            <p :class="dropZoneTextClass" data-test="dropZoneText">
              {{ dropZoneText }}
            </p>
          </v-flex>
        </v-layout>
      </slot>
    </v-container>
  </v-card>
</template>

<script>
/**
 * props:
 *  drop-zone-class
 *  height-in-px
 *  drop-zone-text-class
 *  drop-zone-text
 * events:
 *  drop
 *  dragenter
 *  dragover
 *  dragleave
 * slots:
 *  drop-zone-text
 */
export default {
  name: "v-drop-area",
  props: {
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
  computed: {
    cardHeight() {
      return `${this.heightInPx}px`;
    }
  },
  methods: {
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
    }
  }
};
</script>
