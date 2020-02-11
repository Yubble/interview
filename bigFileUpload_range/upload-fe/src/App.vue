<template>
  <div id="app">
    <h2>使用http range方式上传大文件</h2>
    <input type="file" @change="handleFileChange" />
    <button @click="handleUpload">上传</button>
    <h3>上传详情：</h3>
    {{uploadPercentage}}
    <div class="list-box">
      <table>
        <tr>
          <th>切片名称</th>
          <th>体积</th>
          <th>进度</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const LENGTH = 10;

export default {
  name: 'app',
  data() {
    return {
      container: {
        file: null,
        data: []
      },
      sectionList: []
    }
  },
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.sectionList.length) return 0;
      const loaded = this.sectionList
        .map(item => {
          console.log('size is ', item.size)
          console.log('percentage is ', item.percentage)
          const resper = item.size * item.percentage
          return resper
        })
        .reduce((acc, cur) => acc + cur);
      return parseInt((loaded / this.container.file.size).toFixed(2));
    }
  },
  methods: {
    request({
      url,
      method = 'post',
      data,
      headers = {},
      onProgress = e => e
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key])
        })
        xhr.send(data);
        xhr.onload = e => {
          resolve({
            data: e.target.response
          })
        };
      })
    },
    handleFileChange(e) {
      const [ file ] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    // 生成文件切片
    createFileChunk(file, length = LENGTH) {
      const fileChunkList = [];
      const chunkSize = Math.ceil(file.size / length);
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({ file: file.slice(cur, cur + chunkSize) });
        cur += chunkSize;
      }
      return fileChunkList;
    },
    // 上传切片
    async uploadChunks() {
      const requestList = this.sectionList
        .map(({ chunk, hash }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          return { formData };
        })
        .map(async ({ formData }, index) => {
          return await this.request({
            url: "http://localhost:3000",
            data: formData,
            onProgress: this.createProgressHandler(this.sectionList[index])
          })
        });

      // 并发切片
      await Promise.all(requestList);
      // 合并切片
      await this.mergeRequest();
    },
    async mergeRequest() {
      await this.request({
        url: 'http://localhost:3000/merge',
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          filename: this.container.file.name
        })
      });
    },
    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.sectionList = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        index,
        hash: this.container.file.name + "-" + index, // 文件名 + 数组下标
        percentage: 0,
        size: file.size
      }));
      await this.uploadChunks();
    },
    createProgressHandler(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
      }
    }
  }
}
</script>

<style>
</style>
