import React from 'react'

export default function Questionnaire() {
    return (
        <div>
           <div className="page-content">
		<div className="form-v4-content">
			<form className="form-detail" action="#" method="post" id="myform">
				<h2>Questionnaire Form</h2>
				<div className="form-group">
					<div className="form-row">
						<label for="first_question">How much are you investing in your own human capital or that of your children and grandchild, so they can earn the most during their working years? </label>
						<input type="text" name="first_question" id="first_question" placeholder="Your answer" className="input-text" />
					</div>
				</div>
                <div className="form-group">
					<div className="form-row">
						<label for="second_question">Do you have the proper choices in your retirement plan and is it enough to allow you to retire when you intend to?</label>
						<input type="text" name="second_question" id="second_question" placeholder="Your answer" className="input-text" />
					</div>
				</div>
                <div className="form-group">
					<div className="form-row">
						<label for="third_question">Do you have the proper amount in an emergency fund? If something happen to you, will your family be to put everything together? </label>
						<input type="text" name="third_question" id="third_question" placeholder="Your answer" className="input-text" />
					</div>
				</div>
                <div className="form-group">
					<div className="form-row">
						<label for="fourth_question">What is your risk tolerance and how much risk are you taking right now? </label>
						<input type="text" name="fourth_question" id="fourth_question" placeholder="Your answer" className="input-text" />
					</div>
				</div>
                <div className="form-group">
					<div className="form-row">
						<label for="fifth_question">What is your current asset allocation with all the things you own?</label>
						<input type="text" name="fifth_question" id="fifth_question" placeholder="Your answer" className="input-text" />
					</div>
				</div>
				<div className="form-row-last">
					<input type="submit" name="Submit" className="Submit" value="Submit"/>
				</div>
			</form>
	
        </div>
	</div> 
 </div>
    )
}