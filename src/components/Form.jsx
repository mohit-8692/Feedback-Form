import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormValidation from './useFormValidation';

const validateForm = (formData) => {
    let newErrors = {};
    if (!formData.Name) newErrors.Name = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.surveyTopic) newErrors.surveyTopic = 'Survey Topic is required';
    if (formData.surveyTopic === 'Technology') {
        if (!formData.favoriteLanguage) newErrors.favoriteLanguage = 'Favorite Programming Language is required';
        if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Years of Experience is required';
    }
    if (formData.surveyTopic === 'Health') {
        if (!formData.exerciseFrequency) newErrors.exerciseFrequency = 'Exercise Frequency is required';
        if (!formData.dietPreference) newErrors.dietPreference = 'Diet Preference is required';
    }
    if (formData.surveyTopic === 'Education') {
        if (!formData.highestQualification) newErrors.highestQualification = 'Highest Qualification is required';
        if (!formData.fieldOfStudy) newErrors.fieldOfStudy = 'Field of Study is required';
    }
    if (!formData.feedback) newErrors.feedback = 'Feedback is required';
    if (formData.feedback && formData.feedback.length < 1) newErrors.feedback = 'Feedback must be at least 50 characters';
    return newErrors;
};

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        Name: '',
        email: '',
        surveyTopic: '',
        favoriteLanguage: '',
        yearsOfExperience: '',
        exerciseFrequency: '',
        dietPreference: '',
        highestQualification: '',
        fieldOfStudy: '',
        feedback: '',
    });

    const [additionalQuestions, setAdditionalQuestions] = useState([]);
    const { errors, validate } = useFormValidation(validateForm);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const fetchAdditionalQuestions = async () => {
            if (formData.surveyTopic) {
                axios.post("https://feedbackb.vercel.app/getQuestion",{topic:formData.surveyTopic}).then((data)=>{
                    console.log(data.data[0].questions
                        );
                    setAdditionalQuestions(data.data[0].questions);
                })
            } else {
                setAdditionalQuestions([]);
            }
        };

        fetchAdditionalQuestions();
    }, [formData.surveyTopic]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate(formData)) {
              navigate('/submission', { state: formData });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
           <h1 className='text-light bg-dark d-flex justify-content-center p-5'>Feedback Form</h1>
            </div>
            <div>
                <label className="form-label fw-bold m-2">Full Name:</label>
                <input type="text" name="Name"  className="form-control" value={formData.Name} onChange={handleInputChange} />
                {errors.Name && <span className="error">{errors.Name}</span>}
            </div>
            <div>
                <label  className="form-label fw-bold m-2">Email:</label>
                <input type="email"  className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
                <label  className="form-label fw-bold m-2">Survey Topic:</label>
                <select className="form-select form-select-md mb-3" name="surveyTopic" value={formData.surveyTopic} onChange={handleInputChange}>
                    <option value="">Select a topic</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                </select>
                {errors.surveyTopic && <span className="error">{errors.surveyTopic}</span>}
            </div>

            {formData.surveyTopic === 'Technology' && (
                <div>
                    <label className="form-label fw-bold m-2">Favorite Programming Language:</label>
                    <select className="form-select form-select-md mb-3" name="favoriteLanguage" value={formData.favoriteLanguage} onChange={handleInputChange}>
                        <option value="">Select a language</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C#">C#</option>
                    </select>
                    {errors.favoriteLanguage && <span className="error">{errors.favoriteLanguage}</span>}
                    <div>
                        <label  className="form-label fw-bold m-2">Years of Experience:</label>
                        <input type="number" className="form-control" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} />
                        {errors.yearsOfExperience && <span className="error">{errors.yearsOfExperience}</span>}
                    </div>
                </div>
            )}

            {formData.surveyTopic === 'Health' && (
                <div>
                    <label className="form-label fw-bold m-2">Exercise Frequency:</label>
                    <select className="form-select form-select-md mb-3" name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleInputChange}>
                        <option value="">Select frequency</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Rarely">Rarely</option>
                    </select>
                    {errors.exerciseFrequency && <span className="error">{errors.exerciseFrequency}</span>}
                    <div>
                        <label className="form-label fw-bold m-2">Diet Preference:</label>
                        <select className="form-select form-select-md mb-3" name="dietPreference" value={formData.dietPreference} onChange={handleInputChange}>
                            <option value="">Select preference</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Non-Vegetarian">Non-Vegetarian</option>
                        </select>
                        {errors.dietPreference && <span className="error">{errors.dietPreference}</span>}
                    </div>
                </div>
            )}

            {formData.surveyTopic === 'Education' && (
                <div>
                    <label className="form-label fw-bold m-2">Highest Qualification:</label>
                    <select className="form-select form-select-md mb-3" name="highestQualification" value={formData.highestQualification} onChange={handleInputChange}>
                        <option value="">Select qualification</option>
                        <option value="High School">High School</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="PhD">PhD</option>
                    </select>
                    {errors.highestQualification && <span className="error">{errors.highestQualification}</span>}
                    <div>
                        <label className="form-label fw-bold m-2">Field of Study:</label>
                        <input className="form-control" type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} />
                        {errors.fieldOfStudy && <span className="error">{errors.fieldOfStudy}</span>}
                    </div>
                </div>
            )}
            <div>
                <label className="form-label fw-bold m-2">Feedback:</label>
                <textarea name="feedback" className="form-control" value={formData.feedback} onChange={handleInputChange}></textarea>
                {errors.feedback && <span className="error">{errors.feedback}</span>}
            </div>

            {additionalQuestions.length > 0 && (
                <div>
                    <h2 className='m-2'>Additional Questions</h2>
                    {additionalQuestions.map((question, index) => (
                        <div key={index} className='m-2'>
                            <label className="form-label fw-bold m-2">{index+1}. {question}</label>
                            <input className="form-control" type="text" name={index+1+". "+question}  value={formData.question} onChange={handleInputChange}/>
                        </div>
                    ))}
                </div>
            )}
        <button type="submit" className='btn btn-dark m-3'>Submit</button>
        </form>
    );
};
export default SurveyForm;

