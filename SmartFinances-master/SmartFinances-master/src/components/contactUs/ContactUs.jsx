import React from 'react'
import './contact.css';

export default function ContactUs() {
    return (
        <div>
           <div className="page-content">
		<div className="form-v4-content">
			<div className="form-left">
				<h2>Contact Us</h2>
				<p className="text-1">Liked our product and wanted to convey it or found something that you would like to add on to our application ? </p>
				<p className="text-2"><span>Toll Free : 888-0123-4567</span></p>
				<p className="text-2"><span>Fax : 1-234-567-8900</span></p>
				<p className="text-2"><span>Mail : hello@smartfinance.com.au</span></p>
			</div>
			<form className="form-detail" action="#" method="post" id="myform">
				<h2>We hear every one of your words</h2>
				<div className="form-group">
					<div className="form-row">
						<label for="first_name">Name</label>
						<input type="text" name="first_name" id="first_name" placeholder="Your Name" className="input-text" />
					</div>
				</div>
				<div className="form-row">
					<label for="your_email">Your Email</label>
					<input type="text" name="your_email" id="your_email" placeholder="Your Mail" className="input-text" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}">
                    </input>
				</div>
                <div className="form-row">
					<label for="your_email">Your Message</label> 
                <div class="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate="Please Type Your Message">
<textarea class="input100" name="message" placeholder="Your message here..."></textarea>
</div>
	</div>
				<div className="form-row-last">
					<input type="submit" name="register" className="register" value="Send"/>
				</div>
			</form>
	
        </div>
	</div> 
        </div>
    )
}
