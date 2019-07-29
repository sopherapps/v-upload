import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

import DragDropFileInput from "./common/DragDropFileInput.vue";
import DropArea from "./common/DropArea.vue";
import FileInput from "./common/FileInput.vue";
import ExcelSheetUpload from "./ExcelSheetUpload.vue";

Vue.use(Vuetify, {
  iconfont: "mdi"
});

Vue.component("v-drag-drop-file-input", DragDropFileInput);
Vue.component("v-drop-area", DropArea);
Vue.component("v-file-input", FileInput);
Vue.component("v-excel-sheet-upload", ExcelSheetUpload);

export default {
  VDragDropFileInput: DragDropFileInput,
  VDropArea: DropArea,
  VFileInput: FileInput,
  VExcelSheetUpload: ExcelSheetUpload
};
