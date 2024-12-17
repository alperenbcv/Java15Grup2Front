import React from 'react'
import Chart from 'react-apexcharts';

function AdminRevenueChart() {
    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
          type: 'line', // Çizgi grafiği tipi
          height: 350,
          toolbar: {
            show: true, // Araç çubuğu gösterilsin mi
          },
        },
        stroke: {
          curve: 'smooth', // Yumuşak çizgi
          width: 3, // Çizgi kalınlığı
        },
        title: {
          text: 'Monthly Revenue',
          align: 'center',
          style: {
            color: '#ffffff',
            fontSize: '20px',
          },
        },
        xaxis: {
          categories: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ], // Ay isimleri
          labels: {
            style: {
              colors: '#ffffff', // X ekseni renkleri
            },
          },
        },
        yaxis: {
          title: {
            text: 'Revenue ($)',
            style: {
              color: '#ffffff',
            },
          },
          labels: {
            style: {
              colors: '#ffffff', // Y ekseni renkleri
            },
          },
        },
        grid: {
          borderColor: '#444', // Grid rengi
        },
        legend: {
          position: 'top',
          labels: {
            colors: '#ffffff',
          },
        },
        tooltip: {
          theme: 'dark',
        },
      };
    
      const chartSeries = [
        {
          name: 'Revenue', // Çizgi adı
          data: [1500, 2100, 1800, 2500, 3000, 3200, 2800, 3500, 4000, 3700, 4500, 5000], // Aylık kazanç verileri
        },
      ];
  
    return (
      <>
        <h3 style={{color: "white", marginTop: "10px",textAlign:'center' }}>Monthly Revenue</h3>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"        
        />
      </>
    );
}

export default AdminRevenueChart