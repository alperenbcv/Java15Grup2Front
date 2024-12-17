import React from 'react'
import Chart from 'react-apexcharts';

function AdminSubscriptionChart() {
    const chartOptions: ApexCharts.ApexOptions = {
      chart: {
        type: "bar",
        width: '400',
        height: '600'
      },
      xaxis: {
        categories: ["Subscription Status"], // X ekseni kategorisi
      },
      colors: ["#003f5c", "#7bc043", '#ffa600'], // Renkler
      legend: {
        position: "bottom",
        fontSize: "14px",
        labels: {
          colors: "#ffffff", // Legend yazı rengi
          useSeriesColors: true,
        },
        formatter: function (seriesName, opts) {
          return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`;
        },
        markers: {
          shape: "square",
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      dataLabels: {
        enabled: false, // Veri etiketlerini kapat
      },
    };
  
    const chartSeries = [
      {
        name: "Annual Subs",
        data: [510],
      },
      {
        name: "Monthly Subs",
        data: [41],
      },
      {
        name: "Not Renewed",
        data: [51],
      },
    ];
  
    return (
      <>
        <h3 style={{color: "white", marginTop: "10px",textAlign:'center' }}>Subscription Status</h3>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"        
        />
      </>
    );
  }

export default AdminSubscriptionChart