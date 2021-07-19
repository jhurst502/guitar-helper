import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  scales: string[] = ['Minor', 'Major', 'Pentatonic'];
  keys: string[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  filteredScales: Observable<string[]> | undefined;
  saved: boolean = false;

  ngOnInit(): void {
    this.filteredScales = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.scales.filter(scale => scale.toLowerCase().includes(filterValue));
}

  onSave() {
    this.saved = !this.saved;
  }
}
