<template>
  <div class="app-layout">
    <aside class="sidebar">
      <ul>
        <li><router-link to="/type">類別維護</router-link></li>
        <li><router-link to="/consumption">消費紀錄</router-link></li>
        <li><router-link to="/report">每月報表</router-link></li>
      </ul>
    </aside>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.app-layout {
  display: flex;
}

.sidebar {
  width: 250px;
  background-color: #f0f0f0;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
}

.content {
  margin-left: 250px;
  padding: 20px;
}
</style>
