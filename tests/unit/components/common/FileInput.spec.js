/// <reference types="@types/jest" />

import FileInput from "../../../../src/components/common/FileInput.vue";
import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";

describe("File Input", () => {
  Vue.use(Vuetify);

  const propsData = {
    label: "hello",
    prependIcon: "pencil",
    value: "world",
    accept: "xls,csv"
  };

  const wrapper = mount(FileInput, {
    propsData
  });

  /**
   * When testing props, we will set the input props and expect the output
   */
  describe("props", () => {
    it("label becomes the label of the v-text-field", () => {
      expect(wrapper.vm.$refs.textField.$props.label).toMatch(
        `${propsData.label}`
      );
    });

    it("prependIcon becomes the prependIcon prop in the v-text-field", () => {
      expect(wrapper.vm.$refs.textField.$props.prependIcon).toMatch(
        `${propsData.prependIcon}`
      );
    });

    it("accept becomes the accept attribute of the fileInput", () => {
      expect(
        wrapper.find('[data-test="fileInput"]').element.getAttribute("accept")
      ).toMatch(`${propsData.accept}`);
    });

    it("value becomes the value of the v-text-field", () => {
      expect(wrapper.vm.$refs.textField.$props.value).toMatch(
        `${propsData.value}`
      );
    });
  });

  /**
   * When testing events, we will trigger events and check the output
   */
  describe("events", () => {
    const textField = wrapper.find('[data-test="textField"]');
    const fileInput = wrapper.find('[data-test="fileInput"]');

    it("On click of the textField, the fileInput's click as well\
    as the component's click event is triggered", () => {
      let clicked = false;
      fileInput.element.onclick = () => {
        clicked = true;
      };

      textField.trigger("click");
      expect(clicked).toBe(true);
    });

    it("On input of the textField, an input event is\
      emitted with the value of the text field", () => {
      textField.trigger("input");
      expect(wrapper.emitted().input).toBeTruthy();
      expect(wrapper.emitted().input[0][0]).toMatch(propsData.value);
    });

    it("On change of the file, a change event is emitted", () => {
      fileInput.trigger("change");
      expect(wrapper.emitted().change).toBeTruthy();
      expect(wrapper.emitted().change[0][0]).toMatchObject({
        type: "change"
      });
    });
  });
});
