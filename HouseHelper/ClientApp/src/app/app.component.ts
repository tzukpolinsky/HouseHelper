import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LoaderService } from './services/shared/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  image: string;
  isloading = false;
  constructor(private userService: UserService, private loaderService: LoaderService) { }
  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(result =>  this.isloading = result);
    this.insertImageToLocaleStorage();
  }
  insertImageToLocaleStorage() {
    const base64Image = localStorage.getItem('bg-image');
    if (!base64Image) {
      this.userService.getBgImg().subscribe(result => {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
            localStorage.setItem('bg-image', reader.result.toString());
        };
      });
    } else {
      this.image = base64Image;
    }
  }
}
