<template>
  <div>
    <v-text-field
      :label="label"
      @click="pickFile"
      :value="value"
      @input="onInput"
      :prepend-icon="prependIcon"
      data-test="textField"
      ref="textField"
    ></v-text-field>
    <input
      type="file"
      style="display: none"
      ref="fileInput"
      data-test="fileInput"
      id="file"
      :accept="accept"
      @change="onChange"
    />
  </div>
</template>

<script>
/**
 * props:
 *  label
 *  prepend-icon
 *  value
 *  accept
 * events:
 *  change
 *  input
 */
export default {
  name: "v-file-input",
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
    }
  },
  methods: {
    onChange(event) {
      this.$emit("change", event);
    },
    onInput(value) {
      this.$emit("input", value);
    },
    pickFile() {
      this.$refs.fileInput.click();
    }
  }
};
</script>
