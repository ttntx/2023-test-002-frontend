import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DEG_90, DirectionEnum, SCENES } from 'src/app/helpers/constants';
import { ViewService } from 'src/app/services/view.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: [
    trigger('toggleVisibility', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translate(50%, 100%)',
        }),
        animate(
          '100ms ease-out',
          style({ opacity: 1, transform: 'translate(50%, 0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ViewComponent implements OnInit {
  public readonly DirectionEnum = DirectionEnum;
  public readonly SCENES = SCENES;
  constructor(public viewService: ViewService) {}

  ngOnInit(): void {
    this.viewService.createScene();
  }

  /**
   * On rotate left
   *
   * @param direction
   * @returns
   */
  public onRotateY(direction: DirectionEnum): void {
    const deg = direction === DirectionEnum.LEFT ? -DEG_90 : DEG_90;
    this.viewService.rotateY(deg);
  }
}
