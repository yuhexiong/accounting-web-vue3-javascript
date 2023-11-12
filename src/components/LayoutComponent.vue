<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div style="margin-bottom: 100px">
        <h1>Accounting System</h1>
      </div>
      <div class="sidebar-router-div">
        <h4><router-link to="/type">Type Maintain</router-link></h4>
      </div>
      <div class="sidebar-router-div">
        <h4><router-link to="/consumption">Consumption Record</router-link></h4>
      </div>
      <div class="sidebar-router-div">
        <h4><router-link to="/report">Monthly Report</router-link></h4>
      </div>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
@import "@/assets/layoutStyle.css";
</style>
