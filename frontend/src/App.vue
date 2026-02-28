<script setup>
import { ref, computed, onMounted } from 'vue';

const countries = ref([]);
const currentYear = ref(1961);
const isRunning = ref(false);

// recibimos los datos
const fetchData = async () => {
  const response = await fetch('http://localhost:5000/api/countries');
  countries.value = await response.json();
};

// para subir y bajar los paices segun si valor en carbono
const rankedCountries = computed(() => {
  return countries.value
    .map(country => {
      const yearRecord = country.history.find(h => h.year === currentYear.value);
      return {
        name: country.countryName,
        carbon: yearRecord ? yearRecord.carbon : 0
      };
    })
    .sort((a, b) => b.carbon - a.carbon)
    .slice(0, 10); // mosramos 10 nomas
});

// sumamos todos 
const globalTotal = computed(() => {
  return countries.value.reduce((acc, country) => {
    const yearRecord = country.history.find(h => h.year === currentYear.value);
    return acc + (yearRecord ? yearRecord.carbon : 0);
  }, 0);
});
const startRace = () => {
  isRunning.value = true;
  const interval = setInterval(() => {
    if (currentYear.value < 2024) {
      currentYear.value++;
    } else {
      clearInterval(interval);
      isRunning.value = false;
    }
  }, 800);
};

onMounted(fetchData);
</script>

<template>
  <div class="container">
    <h1>Historic global carbon footprint </h1>
    <div class="info">
      <div class="anio">
      <p> Year </p>
      <p>{{ currentYear }}</p>
    </div>
    <div class="total">
      <p> Global Total</p>
      <p> {{ globalTotal.toFixed(2) }}</p>
    </div>
    </div>

    <button @click="startRace" :disabled="isRunning">iniciar</button>

    <div class="chart-container">
      <div 
        v-for="(country, index) in rankedCountries" 
        :key="country.name"
        class="bar-wrapper"
        :style="{ transform: `translateY(${index * 50}px)` }"
      >
        <div class="label">{{ country.name }}</div>
        <div class="bar-container">
          <div 
            class="bar" 
            :style="{ width: `${(country.carbon * 30)}%` }" 
          ></div>
        </div>
        <div class="value">{{ country.carbon.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { font-family: 'Inter', sans-serif; padding: 20px; max-width: 800px; margin: auto; text-align: center;
align-items: center;
justify-content: center;

}


.total { font-size: 24px; font-weight: bold; color: #2c3e50; 
  width: 100%;
display: flex;
flex-direction: column;}
.info {
  display: flex;
  justify-content: space-around; 
  width: 100%;
  margin-bottom: 20px;
}
.anio{ 
  width: 50%;
  font-size: 24px; font-weight: bold; color: #2c3e50;
  display: flex;
flex-direction: column;
text-align: center;
justify-content: center;
align-items: center;
}
.chart-container {
  width: 100%;

  position: relative;
  height: 550px;
  margin-top: 40px;
}

.bar-wrapper {
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  transition: transform 0.6s ease-in-out;
}

.label { width: 150px; text-align: right; margin-right: 15px; font-size: 14px; }

.bar-container { flex-grow: 1; background: #eee; height: 25px; border-radius: 4px; overflow: hidden; }

.bar {
  height: 100%;
  background: #42b983;
  transition: width 0.6s ease-in-out;
}

.value { width: 60px; margin-left: 10px; font-weight: bold; }

button { padding: 10px 20px; background: #34495e; color: white; border: none; cursor: pointer; border-radius: 5px; }
button:disabled { background: #95a5a6; }
</style>