import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UploadCardServiceService} from './upload-card-service.service';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-upload-card',
  templateUrl: './upload-card.component.html',
  styleUrls: ['./upload-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadCardComponent implements OnInit {

  @ViewChild('result', {static:false}) imgSource: ElementRef;

  constructor(
      public uploadImage: UploadCardServiceService) {
  }

  ngOnInit() {

  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: {};
  cropperView = false;
  imageError = false;
  imageConfirmed = false;

  fileChangeEvent(event: any): void {
    this.imageError = false;
    this.imageConfirmed = false;
    this.imageChangedEvent = event;
    this.cropperView = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  test() {
    if(this.imgSource.nativeElement.naturalWidth < 102 || this.imgSource.nativeElement.naturalHeight < 140) {
      this.imageError = true;
      console.log('Fuck off')
    } else {
      this.imageConfirmed = true;
      this.uploadImage.uploadImage(this.imgSource.nativeElement.src);
    }
  }

}
