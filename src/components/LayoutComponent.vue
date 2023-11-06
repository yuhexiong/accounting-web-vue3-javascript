<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div>
        <h3><router-link to="/type">類別維護</router-link></h3>
      </div>
      <div>
        <h3><router-link to="/consumption">消費紀錄</router-link></h3>
      </div>
      <div>
        <h3><router-link to="/report">每月報表</router-link></h3>
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
