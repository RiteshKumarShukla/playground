import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngAfterViewInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const ApexCharts = (await import('apexcharts')).default;

      // 1️⃣ Sales Trend (Line)
      new ApexCharts(document.querySelector('#salesChart'), {
        chart: { type: 'line', height: 300 },
        series: [{ name: 'Sales', data: [1200, 1900, 3000, 2500, 4000, 4500] }],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
        stroke: { curve: 'smooth' },
        title: { text: 'Sales Trend', align: 'left' }
      }).render();

      // 2️⃣ Revenue by Category (Bar)
      new ApexCharts(document.querySelector('#categoryChart'), {
        chart: { type: 'bar', height: 300 },
        series: [{ name: 'Revenue', data: [5000, 3000, 4000, 2000, 3500] }],
        xaxis: { categories: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'] },
        colors: ['#00b894'],
        title: { text: 'Revenue by Category', align: 'left' }
      }).render();

      // 3️⃣ Customer Demographics (Pie)
      new ApexCharts(document.querySelector('#customerChart'), {
        chart: { type: 'pie', height: 300 },
        series: [60, 35, 5],
        labels: ['Male', 'Female', 'Others'],
        colors: ['#0984e3', '#d63031', '#6c5ce7'],
        title: { text: 'Customer Demographics', align: 'left' }
      }).render();

      // 4️⃣ Orders by Status (Donut)
      new ApexCharts(document.querySelector('#ordersChart'), {
        chart: { type: 'donut', height: 300 },
        series: [70, 20, 10],
        labels: ['Completed', 'Pending', 'Cancelled'],
        colors: ['#00b894', '#fdcb6e', '#e17055'],
        title: { text: 'Orders by Status', align: 'left' }
      }).render();

      // 5️⃣ Abandoned vs Successful Carts (Bar)
      new ApexCharts(document.querySelector('#cartChart'), {
        chart: { type: 'bar', height: 300 },
        series: [
          { name: 'Abandoned', data: [40, 60, 30, 70, 50] },
          { name: 'Successful', data: [120, 160, 110, 180, 140] }
        ],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
        title: { text: 'Carts: Abandoned vs Successful', align: 'left' },
        colors: ['#e17055', '#00b894'],
        stacked: true
      }).render();

      // 6️⃣ Yearly Revenue Comparison (Area)
      new ApexCharts(document.querySelector('#yearlyRevenueChart'), {
        chart: { type: 'area', height: 300 },
        series: [
          { name: '2023', data: [1200, 1500, 1800, 2000, 2200, 2500] },
          { name: '2024', data: [1400, 1700, 2100, 2300, 2600, 2900] }
        ],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
        colors: ['#6c5ce7', '#00cec9'],
        title: { text: 'Yearly Revenue Comparison', align: 'left' }
      }).render();

      // 7️⃣ Returning vs New Customers (Radial)
      new ApexCharts(document.querySelector('#customerTypeChart'), {
        chart: { type: 'radialBar', height: 300 },
        series: [65, 35],
        labels: ['Returning', 'New'],
        colors: ['#0984e3', '#fab1a0'],
        title: { text: 'Customer Type Distribution', align: 'left' }
      }).render();
    }

    // 8️⃣ Stock Chart (Candlestick)
    new ApexCharts(document.querySelector('#stockChart'), {
      chart: {
        type: 'candlestick',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true, // allow download
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        }
      },
      series: [{
        name: 'Stock Price',
        data: [
          // Format: [timestamp, [open, high, low, close]]
          {
            x: new Date(2024, 0, 1),
            y: [120, 135, 115, 130]
          },
          {
            x: new Date(2024, 0, 2),
            y: [130, 140, 125, 138]
          },
          {
            x: new Date(2024, 0, 3),
            y: [138, 145, 130, 142]
          },
          {
            x: new Date(2024, 0, 4),
            y: [142, 150, 135, 148]
          },
          {
            x: new Date(2024, 0, 5),
            y: [148, 155, 140, 150]
          }
        ]
      }],
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd MMM'
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        title: {
          text: 'Price (₹)'
        }
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      tooltip: {
        shared: true,
        custom: function ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) {
          const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
          return `
      <div style="padding:6px;">
        <strong>${new Date(data.x).toDateString()}</strong><br/>
        Open: ₹${data.y[0]} <br/>
        High: ₹${data.y[1]} <br/>
        Low: ₹${data.y[2]} <br/>
        Close: ₹${data.y[3]}
      </div>
    `;
        }
      },
      colors: ['#26a69a']
    }).render();

  }
}
