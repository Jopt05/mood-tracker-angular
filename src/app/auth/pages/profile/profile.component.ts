import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingServiceService } from '../../../shared/services/loading-service.service';
import { ThemeService } from '../../../shared/services/theme.service';
import { AuthService, UserPayload } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private loadingService: LoadingServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  @ViewChild("filePicker") fileInput!: any;

  isDarkTheme = false;
  userData?: UserPayload;
  creationDate?: string

  profileForm = this.formBuilder.group({
    name: ['',],
    file: [''],
  });

  isEditingBs = new BehaviorSubject(false);
  isEditing = false;
  isLoading = false;
  temporalImageSource = "";

  ngOnInit(): void {
    this.profileForm.get('name')?.disable();
    this.authService.getCurrentUserInfo().subscribe((userData) => {
      this.userData = userData || undefined;
      this.creationDate = new Date(userData?.createdAt || '').toLocaleDateString();
      this.profileForm.patchValue({
        name: userData?.name
      });
    });
    this.isEditingBs.subscribe((value) => {
      this.isEditing = value;
      if( value ) {
        this.profileForm.get('name')?.enable();
      } else {
        this.profileForm.get('name')?.disable();
      }
    })
  }

  handleAddFile() {
    this.fileInput.nativeElement.click();
  }

  onImagePicked(event: any) {
    const file = event?.target?.files?.[0]
    if( !file || !file.type.startsWith('image/') ) return;
    this.isEditingBs.next(true);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result as string;
      this.temporalImageSource = result;
    };
    fileReader.readAsDataURL(file);

    this.profileForm.patchValue({
      file
    })
  }

  handleSubmit() {
    const name = this.profileForm.get('name')?.value;
    let file = this.profileForm.get('file')?.value;
    if( file == "" ) {
      file = undefined;
    }
    if( !name ) return;
    this.loadingService.show();
    const token = localStorage.getItem('token');
    if( !token ) return
    this.authService.updateUser({name, file}, token).subscribe((response) => {
      if( response ) {
        this.isEditingBs.next(false);
        this.profileForm.patchValue({
          file: null
        });
        this.loadingService.hide();
      }
    })
  }

  activateEdit() {
    this.isEditingBs.next(true);
  }

  deactivateEdit() {
    this.profileForm.patchValue({
      name: this.userData?.name,
      file: null
    });
    this.temporalImageSource = "";
    this.isEditingBs.next(false);
  }

}
