export const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Sales",
      data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderColor: "rgba(99, 102, 241, 1)",
      borderWidth: 2,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Previous Year",
      data: [4000, 4800, 4000, 5900, 5300, 5000, 6000],
      backgroundColor: "rgba(203, 213, 225, 0.2)",
      borderColor: "rgba(203, 213, 225, 1)",
      borderWidth: 2,
      tension: 0.4,
      fill: false,
    },
  ],
};
