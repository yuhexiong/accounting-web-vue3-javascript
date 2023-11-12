<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div
        style="
          margin-top: 30px;
          margin-left: 20px;
          margin-right: 20px;
          margin-bottom: 50px;
          padding-top: 10px;
          padding-bottom: 10px;
          border: 2px solid white;
          border-radius: 5px;
        "
      >
        <h1 style="margin: 0px">Accounting</h1>
        <h1 style="margin: 0px">System</h1>
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
