import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { carRevenue } from '../../../services/host-service';


const ApexChart = ({setCancelled,setCompleted,setOngoing,setUpcoming}) => {

  const [chartData, setChartData] = useState({
    series:[0,0,0,0],
    options: {
      chart: {
        type:'donut',
      },
      labels:['completed','ongoing','upcoming','cancelled'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });
  useEffect(() => {
    const hostId= localStorage.getItem('hostId')
    // Fetch data from the backend (replace with your API endpoint)
        carRevenue(hostId)
      .then((res) => {
        const completedCount = res.data.find((item) => item._id === 'completed')?.count ?? 0;
      const cancelledCount = res.data.find((item) => item._id === 'cancelled')?.count ?? 0;
      const upcomingCount = res.data.find((item) => item._id === 'upcoming')?.count ?? 0;
      const ongoingCount = res.data.find((item) => item._id === 'ongoing')?.count ?? 0;
      setCompleted(completedCount)
      setCancelled(cancelledCount)
      setOngoing(ongoingCount)
      setUpcoming(upcomingCount)
        setChartData({
          ...chartData,
          series:[completedCount,ongoingCount,upcomingCount,cancelledCount], 
        });
      })
      .catch((error) => {
        console.error('Error fetching data from the backend: ', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="donut" />
    </div>
  );
};

export default ApexChart;
