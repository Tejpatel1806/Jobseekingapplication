// import React, { useContext, useState } from "react";
// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLock2Fill } from "react-icons/ri";
// import { FaPencilAlt } from "react-icons/fa";
// import { FaPhoneFlip } from "react-icons/fa6";
// import { Link, Navigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Context } from "../../main";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8002/api/v1/user/register",
//         { name, phone, email, role, password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setName("");
//       setEmail("");
//       setPassword("");
//       setPhone("");
//       setRole("");
//       setIsAuthorized(true);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   if(isAuthorized){
//     return <Navigate to={'/'}/>
//   }

//   return (
//     <>
//     <section className="authPage">
//       <div className="container">
//         <div className="header">
//           <img src="/kintectblack.png" alt="logo" />
//           <h3>Create a new account</h3>
//         </div>
//         <form>
//           <div className="inputTag">
//             <label>Register As</label>
//             <div>
//               <select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="">Select Role</option>
//                 <option value="Employer">Employer</option>
//                 <option value="Job Seeker">Job Seeker</option>
//               </select>
//               <FaRegUser />
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Name</label>
//             <div>
//               <input
//                 type="text"
//                 placeholder="Tej"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <FaPencilAlt />
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Email Address</label>
//             <div>
//               <input
//                 type="email"
//                 placeholder="tej@gmail.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <MdOutlineMailOutline />
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Phone Number</label>
//             <div>
//               <input
//                 type="number"
//                 placeholder="12345678"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//               <FaPhoneFlip />
//             </div>
//           </div>
//           <div className="inputTag">
//             <label>Password</label>
//             <div>
//               <input
//                 type="password"
//                 placeholder="Your Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <RiLock2Fill />
//             </div>
//           </div>
//           <button type="submit" onClick={handleRegister}>
//             Register
//           </button>
//           <Link to={"/login"}>Login Now</Link>
//         </form>
//       </div>
//     </section>
//   </>
//   )
// }

// export default Register


import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import { FormGroup, Label, Input, Button, Card, CardBody } from "reactstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const initialValues = {
    email: "",
    name: "",
    phone: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    role: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8002/api/v1/user/register",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      resetForm();
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="registerAuthPage">
        <div className="registercontainer">
          <div className="header">
            <img src="/kintectblack.png" alt="logo" />
            <h3>Create a new account</h3>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormGroup>
                  <Label for="role"><span><FaRegUser /></span>Register As</Label>
                  <Field
                    as="select"
                    name="role"
                    id="role"
                    className="form-control"
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="error" />
                  
                </FormGroup>
                <FormGroup>
                  <Label for="name"><span><FaPencilAlt /></span>Name</Label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Tej"
                    className="form-control"
                  />
                  <ErrorMessage name="name" component="div" className="error" />
                  
                </FormGroup>
                <FormGroup>
                  <Label for="email"><span><MdOutlineMailOutline /></span>Email Address</Label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="tej@gmail.com"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="error" />
                  
                </FormGroup>
                <FormGroup>
                  <Label for="phone"><span><FaPhoneFlip /></span>Phone Number</Label>
                  <Field
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="12345678"
                    className="form-control"
                  />
                  <ErrorMessage name="phone" component="div" className="error" />
                  
                </FormGroup>
                <FormGroup>
                  <Label for="password"><span><RiLock2Fill /></span>Password</Label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    className="form-control"
                  />
                  <ErrorMessage name="password" component="div" className="error" />
                  
                </FormGroup>
                <Button type="submit" disabled={isSubmitting} >
                  Register
                </Button>
                <Link to={"/login"}  className="link">Login Now</Link>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default Register;
