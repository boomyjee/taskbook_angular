import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class ToolsService {

  MAX_WIDTH: number = 320;
  MAX_HEIGHT: number = 240;

  constructor() { }

  dataURLtoFile(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'file_' + this.shortID() + '.png', { type: mime });
  }

  md5(str) {
    return Md5.hashStr(str);
  }

  shortID() {
    let firstPart = (Math.random() * 46656) | 0;
    let secondPart = (Math.random() * 46656) | 0;

    let fp = ("000" + firstPart.toString(36)).slice(-3);
    let sp = ("000" + secondPart.toString(36)).slice(-3);

    return fp + sp;
  }

  resizeImg(ev) {
    const img = document.createElement("img");
    const reader = new FileReader();
    const subject = new Subject<any>();

    reader.onload = (e) => {
      img.src = e.target['result'];
    }

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let width = img.width;
      let height = img.height;

      if (width > height) {
          if (width > this.MAX_WIDTH) {
              height *= this.MAX_WIDTH / width;
              width = this.MAX_WIDTH;
          }
      } else {
          if (height > this.MAX_HEIGHT) {
              width *= this.MAX_HEIGHT / height;
              height = this.MAX_HEIGHT;
          }
      }
      canvas.width = width;
      canvas.height = height;

      const ctx2 = canvas.getContext("2d");
      ctx2.drawImage(img, 0, 0, width, height);

      const dataurl = canvas.toDataURL("image/png");

      subject.next(
        this.dataURLtoFile(dataurl)
      );

      img.remove();
      canvas.remove();
    }

    reader.readAsDataURL(ev.target.files[0]);

    return subject;
  }

}
