import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sleepPipe',
  standalone: false
})
export class SleepPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): string {
    switch (value) {
      case 'ZERO_TWO':
        return '0 - 2'

      case 'THREE_FOUR':
        return '3 - 4'

      case 'FIVE_SIX':
        return '5 - 6'

      case 'SEVEN_EIGHT':
        return '7 - 8'

      case 'NINE':
        return '+9'

      default:
        return '0 - 2'
    }
  }

}
