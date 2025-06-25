/*
 * @Description
 */
// created by gpake

let config = {
  header: { 'Content-Type': 'application/json' },
  data: {},
  bucket: '',
  qiniuImageURLPrefix: '',
  qiniuUploadToken: '',
  qiniuUploadTokenURL: '',
  qiniuUploadTokenFunction: null,
};

// 七牛文件夹映射的上传域名 https://developer.qiniu.com/kodo/manual/1671/region-endpoint
const bucketMappingActionUrl = {
  /*
   * 中台组组的 的 qiniu地址
  */
  'middlestage': 'https://up-z2.qiniup.com/',
  'linhuiba-banners': 'https://upload.qiniup.com/', //  内容文件
  'linhuiba-certs': 'https://upload.qiniup.com/', //  证件文件
  'linhuiba-crm': 'https://upload.qiniup.com/', //  crm相关文件
  // 华南：客户端上传：http(s)://upload-z2.qiniup.com
  'linhuiba-file': 'https://upload-z2.qiniup.com/', //  excel、pdf等文件专用
  'linhuiba-temp': 'https://upload-z2.qiniup.com/', //  临时文件
  'linhuiba-video': 'https://upload-z2.qiniup.com/', //  视频文件

  // location 的 bucket
  'location-images': 'https://upload-z2.qiniup.com/', // 场地相关文件
  'location-cases': 'https://up-z2.qiniup.com/', // 案例文件
  'location-certs': 'https://up-z2.qiniup.com/', // 证件文件
  'location-files': 'https://up-z2.qiniup.com/', // excel、pdf等文件专用
  'location-temp': 'https://up-z2.qiniup.com/', // 临时文件
  'location-videos': 'https://up-z2.qiniup.com/', // 视频文件
};


module.exports = {
  init,
  upload,
};

// 在整个程序生命周期中，只需要 init 一次即可
// 如果需要变更参数，再调用 init 即可
function init(options) {
  config = {
    header: { 'Content-Type': 'application/json' },
    data: {},
    bucket: '',
    qiniuImageURLPrefix: '',
    qiniuUploadToken: '',
    qiniuUploadTokenURL: '',
    qiniuUploadTokenFunction: null,
  };
  updateConfigWithOptions(options);
}

function updateConfigWithOptions(options) {
  if (options.uptoken) {
    config.qiniuUploadToken = options.uptoken;
  } else if (options.uptokenURL) {
    config.qiniuUploadTokenURL = options.uptokenURL;
  } else if (options.uptokenFunc) {
    config.qiniuUploadTokenFunction = options.uptokenFunc;
  }
  if (options.header) {
    config.header = options.header;
  }
  if (options.domain) {
    config.qiniuImageURLPrefix = options.domain;
  }
  if (options.data) {
    config.data = options.data;
  }
  if (options.bucket) {
    config.bucket = options.bucket;
  }
}

function upload(filePath, success, fail, options) {
  if (filePath === null) {
    console.error('qiniu uploader need filePath to upload');
    return;
  }
  if (options) {
    init(options);
  }
  if (config.qiniuUploadToken) {
    doUpload(filePath, success, fail, options);
  } else if (config.qiniuUploadTokenURL) {
    getQiniuToken(function() {
      doUpload(filePath, success, fail, options);
    });
  } else if (config.qiniuUploadTokenFunction) {
    config.qiniuUploadToken = config.qiniuUploadTokenFunction();
  } else {
    console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');

  }
}

function doUpload(filePath, success, fail, options) {
  // const url = uploadURLFromRegionCode(config.qiniuRegion);
  const url = bucketMappingActionUrl[config.bucket];
  wx.uploadFile({
    url,
    filePath,
    name: 'file',
    header: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      // token: index === 1 ? '' : token // 七牛上传ntoken，用于测试多图上传时，某张图片上传失败的情况
      token: config.qiniuUploadToken,
      // file: url
    },
    success(res) {
      const dataString = res.data;
      const dataObject = JSON.parse(dataString);
      // do something
      const imageUrl = config.qiniuImageURLPrefix + dataObject.key;
      dataObject.url = imageUrl;
      if (success) {
        success(dataObject);
      }
    },
    fail(error) {
      if (fail) {
        fail(error);
      }
    },
  });
}

function getQiniuToken(callback) {
  uni.request({
    url: config.qiniuUploadTokenURL,
    header: config.header,
    data: config.data,
    success(res) {
      console.log('七牛token:', res);

      const { token } = res.data;
      config.qiniuUploadToken = token;
      if (callback) {
        callback();
      }
    },
    fail(error) {
      console.log('七牛token错误:', error);
      console.log(error);
    },
  });
}
