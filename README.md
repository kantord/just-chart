<h1 align="center">
  just-chart
</h1>

<p align="center">
  Create and publish charts and dashboards from the command line in seconds
</p>

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#install">Install</a>  •
  <a href="#features">Features</a>  •
  <a href="#chart-types">Chart types</a>  •
  <a href="#using-makefiles">Using makefiles</a>
</p>


## Introduction

<p align="center">
  <img src="examples/demo.gif">
</p>


## Features

* use any input format supported by emuto-cli
* save charts to YAML files that can be opened using just-dashboard-desktop
* preview charts using `--show`
* generate a shareable URL for your chart/dashboard in a second using `--publish`

### Upcoming features

* combine multiple charts into a page/dashboard
* more features for making interactive visualizations
* use different backends/platforms for visualizations

## Chart types
<table>
<tr>
<td>
<code>areaChart</code>
<br>
<img src="examples/screenshots/area_chart.png" />
</td>
<td>
<code>barChart</code>
<br>
<img src="examples/screenshots/bar_chart.png" />
</td>
</tr>
<tr>
<td>
<code>donutChart</code>
<br>
<img src="examples/screenshots/donut_chart.png" />
</td>
<td>
<code>barChart --horizontal</code>
<br>
<img src="examples/screenshots/horizontal_bar_chart.png" />
</td>
</tr>
<tr>
<td>
<code>barChart --horizontal --stacked</code>
<br>
<img src="examples/screenshots/horizontal_stacked_bar_chart.png" />
</td>
<td>
<code>lineChart</code>
<br>
<img src="examples/screenshots/line_chart.png" />
</td>
</tr>
<tr>
<td>
<code>pieChart</code>
<br>
<img src="examples/screenshots/pie_chart.png" />
</td>
<td>
<code>scatterPlot</code>
<br>
<img src="examples/screenshots/scatter_plot.png" />
</td>
</tr>
<tr>
<td>
<code>splineChart</code>
<br>
<img src="examples/screenshots/spline_chart.png" />
</td>
<td>
<code>areaChart --stacked</code>
<br>
<img src="examples/screenshots/stacked_area_chart.png" />
</td>
</tr>
<tr>
<td>
<code>barChart --stacked</code>
<br>
<img src="examples/screenshots/stacked_bar_chart.png" />
</td>
<td>
<code>lineChart --stacked</code>
<br>
<img src="examples/screenshots/stacked_line_chart.png" />
</td>
</tr>
<tr>
<td>
<code>splineChart --stacked</code>
<br>
<img src="examples/screenshots/stacked_spline_chart.png" />
</td>
</tr>
</table>


## Using makefiles

FIXME: add documentation here 🙂
