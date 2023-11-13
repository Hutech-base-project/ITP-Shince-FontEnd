import moment from "moment-timezone";
import "moment/min/locales";


export const formatter = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  });

export const date = moment
.tz(new Date(), "Asia/Ho_Chi_Minh")
.format("LLLL");

export   const convertBase64 = (blod) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blod);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};




