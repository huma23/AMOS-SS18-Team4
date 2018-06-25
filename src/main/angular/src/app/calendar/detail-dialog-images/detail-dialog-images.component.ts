import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {IConstructionArea, IFileInfo} from "../../Resourcenpanel/IConstructionArea";
import {ConstructionAreaService} from "../../services/construction-area.service";

@Component({
  selector: 'pl-detail-dialog-images',
  templateUrl: './detail-dialog-images.component.html',
  styleUrls: ['./detail-dialog-images.component.css']
})
export class DetailDialogImagesComponent implements OnInit {

  @Input()
  public constructionArea: IConstructionArea;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  file: File;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service : ConstructionAreaService) { }

  ngOnInit() {
  }

  onFileChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.file = file;

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  onSubmit(){
    this.service.uploadImageRequest(this.file, this.constructionArea.id).subscribe(
      (info: IFileInfo) => {
        this.constructionArea.images.push(info);
      },
      (error: Error) => {
        window.alert("Upload fehlgeschlagen");
      }
    )
  }

  removeImage(fileInfo: IFileInfo){
    this.service.removeImageRequest(fileInfo.id).subscribe(
      response =>{
        this.removeItemFromList(this.constructionArea.images, fileInfo);
      },
      error => {
        console.log("Error occured");
      }
    );
  }

  /**
   * @method
   * removeItemFromList
   *
   * @param
   * list   :  any
   * item   :  any
   *
   * @return
   * void
   *
   * @description
   *
   */
  private removeItemFromList(list: any, item: any): void
  {
    if(list.includes(item))
    {
      list.forEach((x, index) =>
      {
        if(item === x) list.splice(index, 1);
      });
    }
  }
}
