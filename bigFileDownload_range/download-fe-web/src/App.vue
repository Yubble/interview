<template>
  <div id="app">
    <h2>使用http range方式上传大文件</h2>
    <input type="file" @change="handleFileChange" />
    <button @click="handleUpload">上传</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    }
  }
}
</script>

<style>
</style>
