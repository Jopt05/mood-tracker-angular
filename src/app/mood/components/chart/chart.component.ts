import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexPlotOptions,
  ApexResponsive
} from "ng-apexcharts";
import { Mood, MoodService } from '../../services/mood.service';
import { ThemeService } from '../../../shared/services/theme.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle,
  colors: string[],
  responsive: any,
};

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartsComponent implements OnInit {

  constructor(
    private moodService: MoodService,
    private themeService: ThemeService,
  ) {}

  @ViewChild("chart") chart!: ChartComponent;
  isLoading = true;
  moodData: Mood[] = [];
  isChartReady = false;
  chartOptions: ChartOptions = {} as ChartOptions;
  isDarkTheme = false;

  imagesList = [
    {
      name: 'VERY_SAD',
      url: '/very_sad.png'
    },
    {
      name: 'SAD',
      url: '/sad.png'
    },
    {
      name: 'NEUTRAL',
      url: '/neutral.png'
    },
    {
      name: 'HAPPY',
      url: '/happy.png'
    },
    {
      name: 'VERY_HAPPY',
      url: '/very_happy.png'
    }
  ]

  ngOnInit(): void {
    this.getMoodData();
    this.getTheme()
  }

  getTheme() {
    this.themeService.getTheme().subscribe((isDarkTheme) => {
      this.isDarkTheme = isDarkTheme
      this.setChartOptions();
    });
  }

  getMoodData() {
    this.isLoading = true;
    this.moodService.getMoodsAsObservable().subscribe((response: Mood[]) => {
      this.moodData = response;
      this.isLoading = false;
      this.setChartOptions();
    })
  }

  formatMoodToChartColor(mood: string) {
    switch (mood) {
      case 'VERY_SAD':
        return '#ff9b99'

      case 'SAD':
        return '#b8b1ff'

      case 'NEUTRAL':
        return '#87c9fc'

      case 'HAPPY':
        return '#88e77f'

      case 'VERY_HAPPY':
        return '#fec97b'

      default:
        return 'red'
    }
  }

  formatSleepToChartValue(sleep: string) {
    switch (sleep) {
      case 'ZERO_TWO':
        return 1

      case 'THREE_FOUR':
        return 2

      case 'FIVE_SIX':
        return 3

      case 'SEVEN_EIGHT':
        return 4

      case 'NINE':
        return 5

      default:
        return 1
    }
  }

  addImages() {
    const imagesList = document.querySelectorAll('.mood-image');
    imagesList.forEach(image => image.remove());
    const chartContainer = document.querySelector('.chart-container') as HTMLElement;
    const barList = chartContainer.querySelectorAll('.apexcharts-bar-area.undefined');

    barList.forEach((bar, index) => {
      const imageUrl = this.imagesList.find(i => i.name === this.moodData[index].mood)?.url;

      if (imageUrl) {
        const rectBar = bar.getBoundingClientRect();
        const rectContainer = chartContainer.getBoundingClientRect();

        // Coordenadas relativas al contenedor
        const left = rectBar.left - rectContainer.left;
        const top = rectBar.top - rectContainer.top + 4;

        const image = document.createElement('img');
        image.classList.add('mood-image');
        image.src = imageUrl;
        image.style.position = 'absolute';
        image.style.left = `${left}px`;
        image.style.top = `${top - 5}px`;
        // image.style.width = '40px';
        image.style.width = `${rectBar.width}px`;
        image.style.height = '40px';
        image.style.zIndex = '10';

        chartContainer.appendChild(image);
      }
    });
  }

  formatDate(date: string) {
    const d = new Date(date);
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da} ${mo}`;
  }

  setChartOptions() {
    this.chartOptions = {
      series: [
        {
          data: this.moodData.map(m => this.formatSleepToChartValue(m.sleep)),
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false
        },
        events: {
          animationEnd: () => {
            if( this.moodData.length < 2 ) return;
            setTimeout(() => {
              this.addImages()
            }, 300);
          },
          mounted: () => {
            if( this.moodData.length > 1 ) return;
            setTimeout(() => {
              this.addImages()
            }, 300);
          }
        },
        animations: {
          enabled: true,
          speed: 200,
          animateGradually: {
            enabled: true,
            delay: 0
          },
          dynamicAnimation: {
            enabled: true,
            speed: 200
          }
        }
      },
      title: {
        text: "Moods and sleep trends",
        align: "left",
        style: {
          fontFamily: 'Montserrat',
          fontSize: '25px',
          fontWeight: 'bold',
          color: (this.isDarkTheme) ? '#f5f5ff' : '#20214f'
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40px",
          borderRadius: 20,
          distributed: true
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false
      },
      xaxis: {
        categories: this.moodData.map(m => m.createdAt),
        labels: {
          style: {
            fontFamily: 'Montserrat',
            fontSize: '12px',
            fontWeight: 'bold',
            colors: (this.isDarkTheme) ? '#f5f5ff' : '#20214f'
          },
          formatter: (val: string) => this.formatDate(val)
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Montserrat',
            fontSize: '12px',
            fontWeight: 'bold',
            colors: (this.isDarkTheme) ? '#f5f5ff' : '#bebdc4'
          },
          formatter: function(val: number) {
            if( val == 5 ) return '9+ hours';
            if( val == 4 ) return '7-8 hours';
            if( val == 3 ) return '5-6 hours';
            if( val == 2 ) return '3-5 hours';
            if( val == 1 ) return '0-2 hours';
            return '0 hours';
          }
        },
        min: 0,
        max: 5,
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: (val: number, opts: any) => {
            return ''
          },
          title: {
            formatter: (val: string, opts: any) => {
              const elementIndex = opts?.dataPointIndex;
              if( elementIndex == undefined ) return '';
              const mood = this.moodData[elementIndex];
              return mood.reflection || 'No reflection this day';
            },
          }
        },
        style: {
          fontFamily: 'Montserrat',
          fontSize: '12px',
        }
      },
      legend: {
        show: false
      },
      colors: this.moodData.map(m => this.formatMoodToChartColor(m.mood)),
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              width: 1000
            }
          }
        },
      ]
    };
  }
}
