<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="logo">
        <h2 style="margin: 0px; border: 2px solid white; border-radius: 3px">
          Accounting System
        </h2>
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
      <div style="position: fixed; bottom: 10px; left: 27px">
        <p style="color: rgb(133, 132, 132); font-weight: 600">
          created 2023-11-14 yuhexiong
        </p>
      </div>
    </aside>
    <main class="content">
      <nav class="all-nav">
        <h2 style="margin-left: auto; margin-top: auto; color: rgb(61, 60, 60)">
          ☰
        </h2>
      </nav>
      <router-view />
    </main>
  </div>
</template>

<style>
@import "@/assets/layoutStyle.css";
</style>
