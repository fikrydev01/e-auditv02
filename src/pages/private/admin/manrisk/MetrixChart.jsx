import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  LineElement
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title, LineElement);

// Warna berdasarkan level risiko
const levelColors = {
  Low: '#2ecc71',      // green
  Medium: '#f1c40f',   // yellow
  High: '#e67e22',     // orange
  Extreme: '#e74c3c'   // red
};

// Plugin background gradasi
const backgroundPlugin = {
  id: 'customBackground',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const { chartArea } = chart;
    const gradient = ctx.createLinearGradient(chartArea.left, chartArea.bottom, chartArea.right, chartArea.top);
    gradient.addColorStop(0, '#00ff00');  // Green
    gradient.addColorStop(0.5, '#ffff00'); // Yellow
    gradient.addColorStop(1, '#ff0000');  // Red

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(chartArea.left, chartArea.top, chartArea.width, chartArea.height);
    ctx.restore();
  }
};

// Plugin label titik risiko
const labelsPlugin = {
  id: 'pointLabels',
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.data.datasets.forEach(dataset => {
      dataset.data.forEach((point, index) => {
        const meta = chart.getDatasetMeta(0);
        const pos = meta.data[index].getProps(['x', 'y'], true);
        ctx.save();
        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#000';
        ctx.fillText(point.kode, pos.x + 6, pos.y - 6);
        ctx.restore();
      });
    });
  }
};

export default function RiskMap({ rowdata }) {
  const risks = useMemo(() => {
    if (!Array.isArray(rowdata)) return [];
    return rowdata.map(item => ({
      kode: item.kode,
      x: parseFloat(item.l.replace(',', '.')),
      y: parseFloat(item.i.replace(',', '.')),
      level: item.label.split('-')[0]
    }));
  }, [rowdata]);

  const chartData = useMemo(() => ({
    datasets: [
      {
        label: 'Risiko',
        data: risks,
        backgroundColor: risks.map(r => levelColors[r.level]),
        borderColor: 'black',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
        showLine: true,
        tension: 0.2,
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        }
      }
    ]
  }), [risks]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'PETA RISIKO' },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const point = ctx.raw;
            return `${point.kode} (L=${point.x}, I=${point.y}) - ${point.level}`;
          }
        }
      }
    },
    scales: {
      x: {
        min: 0, max: 5.5,
        title: { display: true, text: 'Likelihood' },
        ticks: { stepSize: 1 }
      },
      y: {
        min: 0, max: 5.5,
        title: { display: true, text: 'Impact' },
        ticks: { stepSize: 1 }
      }
    }
  }), []);

  return (
    <Scatter
      data={chartData}
      options={options}
      plugins={[backgroundPlugin, labelsPlugin]}
    />
  );
}
