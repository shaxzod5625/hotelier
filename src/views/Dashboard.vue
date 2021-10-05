<template>
  <div class="con-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item class="breadcrump">Панель графиков</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="dash-numbers">
      <div class="dash-card">
        <div class="dash-icons">
          <img src="@/assets/icons/keys-1.svg" alt="">
          <img class="white-icon" src="@/assets/icons/keys-1-white.svg" alt="">
        </div>
        <div class="dash-text">
          <b class="numbers">136</b>
          <p>Свободных мест</p>
        </div>
      </div>
      <div class="dash-card">
        <div class="dash-icons">
          <img src="@/assets/icons/luggage.svg" alt="">
          <img class="white-icon" src="@/assets/icons/luggage-white.svg" alt="">
        </div>
        <div class="dash-text">
          <b class="numbers">136</b>
          <p>Заезжающих гостей</p>
        </div>
      </div>
      <div class="dash-card">
        <div class="dash-icons">
          <img src="@/assets/icons/airplane.svg" alt="">
          <img class="white-icon" src="@/assets/icons/airplane-white.svg" alt="">
        </div>
        <div class="dash-text">
          <b class="numbers">136</b>
          <p>Выезжающих гостей</p>
        </div>
      </div>
      <div class="dash-card">
        <div class="dash-icons">
          <img src="@/assets/icons/bed-time.svg" alt="">
          <img class="white-icon" src="@/assets/icons/bed-time-white.svg" alt="">
        </div>
        <div class="dash-text">
          <b class="numbers">136</b>
          <p>Проживающих гостей</p>
        </div>
      </div>
    </div>
    <div class="dash-graps">
      <div class="graphs">
        <div class="graphs-top">
          <h3>Выручка от продаж номеров</h3>
          <img src="@/assets/icons/Zoom-in.svg" alt="">
        </div>
        <hr>
        <apexchart id="revenue" width="100%" height="358" type="area" :options="optionsrev" :series="seriesrev"></apexchart>
      </div>
      <div class="graphs">
        <div class="graphs-top">
          <h3>Загруженность</h3>
          <img src="@/assets/icons/Zoom-in.svg" alt="">
        </div>
        <hr>
        <apexchart id="workload" width="100%" height="358" type="area" :options="optionswl" :series="serieswl"></apexchart>
      </div>
    </div>
    <div class="dash-graps">
      <div class="graphs">
        <div class="graphs-top">
          <h3>Среднее количество гостей в день</h3>
          <img src="@/assets/icons/Zoom-in.svg" alt="">
        </div>
        <hr>
        <apexchart id="average" width="100%" height="358" type="area" :options="optionsaverage" :series="seriesaverage"></apexchart>
      </div>
      <div class="graphs">
        <div class="graphs-top">
          <h3>Соотношение резидентов и нерезидентов</h3>
          <img src="@/assets/icons/Zoom-in.svg" alt="">
        </div>
        <hr>
        <apexchart id="ratio" width="100%" height="358" type="bar" :options="optionsratio" :series="seriesratio"></apexchart>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Dashboard',

  data: () => ({
    optionsrev: {
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 2,
        colors: ['#2161ED', '#C91052', '#C91052']
      },
      chart: {
        id: 'revenue',
        toolbar: {
          autoSelected: "pan",
          show: false
      },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['01', '06', '12', '18', '24', '30'],
        
        labels: {
          show: true,
          style: {
            colors: ['#13151C'],
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        tooltip: {
          enabled: false
        },
      },
      yaxis: {
        
        tickAmount: 4,
        min: 0,
        max: 1000,
        floating: false,
        
        labels: {
          offsetY: 0,
          offsetX: -12,
          show: true,
          style: {
            colors: ['#13151C'],
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }
        },
        yaxisBorder: {
          show: true
        },
        yaxisTicks: {
          show: false
        },
      },
      grid: {
        show: true,
        borderColor: '#C3C5D4',
        strokeDashArray: 12,
        position: 'back',
        offsetY: 0,
        offsetX: 0,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      colors: ['#2161ED'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.2,
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 100],
        }
      }
    },
    seriesrev: [{
      name: 'Выручка',
      data: [300, 400, 250, 750, 890, 720]
    }],

    optionswl: {
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 2,
        colors: ['#2161ED', '#C91052', '#C91052']
      },
      chart: {
        id: 'workload',
        toolbar: {
          autoSelected: "pan",
          show: false
      },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['01', '06', '12', '18', '24', '30'],
        
        labels: {
          show: true,
          style: {
            colors: ['#13151C'],
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        tooltip: {
          enabled: false
        },
      },
      yaxis: {
        
        tickAmount: 4,
        min: 0,
        max: 100,
        floating: false,
        
        labels: {
          offsetY: 0,
          offsetX: -12,
          show: true,
          formatter: function (value) {
            return value + " %";
          },
          style: {
            colors: ['#13151C'],
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }
        },
        yaxisBorder: {
          show: true
        },
        yaxisTicks: {
          show: false
        },
      },
      grid: {
        show: true,
        borderColor: '#C3C5D4',
        strokeDashArray: 12,
        position: 'back',
        offsetY: 0,
        offsetX: 0,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      colors: ['#2161ED'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.2,
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 100],
        }
      }
    },
    serieswl: [{
      name: 'Выручка',
      data: [30, 16, 52, 78, 58, 20]
    }],

    optionsaverage: {
      stroke: {
        curve: 'smooth',
        lineCap: 'butt',
        width: 2,
        colors: ['#2161ED', '#C91052', '#C91052']
      },
      chart: {
        id: 'average',
        toolbar: {
          autoSelected: "pan",
          show: false
      },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['01', '06', '12', '18', '24', '30'],
        
        labels: {
          show: true,
          style: {
            colors: ['#13151C'],
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }
        },
        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        tooltip: {
          enabled: false
        },
      },
      yaxis: {
        
        tickAmount: 4,
        min: 0,
        max: 264,
        floating: false,
        
        labels: {
          offsetY: 0,
          offsetX: -12,
          show: true,
          style: {
            colors: ['#13151C'],
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }
        },
        yaxisBorder: {
          show: true
        },
        yaxisTicks: {
          show: false
        },
      },
      grid: {
        show: true,
        borderColor: '#C3C5D4',
        strokeDashArray: 12,
        position: 'back',
        offsetY: 0,
        offsetX: 0,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      colors: ['#2161ED'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.2,
          opacityFrom: 0.6,
          opacityTo: 0.1,
          stops: [0, 100],
        }
      }
    },
    seriesaverage: [{
      name: 'Выручка',
      data: [3, 32, 200, 245, 250, 120]
    }],

    optionsratio: {
      bar: {
        horizontal: false,
        columnWidth: '1%',
        barHeight: '100%',
        distributed: false,
        borderRadius: 10,
        rangeBarOverlap: false,
        rangeBarGroupRows: true,
        colors: {
          backgroundBarOpacity: 0,
          backgroundBarRadius: 10,
        }
      },
      chart: {
        group: 'social',
        columnWidth: '12',
        id: 'ratio',
        stacked: true,
        stackType: '100%',
        toolbar: {
          autoSelected: "pan",
          show: false
      },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '24%',
          barHeight: '100%',
          distributed: false,
          borderRadius: 10,
          rangeBarOverlap: false,
          rangeBarGroupRows: true,
          colors: {
            backgroundBarOpacity: 0,
            backgroundBarRadius: 10,
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Янв.', 'Фев.', 'Мар.', 'Апр.', 'Май', 'Июн.', 'Июл.', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
        
        labels: {
          show: true,
          style: {
            colors: ['#13151C'],
            fontSize: '12px',
            fontFamily: 'Roboto',
            fontWeight: 600,
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: false
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
      fill: {
        colors: ['#2161ED', '#10C986', '#C5C910'],
        type: 'solid',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 0,
        offsetY: 0,
        fontSize: '12px',
        fontFamily: 'Roboto',
        fontWeight: 400,
        labels: {
          colors: ['#83858A']
        },
        markers: {
          width: 10,
          height: 10,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: ['#2161ED', '#10C986', '#C5C910'],
          radius: 5,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
      },
    },
    seriesratio: [{
      name: 'Иностранцы',
      data: [44, 55, 41, 67, 22, 43, 21, 49, 37, 20, 43, 10]
    }, {
      name: 'Резиденты',
      data: [13, 23, 20, 38, 13, 27, 33, 12, 43, 42, 25, 36]
    }, {
      name: 'Свободно',
      data: [36, 27, 35, 15, 21, 14, 15, 13, 20, 38, 32, 54]
    }],
  }),

  // methods: {
  //   async getCharts() {
  //     try {
  //       await this.$store.dispatch('getCharts')
  //     } catch (e) {
  //     } 
  //   },
  //   async isAuthenticated() {}
  // }
}
</script>