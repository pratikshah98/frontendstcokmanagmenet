<template>
    <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0">Statistics</h2>
                        </div>
                    </div>
                </div> 
            </div>

            <div class="content-body">
                <!-- Dashboard Ecommerce Starts -->
                <section id="dashboard-ecommerce">
                    <div class="row">
                        <div class="col-lg-4 col-sm-6 col-12">
                            <div class="card">
                                <div class="card-header d-flex flex-column align-items-start pb-0">
                                    <div class="avatar bg-rgba-success p-50 m-0">
                                        <div class="avatar-content">
                                            <i class="feather icon-credit-card text-success font-medium-5"></i>
                                        </div>
                                    </div>
                                    <h2 class="text-bold-700 mt-1">97.5k</h2>
                                    <p class="mb-0">Revenue Generated</p>
                                </div>
                                <div class="card-content">
                                    <div id="line-area-chart-2"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-12">
                            <div class="card">
                                <div class="card-header d-flex flex-column align-items-start pb-0">
                                    <div class="avatar bg-rgba-danger p-50 m-0">
                                        <div class="avatar-content">
                                            <i class="feather icon-shopping-cart text-danger font-medium-5"></i>
                                        </div>
                                    </div>
                                    <h2 class="text-bold-700 mt-1">36%</h2>
                                    <p class="mb-0">Quarterly Sales</p>
                                </div>
                                <div class="card-content">
                                    <div id="line-area-chart-3"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-12">
                            <div class="card">
                                <div class="card-header d-flex flex-column align-items-start pb-0">
                                    <div class="avatar bg-rgba-warning p-50 m-0">
                                        <div class="avatar-content">
                                            <i class="feather icon-package text-warning font-medium-5"></i>
                                        </div>
                                    </div>
                                    <h2 class="text-bold-700 mt-1">97.5K</h2>
                                    <p class="mb-0">Orders Received</p>
                                </div>
                                <div class="card-content">
                                    <div id="line-area-chart-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="card">
                                <div id="chartContainer chart-wrapper" style="height: 370px; width: 100%;">
                                     <chart :options="chartOptionsBar"></chart>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6 col-12">
                            <div class="card">
                                <div id="chartContainer chart-wrapper" style="height: 370px; width: 100%;">
                                     <chart :options="chartOptionsLine"></chart>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
    </div>   
</template>
<script>
import axios from 'axios'
import '@/plugins/echarts'

 export default {
    layout:"dashboard",
    data: () => ({
    chartOptionsBar: {
        xAxis: {
            data: ['Q1', 'Q2', 'Q3', 'Q4']
            },
        yAxis: {
            type: 'value'
            },
        series: [
            {
            type: 'bar',
            data: [63, 75, 24, 92]
            }
        ],
        title: {
            text: 'Quarterly Sales Results',
            x: 'center',
            textStyle: {
            fontSize: 24
            }
        },
        color: ['#127ac2']
    },
    chartOptionsLine: {
        xAxis: {
            data: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
            ]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
            type: "line",
            data: [55, 72, 84, 48, 59, 62, 87, 75, 94, 101, 127, 118]
            }
        ],
        title: {
            text: "Monthly Stock Prices",
            x: "center",
            textStyle: {
            fontSize: 24
            }
        },
        color: ["#127ac2"]
    }
  }),
}
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 700px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>