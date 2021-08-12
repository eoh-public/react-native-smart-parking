import axios from 'axios';
import { deleteData, getData, storeData } from '../Storage';
import { ToastBottomHelper } from '../Utils';

export const replaceParams = (apiURL, params) => {
  let _result = apiURL;
  if (typeof params === 'object') {
    Object.keys(params).forEach((key) => {
      _result = _result.replace(`{${key}}`, params[key]);
    });
  }
  return _result;
};

const parseErrorResponse = (error) => {
  let message;
  let data = {};
  if (
    error.response &&
    error.response.data &&
    error.response.data instanceof Object
  ) {
    data = error.response.data;
    const firstKey = Object.keys(error.response.data)[0];
    message = error.response.data[firstKey];

    if (message instanceof Array) {
      message = message[0];
    }
    if (message.message) {
      message = message.message;
    }
  } else {
    message = error.message;
  }

  ToastBottomHelper.error(message);

  return {
    success: false,
    error,
    message,
    data,
  };
};

export async function axiosGet(URL, config = {}, cache = false) {
  let response;
  try {
    response = await axios.get(URL, config);
  } catch (error) {
    if (cache) {
      // only network error or server error
      if (!error.response || error.response.status >= 500) {
        return {
          success: true,
          data: JSON.parse(await getData(`@CACHE_REQUEST_${URL}`)),
        };
      } else {
        await deleteData(`@CACHE_REQUEST_${URL}`);
      }
    }
    return parseErrorResponse(error);
  }
  const { data } = response;
  if (response.status === 200) {
    if (cache) {
      await storeData(`@CACHE_REQUEST_${URL}`, JSON.stringify(data));
    }
    return {
      success: true,
      data,
    };
  }
  return {
    success: false,
    resp_status: response.status,
    data,
  };
}

async function axiosCall(method, ...args) {
  let response;
  try {
    response = await axios[method](...args);
  } catch (error) {
    return parseErrorResponse(error);
  }

  const { data } = response;
  if (response.status >= 200 && response.status < 300) {
    return {
      success: true,
      data,
    };
  }

  return {
    success: false,
    resp_status: response.status,
    data,
  };
}

export async function axiosPost(...options) {
  return await axiosCall('post', ...options);
}

export async function axiosPut(...options) {
  return await axiosCall('put', ...options);
}

export async function axiosPatch(...options) {
  return await axiosCall('patch', ...options);
}

export async function axiosDelete(...options) {
  return await axiosCall('delete', ...options);
}

export function createFormData(data, list_file_field) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const item = data[key];

    if (list_file_field.includes(key)) {
      if (!item) {
        // if file field is falsy, so we ignore
        return;
      }

      formData.append(key, {
        name: item.fileName,
        type: item.type,
        uri: item.uri,
      });
      return;
    }

    formData.append(key, data[key]);
  });

  return formData;
}
