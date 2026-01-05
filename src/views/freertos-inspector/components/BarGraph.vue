<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BarGraph',
  props: {
    current: {
      type: Number,
      required: true,
      validator: (value: number) => value >= 0
    },
    maximum: {
      type: Number,
      required: true,
      validator: (value: number) => value > 0
    },
    fillColor: {
      type: String,
      default: '#4CAF50'
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    height: {
      type: String,
      default: '20px'
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const percentage = computed(() => {
      if (props.maximum === 0) return 0;
      return Math.min((props.current / props.maximum) * 100, 100);
    });

    const percentageWidth = computed(() => {
      return Math.max(0, percentage.value);
    });

    const backgroundColorValue = computed(() => {
      return props.backgroundColor;
    });

    // Validate that current <= maximum
    const isValid = computed(() => {
      return props.current <= props.maximum;
    });

    if (!isValid.value) {
      console.warn('BarGraph: current value should be less than or equal to maximum value');
    }

    return {
      percentage,
      percentageWidth,
      backgroundColorValue
    };
  }
});
</script>

<template>
  <div class="bar-graph-container">
    <div class="bar-graph" :style="{ backgroundColor: backgroundColorValue }">
      <div class="bar-text" v-if="showText">{{ current }} / {{ maximum }} ({{ Math.round(percentage) }}%)</div>
      <div 
        class="bar-fill" 
        :style="{ 
          width: percentageWidth + '%',
          backgroundColor: fillColor 
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.bar-graph-container {
  width: 100%;
  font-family: Arial, sans-serif;
}

.bar-graph {
  position: relative;
  width: 100%;
  height: v-bind(height);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ccc;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease-in-out;
  border-radius: inherit;
}

.bar-text {
  /*margin-top: 4px;
  font-size: 12px; */
  color: #333;
  text-align: center;
}
</style>