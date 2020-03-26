const http = require("http");
const path = require("path");
const url = require("url");

// 引入fs模块
const fs = require("mz/fs");

// 请求处理函数
async function listener(req, res) {
  console.log('监听到有请求')
  // 获取range请求头，格式为
  let range = req.headers['range'];

  // 下载文件路径
  let p = path.resolve(__dirname, url.parse(url, true).pathname);

  // 判断是否存在range头
  if (range) {
    console.log('检测到有range')
    // 获取范围请求的开始和结束位置
    let [, start, end] = range.match(/(\d*)-(\d*)/);

    // 错误处理
    try {
      let statObj = await fs.stat(p);
    } catch (e) {
      res.end('Not Found');
    }

    // 文件总字节数
    let total = statObj.size;

    // 处理请求头中范围参数不传的问题
    start = start ? parseInt(start) : 0;
    end = end ? parseInt(end) : total - 1;

    // 响应客户端
    res.statusCode = 206;
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Range", `bytes ${start}-${end}/${total}`);
    fs.createReadStream(p, { start, end }).pipe(res);
  } else {
    console.log('没有range')
    // 没有range请求头时将整个文件内容返回给客户端
    fs.createReadStream(p).pipe(res);
  }
}

// 创建服务器
const server = http.createServer(listener);

// 监听端口
server.listen(3000, () => {
  console.log('正在监听3000端口')
})
