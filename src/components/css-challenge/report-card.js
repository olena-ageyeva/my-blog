import React from "react"
import "./styles.scss"

const ReportCard = () => (
  <div className ="frame">
    <div className ="card">
      <div className ="card__header">
        <span className ="title left lg">Weekly Report</span>
        <span className ="subtitle left sm">01. Feb - 07. Feb</span>
        <span className ="title right sm">Revenue</span>
        <span className ="subtitle right lg">$ 3621.79</span>
      </div>
      <div className ="card__body">
        <div className ="graph__legend">
          <span className ="red set1">Views</span>
          <span className ="blue set2">Purchases</span>
        </div>
        <div className ="graph">
          <div className ="line"></div>
          <div className ="line-md"></div>
          <div className ="line-bt"></div>
          <div className ="data red">
            <svg>
              <polyline points="10,46 50,12 90,23 130,11 170,38 210,48 250,19"></polyline>
            </svg>
            <div className ="points">
              <div className ="point-1">
                <div className ="tooltip">458</div>
              </div>
              <div className ="point-2">
                <div className ="tooltip">812</div>
              </div>
              <div className ="point-3">
                <div className ="tooltip">746</div>
              </div>
              <div className ="point-4">
                <div className ="tooltip">877</div>
              </div>
              <div className ="point-5">
                <div className ="tooltip">517</div>
              </div>
              <div className ="point-6">
                <div className ="tooltip">434</div>
              </div>
              <div className ="point-7">
                <div className ="tooltip">458</div>
              </div>
            </div>
          </div>
          <div className ="data blue">
            <svg>
              <polyline points="10,61 50,50 90,65 130,55 170,61 210,74 250,64"></polyline>
            </svg>
            <div className ="points">
              <div className ="point-1">
                <div className ="tooltip">26</div>
              </div>
              <div className ="point-2">
                <div className ="tooltip">41</div>
              </div>
              <div className ="point-3">
                <div className ="tooltip">22</div>
              </div>
              <div className ="point-4">
                <div className ="tooltip">36</div>
              </div>
              <div className ="point-5">
                <div className ="tooltip">25</div>
              </div>
              <div className ="point-6">
                <div className ="tooltip">13</div>
              </div>
              <div className ="point-7">
                <div className ="tooltip">20</div>
              </div>
            </div>
          </div>
        </div>
        <div className ="graph__labels">
          <span className ="label">Mon</span>
          <span className ="label">Tue</span>
          <span className ="label">Wed</span>
          <span className ="label">Thu</span>
          <span className ="label">Fri</span>
          <span className ="label">Sat</span>
          <span className ="label">Sun</span>
        </div>
      </div>
      <div className ="footer"></div>
    </div>
  </div>
)

export default ReportCard
