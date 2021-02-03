import { useEffect, useState } from "react";
import axios from "axios";

import ClassCard from "../components/ClassCard";
import CohortForm from "../components/CohortForm";
import plusIcon from "../data/images/plus.svg";

const Classes = () => {
   const [classes, setClasses] = useState();
   const [activeForm, setActiveForm] = useState(true);

   useEffect(() => {
      const getClasses = () => {
         const classesRoute = "http://localhost:8080/class";
         axios.get(classesRoute, { withCredentials: true }).then((res) => {
            console.log(res);
            setClasses(res.data.classes);
         });
      };
      getClasses();
   }, []);

   return (
      <div className="view">
         {activeForm && <CohortForm />}
         <div className="classes">
            <div className="classes__navbar">
               <h2 className="classes__navbar-title">Classes</h2>
               <button className="classes__navbar-add-button">
                  <img src={plusIcon} className="classes__navbar-button-icon" />
               </button>
            </div>
            <div className="classes__card-container">
               {classes &&
                  classes.map((clas) => {
                     return (
                        <ClassCard
                           classTitle={clas.name}
                           students={clas.enrolledStudents}
                           key={clas._id}
                           classId={clas._id}
                        />
                     );
                  })}
            </div>
         </div>
      </div>
   );
};
export default Classes;
