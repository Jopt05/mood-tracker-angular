import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moodToImagePipe',
  standalone: false
})
export class MoodToImagePipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): string {
    switch (value) {
      case 'VERY_SAD':
        return 'very_sad.png'

      case 'SAD':
        return 'sad.png'

      case 'NEUTRAL':
        return 'neutral.png'

      case 'HAPPY':
        return 'happy.png'

      case 'VERY_HAPPY':
        return 'very_happy.png'

      default:
        return 'neutral.png'
    }
  }

}
