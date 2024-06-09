import { Scene } from '../model.ts/scene.model';

export enum DirectionEnum {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
}

export const SCENES: Scene[] = [
  {
    id: 0,
    background_url: 'step_1',
    message: null,
    hitzones: [
      {
        direction: DirectionEnum.UP,
        goto: 1,
      },
    ],
  },
  {
    id: 1,
    background_url: 'step_2',
    message: null,
    hitzones: [
      {
        direction: DirectionEnum.UP,
        goto: 2,
      },
      {
        direction: DirectionEnum.DOWN,
        goto: 0,
      },
    ],
  },
  {
    id: 2,
    background_url: 'step_3',
    message: null,
    hitzones: [
      {
        direction: DirectionEnum.UP,
        goto: 3,
      },
      {
        direction: DirectionEnum.DOWN,
        goto: 1,
      },
    ],
  },
  {
    id: 3,
    background_url: 'step_4',
    message: null,
    hitzones: [
      {
        direction: DirectionEnum.UP,
        goto: 4,
      },
      {
        direction: DirectionEnum.DOWN,
        goto: 2,
      },
    ],
  },
  {
    id: 4,
    background_url: 'step_5',
    message: null,
    hitzones: [
      {
        direction: DirectionEnum.UP,
        goto: 5,
      },
      {
        direction: DirectionEnum.DOWN,
        goto: 3,
      },
    ],
  },
  {
    id: 5,
    background_url: 'step_6',
    message: 'The path leaves you with a choice, the left path goes back, the middle to the picture of the house, the right goes up higher',
    hitzones: [
      {
        direction: DirectionEnum.LEFT,
        goto: 4,
      },
      {
        direction: DirectionEnum.UP,
        goto: 6,
      },
      {
        direction: DirectionEnum.RIGHT,
        goto: 7,
      },
    ],
  },
  {
    id: 6,
    background_url: 'step_7',
    message: 'If you chose the middle one you end up here looking at the houses, if you turn back you go back up the trail to where you where.',
    hitzones: [
      {
        direction: DirectionEnum.DOWN,
        goto: 5,
      },
    ],
  },
  {
    id: 7,
    background_url: 'step_8',
    message: 'You are near the top, this is C.  left goes back down, middle Goes to B, right goes to the top',
    hitzones: [
      {
        direction: DirectionEnum.LEFT,
        goto: 5,
      },
      {
        direction: DirectionEnum.UP,
        goto: 8,
      },
      {
        direction: DirectionEnum.RIGHT,
        goto: 9,
      },
    ],
  },
  {
    id: 8,
    background_url: 'step_9',
    message: 'This is B.  Left goes to the top, right goes to C',
    hitzones: [
      {
        direction: DirectionEnum.LEFT,
        goto: 9,
      },
      {
        direction: DirectionEnum.RIGHT,
        goto: 7,
      },
    ],
  },
  {
    id: 9,
    background_url: 'step_10',
    message: 'You have reached the top, it now forms a circle, left goes to C and right goes to B',
    hitzones: [
      {
        direction: DirectionEnum.LEFT,
        goto: 7,
      },
      {
        direction: DirectionEnum.RIGHT,
        goto: 8,
      },
    ],
  },
];

export const DEG_90 = Math.PI / 2;
