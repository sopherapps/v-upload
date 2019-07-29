<template>
  <v-dialog hide-overlay persistent width="150" :value="value">
    <v-card color="primary" dark>
      <v-card-title class="pb-0" v-if="message">
        <small class="text-xs-center">{{ message }}</small>
      </v-card-title>
      <v-card-text class="text-xs-center">
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="15"
          :value="progressTracker()"
          :color="color"
          >{{ progressTracker() }}</v-progress-circular
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    progressTracker: {
      type: Function,
      default: () => 0
    },
    color: {
      type: String,
      default: "primary"
    },
    message: {
      type: String,
      default: ""
    }
  }
};
</script>
