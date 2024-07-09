import { net, forceClient } from 'react-native-force';

export const QueryObject = (query) => {
  console.log(query,'response here')
  return new Promise((resolve, reject) => {
    net.query(
      query,
      (res) => {
        console.log(res,'response here')
        resolve(res);
      },
      (error) => {
        reject(error);
      }
    );
  });
};



export const getMetaData = (objectType) => {
  return new Promise((resolve, reject) => {
    net.describe(
      objectType,
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
};



