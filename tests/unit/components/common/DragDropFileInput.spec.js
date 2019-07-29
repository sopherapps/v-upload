/// <reference types="@types/jest" />

import DragDropFileInput from "../../../../src/components/common/DragDropFileInput.vue";
import Vue from "vue";

import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";

describe("DragDropFileInput", () => {
  Vue.use(Vuetify);

  const propsData = {
    dropZoneClass: "helloclass",
    dropZoneText: "world",
    dropZoneTextClass: "worldclass",
    heightInPx: 300,
    label: "hello",
    prependIcon: "pencil",
    value: "world",
    accept: "xls,csv"
  };

  const wrapper = mount(DragDropFileInput, {
    propsData
  });

  /**
   * When testing components, we check their refs and names
   */
  describe("components", () => {
    it("Has a DropArea component", () => {
      expect(wrapper.vm.$refs.dropArea.$options.name).toBe("v-drop-area");
    });

    it("Has a FileInput component", () => {
      expect(wrapper.vm.$refs.fileInput.$options.name).toBe("v-file-input");
    });
  });

  /**
   * When testing props, we will set the input props and expect the output
   */
  describe("props", () => {
    it("dropZoneClass becomes the drop-zone-class prop", () => {
      expect(wrapper.vm.$refs.dropArea.$props.dropZoneClass).toBe(
        propsData.dropZoneClass
      );
    });

    it("dropZoneText becomes the inner HTML of the text component in the card", () => {
      expect(
        wrapper.find('[data-test="dropZoneText"]').element.innerHTML
      ).toMatch(propsData.dropZoneText);
    });

    it("dropZoneTextClass becomes the class of the text component in the card", () => {
      expect(
        wrapper.find('[data-test="dropZoneText"]').element.className
      ).toMatch(`${propsData.dropZoneTextClass}`);
    });

    it("heightInPix becomes the heightInPx of the dropArea Element", () => {
      expect(wrapper.vm.$refs.dropArea.$props.heightInPx).toBe(
        propsData.heightInPx
      );
    });

    it("label becomes the label of the v-text-field", () => {
      expect(wrapper.vm.$refs.fileInput.$props.label).toMatch(
        `${propsData.label}`
      );
    });

    it("prependIcon becomes the prependIcon prop in the v-text-field", () => {
      expect(wrapper.vm.$refs.fileInput.$props.prependIcon).toMatch(
        `${propsData.prependIcon}`
      );
    });

    it("accept becomes the accept attribute of the fileInput", () => {
      expect(
        wrapper.find('[data-test="fileInput"]').element.getAttribute("accept")
      ).toMatch(`${propsData.accept}`);
    });

    it("value becomes the value of the fileInput component", () => {
      expect(wrapper.vm.$refs.fileInput.$props.value).toMatch(
        `${propsData.value}`
      );
    });
  });

  /**
   * When testing events, we will trigger events and check the output
   */
  describe("events", () => {
    const dropArea = wrapper.find('[data-test="parentDropArea"]');
    const parentFileInput = wrapper.find('[data-test="parentFileInput"]');

    it("On drop, emits a drop event passing it the event itself", () => {
      dropArea.trigger("drop");
      expect(wrapper.emitted().drop).toBeTruthy();
      expect(wrapper.emitted().drop[0][0]).toMatchObject({
        type: "drop"
      });
    });

    it("On dragenter, emits a dragenter event passing it the event itself", () => {
      dropArea.trigger("dragenter");
      expect(wrapper.emitted().dragenter).toBeTruthy();
      expect(wrapper.emitted().dragenter[0][0]).toMatchObject({
        type: "dragenter"
      });
    });

    it("On dragover, emits a dragover event passing it the event itself", () => {
      dropArea.trigger("dragover");
      expect(wrapper.emitted().dragover).toBeTruthy();
      expect(wrapper.emitted().dragover[0][0]).toMatchObject({
        type: "dragover"
      });
    });

    it("On dragleave, emits a dropleave event passing it the event itself", () => {
      dropArea.trigger("dragleave");
      expect(wrapper.emitted().dragleave).toBeTruthy();
      expect(wrapper.emitted().dragleave[0][0]).toMatchObject({
        type: "dragleave"
      });
    });

    it("On click of the textField in the parentFileInput,\
    the fileInput's click event is triggered", () => {
      const childFileInput = parentFileInput.find('[data-test="fileInput"]');
      let clicked = false;
      childFileInput.element.onclick = () => {
        clicked = true;
      };

      // Click events happen on specific elements
      parentFileInput.find('[data-test="textField"]').trigger("click");
      expect(clicked).toBe(true);
    });

    it("On input of the textField of the parentFileInput, an input event is\
      emitted with the value of the text field", () => {
      parentFileInput.find('[data-test="textField"]').trigger("input");
      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0][0]).toMatch(propsData.value);
    });

    it("On change of the file, a change event is emitted", () => {
      parentFileInput.find('[data-test="fileInput"]').trigger("change");
      expect(wrapper.emitted().change).toBeTruthy();
      expect(wrapper.emitted().change[0][0]).toMatchObject({
        type: "change"
      });
    });
  });

  /**
   * When testing slots, we will set the slots and expect the out put
   */
  describe("slots", () => {
    const newWrapper = mount(DragDropFileInput, {
      slots: {
        "drop-area": `<div data-test='dropAreaSlot' />`,
        "file-input": `<div data-test='fileInputSlot' />`
      },
      propsData
    });

    it("loads the dropAreaSlot div instead of parentDropArea component", () => {
      expect(
        newWrapper.find('[data-test="dropAreaSlot"]').exists()
      ).toBeTruthy();
      expect(
        newWrapper.find('[data-test="parentDropArea"]').exists()
      ).toBeFalsy();
    });

    it("loads the fileInputSlot div instead of parentFileInput component", () => {
      expect(
        newWrapper.find('[data-test="fileInputSlot"]').exists()
      ).toBeTruthy();
      expect(
        newWrapper.find('[data-test="parentFileInput"]').exists()
      ).toBeFalsy();
    });
  });
});
