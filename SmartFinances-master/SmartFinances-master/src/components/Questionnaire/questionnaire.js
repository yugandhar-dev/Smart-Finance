import React, { useState, useEffect } from 'react';
import './questionnaire.css';
import { submitQuestionnaire } from '../../auth/index';
import { getAnswers } from '../../auth/index';

export default function Questionnaire() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState();

  useEffect(() => {
    const getprevious = async () => {
      const res = await getAnswers();
      setFormData(res[0]);
    };
    getprevious();
  }, []);

  const submitAns = async e => {
    e.preventDefault();
    if (
      formData.Answer1 === '' ||
      formData.Answer2 === '' ||
      formData.Answer3 === '' ||
      formData.Answer4 === '' ||
      formData.Answer5 === '' ||
      formData.Answer6 === '' ||
      formData.Answer7 === '' ||
      formData.Answer8 === '' ||
      formData.Answer9 === '' ||
      formData.Answer10 === ''
    ) {
      setMessage('Please answer all the questions');
      return;
    }

    const res = await submitQuestionnaire(formData);
    if (res.questions._id)
      setMessage('Questionnaire has been submitted successfully!');
  };
  return (
    <div>
      <div className="page-content">
        <div className="form-v4-content">
          <form className="form-detail" id="myform">
            <h2>Questionnaire Form</h2>
            <div className="form-group">
              <div className="form-row">
                <label for="first_question">
                  How much are you investing in your own human capital or that
                  of your children and grandchild, so they can earn the most
                  during their working years?{' '}
                </label>
                <input
                  type="text"
                  name="first_question"
                  id="first_question"
                  value={formData?.Answer1}
                  onChange={e =>
                    setFormData({ ...formData, Answer1: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="second_question">
                  Do you have the proper choices in your retirement plan and is
                  it enough to allow you to retire when you intend to?
                </label>
                <input
                  type="text"
                  name="second_question"
                  id="second_question"
                  onChange={e =>
                    setFormData({ ...formData, Answer2: e.target.value })
                  }
                  value={formData?.Answer2}
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="third_question">
                  Do you have the proper amount in an emergency fund? If
                  something happen to you, will your family be to put everything
                  together?{' '}
                </label>
                <input
                  type="text"
                  name="third_question"
                  id="third_question"
                  value={formData?.Answer3}
                  onChange={e =>
                    setFormData({ ...formData, Answer3: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="fourth_question">
                  What is your risk tolerance and how much risk are you taking
                  right now?{' '}
                </label>
                <input
                  type="text"
                  name="fourth_question"
                  id="fourth_question"
                  value={formData?.Answer4}
                  onChange={e =>
                    setFormData({ ...formData, Answer4: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="fifth_question">
                  What is your current asset allocation with all the things you
                  own?
                </label>
                <input
                  type="text"
                  name="fifth_question"
                  id="fifth_question"
                  value={formData?.Answer5}
                  onChange={e =>
                    setFormData({ ...formData, Answer5: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="sixth_question">
                  Have you got any kind of loans or financial commitments with
                  you currently?
                </label>
                <input
                  type="text"
                  name="sixth_question"
                  id="sixth_question"
                  value={formData?.Answer6}
                  onChange={e =>
                    setFormData({ ...formData, Answer6: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="seventh_question">
                  Have you ever worked with a financial advisor before?
                </label>
                <input
                  type="text"
                  name="seventh_question"
                  id="seventh_question"
                  value={formData?.Answer7}
                  onChange={e =>
                    setFormData({ ...formData, Answer7: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="eighth_question">
                  Do you feel as if you're currently reaching your goals?{' '}
                </label>
                <input
                  type="text"
                  name="eighth_question"
                  id="eighth_question"
                  value={formData?.Answer8}
                  onChange={e =>
                    setFormData({ ...formData, Answer8: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="nineth_question">
                  How do you picture your life 1/3/5 years from now?
                </label>
                <input
                  type="text"
                  name="nineth_question"
                  id="nineth_question"
                  value={formData?.Answer9}
                  onChange={e =>
                    setFormData({ ...formData, Answer9: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <label for="tenth_question">
                  Do you have a household budget?
                </label>
                <input
                  type="text"
                  name="tenth_question"
                  id="tenth_question"
                  value={formData?.Answer10}
                  onChange={e =>
                    setFormData({ ...formData, Answer10: e.target.value })
                  }
                  placeholder="Your answer"
                  className="input-text"
                  required
                />
              </div>
            </div>
            <div className="form-row-last">
              <input
                type="button"
                name="Submit"
                onClick={e => submitAns(e)}
                className="register"
                value="Submit"
              />
            </div>
            <div>
              <p>{message}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
