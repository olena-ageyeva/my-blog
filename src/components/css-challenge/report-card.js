import React from "react"
import "./styles.scss"

const ReportCard = () => (
  <div class="frame">
    <div class="card">
      <div class="card__header">
        <span class="title left lg">Weekly Report</span>
        <span class="subtitle left sm">01. Feb - 07. Feb</span>
        <span class="title right sm">Revenue</span>
        <span class="subtitle right lg">$ 3621.79</span>
      </div>
      <div class="card__body">
        <div class="graph__legend">
          <span class="red set1">Views</span>
          <span class="blue set2">Purchases</span>
        </div>
        <div class="graph">
          <div class="line"></div>
          <div class="line-md"></div>
          <div class="line-bt"></div>
          <div class="data red">
            <svg>
              <polyline points="10,46 50,12 90,23 130,11 170,38 210,48 250,19"></polyline>
            </svg>
            <div class="points">
              <div class="point-1">
                <div class="tooltip">458</div>
              </div>
              <div class="point-2">
                <div class="tooltip">812</div>
              </div>
              <div class="point-3">
                <div class="tooltip">746</div>
              </div>
              <div class="point-4">
                <div class="tooltip">877</div>
              </div>
              <div class="point-5">
                <div class="tooltip">517</div>
              </div>
              <div class="point-6">
                <div class="tooltip">434</div>
              </div>
              <div class="point-7">
                <div class="tooltip">458</div>
              </div>
            </div>
          </div>
          <div class="data blue">
            <svg>
              <polyline points="10,61 50,50 90,65 130,55 170,61 210,74 250,64"></polyline>
            </svg>
            <div class="points">
              <div class="point-1">
                <div class="tooltip">26</div>
              </div>
              <div class="point-2">
                <div class="tooltip">41</div>
              </div>
              <div class="point-3">
                <div class="tooltip">22</div>
              </div>
              <div class="point-4">
                <div class="tooltip">36</div>
              </div>
              <div class="point-5">
                <div class="tooltip">25</div>
              </div>
              <div class="point-6">
                <div class="tooltip">13</div>
              </div>
              <div class="point-7">
                <div class="tooltip">20</div>
              </div>
            </div>
          </div>
        </div>
        <div class="graph__labels">
          <span class="label">Mon</span>
          <span class="label">Tue</span>
          <span class="label">Wed</span>
          <span class="label">Thu</span>
          <span class="label">Fri</span>
          <span class="label">Sat</span>
          <span class="label">Sun</span>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
)

export default ReportCard
