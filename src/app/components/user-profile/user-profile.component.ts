import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { ToastComponent } from '../reusable/toast/toast.component';
import { LoadingSpinnerComponent } from '../reusable/loading-spinner/loading-spinner.component';

@Component({
  selector: 'kickathon-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    NgClass,
    ToastComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  formState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  pictureState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errors: any = null;

  requestService: RequestService = inject(RequestService);
  userService: UserService = inject(UserService);

  protected userProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.userProfileForm.get('name');
  }

  async onUpdateProfile() {
    if (this.userProfileForm.valid && this.userService.currentPlayerId) {
      this.formState = 'loading';
      try {
        await this.requestService.patchName(
          this.userProfileForm.getRawValue(),
          this.userService.currentPlayerId,
        );
        await this.userService.setPlayer();
        this.formState = 'success';
      } catch (err) {
        this.formState = 'error';
        this.errors = err;
      }
    }
  }

  async uploadPicture(event: Event) {
    if (this.pictureState === 'loading') {
      return;
    }
    this.pictureState = 'loading';
    event.preventDefault();
    event.stopPropagation();
    let file = (event.target as HTMLInputElement)?.files?.item(0);

    if (!file) {
      try {
        // @ts-ignore
        file = event['dataTransfer']['files'][0];
      } catch (err) {
        this.pictureState = 'error';
        return;
      }
      if (!file) {
        this.pictureState = 'idle';
        return;
      }
    }
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    try {
      this.userService.currentUser!.imageUrl = await this.requestService.uploadPicture(
        formData,
        this.userService.currentPlayerId!,
      );
      this.pictureState = 'idle';
    } catch (err) {
      this.pictureState = 'error';
    }
  }

  preventDragging(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
