import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IConstructionArea, IFileInfo} from "../../Resourcenpanel/IConstructionArea";
import {FormBuilder, Validators} from "@angular/forms";
import {ConstructionAreaService} from "../../services/construction-area.service";

@Component({
  selector: 'pl-detail-dialog-files',
  templateUrl: './detail-dialog-files.component.html',
  styleUrls: ['./detail-dialog-files.component.css']
})
export class DetailDialogFilesComponent implements OnInit {

  @Input()
  public constructionArea: IConstructionArea;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  fileName : string;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private service : ConstructionAreaService) { }

  ngOnInit() {
  }

  onFileChange(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      this.fileName = file.name;

      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });

        this.cd.markForCheck();
      };
    }
  }

  onSubmit(){
    debugger;

    this.service.uploadFileRequest(this.formGroup, this.constructionArea.id, this.fileName).subscribe(
      (info: IFileInfo) => {
        this.constructionArea.attachments.push(info);
      },
      (error: Error) => {
        window.alert("Upload fehlgeschlagen");
      }
    )
  }
}
