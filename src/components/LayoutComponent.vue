<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo">
        <h2 class="logo-name">Accounting System</h2>
      </div>
      <div class="sidebar-router-div">
        <h3><router-link to="/type">◉ Type Maintain</router-link></h3>
      </div>
      <div class="sidebar-router-div">
        <h3>
          <router-link to="/consumption">✎ Consumption Record</router-link>
        </h3>
      </div>
      <div class="sidebar-router-div">
        <h3><router-link to="/report">⏱︎ Monthly Report</router-link></h3>
      </div>
      <div class="created-info">
        <p>@ 2023-11-14 yuhexiong</p>
      </div>
    </aside>
    <main class="content">
      <nav class="all-nav">
        <h2>☰</h2>
      </nav>
      <router-view />
    </main>
  </div>
</template>

<style>
@import "@/assets/layoutStyle.css";
</style>
