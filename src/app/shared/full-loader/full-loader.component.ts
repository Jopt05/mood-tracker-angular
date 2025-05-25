
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingServiceService } from '../services/loading-service.service';

@Component({
  selector: 'app-full-loader',
  standalone: false,
  templateUrl: './full-loader.component.html',
  styleUrl: './full-loader.component.css'
})
export class FullLoaderComponent implements OnInit{

  constructor(
    private loadingService: LoadingServiceService
  ) { }

  isLoading = false;

  ngOnInit(): void {
      this.loadingService.getIsLoading().subscribe((isLoading: boolean) => {
        if( isLoading === true ) {
          document.querySelector('body')!.style.overflowY = 'hidden';
        } else {
          document.querySelector('body')!.style.overflowY = 'auto';
        }
        this.isLoading = isLoading;
      })
  }

}
