import React from "react";
import "./PageAdmin.scss";
import { CChart } from "@coreui/react-chartjs";

export default function PageAdmin() {
  return (
    <>
      <CChart
        type="bar"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "GitHub Commits",
              backgroundColor: "#f87979",
              data: [40, 20, 30, 10, 50, 60, 5],
            },
          ],
        }}
        labels="months"
        options={{
          plugins: {
            legend: {
              labels: {
                color: "--cui-body-color",
              },
            },
          },
          scales: {
            x: {
              grid: {
                color: "--cui-border-color-translucent",
              },
              ticks: {
                color: "--cui-body-color",
              },
            },
            y: {
              grid: {
                color: "--cui-border-color-translucent",
              },
              ticks: {
                color: "--cui-body-color",
              },
            },
          },
        }}
      />
    </>
  );
}
