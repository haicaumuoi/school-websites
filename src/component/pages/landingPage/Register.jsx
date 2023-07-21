import { addNotification } from '../../utilities/commonServices/CommonService';
import { getClass } from '../../../redux/slices/classSice';
import { getGrade } from '../../../redux/slices/gradeSlice';
import { Card, Select, Typography } from 'antd';
import axios from 'axios';
import _, { set } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const RegisterPage = () => {
  const [gradeValue, setGradeValue] = useState('');
  const [classValue, setClassValue] = useState('');
  const navigate = useNavigate();
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.authReducer.user);
  const gradeList = useSelector(state => state.gradeReducer.gradeList);
  const gradeListFormat = _.map(gradeList, (item) => {
    return { value: item.id, label: `${item.code}` }
  });
  const classList = useSelector(state => state.classReducer.classList);
  const classListPending = useSelector(state => state.classReducer.fetchingClass);
  const classListFormat = _.map(classList, (item) => {
    return { value: item.id, label: `${item.name}` }
  });
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]); // Declare userData state variable, which we will use to store data from the API

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
          if (err.response.status == 409) {
            addNotification("error", "", "You already send request to this class");
            return;
          } else {
            addNotification("error", "", "Send request failed");
          }
        });
    }
  };

  const fetchUserData = async () => {
    try {
      // Display the loading indicator when the request is sent
      const res = await axios.get(
        "https://alumniproject.azurewebsites.net/alumni/api/alumnis",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*"
          },
        }
      );
      setUserData(res.data);
      // Hide the loading indicator after the request is completed
    } catch (err) {
      // Handle the error here, for example, show a notification
      addNotification("error", "", "Get user data failed");
    }
  };



  useEffect(() => {
    if (user?.schoolId == null) {
      navigate("/login");
    } else {
      dispatch(getGrade({
        token: token, schoolId: user?.schoolId
      }))
    }
  }, [token, user, dispatch])


  useEffect(() => {
    fetchUserData(); // Call the function to fetch data when the component mounts or the dependency array changes (if you have any dependencies).
  }, []); // The empty dependency array ensures that the effect runs only once, equivalent to componentDidMount.


  useEffect(() => {
    if (!gradeValue) {
      return;
    } else {
      dispatch(getClass({
        gradeId: gradeValue
      }))
    }
  }, [gradeValue, dispatch])


  return (
    <div className="h-screen w-screen bg-opacity-75 bg-cover bg-center flex items-center justify-center bg-blend-darken" style={{ backgroundImage: "url('https://cdn.memiah.co.uk/uploads/counselling-directory.org.uk/image_gallery/fotografierende-333oj7zFsdg-unsplash-1592414589-1603440321-hero.jpg')" }}>
      <div className="bg-black bg-opacity-80 py-8 px-4 text-white h-full w-full flex justify-center items-center">
        <div className="w-full max-w-md sapce-y-8">

          <Card
            style={{ backgroundColor: "#fff" }}
            className="rounded-lg overflow-hidden"
          >
            <div className="mb-4 flex flex-col space-y-2">
              <Typography.Text className="font-bold">Name: {userData?.fullName || "No user name found"}</Typography.Text>
              <Typography.Text >Email: {userData?.email}</Typography.Text>
              {/* You can add other user details here */}
              <Typography.Text>Date of Birth: {moment(userData?.dateOfBirth).format("MMMM Do, YYYY")}</Typography.Text>
            </div>
          </Card>


          <div className="flex items-center my-4">
            <Select
              className="mr-2 w-1/2 bg-white text-gray-800 rounded-md hover:bg-gray-200"
              onChange={(value) => {
                setGradeValue(value);
              }}
              options={gradeListFormat}
            />
            <Select
              className='w-1/2 bg-white text-gray-800 rounded-md hover:bg-gray-200'
              onChange={(value) => {
                setClassValue(value);
              }}
              options={classListFormat}
              disabled={!gradeValue}
              loading={classListPending}
            />
          </div>

          <button className="w-full py-2 px-4 bg-white text-gray-800 rounded-md hover:bg-gray-200" onClick={sendRequest}>
            Send request to class
          </button>
        </div>
      </div>
    </div>


  )
}

export default RegisterPage