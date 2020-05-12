import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-blank',
  template: `
  <div class="container align-items-center">
    <h4><i style="color: gray;">Please select a Recipe.</i></h4>
  </div>
  `,
  styles: []
})
export class RecipeBlankComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
