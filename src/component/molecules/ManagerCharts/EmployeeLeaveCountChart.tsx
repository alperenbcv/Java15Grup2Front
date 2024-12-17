import React from 'react'
import Chart from "react-apexcharts";

function EmployeeLeaveCountChart() {
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
          type: 'pie',
          width: '500',
          height: '400'
        },
        labels: ['Leave Left', 'Used Leaves'], // Etiketler
        colors: ['#003f5c', '#7bc043'], // Renkler
        legend: {
          position: 'bottom',
          fontSize: '14px',
          labels: {
            colors: '#ffffff', // Legend yazı rengi
            useSeriesColors: true,
          },
          formatter: function (seriesName, opts) {
            // Legend'a metin ve sayı eklemek için
            return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`;
          },
          markers: {
            shape: 'circle', // Yuvarlak gösterge
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        dataLabels: {
          enabled: false, // Veri etiketlerini kapat
        },
      };
    
      const chartSeries = [9, 12]; // Veriler
    
      return (
        <>
          <h3 style={{ color: 'white', marginTop: '10px', textAlign:'center' }}>Leave Details</h3>
          <Chart options={chartOptions} series={chartSeries} type="pie"/>
        </>
      );
    }
export default EmployeeLeaveCountChart