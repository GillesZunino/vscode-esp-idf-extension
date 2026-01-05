<script setup lang="ts">
import { computed, onMounted } from "vue";
import BarGraph from "./components/BarGraph.vue";

onMounted(() => {
    //debugger;
});
</script>

 <template>
    <div id="app">
        <BarGraph 
            :current="75" 
            :maximum="100" 
            fill-color="#2196F3"
            height="25px"
        />
    </div>
</template>