import React from 'react'
import './PopularDestination.css'
import d1 from '../../Assets/Images/d1.jpg'
import d2 from '../../Assets/Images/d2.jpg'
import d3 from '../../Assets/Images/d3.jpg'

export default function PopularDestination() {
  return (
    <div>
      <section className="popular-destination-area section-gap">
			<div className="container popular-destination-div">
				<div className="row d-flex justify-content-center">
					<div className="menu-content pb-70 col-lg-8">
						<div className="title text-center">
							<h1 className="mb-10">Popular Destinations</h1>
							<p>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, day.</p>
						</div>
					</div>
				</div>						
				<div className="row">
					<div className="col-lg-4">
						<div className="single-destination relative">
							<div className="thumb relative">
								<div className="overlay overlay-bg"></div>
								<img className="img-fluid" src={d1} alt=""/>
							</div>
							<div className="desc">			
								<h4>Mountain River</h4>
								<p>Paraguay</p>			
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="single-destination relative">
							<div className="thumb relative">
								<div className="overlay overlay-bg"></div>
								<img className="img-fluid" src={d2} alt=""/>
							</div>
							<div className="desc">			
								<h4>Dream City</h4>
								<p>Paris</p>			
							</div>
						</div>
					</div>
					<div className="col-lg-4">
						<div className="single-destination relative">
							<div className="thumb relative">
								<div className="overlay overlay-bg"></div>
								<img className="img-fluid" src={d3} alt=""/>
							</div>
							<div className="desc">			
								<h4>Cloud Mountain</h4>
								<p>Sri Lanka</p>			
							</div>
						</div>
					</div>												
				</div>
			</div>	
		</section>
    </div>
  )
}
