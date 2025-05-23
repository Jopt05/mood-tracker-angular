import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moodPipe',
  standalone: false
})
export class MoodPipePipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): string {
    switch (value) {
      case 'VERY_SAD':
        return 'Very Sad'

      case 'SAD':
        return 'Sad'

      case 'NEUTRAL':
        return 'Neutral'

      case 'HAPPY':
        return 'Happy'

      case 'VERY_HAPPY':
        return 'Very Happy'

      default:
        return 'Neutral'
    }
  }

}
