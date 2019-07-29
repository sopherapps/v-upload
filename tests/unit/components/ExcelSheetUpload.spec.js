/// <reference types="@types/jest" />

import ExcelSheetUpload from "../../../src/components/ExcelSheetUpload.vue";
import { makeAnExcelSheet } from "../../../src/utils/xlsxUtils";
import Vue from "vue";
import flushPromises from "flush-promises";

import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";

describe("ExcelSheetUpload", () => {
  Vue.use(Vuetify);

  const propsData = {
    value: {
      fileName: "file.xls",
      data: []
    }
  };

  let wrapper = mount(ExcelSheetUpload, {
    propsData
  });

  /**
   * When testing components, we check their refs and names
   */
  describe("components", () => {
    it("Has a DragDropFileInput component", () => {
      expect(wrapper.vm.$refs.dragDropFileInput.$options.name).toBe(
        "v-drag-drop-file-input"
      );
    });

    it("Has a FileInput component", () => {
      expect(wrapper.vm.$refs.fileInput.$options.name).toBe("v-file-input");
    });

    it("Has a v-data-table component", () => {
      expect(wrapper.vm.$refs.vDataTable.$options.name).toBe("v-data-table");
    });
  });

  /**
   * When testing props, we will set the input props and expect the output
   */
  describe("props", () => {
    it("value becomes the value of the fileInput component", () => {
      expect(wrapper.vm.$refs.fileInput.$props.value).toMatch(
        `${propsData.value.fileName}`
      );
    });
  });

  /**
   * When testing events, we will trigger events and check the output
   */
  describe("events", () => {
    const fileData = [
      ["name", "gender"],
      ["John Doe", "male"],
      ["Jane Doe", "female"]
    ];
    const mockFile = makeAnExcelSheet(fileData, "contacts");
    beforeEach(() => {
      wrapper = mount(ExcelSheetUpload, {
        propsData
      });
    });

    it("On drop, emits an upload event passing it the data it has and emitting\
    an input event with the name of the file as parameter", async () => {
      const dropArea = wrapper
        .find('[data-test="dragDropFileInput"]')
        .find('[data-test="parentDropArea"]');
      dropArea.trigger("drop", { dataTransfer: { files: [mockFile] } });

      // flush the two promises that have to be awaited
      // i.e onDrop and readUploadedFileAsBinary
      await flushPromises();
      await flushPromises();

      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0][0]).toMatchObject({
        fileName: mockFile.name,
        data: fileData
      });

      expect(wrapper.emitted().change).toBeTruthy();
      expect(wrapper.emitted().change[0][0]).toMatchObject({
        fileName: mockFile.name,
        data: fileData
      });

      expect(wrapper.emitted().upload).toBeTruthy();
      expect(wrapper.emitted().upload[0][0]).toEqual(
        expect.arrayContaining(fileData)
      );
    });

    it("On change of file of file input, emits an upload event passing it the data it has and emitting\
    an input event with the name of the file as parameter", async () => {
      const fileInput = wrapper
        .find('[data-test="excelFileInput"]')
        .find('[data-test="fileInput"]');

      fileInput.element.mockFiles = [mockFile];
      fileInput.trigger("change");

      // flush the two promises that have to be awaited
      // i.e onChange and readUploadedFileAsBinary
      await flushPromises();
      await flushPromises();

      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0][0]).toMatchObject({
        fileName: mockFile.name,
        data: fileData
      });

      expect(wrapper.emitted().change).toBeTruthy();
      expect(wrapper.emitted().change[0][0]).toMatchObject({
        fileName: mockFile.name,
        data: fileData
      });

      expect(wrapper.emitted().upload).toBeTruthy();
      expect(wrapper.emitted().upload[0][0]).toEqual(
        expect.arrayContaining(fileData)
      );
    });
  });

  /**
   * When testing slots, we will set the slots and expect the out put
   */
  describe("slots", () => {
    const newWrapper = mount(ExcelSheetUpload, {
      slots: {
        "action-select-layout": `<div data-test='actionSelectLayoutSlot' />`,
        "action-btn-layout": `<div data-test='actionBtnLayoutSlot' />`
      },
      propsData
    });

    it("loads the actionSelectLayoutSlot div", () => {
      expect(
        newWrapper.find('[data-test="actionSelectLayoutSlot"]').exists()
      ).toBeTruthy();
      expect(
        wrapper.find('[data-test="actionSelectLayoutSlot"]').exists()
      ).toBeFalsy();
    });

    it("loads the actionBtnLayoutSlot div", () => {
      expect(
        newWrapper.find('[data-test="actionBtnLayoutSlot"]').exists()
      ).toBeTruthy();
      expect(
        wrapper.find('[data-test="actionBtnLayoutSlot"]').exists()
      ).toBeFalsy();
    });
  });
});
