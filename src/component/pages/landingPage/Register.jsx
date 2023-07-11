import { addNotification } from '../../utilities/commonServices/CommonService';
import { getClass } from '../../../redux/slices/classSice';
import { getGrade } from '../../../redux/slices/gradeSlice';
import { Select } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [gradeValue, setGradeValue] = useState('');
    const [classValue, setClassValue] = useState('');
    const navigate = useNavigate();
    const token = useSelector(state => state.gradeReducer.token);
    const user = useSelector(state => state.authReducer.user);
    const gradeList = useSelector(state => state.gradeReducer.gradeList);
    const gradeListFormat = _.map(gradeList, (item) => {
      return {value: item.id, label: `${item.code}`}
    });
    const classList = useSelector(state => state.classReducer.classList);
    const classListPending = useSelector(state => state.classReducer.fetchingClass);
    const classListFormat = _.map(classList, (item) => {
      return {value: item.id, label: `${item.name}`}
    });
    const dispatch = useDispatch();

    const sendRequest = () => {
      if (!gradeValue || !classValue) {
        addNotification("error", "", "Please choose grade and class");
        return;
      } else {
        axios
          .post(
            "https://alumniproject.azurewebsites.net/alumni/api/accessReqeuest",
            { alumniClassId: classValue },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            addNotification("success", "", "Send request successfully");
          })
          .catch((err) => {
            addNotification("error", "", "Send request failed");
          });
      }
    };
    
  

    useEffect(() => {
      if(user?.schoolId == null){
        navigate("/login");
        addNotification("error","", "Please login first");
      } else {
        dispatch(getGrade({
          token: token, schoolId: user?.schoolId}))
      }
    },[token, user, dispatch])

    useEffect(() => {
      if(!gradeValue){
        return;
      } else {
        dispatch(getClass({
          gradeId: gradeValue}))
      }
    },[gradeValue, dispatch])


  return (
    <div>
      <Select
        style={{
          width: 120,
        }}
        onChange={(value) => {
          setGradeValue(value);
        }}
        options={gradeListFormat}
      />
      <Select
        style={{
          width: 120,
        }}
        onChange={(value) => {
          setClassValue(value);
        }}
        options={classListFormat}
        disabled={!gradeValue}
        loading={classListPending}
      />

      <button className="w-full" onClick={sendRequest}>Send request to class</button>

    </div>
  )
}

export default RegisterPage