# v-upload

A collection of file upload components built on top of vuetify to allow drag and drop, normal file selection etc.

## Demo

Checkout the [demo](https://sopherapps.github.io/v-upload/)

## Dependencies

1. [Vuejs +v2.6.10](https://vuejs.org)
2. [Vuetify +v2.0.0](https://vuetifyjs.com)

## Usage

**Don't use just yet. We are still building!**

### Installation

1. You can get this as an NPM package in your app

   ```bash
   npm install --save v-upload
   ```

2. Go to your `vuetify.js` plugin file in your plugin folder (Vuetify is needed for this) and import and register some or all of the components from v-upload globally.

   ```Javascript
    import {VFileInput, VDragDropFileInput, VDropArea, VExcelFileUpload } from "v-upload";

    Vue.use(Vuetify, {
      iconfont: "md"
    });

    Vue.component("v-file-input", VFileInput);
    Vue.component("v-drag-drop-file-input", VDragDropFileInput);
    Vue.component("v-drop-area", VDropArea);
    Vue.component("v-excel-file-upload", VExcelFileUpload);
   ```

3. In any of your component templates, just use the `<v-file-input></v-file-input>`, `<v-drag-drop-file-input></v-drag-drop-file-input>`,
   `<v-drop-area></v-drop-area>`, `<v-excel-file-upload></v-excel-file-upload>` tags e.g.

   ```html
   <v-file-input></v-file-input>
   ```

### Components

We have four components i.e. `v-file-input`, `v-drop-area`, `v-excel-file-upload` and `v-drag-drop-file-input`.

#### v-file-input

This is an input where a file can be selected that is to uploaded.

##### Props

The `v-file-input` receives props:

- value (or 'v-model' if you wish) (type: String)
  - the name of the file (Default: '')
- label (type: String)
  - label of the file input (Default: 'Upload')
- prepend-icon (type: String)
  - icon to prepend to the file input. (Default: 'attach_file')
- accept (type: String)
  - the file types to be accepted by the file input. (Default: 'doc,docx,pdf')

#### Events

The `v-file-input` emits two major events.

- change
  - This occurs when a file is uploaded and it avails the event object to the event handler
- input
  - This occurs when the textfield value changes

#### v-drop-area

This is the drop area where one can drag a file so as to upload it.

##### Props

The `v-drop-area` receives props:

- height-in-px (type: Number)
  - the height of the drop area component. (Default: 200)
- drop-zone-text (type: String)
  - the text that will be in the drop area. (Default: 'DROP FILE HERE')
- drop-zone-text-class (type: String)
  - the CSS class to attach to the text in the drop area. (Default: '')
- drop-zone-class (type: String)
  - the CSS class to attach to the drop area. (Default: '')

#### Events

The `v-drop-area` emits four major events.

- drop
  - This occurs when the dragged element is dropped on the drop area. This avails the event object to the event handler.
- dragover
  - This occurs when the dragged element is on top of the drop area. This avails the event object to the event handler.
- dragenter
  - This occurs when the dragged element enters the drop area. This avails the event object to the event handler.
- dragleave
  - This occurs when the dragged element leaves the drop area. This avails the event object to the event handler.

#### Slots

The `v-drop-area` has one slot.

- drop-zone-text
  - the custom text that will appear in the drop area

#### v-drag-drop-file-input

This combines the `v-file-input` with the `v-drop-area`

##### Props

The `v-drag-drop-file-input` receives props:

- height-in-px (type: Number)
  - the height of the drop area component. (Default: 200)
- drop-zone-text (type: String)
  - the text that will be in the drop area. (Default: 'DROP FILE HERE')
- drop-zone-text-class (type: String)
  - the CSS class to attach to the text in the drop area. (Default: '')
- drop-zone-class (type: String)
  - the CSS class to attach to the drop area. (Default: '')
- value (or 'v-model' if you wish) (type: String)
  - the name of the file (Default: '')
- label (type: String)
  - label of the file input (Default: 'Upload')
- prepend-icon (type: String)
  - icon to prepend to the file input. (Default: 'attach_file')
- accept (type: String)
  - the file types to be accepted by the file input. (Default: 'doc,docx,pdf')

#### Events

The `v-drag-drop-file-input` emits two major events.

- drop
  - This occurs when the dragged element is dropped on the drop area. This avails the event object to the event handler.
- dragover
  - This occurs when the dragged element is on top of the drop area. This avails the event object to the event handler.
- dragenter
  - This occurs when the dragged element enters the drop area. This avails the event object to the event handler.
- dragleave
  - This occurs when the dragged element leaves the drop area. This avails the event object to the event handler.
- change
  - This occurs when a file is uploaded and it avails the event object to the event handler
- input
  - This occurs when the textfield value changes

#### Slots

The `v-drag-drop-file-input` has two slots.

- drop-area
  - the area where one can replace the default v-drop-area with say another drop-area
- file-input
  - the area where one can replace the default v-drop-area with say another file-input

#### v-excel-file-upload

This allows upload by both drag and drop and file select.

##### Props

The `v-excel-file-upload` receives props:

- value (type: Object)
  - the fileName and data (array of arrays) that is to be passed to the component. Keys of fileName, data are manadatory. (Default: {fileName: '', data: []})

#### Events

The `v-excel-file-upload` emits three major events.

- upload
  - This occurs when the file is uploaded. It avails the data (array of arrays) to the event handler.
- input
  - This occurs when the file is uploaded. It avails the object with fileName and data to the event handler.
- change
  - This occurs when the file is uploaded. It avails the object with fileName and data to the event handler.

#### Slots

The `v-excel-file-upload` has two slots.

- action-select-layout
  - add v-flex components to be added to the layout of the v-excel-file-upload near the file-input
- action-btn-layout
  - add v-flex components to be added to the layout of the v-excel-file-upload below the file-input

## Acknowledgements

[Vuetify](https://vuetifyjs.com) is the component library this form is based on.

This [post by Divyam Rastogi](https://medium.com/justfrontendthings/how-to-create-and-publish-your-own-vuejs-component-library-on-npm-using-vue-cli-28e60943eed3) was very helpful when publishing to NPM.

## License

Copyright (c) 2019 [Martin Ahindura](https://github.com/Tinitto)
Licensed under the [MIT License](./LICENSE)
