import { Directive , HostListener} from '@angular/core';

@Directive({
  selector: '[appDemo]'
})
export class DemoDirective {

  constructor() { }

  @HostListener('Keydown',['$event'])
  OnKeyDown(e:any){
    console.log(e);
    if(e.code ==="Minus" && e.key ==="-" && e.keycode === 189){
      e.preventDefault();

    }

  }

}
