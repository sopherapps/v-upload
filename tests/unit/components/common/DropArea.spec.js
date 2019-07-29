/// <reference types="@types/jest" />

import DropArea from "../../../../src/components/common/DropArea.vue";
import { mount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vue from "vue";

describe("Drop Area", () => {
  Vue.use(Vuetify);

  const propsData = {
    dropZoneClass: "helloclass",
    dropZoneText: "world",
    dropZoneTextClass: "worldclass",
    heightInPx: 300
  };

  const wrapper = mount(DropArea, {
    propsData
  });

  /**
   * When testing props, we will set the input props and expect the output
   */
  describe("props", () => {
    it("dropZoneClass becomes the class of the main card component or its components", () => {
      expect(wrapper.find('[data-test="rootCard"]').element.className).toMatch(
        `${propsData.dropZoneClass}`
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

    it("heightInPix becomes the height in px of the rootCard Element", () => {
      const rootCard = wrapper.find('[data-test="rootCard"]');
      expect(rootCard.element.style.height).toBe(`${propsData.heightInPx}px`);
    });
  });

  /**
   * When testing events, we will trigger events and check the output
   */
  describe("events", () => {
    const rootCard = wrapper.find('[data-test="rootCard"]');

    it("On drop, emits a drop event passing it the event itself", () => {
      rootCard.trigger("drop");
      expect(wrapper.emitted().drop).toBeTruthy();
      expect(wrapper.emitted().drop[0][0]).toMatchObject({
        type: "drop"
      });
    });

    it("On dragenter, emits a dragenter event passing it the event itself", () => {
      rootCard.trigger("dragenter");
      expect(wrapper.emitted().dragenter).toBeTruthy();
      expect(wrapper.emitted().dragenter[0][0]).toMatchObject({
        type: "dragenter"
      });
    });

    it("On dragover, emits a dragover event passing it the event itself", () => {
      rootCard.trigger("dragover");
      expect(wrapper.emitted().dragover).toBeTruthy();
      expect(wrapper.emitted().dragover[0][0]).toMatchObject({
        type: "dragover"
      });
    });

    it("On dragleave, emits a dropleave event passing it the event itself", () => {
      rootCard.trigger("dragleave");
      expect(wrapper.emitted().dragleave).toBeTruthy();
      expect(wrapper.emitted().dragleave[0][0]).toMatchObject({
        type: "dragleave"
      });
    });
  });

  /**
   * When testing slots, we will set the slots and expect the out put
   */
  describe("slots", () => {
    const newWrapper = mount(DropArea, {
      slots: {
        "drop-zone-text": `<div data-test='dropSlot' />`
      },
      propsData
    });

    it("loads the div instead of dropZoneText component", () => {
      expect(newWrapper.find('[data-test="dropSlot"]').exists()).toBeTruthy();
      expect(
        newWrapper.find('[data-test="dropZoneText"]').exists()
      ).toBeFalsy();
    });
  });
});
