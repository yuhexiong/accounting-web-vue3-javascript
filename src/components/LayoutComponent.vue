<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div
        style="
          margin-top: 5px;
          margin-left: 5px;
          margin-right: 5px;
          margin-bottom: 80px;
          padding-top: 10px;
          padding-bottom: 10px;
          border: 2px solid white;
          border-radius: 5px;
        "
      >
        <h3 style="margin: 0px">Accounting System</h3>
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
