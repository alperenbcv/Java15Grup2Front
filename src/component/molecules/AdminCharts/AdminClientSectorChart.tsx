import React from 'react'
import Chart from 'react-apexcharts';

function AdminClientSectorChart() {
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
          type: 'donut',
          width: '400',
          height: '400'
        },
        labels: ['Automotive', 'Legal', 'Construction', 'Electronic', 'Others'], // Etiketler
        colors: ['#003f5c', '#7bc043', '#ff6361', '#d62728', '#ffa600'], // Renkler
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
    
      const chartSeries = [45, 16, 58, 24, 68]; // Veriler
    
      return (
        <>
          <h3 style={{ color: 'white', marginTop: '10px',textAlign:'center' }}>Sector Distribution</h3>
          <Chart options={chartOptions} series={chartSeries} type="donut"/>
        </>
      );
    }    

export default AdminClientSectorChart