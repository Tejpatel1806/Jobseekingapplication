// import React, { useContext, useState } from "react";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLock2Fill } from "react-icons/ri";
// import { Link, Navigate } from "react-router-dom";
// import { FaRegUser } from "react-icons/fa";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Context } from "../../main";
// import { FaUser } from "react-icons/fa";


// const Login = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");

//   const { isAuthorized, setIsAuthorized } = useContext(Context);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:8002/api/v1/user/login",
//         { email, password, role },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setEmail("");
//       setPassword("");
//       setRole("");
//       setIsAuthorized(true);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   if (isAuthorized) {
//     return <Navigate to={'/'} />
//   }
//   return (
//     <>

//       <section className="authPage">
//         <div className="container">
//           <div className="header">
//             <img src="/kintectblack.png" alt="logo" />
//             <h3>Login to your account</h3>
//           </div>
//           <form>
//             <div className="inputTag">
            
//               <label><span><FaUser style={{
//                   color:'#428bca' ,
//                   backgroundColor: '#ffffff'
//                 }} /></span>Login As</label>
//               <div>
              
//                 <select value={role} onChange={(e) => setRole(e.target.value)}>
//                   <option value="">Select Role</option>
//                   <option value="Employer">Employer</option>
//                   <option value="Job Seeker">Job Seeker</option>
//                 </select>
                
//               </div>
//             </div>
//             <div className="inputTag">
//               <label>Email Address</label>
//               <div>
//                 <input
//                   type="email"
//                   placeholder="tej@gmail.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <MdOutlineMailOutline />
//               </div>
//             </div>
//             <div className="inputTag">
//               <label>Password</label>
//               <div>
//                 <input
//                   type="password"
//                   placeholder="Your Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <RiLock2Fill />
//               </div>
//             </div>
//             <button type="submit" onClick={handleLogin}>
//               Login
//             </button>
//             <Link to={"/register"}>Register Now</Link>
//           </form>
//         </div>
//         <div className="banner">
//           <img src="/login1.jpg" alt="login" />
//         </div>
//       </section>

//     </>
//   )
// }

// export default Login
import React, { useContext } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Label, Input, Button } from "reactstrap";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaUser } from "react-icons/fa";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
});

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8002/api/v1/user/login",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src="/kintectblack.png" alt="logo" />
          <h3>Login to your account</h3>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            role: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <FormGroup>
                <Label for="role">
                  <span>
                    <FaUser
                    />
                  </span>
                  Select Role
                </Label>
                <Field as="select" name="role" id="role"  className="field">
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </Field>
                <ErrorMessage name="role" component="div" className="error" />
              </FormGroup>
              <FormGroup>
                <Label for="email"><span><MdOutlineMailOutline /></span>Email Address</Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="field"
                />
                
                <ErrorMessage name="email" component="div" className="error" />
              </FormGroup>
              <FormGroup>
                <Label for="password"><span><RiLock2Fill/></span>Password</Label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your Password"
                  className="field"
                >
                 
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </FormGroup>
              <Button type="submit">Login</Button>
              <Link to={"/register"} className="link">Register Now</Link>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
