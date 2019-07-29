<template>
  <div>
    <excel-sheet-upload v-model="excelSheet" @upload="resetData">
      <template slot="action-select-layout">
        <v-flex xs12 md4>
          <v-select
            prepend-icon="mdi-database"
            v-model="currentService"
            :items="services"
            label="Entity"
          ></v-select>
        </v-flex>

        <v-flex xs12 md4>
          <v-select
            prepend-icon="mdi-hammer"
            v-model="currentAction"
            :items="actions"
            label="Action"
          ></v-select>
        </v-flex>
      </template>

      <template slot="action-btn-layout">
        <v-flex xs10 offset-xs1 offset-sm0 sm2>
          <v-btn
            block
            :disabled="excelSheet.data.length ? false : true"
            color="secondary"
            @click="exportSheet"
            >Export</v-btn
          >
        </v-flex>

        <v-flex xs10 offset-xs1 offset-sm0 sm2>
          <v-dialog v-model="dialog" scrollable max-width="90vw">
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                v-on="on"
                block
                :disabled="excelSheet.data.length ? false : true"
                >Send</v-btn
              >
            </template>
            <v-card>
              <v-card-title>The Data in 'excelSheet.data'</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 400px;">
                <pre style="display: flex; justify-content: center;">
                  <code style="width: 90%;">
                    {{ formattedData }}
                  </code>
                </pre>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" flat @click="dialog = false"
                  >Close</v-btn
                >
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </template>
    </excel-sheet-upload>

    <progress-circle
      :progress-tracker="() => progress"
      v-model="progressCircleVisible"
      :message="statusMessage"
      color="white"
    />
  </div>
</template>

<script>
import XLSX from "xlsx";
import ProgressCircle from "../components/ProgressCircle";
import ExcelSheetUpload from "../components/ExcelSheetUpload";
export default {
  components: {
    ProgressCircle,
    ExcelSheetUpload
  },
  data: () => ({
    excelSheet: {
      data: [],
      fileName: ""
    },
    currentService: "",
    services: ["users", "posts", "categories"],
    currentAction: "",
    actions: ["upload", "delete"],
    progress: 0,
    statusMessage: "",
    progressCircleVisible: false,
    dialog: false
  }),
  computed: {
    formattedData() {
      return JSON.stringify(this.excelSheet, null, 4);
    }
  },
  methods: {
    resetData() {
      // alert("Data is being reset");
    },
    exportSheet() {
      this.progress = 50;
      /* convert state to workbook */
      this.statusMessage = "Converting data to spreadsheet data...";
      const ws = XLSX.utils.aoa_to_sheet(this.excelSheet.data);

      this.progress = 70;
      this.statusMessage = "Creating new spreadsheet to copy to...";
      const wb = XLSX.utils.book_new();

      this.progress = 80;
      this.statusMessage =
        "Appending spreadsheet data to the new spreadsheet...";
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

      /* generate file and send to client */
      this.progress = 90;
      this.statusMessage = "Downloading spreadsheet...";
      XLSX.writeFile(wb, this.excelSheet.fileName);
      this.statusMessage = "Export complete.";
      this.progress = 100;
    }
  }
};
</script>
